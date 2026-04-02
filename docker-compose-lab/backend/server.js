const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "admin",
  host: "db",
  database: "userdb",
  password: "admin",
  port: 5432,
});

// ✅ Retry DB connection until ready
const connectWithRetry = () => {
  pool.connect((err, client, release) => {
    if (err) {
      console.log("❌ DB not ready, retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("✅ Connected to PostgreSQL!");

      // ✅ Create table safely after connection
      client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name TEXT,
          age INT,
          gender TEXT,
          email TEXT,
          mobile TEXT
        );
      `)
      .then(() => console.log("✅ Table ensured"))
      .catch(err => console.error("Table creation error:", err));

      release();
    }
  });
};

// Call retry function
connectWithRetry();

// API to insert data
app.post("/submit", async (req, res) => {
  const { name, age, gender, email, mobile } = req.body;

  try {
    await pool.query(
      "INSERT INTO users (name, age, gender, email, mobile) VALUES ($1,$2,$3,$4,$5)",
      [name, age, gender, email, mobile]
    );
    res.send("Data saved successfully!");
  } catch (err) {
    console.error("Insert Error:", err);
    res.status(500).send("Error saving data");
  }
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Backend running on port 5000");
});

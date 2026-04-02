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

// Create table
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INT,
    gender TEXT,
    email TEXT,
    mobile TEXT
  );
`);

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
    console.error(err);
    res.status(500).send("Error saving data");
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));

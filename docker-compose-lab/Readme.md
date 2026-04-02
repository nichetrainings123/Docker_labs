# 🐳 Docker Compose Full Stack Lab

### HTML Form + Node.js Backend + PostgreSQL

---

## 📌 Project Overview

This project demonstrates a **full-stack containerized application** using Docker Compose.

It includes:

* 🌐 Frontend (HTML form)
* ⚙️ Backend API (Node.js + Express)
* 🗄️ Database (PostgreSQL)

The application captures user details and stores them in a PostgreSQL database running inside Docker.

---

## 🎯 Features

* User registration form (Name, Age, Gender, Email, Mobile)
* REST API to store data
* PostgreSQL database integration
* Dockerized multi-container setup
* Persistent database using volumes

---

## 🏗️ Architecture

Browser → Frontend (Nginx) → Backend (Node.js API) → PostgreSQL

---

## 📁 Project Structure

```
docker-compose-lab/
│
├── docker-compose.yml
│
├── backend/
│   ├── Dockerfile
│   ├── server.js
│   ├── package.json
│
├── frontend/
│   ├── index.html
│   ├── Dockerfile
```

---

## ⚙️ Technologies Used

* Docker & Docker Compose
* Node.js (Express)
* PostgreSQL
* HTML / JavaScript
* Nginx

---

## 🚀 Setup Instructions

### 1️⃣ Clone the repository

```
git clone <your-repo-link>
cd docker-compose-lab
```

---

### 2️⃣ Run the application

```
docker compose up --build
```

---

### 3️⃣ Access the application

* Frontend → http://localhost:8080
* Backend API → http://localhost:5000

---

## 🧪 Testing the Application

1. Open the frontend in browser
2. Fill the form and submit
3. Data will be stored in PostgreSQL

---

## 🗄️ Verify Data in Database

### Connect to PostgreSQL:

```
docker exec -it postgres_db psql -U admin -d userdb
```

### Run:

```
SELECT * FROM users;
```

---

## 📊 Database Schema

```
users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  age INT,
  gender TEXT,
  email TEXT,
  mobile TEXT
)
```

---

## 🔧 Common Issues & Fixes

### ❌ Backend not running

Check logs:

```
docker logs node_backend
```

---

### ❌ Database connection error (ECONNREFUSED)

* Occurs when DB is not ready
* Fixed using retry logic in backend

---

### ❌ Table not found

Run manually:

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  age INT,
  gender TEXT,
  email TEXT,
  mobile TEXT
);
```

---

## 🔄 Stop Application

```
docker compose down -v
```

---

## 🚀 Future Enhancements

* Add authentication (JWT)
* Build React frontend
* Add pgAdmin UI
* Deploy on AWS / Azure
* Add CI/CD pipeline

---

## 👨‍💻 Author

Developed as a hands-on Docker & DevOps learning project.

---

## ⭐ Use Case

* DevOps practice project
* Beginner full-stack containerization
* Training & workshop demo
* Interview-ready project

---

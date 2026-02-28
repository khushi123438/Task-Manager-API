
📌 Task Manager API

A backend-focused mini project built to understand server-side development, REST APIs, authentication, and database handling.

This project was created as a hands-on learning exercise to:

Build custom APIs

Perform full CRUD operations

Handle database integration

Understand authentication middleware

Structure a scalable backend project

🚀 Tech Stack

Backend: Node.js

Framework: Express.js

Database: MongoDB

Frontend: Basic HTML, CSS, JavaScript (for testing APIs)

🎯 Project Objective

The goal of this project was not UI perfection —
It was backend mastery.

I built this project to:

Learn how to design RESTful routes

Implement authentication using middleware

Structure models using Mongoose

Perform CRUD operations (Create, Read, Update, Delete)

Connect backend with a MongoDB database

Understand request lifecycle and error handling

Task-Manager/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── index.html
    ├── dashboard.html
    ├── script.js
    └── style.css

🔑 Features

User Authentication (Register / Login)

JWT-based authorization

CRUD operations for:

Tasks

Notes

Goals

Secure route protection

Organized backend folder structure

🛠️ How to Run Locally

1️⃣ Clone Repository
git clone https://github.com/khushi123438/Task-Manager-API.git
cd Task-Manager-API

2️⃣ Install Backend Dependencies
cd backend
npm install

3️⃣ Create .env File
Inside backend/, create a .env file:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

4️⃣ Start Server
npm start
Server will run on:
http://localhost:5000

📚 What I Learned

API design principles
Database schema modeling
Middleware execution flow
Authentication & authorization logic
Handling async operations
Real backend project structuring

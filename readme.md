## 📝 Task Management API  
A secure RESTful API built using **TypeScript**, **Express**, **MongoDB**, and **JWT Authentication**.  
Easily manage user-specific tasks with full CRUD, validation, and authentication.

---

### Tech Stack
- **Backend**: Node.js + Express + TypeScript  
- **Database**: MongoDB (Mongoose ODM)  
- **Auth**: JWT (JSON Web Tokens) + Cookies  
- **Security**: bcryptjs (password hashing)  
- **Dev Tools**: dotenv, nodemon, ts-node  

---

### 📁 Folder Structure
```
src/
├── config/        # DB connection
├── controllers/   # Route handlers
├── services/      # Business logic
├── models/        # Mongoose schemas
├── middlewares/   # Auth & error handling
├── routes/        # API endpoints
├── types/         # Custom TS types
├── utils/         # Helper functions
├── app.ts
└── server.ts
```

---

## Setup Guide

### 1️⃣ Clone & Install
```bash
git clone <repo-url>
cd backend
npm install
```

### 2️⃣ Setup Environment
Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task_app
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

### 3️⃣ Run MongoDB & Server
```bash
npm run dev
```
> API runs at: **http://localhost:5000**

---

## 🔐 Authentication Flow

1. **Sign Up** – Create a new user account.  
2. **Login** – Get a JWT token after successful authentication.  
3. **Access Protected Routes** – Use the token in the Authorization header:  

```
Authorization: Bearer <your_jwt_token_here>
```

---

## 📬 API Endpoints

### 🧑‍💻 Auth Routes

| Method | Endpoint | Description |
|--------|-----------|--------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login user & get JWT token |

**Signup Payload Example**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Login Payload Example**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

### ✅ Task Routes (Protected)

> ⚠️ **Note:** Add your JWT token as a **Bearer token** in the header before testing these APIs.

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/tasks` | Get all tasks (with pagination & sorting) |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update task by ID |
| DELETE | `/api/tasks/:id` | Delete task by ID |

**Authorization Header**
```
Authorization: Bearer <your_jwt_token_here>
```

**Create Task Payload Example**
```json
{
  "title": "Complete Project Report",
  "description": "Finish documentation and upload",
  "status": "pending",
  "deadline": "2025-11-05"
}
```

---

## 🧮 Pagination & Sorting (Frontend Usage)

You can add query params to fetch sorted or paginated tasks.

Example:
```
GET /api/tasks?page=1&limit=5&sortBy=createdAt&order=desc
```

---

## 🧾 Sample Task Payloads

Here are some example tasks you can create using Postman:

```json
[
  {
    "title": "Setup Pagination",
    "description": "Implement pagination for user tasks",
    "status": "in-progress",
    "deadline": "2025-11-04"
  },
  {
    "title": "Add Error Handling",
    "description": "Create centralized error handler middleware",
    "status": "pending",
    "deadline": "2025-11-05"
  },
  {
    "title": "Frontend Integration",
    "description": "Connect API with React frontend",
    "status": "pending",
    "deadline": "2025-11-06"
  }
]
```

---

## 🧰 Scripts
```json
"scripts": {
  "dev": "nodemon --exec ts-node src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

---

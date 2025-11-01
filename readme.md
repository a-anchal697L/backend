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
MONGO_URI=mongodb://localhost:27017/task_app_db
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3️⃣ Run MongoDB & Server
```bash
npm run dev
```
> API runs at: **http://localhost:5000**

---

## 🔐 Auth Routes

### `POST /api/auth/signup`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongP@ssword1"
}
```

### `POST /api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "StrongP@ssword1"
}
```

---

## Task Routes (Require Auth Token)

### `GET /api/tasks`
- Optional query: `?page=1&limit=5&sortBy=deadline&order=asc`

### `POST /api/tasks`
```json
{
  "title": "Finish Backend API",
  "description": "Implement CRUD and auth",
  "status": "Pending",
  "deadline": "2025-11-10T18:00:00.000Z"
}
```

### `PUT /api/tasks/:id`
```json
{
  "title": "Integrate JWT Auth",
  "deadline": "2025-11-25T18:00:00.000Z"
}
```

### `DELETE /api/tasks/:id`
Deletes the authenticated user’s own task.

---

## 🧾 Example Payloads
**Signup**
```json
{ "name": "Alice", "email": "alice@example.com", "password": "Alice@1234" }
```

**Create Task**
```json
{
  "title": "Write Unit Tests",
  "status": "Pending",
  "deadline": "2025-11-10T12:00:00.000Z"
}
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

## 🧪 Quick Test (Postman or cURL)
```bash
curl -X POST http://localhost:5000/api/auth/signup   -H "Content-Type: application/json"   -d '{"name":"John","email":"john@example.com","password":"John@1234"}'
```

---

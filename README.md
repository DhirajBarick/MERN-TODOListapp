# MEAN Stack To-Do App (AngularJS + Node.js + Express + MongoDB)

This is a full-stack to-do list application built using AngularJS for the frontend, Node.js and Express for the backend, and MongoDB for data storage. It supports user registration, login with JWT authentication, and CRUD operations for tasks. It also includes drag-and-drop, sorting, search, and UI features like logout and error handling.

---

## 🔧 Features

- User Registration & Login (with hashed passwords)
- JWT-based Authentication
- Add, Delete, and Update Tasks
- Manual Reordering (Up/Down buttons)
- Sort Tasks Alphabetically and Reset
- Search Tasks with Clear Option
- Prevent Empty Tasks or Searches
- Logout Button (Top-right)
- Fully Responsive UI
- Error Message Feedback on UI

---

## 📂 Folder Structure

```
/project-root
  ├── backend/
  │     ├── models/
  │     │    ├── User.js
  │     │    └── Todo.js
  │     └── server.js
  ├── frontend/
  │     ├── controllers/
  │     │    ├── LoginController.js
  │     │    ├── RegisterController.js
  │     │    └── HomeController.js
  │     ├── views/
  │     │    ├── login.html
  │     │    ├── register.html
  │     │    └── home.html
  │     ├── app.js
  │     └── index.html
  └── README.md
```

---

## 💾 Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install express mongoose cors bcrypt jsonwebtoken
   npm install nodemon -D
   ```

3. Run MongoDB (local) and start the development server:
   ```bash
   node server.js
   ```

> Server runs on `http://localhost:3000`

---

## 🌐 Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Open `index.html` in any modern browser. You can also serve it with a local server:
   ```bash
   npx live-server
   ```

---

## ✅ Usage

- Visit `/register` to create a new account
- Login using credentials at `/login`
- After login, redirect to `/home` where you can:
  - Add tasks
  - Search and clear tasks
  - Use arrows to reorder
  - Sort alphabetically and toggle reset
  - Delete tasks
  - Logout via the top-right button

---

## 🔐 Authentication

- Users are authenticated via JWT tokens stored in `localStorage`
- Token is included in headers for protected API routes

---

## 🧪 Sample API Endpoints

```http
POST /api/register
POST /api/login
GET /api/todos
POST /api/todos
DELETE /api/todos/:id
PUT /api/todos/reorder
```

---

## 🛠️ Tech Stack

| Layer        | Technology          |
|--------------|---------------------|
| Frontend     | AngularJS           |
| Backend      | Node.js + Express   |
| Database     | MongoDB             |
| Auth         | JWT + Bcrypt        |

---

## 📸 UI Preview

- Login and Register pages
- Home Page with responsive task list
- UI includes styled buttons, error handling, and layout design

---

## 📄 License

This project is for educational purposes.

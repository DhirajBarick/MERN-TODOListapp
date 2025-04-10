const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Todo = require("./models/Todo");

const app = express();
app.use(cors());
app.use(express.json());
try {
  mongoose.connect("mongodb://localhost:27017/todoapp");
  console.log("MongoDB connected");
} catch (error) {
  return res.status(404).json({ message: "Cannot connect mongodb" });
}

const secret = "yourSecretKey";

// Register
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(409).json({ message: "Username already exists" });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  res.json({ success: true });
});
// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id }, secret);
  res.json({ token });
});

// Middleware to verify token
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Todo Routes
app.get("/api/todos", authenticate, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.userId }).sort("position");
  res.json(todos);
});

app.post("/api/todos", authenticate, async (req, res) => {
  const { task, position } = req.body;
  if (!task || task.trim() === "") {
    return res.status(400).json({ message: "Task cannot be empty" });
  }
  const todo = new Todo({ task, position, userId: req.user.userId });
  await todo.save();
  res.json(todo);
});

app.put("/api/todos/reorder", authenticate, async (req, res) => {
  const { reorderedTodos } = req.body;
  for (let i = 0; i < reorderedTodos.length; i++) {
    await Todo.findByIdAndUpdate(reorderedTodos[i]._id, { position: i });
  }
  res.json({ success: true });
});

app.delete("/api/todos/:id", authenticate, async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id, userId: req.user.userId });
  res.json({ success: true });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

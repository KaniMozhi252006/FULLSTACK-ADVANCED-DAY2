// index.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ---- MONGO CONNECTION ----
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB Error:", err));

// ---- USER MODEL ----
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// ---- TODO MODEL ----
const TodoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Todo = mongoose.model('Todo', TodoSchema);

// ---- VERIFY TOKEN MIDDLEWARE ----
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).send("No token provided");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send("Invalid token");
        req.userId = decoded.userId;
        next();
    });
};

// ---- REGISTER USER ----
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        res.status(500).send("Error registering user");
    }
});

// ---- LOGIN USER ----
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send("Invalid username or password");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).send("Invalid username or password");

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).send("Server error");
    }
});

// ---- CREATE TODO ----
app.post('/api/todos', verifyToken, async (req, res) => {
    try {
        const { title } = req.body;
        const todo = new Todo({ title, user: req.userId });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).send("Error creating todo");
    }
});

// ---- GET TODOS ----
app.get('/api/todos', verifyToken, async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.userId });
        res.json(todos);
    } catch (error) {
        res.status(500).send("Error fetching todos");
    }
});

// ---- UPDATE TODO ----
app.put('/api/todos/:id', verifyToken, async (req, res) => {
    try {
        const { title, completed } = req.body;
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { title, completed },
            { new: true }
        );
        if (!todo) return res.status(404).send("Todo not found");
        res.json(todo);
    } catch (error) {
        res.status(500).send("Error updating todo");
    }
});

// ---- DELETE TODO ----
app.delete('/api/todos/:id', verifyToken, async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!todo) return res.status(404).send("Todo not found");
        res.send("Todo deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting todo");
    }
});

// ---- START SERVER ----
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
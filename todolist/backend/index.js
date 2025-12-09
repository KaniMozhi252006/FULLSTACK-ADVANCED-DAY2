const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Todo = require('./models/todo');
const PORT = process.env.PORT || 3001;

// MongoDB Connection
mongoose.connect(process.env.MONGOOSE_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const app = express();
app.use(cors());
app.use(express.json());

// CREATE Todo
app.post('/todos', async (req, res) => {
    try {
        const { title, description } = req.body;
        const todo = new Todo({
            title,
            description
        });
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).send(err);
    }
});

// READ all Todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).send(err);
    }
});

// UPDATE Todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const { id } = req.params;

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).send('Todo not found');
        }

        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).send(err);
    }
});

// DELETE Todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).send('Todo not found');
        }

        res.status(200).send('Todo deleted successfully');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Server Start
app.listen(PORT, () => {
    console.log(`🚀 Server running on Port ${PORT}`);
});

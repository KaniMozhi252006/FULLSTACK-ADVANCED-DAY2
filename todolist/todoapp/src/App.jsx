import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/todos").then((response) => {
      setTodoList(response.data);
    });
  }, [todoList]);

  const addTodo = () => {
    axios.post("http://localhost:3002/todos", {
      title: title,
      description: description,
    });
  };

  const updateTodo = (id) => {
    axios.put(`http://localhost:3002/todos/${id}`, {
      title: newTitle,
      description: newDescription,
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3002/todos/${id}`);
  };

  return (
    <div className="App">
      <h1>TODO List App</h1>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={addTodo}>Add Todo</button>

      <hr />

      <h2>Todo List</h2>

      {todoList.map((todo) => (
        <div key={todo._id} className="todoCard">
          <h3>Title: {todo.title}</h3>
          <h3>Description: {todo.description}</h3>

          <input
            type="text"
            placeholder="New Title..."
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="New Description..."
            onChange={(e) => setNewDescription(e.target.value)}
          />

          <button onClick={() => updateTodo(todo._id)}>Update</button>
          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;

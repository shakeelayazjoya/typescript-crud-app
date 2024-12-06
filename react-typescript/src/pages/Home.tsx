import React, { useEffect, useState } from "react";
import { fetchTodos, createTodo, toggleTodo, deleteTodo } from "../api/todoApi";
import { Todo } from "../types/todo";

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    };
    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo) return;
    const createdTodo = await createTodo(newTodo);
    setTodos((prev) => [...prev, createdTodo]);
    setNewTodo("");
  };

  const handleToggle = async (id: string, completed: boolean) => {
    await toggleTodo(id, completed);
    setTodos((prev) =>
      prev.map((todo) => (todo._id === id ? { ...todo, completed } : todo))
    );
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((todo) => todo._id !== id)); // Ensure matching by _id
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      {todos.map((todo) => (
        <div key={todo._id}>
          {" "}
          {/* Use _id here */}
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggle(todo._id, !todo.completed)} // Use _id
          />
          <span>{todo.title}</span>
          <button onClick={() => handleDelete(todo._id)}>Delete</button>{" "}
          {/* Use _id */}
        </div>
      ))}
    </div>
  );
};

export default Home;

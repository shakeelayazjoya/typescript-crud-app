import React, { useEffect, useState } from "react";
import { fetchTodos, createTodo, toggleTodo, deleteTodo } from "../api/todoApi";
import { Todo } from "../types/todo";
import "../index.css";

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  // Fetch todos from the API on component mount
  useEffect(() => {
    const loadTodos = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    };
    loadTodos();
  }, []);

  // Add a new todo
  const addTodo = async () => {
    if (!newTodo) return;
    const createdTodo = await createTodo(newTodo);
    setTodos((prev) => [...prev, createdTodo]);
    setNewTodo("");
  };

  // Toggle the completed status of a todo
  const handleToggle = async (id: string, completed: boolean) => {
    await toggleTodo(id, completed);
    setTodos((prev) =>
      prev.map((todo) => (todo._id === id ? { ...todo, completed } : todo))
    );
  };

  // Delete a todo
  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  return (
    <div className="container mx-auto p-4 w-96">
      <h1 className="text-3xl font-bold text-center mb-4">Todo App</h1>

      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
          placeholder="Add a new task"
        />
        <button
          onClick={addTodo}
          className="w-32 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Add Todo
        </button>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-md"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo._id, !todo.completed)}
                placeholder="enter completed"
                className="mr-3"
              />
              <span
                className={`${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => handleDelete(todo._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

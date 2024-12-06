import { Request, Response } from "express";
import { Todo } from "../models/todoModel";

// Get all todos
export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    // Map _id to id
    const todosWithId = todos.map(todo => ({ ...todo.toObject(), id: todo._id.toString() }));
    res.json(todosWithId);
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

// Create a new todo
export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const newTodo = new Todo({ title });
    await newTodo.save();
    // Return newTodo with _id mapped to id
    res.status(201).json({ ...newTodo.toObject(), id: newTodo._id.toString() });
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(400).json({ message: "Failed to create todo" });
  }
};

// Update a todo
export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(id, { completed }, { new: true });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    // Return updated todo with _id mapped to id
    res.json({ ...todo.toObject(), id: todo._id.toString() });
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(400).json({ message: "Failed to update todo" });
  }
};

// Delete a todo
export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    console.error(err);  // Log the error for debugging
    res.status(400).json({ message: "Failed to delete todo" });
  }
};

import { Request, Response } from 'express';
import { Todo } from '../models/todoModel';

// Get all todos
export const getTodos = async (req: Request, res: Response): Promise<Response> => {
  try {
    const todos = await Todo.find();
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching todos' });
  }
};

// Create a new todo
export const createTodo = async (req: Request, res: Response): Promise<Response> => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const newTodo = new Todo({
      title,
      completed: false,
    });
    await newTodo.save();
    return res.status(201).json(newTodo);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating todo' });
  }
};

// Update a todo by ID
export const updateTodo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return updatedTodo ? res.status(200).json(updatedTodo) : res.status(404).json({ message: 'Todo not found' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating todo' });
  }
};

// Delete a todo by ID
export const deleteTodo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    return deletedTodo ? res.status(200).json({ message: 'Todo deleted' }) : res.status(404).json({ message: 'Todo not found' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting todo' });
  }
};

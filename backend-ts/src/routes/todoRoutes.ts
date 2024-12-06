import express, { Request, Response } from 'express';  // Correct import
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController';

const router = express.Router();  // Use the router, not the application

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);

router.delete('/:id', deleteTodo);

export default router;

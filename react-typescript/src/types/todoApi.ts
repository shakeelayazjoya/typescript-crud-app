import axios from "axios";
import { Todo } from "../types/todo";

const API_URL = "http://localhost:5000/api/todos";

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTodo = async (title: string): Promise<Todo> => {
  const response = await axios.post(API_URL, { title });
  return response.data;
};

export const toggleTodo = async (id: string, completed: boolean): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, { completed });
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

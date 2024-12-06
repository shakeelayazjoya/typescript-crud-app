import axios from "axios";
import { Todo } from "../types/todo";

const API_URL = "http://localhost:5000/api/todos";

export const fetchTodos = async (): Promise<Todo[]> => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const createTodo = async (title: string): Promise<Todo> => {
  const { data } = await axios.post(API_URL, { title });
  return data;
};

export const toggleTodo = async (id: string, completed: boolean): Promise<Todo> => {
  const { data } = await axios.put(`${API_URL}/${id}`, { completed });
  return data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

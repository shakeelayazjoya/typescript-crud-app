import mongoose, { Schema, Document } from "mongoose";

interface ITodo extends Document {
  title: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export const Todo = mongoose.model<ITodo>("Todo", todoSchema);

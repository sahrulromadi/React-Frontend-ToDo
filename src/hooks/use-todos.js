import { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "@/services/api";

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  // get all todos
  const fetchTodos = async () => {
    const data = await getTodos();

    setTodos(data); // masukkan ke array
  };

  // create todo
  const handleCreate = async (title, completed) => {
    await createTodo(title, completed);
  };

  // update completed
  const handleCompleted = async (id, title, completed) => {
    await updateTodo(id, title, !completed);

    fetchTodos();
  };

  // update todo
  const handleUpdate = async (id, title, completed) => {
    await updateTodo(id, title, completed);
  };

  // delete todo
  const handleDelete = async (id) => {
    await deleteTodo(id);

    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    fetchTodos,
    handleCreate,
    handleCompleted,
    handleDelete,
    handleUpdate,
  };
};

export default useTodos;

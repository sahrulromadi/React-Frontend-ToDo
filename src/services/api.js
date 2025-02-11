import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getTodos = async () => {
  const response = await axios.get(API_URL + "/todos");

  return response.data.data; // return array
};

const createTodo = async (title, completed) => {
  await axios.post(API_URL + "/todos", {
    title,
    completed,
  });
};

const updateTodo = async (id, title, completed) => {
  await axios.patch(API_URL + `/todos/${id}`, {
    title,
    completed,
  });
};

const deleteTodo = async (id) => {
  await axios.delete(API_URL + `/todos/${id}`);
};

export { getTodos, createTodo, updateTodo, deleteTodo };

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getTodos = async (page) => {
  const response = await axios.get(
    API_URL + `/todos/pagination?page=${page}&limit=3`
  );

  return response.data;
};

// tidak terpakai
const searchByTitle = async (title) => {
  const response = await axios.get(API_URL + `/todos/search?q=${title}`);

  return response.data.data;
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

export { getTodos, searchByTitle, createTodo, updateTodo, deleteTodo };

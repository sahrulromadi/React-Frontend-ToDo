import { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "@/services/api";

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // get all todos
  const fetchTodos = async (page = currentPage) => {
    // setIsLoading(true);

    try {
      const data = await getTodos(page);

      // masukin data todos
      setTodos(data.data);

      // inisialisasi untuk di pagination
      setCurrentPage(data.pagination.page);
      setTotalPages(data.pagination.totalPages);

      return data.data;
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // handle perubahan halaman
  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);

    // halaman baru
    fetchTodos(currentPage);
  };

  // search todo menggunakan regex
  const fetchSearch = async (title) => {
    const data = await getTodos(1); // hanya ambil halaman pertama
    let allTodos = data.data;

    // buat regex untuk pencarian (case-insensitive)
    const regex = new RegExp(title, "i");

    // filter todo yang sesuai dengan title
    const filteredTodos = allTodos.filter((todo) => regex.test(todo.title));

    return filteredTodos;
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
    fetchTodos(currentPage);
  }, [currentPage]);

  return {
    todos,
    currentPage,
    totalPages,
    handlePageChange,
    setTodos,
    fetchTodos,
    fetchSearch,
    handleCreate,
    handleCompleted,
    handleDelete,
    handleUpdate,
    isLoading,
    error,
  };
};

export default useTodos;

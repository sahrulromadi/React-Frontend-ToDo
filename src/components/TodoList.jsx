import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import useTodos from "@/hooks/use-todos";
import TodoForm from "./TodoForm";
import { SearchForm } from "./SearchForm";

const TodoList = () => {
  const { todos, setTodos, fetchTodos, handleCompleted, handleDelete } =
    useTodos();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Todo List</CardTitle>
            <CardDescription>Your daily tasks</CardDescription>
          </div>
          <div className="flex gap-2 items-center justify-center">
            {/* search form */}
            <SearchForm setTodos={setTodos} />
            <div className="ms-auto">
              <Button size="sm" onClick={() => setIsOpen(true)}>
                Create
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {todos && todos.length > 0 ? (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="p-4 bg-white rounded-lg shadow-md cursor-pointer"
                  onClick={() => {
                    setIsOpen(true);

                    // kirimkan todo nya
                    setSelectedTodo(todo);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {todo.completed ? (
                        <CheckCircle
                          className="w-5 h-5 text-green-500 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();

                            handleCompleted(
                              todo.id,
                              todo.title,
                              todo.completed
                            );
                          }}
                        />
                      ) : (
                        <Circle
                          className="w-5 h-5 text-gray-400 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();

                            handleCompleted(
                              todo.id,
                              todo.title,
                              todo.completed
                            );
                          }}
                        />
                      )}
                      <p className="text-gray-700">{todo.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Last updated: {new Date(todo.updated_at).toLocaleString()}
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();

                        handleDelete(todo.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No todos found.</p>
          )}
        </CardContent>
      </Card>

      {/* panggil component */}
      <TodoForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        fetchTodos={fetchTodos}
        selectedTodo={selectedTodo}
      />
    </div>
  );
};

export default TodoList;

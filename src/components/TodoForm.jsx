import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useTodos from "@/hooks/use-todos";

const TodoForm = ({ isOpen, setIsOpen, fetchTodos, selectedTodo }) => {
  const [title, setTitle] = useState("");
  const { handleCreate, handleUpdate } = useTodos();

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
    } else {
      setTitle("");
    }
  }, [selectedTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // jalanin api
    if (selectedTodo) {
      // update
      await handleUpdate(
        selectedTodo.id,
        title,
        Boolean(selectedTodo.completed)
      );
    } else {
      // create
      await handleCreate(title, false);
    }

    // tutup modal
    setIsOpen(false);

    // update ui
    fetchTodos();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{selectedTodo ? "Edit Todo" : "Add Todo"}</DialogTitle>
            <DialogDescription>
              {selectedTodo
                ? "Edit your todo here. Click save when finished."
                : "Add your todo here. Click save when finished."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{selectedTodo ? "Update" : "Save"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoForm;

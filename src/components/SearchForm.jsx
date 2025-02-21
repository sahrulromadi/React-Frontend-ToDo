import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import useTodos from "@/hooks/use-todos";

export const SearchForm = ({ setTodos }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchTodos, fetchSearch } = useTodos();

  // pencarian otomatis
  useEffect(() => {
    const searchTodos = async () => {
      if (!searchQuery.trim()) {
        // tampilkan semua data
        const results = await fetchTodos();

        setTodos(results);
      } else {
        const results = await fetchSearch(searchQuery);

        setTodos(results);
      }
    };

    searchTodos();
  }, [searchQuery]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Search todos..."
        className="pl-10"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

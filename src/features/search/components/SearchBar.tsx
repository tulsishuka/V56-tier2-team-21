import type { SearchBarProps } from "@/types/api";
import React from "react";

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchTermChange,
  onSubmit,
  isLoading = false,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 w-full items-center mx-auto flex-col md:flex-row"
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="border border-gray rounded-md px-4 py-2 text-gray-700 flex flex-grow w-9/10"
      />
    </form>
  );
};
export default SearchBar;

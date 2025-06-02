import type { SearchBarProps } from "@/types/api";
import React from "react";
import { FcSearch } from "react-icons/fc";
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
      <div className="relative flex flex-grow w-9/10">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FcSearch />
        </span>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="border border-gray rounded-md px-4 py-2 text-gray-700 pl-10 w-full"
        />
      </div>
    </form>
  );
};
export default SearchBar;

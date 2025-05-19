import React from "react";
interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSubmit: ()=>void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchTermChange,
  onSubmit
}) => {
  return (
    <div className="flex gap-2 w-full items-center mx-auto">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="border border-gray rounded-md px-4 py-2 text-gray-700 flex flex-grow"
      />
      <button onClick={onSubmit} className="px-6 py-2 bg-blue-300 text-white rounded-lg">
        Submit
      </button>
    </div>
  );
};
export default SearchBar;

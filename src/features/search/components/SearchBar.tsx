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
    <div className="flex gap-2 w-full items-center mx-auto flex-col md:flex-row">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="border border-gray rounded-md px-4 py-2 text-gray-700 flex flex-grow w-9/10"
      />
      <button onClick={onSubmit} className="px-6 py-2 bg-blue-300 text-white rounded-lg ">
        Submit
      </button>
    </div>
  );
};
export default SearchBar;

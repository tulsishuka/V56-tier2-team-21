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
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />
      <button onClick={onSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
};
export default SearchBar;

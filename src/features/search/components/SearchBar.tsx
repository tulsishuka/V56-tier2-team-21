import React from "react";
interface SearchBarProps{
    searchTerm: string,
    onSearchTermChange: ((term: string)=> void)
}

const SearchBar: React.FC<SearchBarProps> = ({searchTerm, onSearchTermChange}) => {

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />
    </div>
  );
};
export default SearchBar;

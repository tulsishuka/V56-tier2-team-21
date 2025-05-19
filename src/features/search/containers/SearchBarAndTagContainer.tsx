import React from "react";
import SearchBar from "../components/SearchBar";
import TagSelector from "../components/TagSelector";

export const SearchBarAndTagContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([
    "React",
    "TypeScript",
    "JavaScript",
    "Java",
  ]);
  const handleSearchSubmit = () => {
    console.log("Submitted search term:", searchTerm);
  };

  const handleTagClick = (tag: string) => {
    console.log("Tag Clicked ", tag);
  };

  return (
    <div className="mx-auto max-w-2xl my-48">
      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSubmit={handleSearchSubmit}
      />
      <div className="mt-6">
        <TagSelector tags={tags} tagClick={handleTagClick} />
      </div>
    </div>
  );
};

import React from "react";
interface TagsProps {
  tags: string[];
  tagClick: (tag: string) => void;
}
const TagSelector: React.FC<TagsProps> = ({ tags, tagClick }) => {
  const tagElements = tags.map((tag) => {
    return (
      <button key={tag} onClick={() => tagClick(tag)}
      className="px-3 py-1 text-sm rounded-full bg-gray-200 hover:bg-gray-300">
        #{tag}
      </button>
    );
  });
  return <div className="flex gap-4 align-baseline">{tagElements}</div>;
};
export default TagSelector;

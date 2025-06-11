import React from "react";
import type { TagSelectorProps } from "./../../../types/api";

const TagSelector: React.FC<TagSelectorProps> = ({ 
  tags, 
  selectedTags = [], 
  onTagClick, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="flex gap-2 flex-wrap">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="px-3 py-1 rounded-full bg-gray-200 animate-pulse h-6 w-16" />
        ))}
      </div>
    );
  }

  const tagElements = tags.map((tag) => {
    const isSelected = selectedTags.includes(tag.id);
    
    return (
      <button 
        key={tag.id} 
        onClick={() => onTagClick(tag.id)}
        className={`px-3 py-1 text-sm rounded-full transition-colors ${
          isSelected 
            ? 'bg-blue-500 text-white hover:bg-blue-600' 
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
      >
        #{tag.tag}
      </button>
    );
  });

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Filter by tags:</h3>
      <div className="flex gap-2 flex-wrap justify-center">{tagElements}</div>
    </div>
  );
};

export default TagSelector;
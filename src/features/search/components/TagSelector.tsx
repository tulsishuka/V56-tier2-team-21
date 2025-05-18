import React from "react";
interface TagsProps {
    tags: string[];
    tagClick: (tag: string)=>void;
}
export const TagSelector: React.FC<TagsProps> = ({tags, tagClick}) => {


  const tagElements = tags.map((tag) => {
    return <button key={tag} onClick={()=>tagClick(tag)}>{tag}</button>;
  });
  return (
    <div className="flex gap-4 flex-wrap">
        {tagElements}
    </div>
  )
};

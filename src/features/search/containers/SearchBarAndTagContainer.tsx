import React, { useCallback } from "react";
import SearchBar from "../components/SearchBar";
import TagSelector from "../components/TagSelector";

import { useTags } from "@/hooks/useTags";
import { useResources } from "@/hooks/useResources";
import ResourceList from "../components/ResourceList";

export const SearchBarAndTagContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const { tags, isLoading: tagsLoading, error: tagsError } = useTags();

  const {
    filteredResources,
    isLoading: resourcesLoading,
    error: resourcesError,
    searchResources,
  } = useResources();

  const handleSearchSubmit = () => {
    console.log("Submitted search term:", searchTerm);
  };

  const handleTagClick = useCallback(
    (tagId: string) => {
      setSelectedTags((prev) => {
        const newTags = prev.includes(tagId)
          ? prev.filter((id) => id !== tagId)
          : [...prev, tagId];
        searchResources(searchTerm, newTags);
        return newTags;
      });
    },
    [searchTerm, searchResources]
  );

  return (
    <div className="mx-auto max-w-2xl my-48">
      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSubmit={handleSearchSubmit}
      />
      <div className="mt-6">
        <TagSelector
          tags={tags}
          selectedTags={selectedTags}
          onTagClick={handleTagClick}
          isLoading={tagsLoading}
        />

        <div>
          <ResourceList
            resources={filteredResources}
            isLoading={resourcesLoading}
            error={resourcesError}
          />
        </div>
      </div>
    </div>
  );
};

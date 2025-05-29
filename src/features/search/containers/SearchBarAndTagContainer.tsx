import React, { useCallback, useEffect } from "react";
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

  const handleSearchSubmit = useCallback(() => {
    searchResources(searchTerm, selectedTags);
  }, [searchTerm, selectedTags, searchResources]);

  const handleSearchTermChange = useCallback((term: string) => {
    setSearchTerm(term);
  },[]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchResources(searchTerm, selectedTags);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedTags, searchResources]);


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
        onSearchTermChange={handleSearchTermChange}
        onSubmit={handleSearchSubmit}
        isLoading={resourcesLoading}
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

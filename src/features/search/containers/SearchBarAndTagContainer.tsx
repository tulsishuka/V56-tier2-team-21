import React, { useCallback, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import TagSelector from "../components/TagSelector";

import { useTags } from "@/hooks/useTags";
import { useResources } from "@/hooks/useResources";
import ResourceList from "../components/ResourceList";
import Pagination from "../components/Pagination.tsx";
import { PreviewCard } from '../../../components/PreviewCard.tsx';
import { AnimatedGradientText } from '../../../components/magicui/animated-gradient-text.tsx';

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

  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage, setPostPerPage] = React.useState(10);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentResources = filteredResources.slice(firstPostIndex, lastPostIndex);
  const handleSearchSubmit = useCallback(() => {
    searchResources(searchTerm, selectedTags);
  }, [searchTerm, selectedTags, searchResources]);

  const handleSearchTermChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

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

  // Calculate total pages
  const totalPages = Math.ceil(filteredResources.length / postsPerPage);

  return (
    <div className="mx-auto w-full my-48">
      <div className="text-center mb-8 md:max-w-2xl max-w-xl flex flex-col mx-auto">
        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={handleSearchTermChange}
          onSubmit={handleSearchSubmit}
          isLoading={resourcesLoading}
        />
      </div>
      {resourcesLoading ?
        <div className="text-center mb-8 md:max-w-4xl max-w-xl flex flex-col mx-auto">
          <AnimatedGradientText className='text-2xl mb-6'>Loading the latest information for you!</AnimatedGradientText>
          <PreviewCard />
        </div>
        : <>
          <div className="text-center mb-8 md:max-w-2xl max-w-xl flex flex-col mx-auto mt-6">
            <TagSelector
              tags={tags}
              selectedTags={selectedTags}
              onTagClick={handleTagClick}
            // isLoading={tagsLoading}
            />
          </div>
          <div className="max-w-6xl mx-auto items-center">
            <ResourceList
              resources={currentResources}
              isLoading={resourcesLoading}
              error={resourcesError}
              searchTerm={searchTerm}
              selectedTags={selectedTags}
            />
          </div>
        </>}
      <Pagination
        totalPages={totalPages}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

import { useState, useMemo, useCallback } from "react";
import type { Resources } from "@/types/api";
import type { UseResourcesReturn } from "@/types/state";
import { useApi } from "./useApi";

export function useResources(): UseResourcesReturn {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

    const { data: resources, isLoading, error } = useApi<Resources[]>('/resources');

    const filteredResources = useMemo(() => {
        if (!resources) return [];

        return resources.filter(resource => {
            const matchesSearch = searchTerm === '' || resource.name.toLowerCase().includes(searchTerm.toLowerCase()) || resource.author.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesTags = selectedTagIds.length === 0 || selectedTagIds.some(tagId => resource.appliedTags.includes(tagId));

            return matchesSearch && matchesTags;
        })
    }, [resources, searchTerm, selectedTagIds]);



    const searchResources = useCallback((term: string, tagIds: string[]) => {
        setSearchTerm(term);
        setSelectedTagIds(tagIds);
    }, []);

    return {
        resources: resources || [],
        filteredResources,
        isLoading,
        error,
        searchResources
    }

}
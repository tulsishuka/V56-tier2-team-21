import type { Tag, Resources } from "./api";
export interface AppState {
    searchTerm: string;
    selectedTags: string[];
    tags: Tag[];
    resources: Resources[];
    filteredResources: Resources[];
    isLoading: boolean;
    error: string|null;
}


export interface UseResourcesReturn{
    resources: Resources[];
    filteredResources: Resources[];
    isLoading: boolean;
    error: string | null;
    searchResources: (term: string, tagIds: string[]) => void;
}

export interface UseTagsReturn{
    tags: Tag[];
    isLoading: boolean;
    error: string | null;
}
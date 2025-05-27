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



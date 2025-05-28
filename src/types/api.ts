export interface Tag{
    tag: string;
    id: string;
}

export interface Resources{
    author: string;
    name: string;
    appliedTags: string[];
    url:string;
    createdAt: string;
    id: string;
}

export interface SearchBarProps{
    searchTerm: string;
    onSearchTermChange: (term: string) => void;
    onSubmit: () => void;
    isLoading?: boolean;
}

export interface TagSelectorProps{
    tags: Tag[];
    selectedTags: string[];
    onTagClick: (tagId: string) => void;
    isLoading?: boolean;
}

export interface ResourcesListProps{
    resources: Resources[];
    isLoading?: boolean;
    error?:string|null;

}
import type { UseTagsReturn } from '@/types/state';
import type { Tag } from '@/types/api';
import { useApi } from './useApi';

export function useTags(): UseTagsReturn {
        const {data: tags, isLoading, error} = useApi<Tag[]>('/tags');

        return {
            tags: tags || [],
            isLoading,
            error
        };
}
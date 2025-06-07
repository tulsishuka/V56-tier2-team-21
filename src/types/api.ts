export interface Tag {
    tag: string;
    id: string;
}

export interface Resources {
    author: string;
    name: string;
    appliedTags: string[];
    url: string;
    createdAt: string;
    id: string;
}

export interface SearchBarProps {
    searchTerm: string;
    onSearchTermChange: (term: string) => void;
    onSubmit: () => void;
    isLoading?: boolean;
}

export interface TagSelectorProps {
    tags: Tag[];
    selectedTags: string[];
    onTagClick: (tagId: string) => void;
    isLoading?: boolean;
}

export interface ResourcesListProps {
    resources: Resources[];
    isLoading?: boolean;
    error?: string | null;
    searchTerm: string;
    selectedTags: string[];
}


export interface PaginationProps {
    totalPages: number;
    postsPerPage: number;
    setCurrentPage: (page: number) => void;
    currentPage: number;
}

export interface GithubUser  {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  notification_email: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  };
};
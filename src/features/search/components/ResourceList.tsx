import type { ResourcesListProps } from "@/types/api";
import React from "react";

const ResourceList: React.FC<ResourcesListProps> = ({
  resources,
  isLoading = false,
  error = null,
}) => {
  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 mb-2">Error Loading Resources</div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="border rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="text-gray-400 text-4xl mb-4">🔍</div>
        <div className="text-lg font-medium text-gray-700 mb-2">
          No Resources Found
        </div>
        <p className="text-gray-500">
          Try adjusting your search or selected tags
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Found {resources.length} Resources{resources.length === 1 ? "" : "s"}
      </h2>
      {resources.map((resource) => (
        <article
          key={resource.id}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="font-medium text-lg mb-2">
            <a
              href={resource.url}
              target="_blank"
              className="text-blue-600 hover:text-blue-800 hover:underline "
            >
              {resource.name}
            </a>
          </h3>
          <div className="text-sm text-gray-600 mb-2">
            By: <span className="font-medium">{resource.author}</span>
          </div>
          <div className="text-xs text-gray">
            Added: {new Date(resource.createdAt).toLocaleString()}
          </div>
        </article>
      ))}
    </div>
  );
};

export default ResourceList;

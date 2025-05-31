import React from "react";
import type { PaginationProps } from "@/types/api";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  if (totalPages <= 0) return null;

  const getVisiblePages = (): (number | string)[] => {
    const maxVisible = 5;
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center items-center mt-4 gap-2 mb-24">
      <button
        onClick={() => handlePageClick(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        aria-label="Previous page"
      >
        <FiChevronLeft />
      </button>

      <div className="pagination flex space-x-2">
        {getVisiblePages().map((page, i) =>
          typeof page === "number" ? (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ) : (
            <span key={`ellipsis-${i}`} className="px-3 py-1">
              ...
            </span>
          )
        )}
      </div>

      <button
        onClick={() => handlePageClick(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        aria-label="Next page"
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;

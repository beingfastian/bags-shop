import Image from 'next/image';
import React from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ totalPages, currentPage, onPageChange }: Props) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Adjust based on preference
    const halfRange = Math.floor(maxPagesToShow / 2);

    // Adjust the start and end page numbers
    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);

    // Adjust for cases when there are not enough pages to fill the range
    if (currentPage <= halfRange) {
      endPage = Math.min(totalPages, maxPagesToShow);
    } else if (currentPage + halfRange >= totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    // Generate page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`rounded-md ${
          currentPage === 1 ? 'text-gray-400' : 'text-[#3734A9]'
        }`}
      >
        <Image
          src="/Arrow_Left.png"
          alt=""
          width={20}
          height={20}
          unoptimized
          className="cursor-pointer mr-2"
        />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 rounded-md ${
            page === currentPage
              ? 'bg-[#3734A9] text-white'
              : 'text-[#3734A9] hover:bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Ellipsis if there are more pages */}
      {currentPage + 2 < totalPages && (
        <>
          <span className="text-gray-500">...</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-8 h-8 rounded-md text-[#3734A9] hover:bg-gray-200"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`rounded-md ${
          currentPage === totalPages ? 'text-gray-400' : 'text-indigo-500'
        }`}
      >
        <Image
          src="/Arrow_Right.png"
          alt=""
          width={20}
          height={20}
          unoptimized
          className="cursor-pointer ml-2"
        />
      </button>
    </div>
  );
}

export default Pagination;

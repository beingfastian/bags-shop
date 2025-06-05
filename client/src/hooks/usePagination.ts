import { useState } from 'react';

const usePagination = (initialPage = 1, initialPageSize = 12) => {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Function to handle page change
  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  // Function to handle page size change
  const changePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  return {
    page,
    pageSize,
    setPage: changePage,
    setPageSize: changePageSize,
  };
};

export default usePagination;

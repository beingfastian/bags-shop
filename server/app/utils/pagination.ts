type Params = {
  page?: number;
  pageSize?: number;
};

type Pagination = {
  limit: number;
  offset: number;
};

export const getPagination = ({
  page = 1,
  pageSize = 10,
}: Params): Pagination => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  return { limit, offset };
};

type Metadata = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export const getPaginationMetadata = (
  { page = 1, pageSize = 10 }: Params,
  totalItems = 0
): Metadata => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = Math.min(page, totalPages);

  return {
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
};

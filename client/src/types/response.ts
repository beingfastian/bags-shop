export interface Response<T> extends PaginationResponse {
  data: T[];
}

export interface PaginationResponse {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export type ResponseData<T> = {
  data: T;
};

export type Message = {
  success: any;
  message: string;
};

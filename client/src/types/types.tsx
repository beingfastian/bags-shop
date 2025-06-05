// types/types.ts
export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FilterCategory {
  title: string;
  type: 'checkbox' | 'radio' | 'range';
  options: FilterOption[];
}

export interface Response<T> {
  data: T;
}

export interface Pagination {
  page?: number;
  pageSize?: number;
}

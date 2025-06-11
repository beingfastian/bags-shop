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

// NEW HERO SECTION INTERFACES
export interface HeroImage {
  id: number;
  name?: string;
  type: string;
  image: string;
  title?: string;
  subtitle?: string;
  button_text?: string;
  button_link?: string;
  is_active: boolean;
  sort_order: number;
  createdAt: string;
  updatedAt: string;
}

export interface HeroImageCreatePayload {
  name?: string;
  image: string;
  type?: string;
  title?: string;
  subtitle?: string;
  button_text?: string;
  button_link?: string;
  is_active?: boolean;
  sort_order?: number;
}

export interface HeroImageUpdatePayload {
  name?: string;
  image?: string;
  title?: string;
  subtitle?: string;
  button_text?: string;
  button_link?: string;
  is_active?: boolean;
  sort_order?: number;
}
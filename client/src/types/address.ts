import { Pagination } from './types';

export interface IAddress {
  id: string; // UUID
  user_id: string | null; // Nullable UUID referencing the User model
  street_address: string; // Required
  address_line2?: string; // Optional
  city: string; // Required
  state: string; // Required
  postal_code?: string; // Optional
  country: string; // Required
  phone: string; // Required
  createdAt?: Date; // Optional, managed by Sequelize
  updatedAt?: Date; // Optional, managed by Sequelize
}

export interface ICreateAddress {
  street_address: string; // Required
  address_line2?: string; // Optional
  city: string; // Required
  state: string; // Required
  postal_code?: string; // Optional
  country: string; // Required
  phone: string; // Required
}

export interface Params extends Pagination {
  id?: string;
}

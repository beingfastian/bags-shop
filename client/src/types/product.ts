import { ReactNode } from 'react';
import { Pagination } from './types';
import { Category } from './category';

export interface Product {
  Product: any;
  color: ReactNode;
  image: string | undefined;
  product_id: any;
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  discount: number;
  gender: string;
  stock: number;
  Variants: Variant[];
  Category?: Category;
  createdAt: string;
  updatedAt: string;
  discounted_price?: number; // Add this new field

}

export interface Variant {
  comportment:string;
  material: string;
  comfortment: string;
  // name: ReactNode;
  id: string;
  color: string | null;
  size: string | null;
  stock: number | null;
  price: number | null;
  discount : number ;
  image: string;
  Product: Product | null;
}

export interface VariantSchema {
  id?: string;
  color: string | null;
  size: string | null;
  stock: number | null;
  price: number | null;
  image: File | string;
  discount : number;
}

export interface ProductSchema {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  gender: string;
  discount: number;
  Variants: VariantSchema[];
  tags: string[];
}
export interface updateProductSchema {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  gender?: string;
  discount?: number;
  tags?: string[];
}

export type ProductsResponse = Product[];

export interface Params extends Pagination {
  category_id?: string;
  max?: number;
  min?: number;
  size?: number;
  gender?: string[];
  categories?: string[];
  search?: string;
  Order?: string;
  OrderBy?: string;
}

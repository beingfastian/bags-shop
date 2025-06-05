import axios from '@/lib/axios';
import {
  Params,
  Product,
  ProductSchema,
  updateProductSchema,
} from '@/types/product';
import { Message, Response } from '@/types/response';
import { uploadOne } from '../uploadService';

export const getAllProducts = async ({
  page,
  pageSize,
  categories,
  search,
  size,
  gender,
  max,
  min,
  Order,
  OrderBy,
}: Params): Promise<Response<Product>> => {
  const response = await axios.get<Response<Product>>('/product', {
    params: {
      ...(page ? { page } : {}),
      ...(pageSize ? { pageSize } : {}),
      ...(categories?.length ? { categories: categories.join(',') } : {}),
      ...(search ? { search } : {}),
      ...(size ? { size } : {}),
      ...(gender?.length ? { gender: gender.join(',') } : {}),
      ...(min ? { minPrice: min } : {}),
      ...(max ? { maxPrice: max } : {}),
      ...(Order ? { sortOrder: OrderBy } : {}),
      ...(OrderBy ? { sortBy: Order } : {}),
    },
  });
  return response.data;
};

export const getSingleProduct = async (productId: string): Promise<Product> => {
  const response = await axios.get<Product>(`/product/${productId}`);
  return response.data;
};

export const getDeleteProduct = async (
  productId: string | string[]
): Promise<Message> => {
  if (Array.isArray(productId)) {
    await Promise.all(
      productId.map((id) => axios.delete<Message>(`/product/${id}`))
    );
    return { success: true, message: 'Products deleted successfully' };
  } else {
    await axios.delete<Message>(`/product/${productId}`);
    return { success: true, message: 'Product deleted successfully' };
  }
};

export const createProduct = async ({
  Variants,
  description,
  name,
  stock,
  discount,
  price,
  category,
  tags,
  gender,
}: ProductSchema): Promise<Product> => {
  const variants = await Promise.all(
    Variants?.map(async (variant) => {
      const data = await uploadOne({ file: variant?.image as any });
      return {
        ...variant,
        image: data?.data,
      };
    })
  );
  const response = await axios.post<Product>('/product', {
    variants,
    description,
    name,
    stock: parseInt(stock.toString() || '0'),
    discount,
    price,
    category_id: category,
    tags,
    gender,
  });
  return response.data;
};
export const updateProduct = async ({
  id,
  description,
  name,
  stock,
  discount,
  price,
  category,
  tags,
  gender,
}: updateProductSchema): Promise<Message> => {
  const response = await axios.put<Message>('/product/' + id, {
    description,
    name,
    stock: parseInt(stock?.toString() || '0'),
    discount,
    price,
    category_id: category,
    tags,
    gender,
  });
  return response.data;
};

import { Category } from '@/types/category';
import axios from '@/lib/axios';
import { Response } from '@/types/types';

export const getAllCategory = async (): Promise<Category[]> => {
  const response = await axios.get<Response<Category[]>>('/category');
  return response.data?.data || [];
};

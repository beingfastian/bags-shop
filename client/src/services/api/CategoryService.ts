import axios from '@/lib/axios'; // Import the axios instance
import { categorySchema } from '@/types/category'; // Adjust the import path based on your file structure
import { uploadOne } from '../uploadService';

// Fetch all categories
export const getAllCategories = async () => {
  const response = await axios.get('/category'); // Use the axios instance
  return response.data;
};

export const DeleteCategory = async (id: string) => {
  const response = await axios.delete(`/category/${id}`); // Use the axios instance
  return response.data;
};

// Fetch a single category by its ID
export const getSingleCategory = async (categoryId: string) => {
  const response = await axios.get(`/category/${categoryId}`); // Use the axios instance
  return response.data;
};

export const createCategory = async ({ icon, name }: categorySchema) => {
  const data = await uploadOne({ file: icon });
  console.log(data, 'icon');
  const response = await axios.post('/category', { name, icon: data?.data });
  return response.data;
};

export const editCategory = async ({ categoryId, icon, name }: any) => {
  let finalIcon;

  if (typeof icon === 'string') {
    finalIcon = icon;
  } else {
    const uploadResponse = await uploadOne({ file: icon });
    finalIcon = uploadResponse?.data;
  }

  const response = await axios.put(`/category/${categoryId}`, {
    name,
    icon: finalIcon,
  });

  return response.data;
};

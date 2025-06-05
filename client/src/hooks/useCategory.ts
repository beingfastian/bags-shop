import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createCategory,
  DeleteCategory,
  editCategory,
  getAllCategories,
  getSingleCategory,
} from '@/services/api/CategoryService';
import { categorySchema } from '@/types/category'; // Adjust the import based on your file structure

// Hook to get all categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });
};

// Hook to get a single category by ID
export const useSingleCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getSingleCategory(categoryId),
    enabled: !!categoryId, // Only fetch if categoryId is provided
  });
};

// Hook to create a new category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: categorySchema) => createCategory(data),
    onSuccess: () => {
      // Invalidate the 'categories' query to refetch the list after a successful creation
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DeleteCategory(id), // Replace `string` with the correct ID type
    onSuccess: () => {
      // Invalidate the 'categories' query to refetch the list after a successful deletion
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
    onError: (error) => {
      console.error('Error deleting category:', error);
      // Optional: Add toast/notification to inform the user of the error
    },
  });
};

import { getAllCategory } from '@/services/api/category';
import { useQuery } from '@tanstack/react-query';

export const useCategory = () => {
  return useQuery({
    queryKey: ['category'],
    queryFn: getAllCategory,
  });
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      name,
      icon,
    }: {
      categoryId: string;
      name: string;
      icon?: File;
    }) => editCategory({ categoryId, name, icon }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      console.error('Failed to edit category:', error);
    },
  });
};

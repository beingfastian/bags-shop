import {
  createProduct,
  getAllProducts,
  getDeleteProduct,
  getSingleProduct,
  updateProduct,
} from '@/services/api/productService';
import { Params, ProductSchema, updateProductSchema } from '@/types/product';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useProducts = (
  {
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
    category_id,
  }: Params,
  { enabled = true }: any = {}
) => {
  return useQuery({
    queryKey: [
      'products',
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
      category_id,
    ],
    queryFn: () =>
      getAllProducts({
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
        category_id,
      }),
    staleTime: 5 * 60 * 1000,
    enabled,
  });
};

export const useSingleProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getSingleProduct(productId),
    enabled: !!productId,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string | string[]) => getDeleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductSchema) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      }); // Correct usage
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: updateProductSchema) => updateProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      }); // Correct usage
    },
  });
};

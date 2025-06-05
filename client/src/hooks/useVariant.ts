import {
  addVariant,
  getAllVariant,
  getDeleteVariant,
  getSingleVariant,
  updateVariant,
} from '@/services/api/variantService';
import { Variant } from '@/types/product';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useVariants = () => {
  return useQuery({
    queryKey: ['variant'],
    queryFn: getAllVariant,
  });
};

export const useSingleVariant = (variantId: string) => {
  return useQuery({
    queryKey: ['variant', variantId],
    queryFn: () => getSingleVariant(variantId),
    enabled: !!variantId,
  });
};

export const useDeleteVariant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variant: string[] | string) => getDeleteVariant(variant), // Pass variant IDs here

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
};

export const useUpdateVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Variant) => updateVariant(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['variant'],
      }); // Correct usage
    },
  });
};

export const useAddVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Variant) => addVariant(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['product'],
      }); // Correct usage
    },
  });
};

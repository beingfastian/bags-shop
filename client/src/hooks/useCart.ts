import {
  addToCart,
  deleteCartItem,
  getAllCartData,
  updateCartItemQuantity,
} from '@/services/api/cartService';
import { CartPayload } from '@/types/cart';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// export const useAddToCart = () => {
//   return useMutation({ mutationFn: addToCart });
// };


export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({ 
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });
};

export const useGetCart = () => {

  return useQuery({
    queryKey: ['cart'],
    queryFn: getAllCartData,
  });
};

export const useCartItemQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CartPayload) => updateCartItemQuantity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    },
  });
};

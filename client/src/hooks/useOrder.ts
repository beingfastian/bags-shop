import {
  changeOrderStatus,
  createOrder,
  getAllOrders,
  getOrdersByBuyer,
  getSingleOrder,
} from '@/services/api/orderService';
import { CreateOrder, Params } from '@/types/order';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useOrders = ({ page, pageSize, status, name }: Params) => {
  return useQuery({
    queryKey: ['orders', page, pageSize, status, name],
    queryFn: () => getAllOrders({ page, pageSize, status, name }),
    // queryFn: () => ({ page, pageSize }),
  });
};

export const useBuyerOrders = ({ page, pageSize, status, name }: Params) => {
  return useQuery({
    queryKey: ['orders', page, pageSize, status, name],
    queryFn: () => getOrdersByBuyer({ page, pageSize, status, name }),
    // queryFn: () => ({ page, pageSize }),
  });
};

// export const useOrders = () => {
//   return useQuery({
//     queryKey: ['orders'],
//     queryFn: getAllOrders
//   });
// };

export const useSingleOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getSingleOrder(orderId),
    enabled: !!orderId,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrder) => createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
    },
  });
};

export const useChangeOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      status,
      trackingId,
    }: {
      orderId: string;
      status: string;
      trackingId: string;
    }) => changeOrderStatus(orderId, status, trackingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'], exact: false });
      // to refetch all order query queryKey first orders key used
    },
    onError: (error) => {
      console.error('Failed to update order status:', error);
    },
  });
};

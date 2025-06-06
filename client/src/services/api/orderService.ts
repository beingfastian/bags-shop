import axios from '@/lib/axios';
import { CreateOrder, Order, OrderReponse, Params } from '@/types/order';
import { Response } from '@/types/response';

// export const getAllOrder = async ({
//   page,
//   pageSize,
// }: Params): Promise<Response<Product>> => {
//   const response = await axios.get<Response<Product>>('/product', {
//     params: {
//       page,
//       pageSize,
//     },
//   });
//   return response.data;
// };

// export const getSingleProduct = async (productId: string): Promise<Product> => {
//   const response = await axios.get<Product>(`/product/${productId}`);
//   return response.data;
// };

export const createOrder = async (data: CreateOrder): Promise<OrderReponse> => {
  const response = await axios.post<OrderReponse>('/buyer/order', data);
  return response.data;
};

export const changeOrderStatus = async (
  trackingId: string | null,
  orderId: string,
  status: string
): Promise<string> => {

  console.log("Status geting",status)
  const response = await axios.put(`/admin/order/${orderId}/status`, {
    status,
    trackingId,
  });
  return response.data;
};

export const getAllOrders = async ({
  status,
  page,
  pageSize,
  name,
}: Params): Promise<Response<Order>> => {
  console.log('status', status);
  const response = await axios.get('/admin/order', {
    params: {
      ...(page ? { page } : {}),
      ...(pageSize ? { pageSize } : {}),
      ...(status ? { status } : {}),
      ...(name ? { name } : {}),
    },
  });
  return response.data;
};
export const getTotalOrdersCount = async (): Promise<{ totalOrders: number; message: string }> => {
  try {
    // Use existing getAllOrders endpoint with minimal data
    const response = await getAllOrders({ page: 1, pageSize: 1 });
    return { 
      totalOrders: response.totalItems || response.total || 0, 
      message: 'Success' 
    };
  } catch (error) {
    console.error('Failed to fetch orders count:', error);
    throw error;
  }
};
console.log("getTotalOrdersCount",getTotalOrdersCount)
export const getOrdersByBuyer = async ({
  status,
  page,
  pageSize,
  name,
}: Params): Promise<Order[]> => {
  const response = await axios.get('/buyer/order', {
    params: {
      ...(page ? { page } : {}),
      ...(pageSize ? { pageSize } : {}),
      ...(status ? { status } : {}),
      ...(name ? { name } : {}),
    },
  });
  return response.data.data;
};

export const getSingleOrder = async (orderId: string): Promise<Order> => {
  const response = await axios.get(`/admin/order/${orderId}`);
  return response.data;
};

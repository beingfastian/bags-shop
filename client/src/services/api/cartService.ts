import axios from '@/lib/axios';
import { Cart, CartPayload, CartResponse } from '@/types/cart';
import { ResponseData } from '@/types/response';

export const addToCart = async (data: CartPayload): Promise<CartResponse> => {
  const response = await axios.post<CartResponse>('/cart', data);
  return response.data;
};

export const getAllCartData = async (): Promise<Cart> => {
  const response = await axios.get<ResponseData<Cart>>('/cart');
  return response?.data as any;
};

export const updateCartItemQuantity = async (
  data: CartPayload
): Promise<any> => {
  const response = await axios.put(`/cart`, data);
  return response.data;
};

export const deleteCartItem = async (id: string): Promise<Response> => {
  const response = await axios.delete(`/cart/${id}`);
  return response.data;
};

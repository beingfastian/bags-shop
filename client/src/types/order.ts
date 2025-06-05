import { Message } from './response';
import { Pagination } from './types';

export interface CreateOrder {
  address_id: string;
  payment_method: string;
  screenshot?:string | null
  coupon_code?: string | null;
}
// export interface Order {
//   id: string;
// }

interface OrderItem {
  variant_id: string;
  quantity: number;
  unit_price?: number;
  total_price?: number;
}

export interface Order {
  id: string;
  user_id: string;
  status: string;
  total_price: number;
  OrderItems: OrderItem[];
}

export interface Params extends Pagination {
  id?: string;
  status?: string;
  name?: string;
}

export interface OrderReponse extends Message {
  order: {
    payload?: any;
    payment?: any;
  };
}

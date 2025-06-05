import { Coupon } from './coupon';
import { Variant } from './product';

export interface CartPayload {
  variant_id: string;
  quantity: number;
}

export interface CartResponse {
  message: string;
}
export interface SignUpResponse {
  message: string;
}

export interface Cart {
  id: string;
  user_id: string;
  coupon_id?: string | null;
  status: 'active' | 'abandoned' | 'completed';
  items: CartItem[];
  coupon: Coupon | null;
discount: string | 0,
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cart_id: string;
  variant_id: string;
  quantity: number;
  price: number;
  total_price: number;
  Variant: Variant | null;
  cart: Cart | null;
  createdAt: string;
  updatedAt: string;
  discount :string;
}

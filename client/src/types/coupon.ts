export interface Coupon {
  expired: any;
  success: any;
  id: string;
  code: string;
  name: string;
  discount_value: number;
  is_percentage: boolean;
  start_date: string;
  end_date: string;
  couponType: string;
  usage_limit?: number;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface applyCoupon {
  code: string;
}
export interface CouponSchema {
  code: string;
  couponType: string;
  couponName: string;
  discountValue: number;
  is_percentage: boolean;
  start_date: string;
  end_date: string;
  usage_limit?: number;
}

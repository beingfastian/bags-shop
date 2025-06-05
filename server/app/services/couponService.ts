import { Coupon } from '../models/index.js';
import { AppError } from '../utils/appError.js';

export const validateCoupon = async (
  code: string,
  total_price: number,
  t: any
) => {
  const coupon = (await Coupon.findOne({
    where: { code },
    transaction: t,
  })) as any;

  if (!coupon) {
    throw new AppError('Invalid coupon code', 400);
  }

  if (new Date() > coupon.expiry_date) {
    throw new AppError('Coupon has expired', 400);
  }

  if (total_price < coupon.min_order_value) {
    throw new AppError(
      'Order value is below the minimum required for this coupon',
      400
    );
  }

  return coupon;
};

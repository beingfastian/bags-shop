import { Router } from 'express';
import {
  addCoupon,
  updateCoupon,
  deleteCoupon,
  getAllCoupons,
  getCouponById,
} from '../controllers/couponController.js';
import { validate } from '../middlewares/validate.js';
import { CouponSchema, CouponFilterSchema } from '../schemas/couponSchema.js';

const route = Router();

route.post('/', validate({ body: CouponSchema }) as any, addCoupon as any);
route.put('/:id', validate({ body: CouponSchema }) as any, updateCoupon as any);
route.get(
  '/',
  validate({ query: CouponFilterSchema }) as any,
  getAllCoupons as any
);
route.get('/:id', getCouponById as any);
route.delete('/:id', deleteCoupon as any);

export default route;

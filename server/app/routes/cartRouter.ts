import { Router } from 'express';
import {
  addItemController,
  updateQuantityController,
  deleteItemController,
  applyCouponController,
  getCartController,
} from '../controllers/cartController.js';
import { validate } from '../middlewares/validate.js';
import {
  AddItemSchema,
  UpdateQuantitySchema,
  DeleteItemSchema,
  ApplyCouponSchema,
} from '../schemas/cartSchema.js';

const router = Router();

router.post('/', validate({ body: AddItemSchema }) as any, addItemController);

router.put(
  '/',
  validate({ body: UpdateQuantitySchema }) as any,
  updateQuantityController
);

router.delete(
  '/:itemId',
  validate({ params: DeleteItemSchema }) as any,
  deleteItemController
);

router.post(
  '/coupon',
  validate({ body: ApplyCouponSchema }) as any,
  applyCouponController
);

router.get('/', getCartController);

export default router;

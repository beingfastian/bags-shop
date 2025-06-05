import { Router } from 'express';
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
  deleteOrderController,
  getOrdersByBuyerController,
  getBuyerController,
} from '../controllers/orderController.js';
import { validate, validateOrder } from '../middlewares/validate.js';
import {
  CreateOrderSchema,
  UpdateOrderStatusSchema,
  GetOrdersByBuyerSchema,
  UnauthorizedUserRequestSchema,
} from '../schemas/orderSchema.js';
import Auth from '../middlewares/authentication.js';

const route = Router();

route.get('/admin/order', getAllOrdersController);
route.get('/admin/order/:id', getOrderByIdController as any);
route.put(
  '/admin/order/:id/status',
  validate({ body: UpdateOrderStatusSchema }) as any,
  updateOrderStatusController
);
route.delete('/admin/order/:id', deleteOrderController);

route.post(
  '/buyer/order',
  Auth(null, false),
  validateOrder({
    authSchema: CreateOrderSchema,
    unauthSchema: UnauthorizedUserRequestSchema,
  }),
  createOrderController
);
route.get(
  '/buyer/order/:buyerId',
  validate({ params: GetOrdersByBuyerSchema }) as any,
  getOrdersByBuyerController
);
route.get('/buyer/order', Auth(null, true), getBuyerController);

export default route;

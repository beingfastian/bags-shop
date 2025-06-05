import { NextFunction, Request, Response } from 'express';
import {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
  deleteOrderService,
  getOrdersByBuyerService,
  createUnauthorizedOrderService,
} from '../services/orderService.js';

export const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = (req as any).payload;

    if (id) {
      const {
        address_id,
        payment_method,
        coupon_code,
        screenshot = '',
        transactionId = '',
      } = req.body;
      const order = await createOrderService(id, (req as any).payload, {
        address_id,
        payment_method,
        coupon_code,
        screenshot,
        transactionId,
      });
      res.status(201).json({
        message: 'Order created successfully',
        order,
      });
      return;
    }

    const {
      variants,
      Address,
      payment_method,
      coupon_code,
      screenshot,
      transactionId,
    } = req.body;
    const order = await createUnauthorizedOrderService({
      variants,
      Address,
      payment_method,
      coupon_code,
      screenshot,
      // transactionId = '',
    });

    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await getAllOrdersService(req.query);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const order = await getOrderByIdService(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("api hit")
    const { id } = req.params;
    const { status, trackingId } = req.body;
    const updatedOrder = await updateOrderStatusService(id, status, trackingId);
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await deleteOrderService(id);
    res.status(204).json({ message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getOrdersByBuyerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { buyerId } = req.params as any;
    const orders = await getOrdersByBuyerService(buyerId, req.query);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getBuyerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = (req as any).payload;
    const orders = await getOrdersByBuyerService(id, req.query);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

import { Request, Response } from 'express';
import {
  addItemToCart,
  updateCartItemQuantity,
  deleteCartItem,
  applyCoupon,
  getCart,
} from '../services/cartService.js';

export const addItemController = async (req: Request, res: Response) => {
  const { id } = (req as any).payload; // Extract from req.payload (JWT token payload)
  const { variant_id, quantity } = req.body;

  try {
    const cartItem = await addItemToCart(id, variant_id, quantity);
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateQuantityController = async (req: Request, res: Response) => {
  const { id } = (req as any).payload; // Extract from req.payload (JWT token payload)
  const { variant_id, quantity } = req.body;

  try {
    const updatedItem = await updateCartItemQuantity(id, variant_id, quantity);
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteItemController = async (req: Request, res: Response) => {
  const { id } = (req as any).payload; // Extract from req.payload (JWT token payload)
  const { itemId } = req.params;

  try {
    const response = await deleteCartItem(id, itemId);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const applyCouponController = async (req: Request, res: Response) => {
  const { id } = (req as any).payload;

  const { coupon_code } = req.body;

  try {
    const updatedCart = await applyCoupon(id, coupon_code);
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCartController = async (req: Request, res: Response) => {
  const { id } = (req as any).payload;

  try {
    const cart = await getCart(id);
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

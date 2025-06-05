import { z } from 'zod';

export const AddItemSchema = z.object({
  variant_id: z.string().uuid('Variant ID must be a valid UUID'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

export const UpdateQuantitySchema = z.object({
  // cart_id: z.string().uuid('Cart ID must be a valid UUID'),
  variant_id: z.string().uuid('Variant ID must be a valid UUID'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

export const DeleteItemSchema = z.object({
  itemId: z.string().uuid('Variant ID must be a valid UUID'),
});

export const ApplyCouponSchema = z.object({
  coupon_code: z.string().min(1, 'Coupon code is required'),
});

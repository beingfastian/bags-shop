import { z } from 'zod';
import { createAddressSchema } from './addressSchema.js';

export const CreateOrderSchema = z.object({
  address_id: z.string().uuid('Address ID must be a valid UUID'),
  screenshot: z.string().optional(),
  transactionId: z.string().optional(),
  payment_method: z.enum(
    ['cash_on_delivery', 'bank_transfer', 'easypaisa', 'raast', 'payfast'],
    {
      errorMap: () => ({ message: 'Invalid payment method' }),
    }
  ),
  coupon_code: z.string().optional(),
});

export const UpdateOrderStatusSchema = z.object({
  trackingId: z.string().optional(),
  status: z.enum(
    [
      'pending',
      'confirmed',
      'inprogress',
      'delivered',
      'ontheway',
      'cancelled',
    ],
    {
      errorMap: () => ({ message: 'Invalid order status' }),
    }
  ),
});

export const GetOrdersByBuyerSchema = z.object({
  buyerId: z.string().uuid('Buyer ID must be a valid UUID'),
});

export const VariantSchema = z.object({
  variant_id: z.string().min(1, 'Variant ID is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1').int(),
});

export const UnauthorizedUserRequestSchema = z.object({
  variants: z.array(VariantSchema).min(1, 'At least one variant is required'),
  Address: createAddressSchema,
  coupon_code: z.string().optional(),
  transactionId: z.string().optional(),
  payment_method: z.enum(
    ['cash_on_delivery', 'bank_transfer', 'easypaisa', 'raast', 'payfast'],
    {
      errorMap: () => ({ message: 'Invalid Payment Method' }),
    }
  ),
});

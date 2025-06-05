import { z } from 'zod';

export const CouponSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  name: z.string().min(1, 'name is required'),
  discount_value: z.number().min(0, 'Discount value must be a positive number'),
  is_percentage: z.boolean(),
  start_date: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid start date'),
  end_date: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), 'Invalid end date'),
  usage_limit: z
    .number()
    .int()
    .positive('Usage limit must be a positive integer')
    .optional(),
  status: z.enum(['active', 'inactive'], {
    errorMap: () => ({ message: 'Invalid status' }),
  }),
  type: z.enum(['price', 'delivery'], {
    errorMap: () => ({ message: 'Invalid type' }),
  }),
});

export const CouponFilterSchema = z.object({
  is_active: z.boolean().optional(),
  code: z.string().optional(),
});

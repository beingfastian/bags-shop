import { z } from 'zod';

export const createAddressSchema = z.object({
  street_address: z.string().min(1, { message: 'Street address is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  postal_code: z.string().optional(),
});

export const updateAddressSchema = z.object({
  street_address: z.string().min(1).optional(),
  city: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  phone: z.string().optional(),
  postal_code: z.string().optional(),
});

export const addressIdSchema = z.object({
  id: z.string().uuid({ message: 'Invalid address ID' }),
});

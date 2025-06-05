// app/schemas/createUser.schema.js

import { z } from 'zod';

export const register = z.object({
  displayName: z.string().min(1, 'user name is require'),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password should be at least 6 characters' }),
});

export const login = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export const changePassword = z.object({
  email: z.string().email(),
  currentPassword: z
    .string()
    .min(6, 'Old password must be at least 6 characters long'),
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters long'),
});

export const userId = z.object({
  userId: z.string().uuid(),
});

export const updateUserDetailsSchema = z.object({
  id: z.string().uuid({ message: 'Invalid or missing user ID' }).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  displayName: z.string().optional(),
  profile: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
});

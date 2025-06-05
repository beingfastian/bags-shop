import { z } from 'zod';

export const VariantSchema = z.object({
  color: z.string().optional(),
  image: z.string().min(1, 'Image is required'),
  size: z.string().optional(),
  price: z.number().min(0, 'Price must be a positive number').optional(),
  stock: z.number().min(0, 'Stock must be a positive number').optional(),
  discount: z.number().min(0, 'discount must be a positive number').optional(),
});

// export const ProductSchema = z.object({
//   name: z.string().min(1, 'Name is required'),
//   price: z.number().min(0, 'Price must be a positive number'),
//   description: z.string().optional(),
//   discount: z.number().min(0, 'Discount must be a positive number').optional(),
//   stock: z.number().min(0, 'Stock must be a positive number'),
//   category: z.string().min(1, 'Category is required'),
//   tags: z.array(z.string()).optional(),
//   variants: z.array(VariantSchema).min(1, 'At least one variant is required'),
// });

export const ProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  description: z.string().optional(),
  gender: z.string().optional(),
  discount: z.number().min(0, 'Discount must be a positive number').optional(),
  stock: z.number().min(0, 'Stock must be a positive number'),
  category_id: z.string().uuid('Category ID must be a valid UUID'),
  tags: z.array(z.string()).optional(),
  variants: z.array(VariantSchema).min(1, 'At least one variant is required'),
});
export const UpdateProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  description: z.string().optional(),
  gender: z.string().optional(),
  discount: z.number().min(0, 'Discount must be a positive number').optional(),
  stock: z.number().min(0, 'Stock must be a positive number'),
  category_id: z.string().uuid('Category ID must be a valid UUID'),
  tags: z.array(z.string()).optional(),
});

export const ProductFilterSchema = z.object({
  size: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  category_id: z.string().optional(),
  search: z.string().optional(),
});

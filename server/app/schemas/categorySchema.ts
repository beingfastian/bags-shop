// import { z } from 'zod';
// export const addCategory = z.object({
//   name: z.string().min(1, 'name is required'),
//   icon: z.string().min(1, 'icon is required'),
// });

// export const deleteCategory = z.object({
//   categoryId: z.string().min(1, 'category is required'),
// });

import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  icon: z.string().optional(), // Optionally, can be an URL or a file path
});

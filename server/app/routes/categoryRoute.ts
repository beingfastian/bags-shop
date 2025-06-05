// import { Router, NextFunction } from 'express';
// import {
//   addCategory as addCategoryScheam,
//   deleteCategory as deleteCategorySchema,
// } from '../schemas/categorySchema.js';
// import {
//   addCategory,
//   getAllCategory,
//   deleteCategory,
// } from '../controllers/categoryController.js';
// import { validate } from '../middlewares/validate.js';
// import { upload } from '../utils/multerConfig.js';
// const route = Router();
// route.post('/', upload.any() as any, addCategory);
// route.get('/', getAllCategory);
// route.delete('/', validate({ body:deleteCategorySchema}) as any, deleteCategory);

// export default route;

import { Router } from 'express';
import {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
} from '../controllers/categoryController.js';
import { validate } from '../middlewares/validate.js';
import { CategorySchema } from '../schemas/categorySchema.js';

const route = Router();

// Route to add a new category
route.post('/', validate({ body: CategorySchema }) as any, addCategory);

// Route to update a category
route.put('/:id', validate({ body: CategorySchema }) as any, updateCategory);

// Route to get all categories
route.get('/', getAllCategory);

// Route to get a category by ID
route.get('/:id', getCategoryById);

// Route to delete a category
route.delete('/:id', deleteCategory);

export default route;

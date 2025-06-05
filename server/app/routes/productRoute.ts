import { Router } from 'express';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
} from '../controllers/productController.js';
import { validate } from '../middlewares/validate.js';
import {
  ProductSchema,
  ProductFilterSchema,
  UpdateProductSchema,
} from '../schemas/productSchema.js';

const route = Router();

route.post('/', validate({ body: ProductSchema }) as any, addProduct);
route.put(
  '/:id',
  validate({ body: UpdateProductSchema }) as any,
  updateProduct
);
route.get('/', validate({ query: ProductFilterSchema }) as any, getAllProduct);
route.get('/:id', getProductById);
route.delete('/:id', deleteProduct);

export default route;

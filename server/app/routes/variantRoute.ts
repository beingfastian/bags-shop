import { Router } from 'express';
import {
  getAllVariant,
  deleteVariant,
  getVariantById,
  UpdateVariant,
  addVariant,
} from '../controllers/variantController.js';
import { validate } from '../middlewares/validate.js';
import { ProductFilterSchema } from '../schemas/productSchema.js';

const route = Router();

route.get('/', validate({ query: ProductFilterSchema }) as any, getAllVariant);
route.get('/:id', getVariantById);
route.delete('/:id', deleteVariant);
route.put('/:id', UpdateVariant);
route.post('/', addVariant);

export default route;

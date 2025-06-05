import { Router } from 'express';
import * as addressController from '../controllers/addressController.js';
import Auth from '../middlewares/authentication.js';
import { validate } from '../middlewares/validate.js';
import {
  addressIdSchema,
  createAddressSchema,
  updateAddressSchema,
} from '../schemas/addressSchema.js';

const router = Router();

// Get all addresses for the logged-in user
router.get('/', Auth(), addressController.getAllAddresses);

// Get a specific address by ID
router.get(
  '/:id',
  Auth(),
  validate({ params: addressIdSchema }), // Validate the ID parameter
  addressController.getAddress
);

// Create a new address
router.post(
  '/',
  Auth(),
  validate({ body: createAddressSchema }), // Validate the body
  addressController.createAddress
);

// Update an existing address
router.put(
  '/:id',
  Auth(),
  validate({ params: addressIdSchema, body: updateAddressSchema }), // Validate both body and params
  addressController.updateAddress
);

// Delete an address
router.delete(
  '/:id',
  Auth(),
  validate({ params: addressIdSchema }), // Validate the ID parameter
  addressController.deleteAddress
);

export default router;

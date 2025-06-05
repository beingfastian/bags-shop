import { Router } from 'express';
import {
  register,
  login,
  changePassword,
  getAllBuyer,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { validate } from '../middlewares/validate.js';
import {
  changePassword as changePasswordSchema,
  login as loginSchema,
  register as registerSchema,
  updateUserDetailsSchema,
  userId,
} from '../schemas/userSchema.js';
import RoleBasedMiddleWare from '../middlewares/authentication.js';
import Auth from '../middlewares/authentication.js';

const route = Router();
route.post(
  '/register',
  validate({ body: registerSchema }) as any,
  register as any
);
route.post('/login', validate({ body: loginSchema }) as any, login as any);

route.put(
  '/',
  validate({ body: updateUserDetailsSchema }) as any,
  Auth(null, true),
  updateUser as any
);

route.post(
  '/',
  validate({ body: changePasswordSchema }) as any,
  changePassword as any
);
route.get('/', RoleBasedMiddleWare('admin'), getAllBuyer as any);

route.get('/:id', getUserById);
export default route;

import { Router } from 'express';
import {
  changePasswordController,
  forgotPasswordController,
  googleAuth,
  verifyOtpController,
} from '../controllers/authController.js';
import {
  changePasswordSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
} from '../schemas/authSchemas.js';
import { validate } from '../middlewares/validate.js';

const router = Router();
router.post('/google', googleAuth);

router.post(
  '/forgot-password',
  validate({ body: forgotPasswordSchema }),
  forgotPasswordController
);

router.post(
  '/verify-otp',
  validate({ body: verifyOtpSchema }),
  verifyOtpController
);

router.post(
  '/reset-password',
  validate({ body: changePasswordSchema }),
  changePasswordController
);

export default router;

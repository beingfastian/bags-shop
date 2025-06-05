import { Router } from 'express';
import { updatePaymentStatusController } from '../controllers/paymentController.js';

const route = Router();
route.put('/status/:id', updatePaymentStatusController);
export default route;

import express from 'express';
import { sendMessage } from '../controllers/publicController.js';

const router = express.Router();

router.post('/contact', sendMessage);

export default router;

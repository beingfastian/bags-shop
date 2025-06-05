import express from 'express';
import { CreateVisitor } from '../controllers/visitorController.js';

const router = express.Router();

router.get('/create', CreateVisitor);

export default router;

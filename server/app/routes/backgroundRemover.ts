import multer from 'multer';
import { Router } from 'express';
import { removeBackground } from '../controllers/backroundRemover.js';

const upload = multer({ storage: multer.memoryStorage() });
const backgroundRouter = Router();


backgroundRouter.post('/remove-background', upload.single('file'), removeBackground);

export default backgroundRouter
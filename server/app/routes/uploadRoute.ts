import express, { NextFunction } from 'express';
import { upload } from '../utils/multerConfig.js';
import {
  uploadMultipleFilesAPI,
  uploadSingleFileAPI,
} from '../controllers/uploadController.js';

const router = express.Router();

// Single file upload route
router.post('/single', upload.single('file'), uploadSingleFileAPI as any);

// Multiple files upload route
router.post(
  '/multiple',
  upload.array('files[]', 10),  // Changed from 'files' to 'files[]' to match frontend
  uploadMultipleFilesAPI as any
);

export default router;

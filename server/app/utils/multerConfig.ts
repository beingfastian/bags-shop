// import multer, { StorageEngine } from 'multer';
// import * as path from 'path';
// import * as fs from 'fs';

// // Use process.cwd() to get the current working directory
// const uploadPath = path.join(process.cwd(), 'uploads');

// const storage: StorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Ensure the uploads directory exists, otherwise create it
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// export const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//     if (allowedMimeTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'));
//     }
//   },
// });

import AWS from 'aws-sdk';
import multer from 'multer';

export const s3 = new AWS.S3({
  endpoint: 'https://s3.maaozofficialstore.shop',
  accessKeyId: 'wp5tO93cdLcdM0qiT2ex',
  secretAccessKey: 'wZd8NESMHOeBaojeFELP30eHAmCsVUbb4pDvzOp2',
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
});

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/webp',
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'));
    }
  },
});

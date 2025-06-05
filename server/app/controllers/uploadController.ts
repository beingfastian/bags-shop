import { Request, Response } from 'express';
import { s3 } from '../utils/multerConfig.js';
const baseUrl = '/uploads/';
const bucket = process.env.BUCKET_NAME || 'maaozofficialstore';

export const uploadSingleFileAPI = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded! ' });
    }

    // Upload to MinIO
    const params = {
      Bucket: bucket, // Replace with your bucket name
      Key: `${Date.now()}-${file.originalname}`, // Unique file name
      Body: file.buffer, // File buffer from multer
      ContentType: file.mimetype, // File MIME type
    };

    const data = await s3.upload(params).promise();

    console.log(data);
    res.status(200).json({
      message: 'File uploaded successfully!',
      data: data.Location, // URL of the uploaded file
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'File upload failed!', error });
  }
};

export const uploadMultipleFilesAPI = async (req: Request, res: Response) => {
  try {
    // Check if files exist in the request
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const files = req.files as Express.Multer.File[];
    const results = [];

    // Process files one by one instead of in parallel
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const params = {
          Bucket: bucket,
          Key: `${Date.now()}-${i}-${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        const uploadResult = await s3.upload(params).promise();
        results.push(uploadResult.Location);
        console.log(`File ${i + 1}/${files.length} uploaded: ${uploadResult.Location}`);
      } catch (fileError) {
        console.error(`Error uploading file ${i + 1}/${files.length}:`, fileError);
        // Continue with other files even if one fails
      }
    }

    if (results.length === 0) {
      return res.status(500).json({ message: 'Failed to upload any files' });
    }

    return res.status(200).json({
      message: `${results.length} of ${files.length} files uploaded successfully`,
      data: results,
    });
  } catch (error) {
    console.error('Error in uploadMultipleFilesAPI:', error);
    return res.status(500).json({ 
      message: 'Failed to upload files', 
      error: error.message || 'Unknown error' 
    });
  }
};
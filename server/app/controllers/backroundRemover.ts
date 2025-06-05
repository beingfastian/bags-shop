import { Request, Response } from 'express';
import axios from 'axios';
import FormData from 'form-data';


export const removeBackground = async (
  req: Request, res: Response
): Promise<void> => {  
  try {
 
    if (!req.file) {
       res.status(400).json({ error: 'No file uploaded' });
    }
      console.log("api hit")

    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post('https://reimage.app/remove', formData, {
      headers: {
        ...formData.getHeaders(),
      },
      responseType: 'arraybuffer',
    });

    
    res.set('Content-Type', response.headers['content-type']);
    

    res.send(response.data);
   
  } catch (error) {
  
    console.error("Error removing background:", error);

   
    res.status(500).json({
      error: 'Failed to remove background',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

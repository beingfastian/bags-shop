import axios from '@/lib/axios';
// import { removeBackground } from '@/utils/image';
import { uploadOne } from './uploadService';

export interface HeroImagePayload {
  name: string; // Name of the image
  image: string; // URL of the uploaded image
}

/**
 * Sends the uploaded image URL and name to the `/image` API.
 * @param payload - The image metadata payload
 * @returns The created hero image response
 */
export const createHeroImage = async (payload: HeroImagePayload) => {
  const response = await axios.post('/hero/image', payload);
  return response.data;
};

/**
 * Fetches all hero images from the `/hero/image` API.
 * @returns The list of hero images
 */
export const fetchHeroImages = async () => {
  const response = await axios.get('/hero/image');
  return response.data;
};

/**
 * Deletes a hero image by ID.
 * @param id - The ID of the image to delete
 * @returns The deletion response
 */
export const deleteHeroImage = async (id: number) => {
  const response = await axios.delete(`/hero/image/${id}`);
  return response.data;
};


export const addHeroImages = async ({ file, background, type, name }: any) => {
  let imageUrl;

  try {
  
    if (background) {
      // const image = await removeBackground(file);
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/remove-background', formData, {
        timeout:3000,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    console.log("Response",response)
      // const data = await uploadOne({ file: image });
      console.log("Response",response.data.img) 
      imageUrl=response.data.img
    } else {
    
      const data = await uploadOne({ file });
      imageUrl=data.data
    }

    const payload = {
      image:imageUrl,
      name,
      type,
    };

   
    const response = await axios.post('/hero/image', payload);
    return response.data;
  } catch (error) {
    console.error('Error in addHeroImages:', error);
    throw error; 
  }
};
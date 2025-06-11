import axios from '@/lib/axios';
import { uploadOne } from './uploadService';
import { HeroImage, HeroImageCreatePayload, HeroImageUpdatePayload } from '@/types/types';

// UPDATED INTERFACE TO INCLUDE TEXT FIELDS
export interface HeroImagePayload {
  name?: string;
  image: string;
  type?: string;
  title?: string;
  subtitle?: string;
  button_text?: string;
  button_link?: string;
  is_active?: boolean;
  sort_order?: number;
}

/**
 * Creates a new hero image with text content
 * @param payload - The hero image data including text fields
 * @returns The created hero image response
 */
export const createHeroImage = async (payload: HeroImageCreatePayload): Promise<HeroImage> => {
  const response = await axios.post('/hero/image', payload);
  return response.data;
};

/**
 * Fetches all hero images from the `/hero/image` API.
 * @returns The list of hero images
 */
export const fetchHeroImages = async (): Promise<HeroImage[]> => {
  const response = await axios.get('/hero/image');
  return response.data;
};

/**
 * Fetches only active hero images for frontend display
 * @returns The list of active hero images
 */
export const fetchActiveHeroImages = async (): Promise<HeroImage[]> => {
  const response = await axios.get('/hero/active');
  return response.data;
};

/**
 * Fetches a single hero image by ID
 * @param id - The hero image ID
 * @returns The hero image
 */
export const fetchHeroImageById = async (id: number): Promise<HeroImage> => {
  const response = await axios.get(`/hero/image/${id}`);
  return response.data;
};

/**
 * Updates a hero image with new data including text fields
 * @param id - The hero image ID
 * @param payload - The updated hero image data
 * @returns The updated hero image
 */
export const updateHeroImage = async (id: number, payload: HeroImageUpdatePayload): Promise<HeroImage> => {
  const response = await axios.put(`/hero/image/${id}`, payload);
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

/**
 * UPDATED: Add hero images with text content support
 * @param file - Image file
 * @param background - Remove background flag
 * @param type - Image type (hero/banner)
 * @param name - Image name
 * @param title - Hero title text
 * @param subtitle - Hero subtitle text
 * @param button_text - Button text
 * @param button_link - Button link
 * @param is_active - Active status
 * @param sort_order - Sort order
 */
export const addHeroImages = async ({ 
  file, 
  background, 
  type, 
  name,
  title,
  subtitle,
  button_text,
  button_link,
  is_active = true,
  sort_order = 0
}: any) => {
  let imageUrl;

  try {
    if (background) {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/remove-background', formData, {
        timeout: 3000,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Response", response);
      console.log("Response", response.data.img);
      imageUrl = response.data.img;
    } else {
      const data = await uploadOne({ file });
      imageUrl = data.data;
    }

    // UPDATED PAYLOAD TO INCLUDE TEXT FIELDS
    const payload: HeroImageCreatePayload = {
      image: imageUrl,
      name,
      type,
      title,
      subtitle,
      button_text,
      button_link,
      is_active,
      sort_order,
    };

    const response = await axios.post('/hero/image', payload);
    return response.data;
  } catch (error) {
    console.error('Error in addHeroImages:', error);
    throw error;
  }
};
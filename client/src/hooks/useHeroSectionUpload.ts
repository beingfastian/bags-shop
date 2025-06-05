import { useEffect, useState } from 'react';
// import { uploadOne } from '../services/uploadService';
import {
  createHeroImage,
  deleteHeroImage,
  fetchHeroImages,
} from '@/services/HeroSectionUpload';

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [heroImages, setHeroImages] = useState<any[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const fetchAndSetHeroImages = async () => {
    try {
      const images = await fetchHeroImages();
      setHeroImages(images);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch hero images';
      setError(errorMessage);
    } finally {
      setLoadingImages(false);
    }
  };

  const removeBackground = async (file: File) => {
    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');

    try {
      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': 'qE2Bhkznvf2LLUVSNcBfo9b2',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Remove.bg API error: ${response.statusText}`);
      }

      const blob = await response.blob();
      return new File([blob], file.name, { type: blob.type });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to remove background';
      setError(errorMessage);
      throw err;
    }
  };

  const uploadAndSave = async (file: File, name: string,) => {
    setUploading(true);
    setError(null);

    try {
      // Step 1: Remove background from the file
      // const fileWithoutBg = await removeBackground(file);

      // Step 2: Upload the file with background removed
      // const uploadResponse = await uploadOne({ file: fileWithoutBg });

      // Step 3: Save the metadata
      const payload = {
        name,
        image:"",
      
         // Save the uploaded file's URL
      };

      const response = await createHeroImage(payload);

      // Refresh hero images
      await fetchAndSetHeroImages();
      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to upload and save image';
      setError(errorMessage);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (id: number) => {
    try {
      const response = await deleteHeroImage(id);
      if (response) {
        await fetchAndSetHeroImages(); // Refetch images after deletion
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete hero image';
      setError(errorMessage);
    }
  };

  useEffect(() => {
    fetchAndSetHeroImages();
  }, []);

  return {
    uploadAndSave,
    uploading,
    error,
    heroImages,
    loadingImages,
    fetchAndSetHeroImages,
    handleDeleteImage,
    removeBackground
  };
};

import { HeroImage } from '../models/index.js';

// Service to create a new hero image
export const createHeroImage = async (data: {
  name: string;
  image: string;
  type: string;
}) => {
  const heroImage = await HeroImage.create(data);
  return heroImage;
};

// Service to fetch all hero images
export const getAllHeroImages = async () => {
  const heroImages = await HeroImage.findAll();
  return heroImages;
};

// Service to fetch a single hero image by ID
export const getHeroImageById = async (id: string) => {
  const heroImage = await HeroImage.findOne({ where: { id } });
  return heroImage;
};

// Service to update a hero image
export const updateHeroImage = async (
  id: number,
  data: { name?: string; image?: string }
) => {
  const heroImage = await HeroImage.findOne({ where: { id } });
  if (!heroImage) {
    return null;
  }
  await heroImage.update(data);
  return heroImage;
};

// Service to delete a hero image
export const deleteHeroImage = async (id: string) => {
  const heroImage = await HeroImage.findOne({ where: { id } });
  if (!heroImage) {
    return null;
  }
  await heroImage.destroy();
  return heroImage;
};

import { HeroImage } from '../models/index.js';

// Service to create a new hero image - UPDATED TO HANDLE TEXT FIELDS
export const createHeroImage = async (data: {
  name?: string;
  image: string;
  type?: string;
  title?: string;
  subtitle?: string;
  button_text?: string;
  button_link?: string;
  is_active?: boolean;
  sort_order?: number;
}) => {
  const heroImage = await HeroImage.create(data);
  return heroImage;
};

// Service to fetch all hero images
export const getAllHeroImages = async () => {
  const heroImages = await HeroImage.findAll({
    order: [['sort_order', 'ASC'], ['createdAt', 'DESC']]
  });
  return heroImages;
};

// Service to fetch active hero images only
export const getActiveHeroImages = async () => {
  const heroImages = await HeroImage.findAll({
    where: { is_active: true },
    order: [['sort_order', 'ASC'], ['createdAt', 'DESC']]
  });
  return heroImages;
};

// Service to fetch a single hero image by ID
export const getHeroImageById = async (id: string) => {
  const heroImage = await HeroImage.findOne({ where: { id } });
  return heroImage;
};

// Service to update a hero image - UPDATED TO HANDLE TEXT FIELDS
export const updateHeroImage = async (
  id: number,
  data: { 
    name?: string; 
    image?: string;
    title?: string;
    subtitle?: string;
    button_text?: string;
    button_link?: string;
    is_active?: boolean;
    sort_order?: number;
  }
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
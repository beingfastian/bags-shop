import { Request, Response } from 'express';
import * as HeroImageService from '../services/heroImageService.js';

// Controller for creating a new hero image
export const createHeroImage = async (req: Request, res: Response) => {
  try {
    const newHeroImage = await HeroImageService.createHeroImage(req.body);
    return res.status(201).json(newHeroImage);
  } catch (error) {
    console.error('Error creating hero image:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller for fetching all hero images
export const getAllHeroImages = async (req: Request, res: Response) => {
  try {
    const heroImages = await HeroImageService.getAllHeroImages();
    return res.status(200).json(heroImages);
  } catch (error) {
    console.error('Error fetching hero images:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller for fetching a single hero image by ID
export const getHeroImageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const heroImage = await HeroImageService.getHeroImageById(id as any);

    if (!heroImage) {
      return res.status(404).json({ message: 'Hero Image not found' });
    }

    return res.status(200).json(heroImage);
  } catch (error) {
    console.error('Error fetching hero image:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller for updating a hero image
export const updateHeroImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;
    const updatedHeroImage = await HeroImageService.updateHeroImage(
      Number(id),
      { name, image }
    );

    if (!updatedHeroImage) {
      return res.status(404).json({ message: 'Hero Image not found' });
    }

    return res.status(200).json(updatedHeroImage);
  } catch (error) {
    console.error('Error updating hero image:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller for deleting a hero image
export const deleteHeroImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedHeroImage = await HeroImageService.deleteHeroImage(id as any);

    if (!deletedHeroImage) {
      return res.status(404).json({ message: 'Hero Image not found' });
    }

    return res.status(200).json({ message: 'Hero Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting hero image:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

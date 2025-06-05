import { Request, Response } from 'express';
import {
  addCategory as addCategoryService,
  getAllCategory as getAllCategoryService,
  updateCategory as updateCategoryService,
  deleteCategory as deleteCategoryService,
  getCategoryById as getCategoryByIdService,
} from '../services/categoryService.js';

export const addCategory = async (req: Request, res: Response) => {
  try {
    const categoryData = req.body;
    const { message } = await addCategoryService(categoryData);
    res.status(201).json({ message });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ message: 'An unknown error occurred.' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoryData = req.body;
    const { message } = await updateCategoryService({ id, ...categoryData });
    res.status(200).json({ message });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategoryService();
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await getCategoryByIdService(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { message } = await deleteCategoryService(id);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

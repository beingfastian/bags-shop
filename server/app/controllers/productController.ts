import { NextFunction, Request, Response } from 'express';
import {
  addProduct as addProductService,
  getAllProduct as getAllProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
  getProductById as getProductByIdService,
} from '../services/productService.js';

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = req.body;
    const { message } = await addProductService(productData);
    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const { message } = await updateProductService({ id, ...productData });
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

export const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAllProductService(req.query);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = await deleteProductService(req.params);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await getProductByIdService(req.params as any);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

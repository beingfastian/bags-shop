import { NextFunction, Request, Response } from 'express';
import {
  getAllVariant as getAllvariantService,
  deleteVariant as deletevariantService,
  getVariantById as getvariantByIdService,
  UpdateariantService,
  addVariantService,
} from '../services/variantService.js';

export const getAllVariant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = req.query;
    const variant = await getAllvariantService(filters);
    res.status(200).json(variant);
  } catch (error) {
    next(error);
  }
};

export const deleteVariant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { message } = await deletevariantService(id);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

export const getVariantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const variant = await getvariantByIdService(id);
    res.status(200).json(variant);
  } catch (error) {
    next(error);
  }
};

export const UpdateVariant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const variant = await UpdateariantService(id, req.body);
    res.status(200).json(variant);
  } catch (error) {
    next(error);
  }
};
export const addVariant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const variant = await addVariantService(req.body);
    res.status(200).json(variant);
  } catch (error) {
    next(error);
  }
};

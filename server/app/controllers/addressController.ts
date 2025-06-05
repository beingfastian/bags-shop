import { Request, Response } from 'express';
import * as addressService from '../services/addressService.js';

export const getAllAddresses = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).payload; // Extract user_id from JWT payload
    const addresses = await addressService.getAllAddresses(id);
    res.status(200).json(addresses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAddress = async (req: Request, res: Response) => {
  const { user_id } = (req as any).payload; // Extract user_id from JWT payload
  const { id } = req.params; // Address ID from URL parameter

  try {
    const address = await addressService.getAddress(user_id, id);
    res.status(200).json(address);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const createAddress = async (req: Request, res: Response) => {
  const { id } = (req as any).payload; // Extract user_id from JWT payload
  const data = req.body; // Address data from request body

  try {
    const newAddress = await addressService.createAddress(id, data);
    res.status(201).json(newAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  const { user_id } = (req as any).payload; // Extract user_id from JWT payload
  const { id } = req.params; // Address ID from URL parameter
  const data = req.body;

  try {
    const updatedAddress = await addressService.updateAddress(
      user_id,
      id,
      data
    );
    res.status(200).json(updatedAddress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  const { user_id } = (req as any).payload; // Extract user_id from JWT payload
  const { id } = req.params;

  try {
    const result = await addressService.deleteAddress(user_id, id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

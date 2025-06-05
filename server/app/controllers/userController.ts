import { Request, Response } from 'express';

import {
  register as registerService,
  login as loginService,
  changePassword as changePasswordService,
  getAllBuyer as getAllBuyerService,
  getUserById as getUserByIdService,
  updateUserDetails,
} from '../services/userService.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { message } = await registerService(req.body);

    return res.status(201).json({ message });
  } catch (error) {
    console.log('ee', error);
    return res.status(404).json({
      message: (error as Error).message || 'An unknown error occurred',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = await loginService(req.body);
    res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({
      message: (error as Error).message || 'An unknown error occurred',
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { message } = await changePasswordService(req.body);

    res.status(201).json({ message });
  } catch (error) {
    res
      .status(400)
      .json({ error: (error as any).message || 'An unknown error occurred' });
  }
};

export const getAllBuyer = async (req: Request, res: Response) => {
  try {
    const { data } = await getAllBuyerService();

    if (!data || data.length == 0) {
      return {
        data: [],
      };
    }
    res.status(200).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ error: (error as any).message || 'An unknown error occurred' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    let { user } = await getUserByIdService(req.params);

    res.status(200).json(user);
  } catch (error) {
    res
      .status(400)
      .json({ error: (error as any).message || 'An unknown error occurred' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = (req as any).payload;
    const data = await updateUserDetails({ ...req?.body, id });

    res.status(200).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ error: (error as any).message || 'An unknown error occurred' });
  }
};

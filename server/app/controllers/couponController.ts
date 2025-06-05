import { Request, Response } from 'express';
import { Coupon } from '../models/index.js'; // Assuming you have a Sequelize model
import { getPagination, getPaginationMetadata } from '../utils/pagination.js';

// Add a new coupon
export const addCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.create(req.body);
    return res.status(201).json(coupon);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Update an existing coupon
export const updateCoupon = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [updated] = await Coupon.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    await Coupon.findByPk(id);
    return res.json({ message: 'updated successfully' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Delete a coupon
export const deleteCoupon = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await Coupon.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get all coupons with optional filters
export const getAllCoupons = async (req: Request, res: Response) => {
  try {
    const {
      is_active,
      code,
      sortBy = 'name', // Default sort by name
      sortOrder = 'ASC', // Default sort order is ascending
    } = req.query as any;

    const where: any = {};
    if (is_active) {
      const now = new Date();
      where.start_date = { $lte: now };
      where.end_date = { $gte: now };
    }
    if (code) {
      where.code = code;
    }

    const { rows, count } = await Coupon.findAndCountAll({
      where,
      order: [[sortBy, sortOrder]],
      ...getPagination(req.query),
    });
    return res.json({ data: rows, ...getPaginationMetadata(req.query, count) });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get a coupon by ID
export const getCouponById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const coupon = await Coupon.findByPk(id);
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    return res.json(coupon);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

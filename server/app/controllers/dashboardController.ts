import { Request, Response } from 'express';
import {
  getAllUsers,
  getAllVisitors,
  getDailyRevenue,
  getLifetimeFirstTimeVisitors,
  getRevenueByPeriod,
  getTotalRevenue,
  getUniqueVisitors,
} from '../services/dashboardService.js';

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, status = null } = req.query as any;
    const [
      uniqueVisitors,
      allVisitors,
      FirstTimeVisitors,
      totalRevenue,
      dailyRevenue,
      revenuePeriod,
      allUsers,
    ] = await Promise.all([
      getUniqueVisitors(startDate, endDate),
      getAllVisitors(startDate, endDate),
      getLifetimeFirstTimeVisitors(startDate, endDate),
      getTotalRevenue(startDate, endDate, status),
      getDailyRevenue(startDate, endDate, status),
      getRevenueByPeriod(startDate, endDate, status),
      getAllUsers(startDate, endDate),
    ]);
    res.status(200).json({
      uniqueVisitors,
      allVisitors,
      FirstTimeVisitors,
      totalRevenue,
      dailyRevenue,
      revenuePeriod,
      allUsers,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

import { Request, Response } from 'express';
import { Visitor } from '../models/index.js';
import { Op } from 'sequelize';

export const CreateVisitor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Ensure that req.location has the expected data
    if (!req.location) {
      res.status(200).json({
        data: req.location,
        message: 'Location data not found in request',
      });
      return;
    }

    // Extract the IP address and location data
    const ipAddress: string = req?.ipAddress;
    const country: string = req.location.country || 'Unknown'; // Default to 'Unknown' if no country found

    // You can now use the IP and location data to create a new visitor entry in your database
    await Visitor.create({
      visitorId: ipAddress,
      country: country,
    });

    res.status(200).json({
      success: true,
      data: req.location,
    });
  } catch (error) {
    res.status(200).json({ message: 'Internal Server Error' });
  }
};

export const GetUniqueVisitorsWithData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { date, startDate, endDate } = req.query;

    // Define the filter object
    let whereCondition: any = {};

    if (date) {
      // Filter for a specific date
      whereCondition.visitDate = {
        [Op.gte]: new Date(new Date(date as string).setHours(0, 0, 0, 0)),
        [Op.lt]: new Date(new Date(date as string).setHours(23, 59, 59, 999)),
      };
    }

    if (startDate && endDate) {
      // Filter for a date range
      whereCondition.visitDate = {
        [Op.gte]: new Date(new Date(startDate as string).setHours(0, 0, 0, 0)),
        [Op.lte]: new Date(
          new Date(endDate as string).setHours(23, 59, 59, 999)
        ),
      };
    }

    if (!date && !startDate && !endDate) {
      // Filter for today by default
      whereCondition.visitDate = {
        [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        [Op.lt]: new Date(new Date().setHours(23, 59, 59, 999)),
      };
    }

    // Query for unique visitors
    const visitors = await Visitor.findAll({
      where: whereCondition,
      attributes: ['id', 'visitorId', 'country', 'visitDate'], // Select relevant fields
      group: ['visitorId'], // Ensure unique visitors
    });

    const uniqueVisitorCount = visitors.length;

    res.status(200).json({
      success: true,
      count: uniqueVisitorCount,
      data: visitors,
    });
  } catch (error) {
    console.error('Error fetching unique visitors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

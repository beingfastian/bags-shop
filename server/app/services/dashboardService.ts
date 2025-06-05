import { Op, Sequelize } from 'sequelize';
import { Payment, User, Visitor } from '../models/index.js';

/**
 * Get unique visitors (based on visitorId) within a date range, sorted by latest visit.
 */
export const getUniqueVisitors = async (startDate?: Date, endDate?: Date) => {
  try {
    // Default to today's start and end times
    const today = new Date();
    const defaultStartDate = new Date(today.setHours(0, 0, 0, 0)); // 00:00:00
    const defaultEndDate = new Date(today.setHours(23, 59, 59, 999)); // 23:59:59

    const queryStartDate = startDate || defaultStartDate;
    const queryEndDate = endDate || defaultEndDate;

    const { count, rows } = await Visitor.findAndCountAll({
      attributes: [
        'visitorId',
        [Sequelize.fn('MAX', Sequelize.col('visitDate')), 'visitDate'],
      ],
      where: {
        visitDate: {
          [Op.between]: [queryStartDate, queryEndDate],
        },
      },
      group: ['visitorId'],
      order: [[Sequelize.fn('MAX', Sequelize.col('visitDate')), 'DESC']],
    });

    return {
      count: count?.length,
      //  data: rows
    };
  } catch (err) {
    throw new Error('Error fetching unique visitors: ' + err.message);
  }
};

/**
 * Get all visitors (including duplicates) within a date range, sorted by latest visit.
 */
export const getAllVisitors = async (startDate?: Date, endDate?: Date) => {
  try {
    // Default to today's start and end times
    const today = new Date();
    const defaultStartDate = new Date(today.setHours(0, 0, 0, 0));
    const defaultEndDate = new Date(today.setHours(23, 59, 59, 999));

    const queryStartDate = startDate || defaultStartDate;
    const queryEndDate = endDate || defaultEndDate;

    const { count, rows } = await Visitor.findAndCountAll({
      where: {
        visitDate: {
          [Op.between]: [queryStartDate, queryEndDate],
        },
      },
      order: [['visitDate', 'DESC']], // Sort by latest visit
    });

    return {
      count,
      //  data: rows
    };
  } catch (err) {
    throw new Error('Error fetching all visitors: ' + err.message);
  }
};
export const getAllUsers = async (startDate?: Date, endDate?: Date) => {
  try {
    const { count } = await User.findAndCountAll({
      where: {},
    });

    return {
      count,
    };
  } catch (err) {
    throw new Error('Error fetching all visitors: ' + err.message);
  }
};

/**
 * Get users who have visited only once in their lifetime and within a given date range.
 */
export const getLifetimeFirstTimeVisitors = async (
  startDate?: Date,
  endDate?: Date
) => {
  try {
    // Default to today's start and end times if no date range is provided
    const today = new Date();
    const defaultStartDate = new Date(today.setHours(0, 0, 0, 0)); // 00:00:00
    const defaultEndDate = new Date(today.setHours(23, 59, 59, 999)); // 23:59:59

    const queryStartDate = startDate || defaultStartDate;
    const queryEndDate = endDate || defaultEndDate;

    // Single query using a subquery
    const { count, rows } = await Visitor.findAndCountAll({
      where: {
        visitDate: {
          [Op.between]: [queryStartDate, queryEndDate],
        },
        // visitorId: {
        //   [Op.in]: Sequelize.literal(`
        //       (SELECT visitorId FROM Visitors GROUP BY visitorId HAVING COUNT(visitorId) = 1)
        //     `), // Select visitorIds that have exactly one visit in their lifetime
        // },
      },
      order: [['visitDate', 'DESC']], // Sort by latest visit first
    });

    return {
      count,
      //  data: rows
    };
  } catch (err) {
    throw new Error(
      'Error fetching first-time lifetime visitors: ' + err.message
    );
  }
};

export const getTotalRevenue = async (
  startDate?: Date,
  endDate?: Date,
  status?: string | null
) => {
  try {
    const today = new Date();
    const queryStartDate = startDate || new Date(0);
    const queryEndDate = endDate || today;

    const totalRevenue = await Payment.sum('amount', {
      where: {
        ...(status ? { payment_status: status } : {}),
        createdAt: {
          [Op.between]: [queryStartDate, queryEndDate],
        },
      },
    });

    return totalRevenue || 0;
  } catch (err) {
    throw new Error('Error calculating total revenue: ' + err.message);
  }
};

export const getDailyRevenue = async (
  startDate?: Date,
  endDate?: Date,
  status?: string | null
) => {
  try {
    // Default to the current year if no date range is provided
    const today = new Date();
    const currentYear = today.getFullYear();
    const defaultStartDate = new Date(currentYear, 0, 1); // January 1st of the current year
    const defaultEndDate = new Date(currentYear, 11, 31, 23, 59, 59, 999); // December 31st of the current year

    const queryStartDate = startDate || defaultStartDate;
    const queryEndDate = endDate || defaultEndDate;

    // Get daily revenue data
    const revenueData = await Payment.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'], // Group by day
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount'], // Sum amounts
      ],
      where: {
        ...(status ? { payment_status: status } : {}),
        createdAt: {
          [Op.between]: [queryStartDate, queryEndDate],
        },
      },
      group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'ASC']], // Order by date
    });

    const formattedData = revenueData.map((item) => ({
      date: item.dataValues.date,
      totalAmount: item.dataValues.totalAmount,
    }));

    return formattedData;
  } catch (err) {
    throw new Error('Error fetching daily revenue: ' + err.message);
  }
};

// import { Sequelize, Op } from 'sequelize';

export const getRevenueByPeriod = async (
  type: 'day' | 'week' | 'month' | 'year' = 'year',
  startDate?: Date,
  endDate?: Date,
  status?: string | null
) => {
  try {
    const today = new Date();
    let queryStartDate: Date;
    let queryEndDate: Date;
    let dateRange: Date[] = [];

    // Generate the date range based on the 'type'
    if (!startDate && !endDate) {
      switch (type) {
        case 'day':
          queryStartDate = new Date(today); // Copy today's date
          queryStartDate.setHours(0, 0, 0, 0); // Start of today
          queryEndDate = new Date(today); // Copy today's date
          queryEndDate.setHours(23, 59, 59, 999); // End of today
          dateRange = [queryStartDate]; // Only today
          break;
        case 'week':
          const startOfWeek = today.getDate() - today.getDay() + 1; // Monday
          const endOfWeek = startOfWeek + 6; // Sunday
          queryStartDate = new Date(today); // Copy today's date
          queryStartDate.setDate(startOfWeek); // Start of this week (Monday)
          queryStartDate.setHours(0, 0, 0, 0); // Set to start of day

          queryEndDate = new Date(today); // Copy today's date
          queryEndDate.setDate(endOfWeek); // End of this week (Sunday)
          queryEndDate.setHours(23, 59, 59, 999); // Set to end of day

          // Generate all days in this week
          for (
            let d = new Date(queryStartDate);
            d <= queryEndDate;
            d.setDate(d.getDate() + 1)
          ) {
            dateRange.push(new Date(d)); // Create new Date objects to avoid mutation
          }
          break;
        case 'month':
          queryStartDate = new Date(today.getFullYear(), today.getMonth(), 1); // First day of current month
          queryEndDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of current month
          queryEndDate.setHours(23, 59, 59, 999); // End of the last day of the month

          // Generate all days in this month
          for (
            let d = new Date(queryStartDate);
            d <= queryEndDate;
            d.setDate(d.getDate() + 1)
          ) {
            dateRange.push(new Date(d)); // Create new Date objects to avoid mutation
          }
          break;
        case 'year':
        default:
          queryStartDate = new Date(today.getFullYear(), 0, 1); // First day of the year
          queryEndDate = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999); // Last day of the year

          // Generate all days in this year
          for (
            let d = new Date(queryStartDate);
            d <= queryEndDate;
            d.setDate(d.getDate() + 1)
          ) {
            dateRange.push(new Date(d)); // Create new Date objects to avoid mutation
          }
          break;
      }
    }

    // Get revenue data for the specified date range
    const revenueData = await Payment.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount'],
      ],
      where: {
        ...(status ? { payment_status: status } : {}),
        createdAt: {
          [Op.between]: [queryStartDate, queryEndDate],
        },
      },
      group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'ASC']], // Order by date
    });

    // Prepare revenue data by date
    const revenueMap = new Map();
    revenueData.forEach((item) => {
      revenueMap.set(item.dataValues.date, item.dataValues.totalAmount);
    });

    // Generate final result with 0 for dates with no revenue
    const formattedData = dateRange.map((date) => {
      const dateStr = date.toISOString().split('T')[0]; // Get date as string (YYYY-MM-DD)
      return {
        date: dateStr,
        totalAmount: revenueMap.get(dateStr) || 0, // Default to 0 if no revenue
      };
    });

    return formattedData;
  } catch (err) {
    throw new Error('Error fetching revenue data: ' + err.message);
  }
};

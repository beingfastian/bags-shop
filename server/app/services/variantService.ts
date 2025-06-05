import { Op } from 'sequelize';
import { Product, Variant } from '../models/index.js';
import { AppError } from '../utils/appError.js';

export const getAllVariant = async (filters: any = {}) => {
  try {
    const {
      category_id,
      minPrice,
      maxPrice,
      tags,
      page = 1,
      pageSize = 10,
      sortBy = 'createdAt',
      sortOrder = 'ASC',
    } = filters;

    const whereConditions: any = {};

    if (category_id) {
      whereConditions.category_id = category_id;
    }
    if (minPrice) {
      whereConditions.price = { ...whereConditions.price, [Op.gte]: minPrice };
    }
    if (maxPrice) {
      whereConditions.price = { ...whereConditions.price, [Op.lte]: maxPrice };
    }
    if (tags && tags.length > 0) {
      whereConditions.tags = { [Op.overlap]: tags };
    }

    const offset = (page - 1) * pageSize;
    const { count, rows } = await Variant.findAndCountAll({
      // where: whereConditions,
      include: [
        {
          model: Product,
          as: 'Product',
        },
      ],
      limit: pageSize,
      offset,
      order: [[sortBy, sortOrder]],
    });

    return {
      data: rows,
      totalCount: count,
    };
  } catch (error) {
    console.log(error);
    throw new Error(`Error retrieving products: ${(error as Error).message}`);
  }
};

export const getVariantById = async (id: string) => {
  const variant = await Variant.findOne({
    where: { id },
  });
  if (!variant) {
    throw new AppError('Variant not found', 404);
  }
  return variant;
};

export const UpdateariantService = async (id: string, data: any) => {
  const variant = await Variant.findOne({
    where: { id },
  });
  if (!variant) {
    throw new AppError('Variant not found', 404);
  }

  await variant.update(data);
  return { message: 'updated successfully' };
};
export const addVariantService = async (data: any) => {
  await Variant.create(data);
  return { message: 'added successfully' };
};

export const deleteVariant = async (id: string) => {
  const variant = await Variant.findByPk(id);
  if (!variant) {
    throw new AppError('Variant not found', 404);
  }
  await variant.destroy();
  return { message: 'Variant deleted successfully' };
};

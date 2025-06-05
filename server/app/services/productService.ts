import { z } from 'zod';
import { Category, OrderItem, Product, Variant } from '../models/index.js';
import { Op, Sequelize } from 'sequelize';
import sequelize from '../config/database.js';
import { getPagination, getPaginationMetadata } from '../utils/pagination.js';
import { AppError } from '../utils/appError.js';

// Add a new product
export const addProduct = async ({
  name,
  price,
  description,
  stock,
  discount,
  category_id,
  tags,
  gender,
  variants,
}: z.infer<typeof addProduct>) => {
  const transaction = await sequelize.transaction();
  try {
    if (!Array.isArray(variants)) {
      throw new Error('Variants should be an array');
    }

    const product = (await Product.create(
      {
        name,
        price,
        description,
        stock,
        discount,
        category_id,
        tags,
        gender,
      },
      { transaction }
    )) as any;

    await Promise.all(
      variants.map((variant: any) =>
        Variant.create(
          {
            product_id: product?.id,
            ...variant,
          },
          { transaction }
        )
      )
    );

    await transaction.commit();

    return {
      message: 'Product is successfully added',
    };
  } catch (error) {
    console.log(error, 'error');
    await transaction.rollback();
    throw new Error(` ${(error as Error).message}`);
  }
};

// Update the getAllProduct service to handle filters
export const getAllProduct = async ({
  gender,
  categories,
  search,
  minPrice,
  maxPrice,
  tags,
  page = 1,
  pageSize = 10,
  sortBy = 'createdAt', // Default sort by name
  sortOrder = 'DESC',
}: any) => {
  try {
    const { count, rows } = await Product.findAndCountAll({
      where: {
        ...(categories
          ? { category_id: { [Op.in]: categories.split(',') } }
          : {}),
        ...(gender
          ? {
              gender: {
                [Op.in]: [
                  ...gender.split(',').map((g) => g.toLowerCase()),
                  'both',
                ],
              },
            }
          : {}),
        ...(minPrice || maxPrice
          ? {
              price: {
                ...(minPrice ? { [Op.gte]: parseFloat(minPrice) } : {}),
                ...(maxPrice ? { [Op.lte]: parseFloat(maxPrice) } : {}),
              },
            }
          : {}),
        ...(tags?.length ? { tags: { [Op.overlap]: tags } } : {}),
        ...(search ? { name: { [Op.iLike]: `%${search}%` } } : {}),
      },
      include: [
        {
          model: Category,
          as: 'Category',
        },
        {
          model: Variant, // Include variants
          as: 'Variants',
          include: [
            {
              model: OrderItem,
              as: 'OrderItems',
            },
          ],
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COALESCE(SUM(oi.quantity), 0) 
              FROM "Variants" AS v
              INNER JOIN "OrderItems" AS oi ON v.id = oi.variant_id
              WHERE v.product_id = "Product"."id"
            )`),
            'orders',
          ],
        ],
      },
      group: ['Product.id'],
      ...getPagination({ page, pageSize }),
      order: [
        [sortBy === 'orders' ? Sequelize.literal('orders') : sortBy, sortOrder],
      ],
    });

    return {
      data: rows, // The actual product data
      ...getPaginationMetadata({ page, pageSize }, count?.length),
    };
  } catch (error) {
    throw new AppError(error?.message, 400);
  }
};

// Get product by ID
export const getProductById = async ({ id }: { id: string }) => {
  if (!id) {
    throw new AppError('Product ID is required', 400);
  }

  const product = await Product.findOne({
    where: { id },
    include: [
      {
        model: Variant, // Include variants
        as: 'Variants',
      },
      {
        model: Category,
        as: 'Category',
      },
    ],
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  return product;
};

export const updateProduct = async ({
  id,
  name,
  price,
  description,
  stock,
  discount,
  category,
  tags,
}: any) => {
  const transaction = await sequelize.transaction();
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    await product.update(
      {
        ...(name ? { name } : {}),
        ...(price ? { price } : {}),
        ...(description ? { description } : {}),
        ...(stock ? { stock } : {}),
        ...(discount ? { discount } : {}),
        ...(category ? { category } : {}),
        ...(tags ? { tags } : {}),
      },
      { transaction }
    );

    await transaction.commit();

    return { message: 'Product updated successfully' };
  } catch (error) {
    console.log(error, 'error');
    await transaction.rollback();
    throw new AppError(` ${(error as Error).message}`, 400);
  }
};

// Delete a product by ID
export const deleteProduct = async ({ id }: any) => {
  try {
    const isProductExist = await Product.findOne({
      where: {
        id,
      },
    });

    if (!isProductExist) {
      return new Error('Product does not exist with this ID');
    }

    await isProductExist.destroy();
    return { message: 'Product deleted successfully' };
  } catch (error) {
    throw new Error(`${(error as Error).message}`);
  }
};

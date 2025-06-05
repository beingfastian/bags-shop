import { Category } from '../models/index.js';

// Add a new category
export const addCategory = async ({
  name,
  icon,
}: {
  name: string;
  icon: string;
}) => {
  try {
    const category = await Category.create({ name, icon });
    return { message: 'Category created successfully', category };
  } catch (error) {
    console.log('Error creating category:', error);
    throw new Error(` ${(error as Error).message}`);
  }
};

// Get all categories
export const getAllCategory = async () => {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    console.log('Error getting categories:', error);
    throw new Error(` ${(error as Error).message}`);
  }
};

// Get category by ID
export const getCategoryById = async (id: string) => {
  try {
    const category = await Category.findOne({
      where: { id },
    });
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  } catch (error) {
    console.log('Error getting category by ID:', error);
    throw new Error(` ${(error as Error).message}`);
  }
};

// Update a category
export const updateCategory = async ({
  id,
  name,
  icon,
}: {
  id: string;
  name: string;
  icon: string;
}) => {
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error('Category not found');
    }
    await category.update({ name, icon });
    return { message: 'Category updated successfully' };
  } catch (error) {
    console.log('Error updating category:', error);
    throw new Error(` ${(error as Error).message}`);
  }
};

// Delete a category
export const deleteCategory = async (id: string) => {
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error('Category not found');
    }
    await category.destroy();
    return { message: 'Category deleted successfully' };
  } catch (error) {
    console.log('Error deleting category:', error);
    throw new Error(` ${(error as Error).message}`);
  }
};

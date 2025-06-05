import { Address } from '../models/index.js';
import { getPagination, getPaginationMetadata } from '../utils/pagination.js';

export const getAllAddresses = async (user_id: string) => {
  try {
    const { count, rows } = await Address.findAndCountAll({
      where: { user_id },
      ...getPagination({}),
    });
    return {
      data: rows,
      ...getPaginationMetadata({}, count),
    };
  } catch (err) {
    throw new Error('Error fetching addresses: ' + err.message);
  }
};

export const getAddress = async (user_id: string, id: string) => {
  try {
    const address = await Address.findOne({ where: { user_id, id } });
    if (!address) {
      throw new Error('Address not found');
    }
    return address;
  } catch (err) {
    throw new Error('Error fetching address: ' + err.message);
  }
};

export const createAddress = async (user_id: string, data: any) => {
  try {
    const newAddress = await Address.create({ user_id, ...data });
    return newAddress;
  } catch (err) {
    throw new Error('Error creating address: ' + err.message);
  }
};

export const updateAddress = async (user_id: string, id: string, data: any) => {
  try {
    const address = await Address.findOne({ where: { user_id, id } });
    if (!address) {
      throw new Error('Address not found');
    }

    await address.update(data);
    return address;
  } catch (err) {
    throw new Error('Error updating address: ' + err.message);
  }
};

export const deleteAddress = async (user_id: string, id: string) => {
  try {
    const address = await Address.findOne({ where: { user_id, id } });
    if (!address) {
      throw new Error('Address not found');
    }

    await address.destroy();
    return { message: 'Address deleted successfully' };
  } catch (err) {
    throw new Error('Error deleting address: ' + err.message);
  }
};

import { z } from 'zod';

import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { updateUserDetailsSchema } from '../schemas/userSchema.js';
dotenv.config();
export const register = async ({
  firstName,
  lastName,
  displayName,
  email,
  password,
}: z.infer<typeof register>) => {
  try {
    const isUserExist = await User.findOne({
      where: {
        email,
      },
    });

    if (isUserExist) {
      throw new Error('User is already registered with this email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      first_name: firstName,
      last_name: lastName,
      display_name: displayName,
      email,
      password: hashedPassword,
    });
    return {
      message: 'User registered successfully',
    };
  } catch (error) {
    throw new Error(` ${(error as Error).message}`);
  }
};

export const login = async ({ email, password }: z.infer<typeof login>) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('invalid Email or password');
    }

    const { password: currentPassword, ...userdata } = user?.toJSON();
    const isValid = await bcrypt.compare(password, currentPassword);

    if (!isValid) {
      throw new Error('invalid Email or Password');
    }

    const token = jwt.sign(userdata, process.env.JWT_SECRET || '123', {
      expiresIn: '365d',
    });

    return {
      message: 'Login sucessfully',
      token,
      user: userdata,
    };
  } catch (error) {
    throw new Error(` ${(error as Error).message}`);
  }
};

export const changePassword = async ({
  currentPassword,
  newPassword,
  email,
}: z.infer<typeof changePassword>) => {
  try {
    const isUserExist = await User.findOne({
      where: {
        email,
      },
    });

    if (!isUserExist) {
      throw new Error('invalid Email ');
    }

    console.log('usexist', isUserExist);

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      isUserExist.dataValues.password
    );

    if (!isPasswordValid) {
      throw new Error('invalid current password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await isUserExist.update({ password: hashedPassword });
    return {
      message: 'Password is updated sucessfully',
    };
  } catch (error) {
    throw new Error(` ${(error as Error).message}`);
  }
};

export const getUserById = async ({ id }: any) => {
  console.log('iD', id);
  if (!id) {
    throw new Error('id is required');
  }
  let user = await User.findOne({
    where: {
      id,
    },
  });
  console.log('User Data', user);
  return {
    user,
  };
};

export const getAllBuyer = async () => {
  try {
    let users = await User.findAll({
      where: {
        role: 'buyer',
      },
    });

    return {
      data: users,
    };
  } catch (error) {
    throw new Error(`Error fetching buyers: ${(error as Error).message}`);
  }
};

export const updateUserDetails = async ({
  id,
  firstName,
  lastName,
  displayName,
  email,
  profile,
}: z.infer<typeof updateUserDetailsSchema>) => {
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const updatedFields = {
      ...(firstName ? { first_name: firstName } : {}),
      ...(lastName ? { last_name: lastName } : {}),
      ...(displayName ? { display_name: displayName } : {}),
      ...(email ? { email } : {}),
      ...(profile ? { profile } : {}),
    };

    await user.update(updatedFields);

    return {
      message: 'User details updated successfully',
      user: user.dataValues,
    };
  } catch (error) {
    throw new Error(`Error updating user details: ${(error as Error).message}`);
  }
};

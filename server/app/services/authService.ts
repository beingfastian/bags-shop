// import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { OTP, User } from '../models/index.js';
import axios from 'axios';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import sequelize from '../config/database.js';
import logger from '../config/logger.js';
import {
  changePasswordSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
} from '../schemas/authSchemas.js';
import { z } from 'zod';
import { sendOTPEmail } from '../utils/message.js';

const PASSWORD_RESET = 'password_reset';

export interface IUser {
  id: number;
  email: string;
  password: string;
  otp: string | null;
  otp_expiry: number | null;
  otp_verify: boolean | null;
}

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleTokenAndGenerateJWT = async (
  idToken: string
): Promise<any> => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    const { name, given_name, family_name, email, email_verified } =
      response.data;

    if (!email_verified) {
      throw new Error('Email not verified by Google');
    }
    let user = await User.findOne({
      where: { email },
    });

    if (!user) {
      const hashedPassword = await bcrypt.hash('ghayas', 10);
      user = await User.create({
        first_name: given_name || name,
        last_name: family_name,
        display_name: name,
        email,
        password: hashedPassword,
      });
    }

    const { id, first_name, last_name, role, status } = user?.toJSON();

    const token = jwt.sign(
      { id, email, first_name, last_name, role },
      process.env.JWT_SECRET || '123'
    );

    const { password, ...userdata } = user?.toJSON();

    return {
      message: 'Login successfully',
      token,
      status,
      user: userdata,
    };
  } catch (error) {
    console.error('Error during Google token verification:', error);
    throw new Error('Failed to verify Google token or generate JWT');
  }
};

export const authFacebook = async (accessToken: string) => {
  try {
    // Fetch user data from Facebook using the access token
    const response = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
    );

    const { id, name, email, picture } = response.data;

    // Check if the user exists in the database
    let user = await User.findOne({ where: { email } });

    // If the user doesn't exist, create a new user
    if (!user) {
      const hashedPassword = await bcrypt.hash('defaultPassword', 10); // Default password
      user = await User.create({
        first_name: name.split(' ')[0],
        last_name: name.split(' ')[1] || '',
        display_name: name,
        email,
        password: hashedPassword,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user, email: 'test', role: user.role },
      process.env.JWT_SECRET || 'default_jwt_secret',
      { expiresIn: '1h' }
    );

    return {
      message: 'Login successful',
      token,
      user,
    };
  } catch (error) {
    console.error('Error in Facebook authentication:', error);
    throw new Error('Failed to authenticate with Facebook');
  }
};

const OTP_EXPIRY_MINUTES = 10;
const JWT_EXPIRY_MINUTES = 15;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 3;

export const forgotPassword = async (email: string) => {
  const transaction = await sequelize.transaction();

  try {
    // Validate input
    const { email: validatedEmail } = await forgotPasswordSchema.parseAsync({
      email,
    });

    // Find user
    const user = (await User.findOne({
      where: { email: { [Op.iLike]: validatedEmail } },
      transaction,
      attributes: ['id', 'email'],
    })) as any;

    // Generic response to prevent user enumeration
    const response = {
      message: 'If the user exists, a password reset email has been sent',
    };

    if (!user) {
      logger.info(
        `Password reset attempt for non-existent email: ${validatedEmail}`
      );
      await transaction.commit();
      throw new Error(
        'If the user exists, a password reset email has been sent'
      );
      // return response;
    }

    // Rate limiting
    const recentAttempts = await OTP.count({
      where: {
        userId: user.id,
        purpose: PASSWORD_RESET,
        createdAt: { [Op.gt]: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) },
      },
      transaction,
    });

    if (recentAttempts >= MAX_ATTEMPTS) {
      logger.warn(`Rate limit exceeded for user: ${user.id}`);
      await transaction.commit();
      return response;
    }

    // Generate and store OTP
    const otp = generateNumericOTP(6);
    console.log(otp, 'otp');
    await OTP.create(
      {
        userId: user.id,
        code: await bcrypt.hash(otp, 10),
        purpose: PASSWORD_RESET,
        expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
      },
      { transaction }
    );

    await sendOTPEmail({
      email: email,
      otp: otp,
      userName: user?.display_name,
      validityMinutes: OTP_EXPIRY_MINUTES,
    });

    logger.info(`Password reset OTP sent to: ${user.email}`);
    await transaction.commit();
    return response;
  } catch (error) {
    await transaction.rollback();
    handleServiceError(error, 'forgotPassword');
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  const transaction = await sequelize.transaction();

  try {
    // Validate input
    const { email: validatedEmail, otp: validatedOtp } =
      await verifyOtpSchema.parseAsync({ email, otp });

    // Find user
    const user = (await User.findOne({
      where: { email: { [Op.iLike]: validatedEmail } },
      transaction,
      attributes: ['id'],
    })) as any;

    if (!user) {
      throw new Error('User not found');
    }

    // Find valid OTP
    const otpRecords = await OTP.findAll({
      where: {
        userId: user.id,
        purpose: PASSWORD_RESET,
        expiresAt: { [Op.gt]: new Date() },
        used: false,
      },
      transaction,
      order: [['createdAt', 'DESC']],
      limit: 1,
    });

    // Verify OTP
    // const isValid = await Promise.any(
    //   otpRecords.map(async (record) =>
    //     bcrypt.compare(validatedOtp, record.code)
    //   )
    // );

    const isValid = await Promise.all(
      otpRecords.map(async (record) => {
        return bcrypt.compare(validatedOtp, record.code);
      })
    ).then((results) => results.includes(true));

    if (!isValid) {
      throw new Error('Invalid or expired OTP');
    }

    // Mark OTPs as used
    await OTP.update(
      { used: true },
      {
        where: { userId: user.id, purpose: PASSWORD_RESET },
        transaction,
      }
    );

    // Generate JWT
    const resetToken = jwt.sign(
      {
        sub: user.id,
        purpose: PASSWORD_RESET,
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.JWT_SECRET!,
      { expiresIn: JWT_EXPIRY_MINUTES * 60 }
    );

    await transaction.commit();
    logger.info(`OTP verified for user: ${user.id}`);
    return { resetToken };
  } catch (error) {
    await transaction.rollback();
    handleServiceError(error, 'verifyOtp');
  }
};

export const changePassword = async (
  resetToken: string,
  newPassword: string,
  confirmPassword: string
) => {
  const transaction = await sequelize.transaction();

  try {
    // Validate input
    const { newPassword: validatedPassword } =
      await changePasswordSchema.parseAsync({
        resetToken,
        newPassword,
        confirmPassword,
      });

    // Verify JWT
    const payload = jwt.verify(resetToken, process.env.JWT_SECRET!) as any;

    if (payload.purpose !== PASSWORD_RESET) {
      throw new Error('Invalid token purpose');
    }

    // Find user
    const user = (await User.findByPk(payload.sub, {
      transaction,
      attributes: ['id', 'password'],
    })) as any;

    if (!user) {
      throw new Error('User not found');
    }

    // Check password history
    const isSamePassword = await bcrypt.compare(
      validatedPassword,
      user.password
    );
    if (isSamePassword) {
      throw new Error('New password must be different from current password');
    }

    // Update password
    const hashedPassword = await bcrypt.hash(validatedPassword, 12);
    await user.update({ password: hashedPassword }, { transaction });

    // Invalidate OTPs
    await OTP.update(
      { used: true },
      { where: { userId: user.id }, transaction }
    );

    await transaction.commit();
    logger.info(`Password updated for user: ${user.id}`);
    return { message: 'Password updated successfully' };
  } catch (error) {
    await transaction.rollback();
    handleServiceError(error, 'changePassword');
  }
};

// Helper functions
const generateNumericOTP = (length: number): string => {
  const digits = '0123456789';
  return Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((n) => digits[n % digits.length])
    .join('');
};

const handleServiceError = (error: unknown, context: string) => {
  logger.error(`Auth service error (${context}):`, error);

  if (error instanceof jwt.JsonWebTokenError) {
    throw new Error('Invalid or expired token');
  }

  if (error instanceof z.ZodError) {
    throw new Error(error.errors[0].message);
  }

  throw new Error(
    error instanceof Error ? error.message : 'Authentication failed'
  );
};

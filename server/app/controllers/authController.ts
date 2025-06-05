import { Request, Response } from 'express';
import {
  changePassword,
  forgotPassword,
  verifyGoogleTokenAndGenerateJWT,
  verifyOtp,
} from '../services/authService.js';
import logger from '../config/logger.js';

export const googleAuth = async (req: Request, res: Response) => {
  const { idToken } = req.body;
  try {
    const data = await verifyGoogleTokenAndGenerateJWT(idToken);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid Google ID token' });
  }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const result = await forgotPassword(email);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    logger.error('Forgot password controller error:', error);
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Password reset failed',
    });
  }
};

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const { resetToken } = await verifyOtp(email, otp);

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      resetToken,
    });
  } catch (error) {
    logger.error('OTP verification controller error:', error);
    res.status(401).json({
      success: false,
      message:
        error instanceof Error ? error.message : 'OTP verification failed',
    });
  }
};

export const changePasswordController = async (req: Request, res: Response) => {
  try {
    const { resetToken, newPassword, confirmPassword } = req.body;

    const result = await changePassword(
      resetToken,
      newPassword,
      confirmPassword
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    logger.error('Password change controller error:', error);
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : 'Password change failed',
    });
  }
};

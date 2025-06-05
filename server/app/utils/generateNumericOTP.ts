import crypto from 'crypto';

export const generateNumericOTP = (length: number): string => {
  const digits = '0123456789';
  const randomBytes = crypto.randomBytes(length);

  return Array.from(randomBytes)
    .map((byte) => digits[byte % digits.length])
    .join('');
};

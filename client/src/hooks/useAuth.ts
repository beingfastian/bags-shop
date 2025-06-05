import { useMutation } from '@tanstack/react-query';
import {
  login,
  signup,
  changePassword,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from '../services/api/authService';

export const useSignup = () => {
  return useMutation({ mutationFn: signup });
};
export const useLogin = () => {
  return useMutation({ mutationFn: login });
};
export const useForgotPassword = () => {
  return useMutation({ mutationFn: forgotPassword });
};
export const useVerifyOtp = () => {
  return useMutation({ mutationFn: verifyOtp });
};
export const useResetPassword = () => {
  return useMutation({ mutationFn: resetPassword });
};

export const useChangePassword = () => {
  const mutation = useMutation({ mutationFn: changePassword });
  return mutation;
};

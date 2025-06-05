import axios from '@/lib/axios';
import {
  AuthResponse,
  ChangePasswordRequest,
  FacebookLoginPayload,
  forgotPasswordPayload,
  GoogleLoginPayload,
  LoginPayload,
  resetPasswordPayload,
  SignupPayload,
  SignUpResponse,
  verifyOtpPayload,
  verifyOtpResponse,
} from '@/types/auth';
import { Message } from '@/types/response';

export const login = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>('/user/login', data);
  return response.data;
};

export const authGoogle = async (
  data: GoogleLoginPayload
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>('/auth/google', data);
  return response.data;
};
export const authFacebook = async (
  data: FacebookLoginPayload
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>('/auth/facebook', data);
  return response.data;
};

export const forgotPassword = async (
  data: forgotPasswordPayload
): Promise<Message> => {
  const response = await axios.post<Message>('/auth/forgot-password', data);
  return response.data;
};

export const verifyOtp = async (
  data: verifyOtpPayload
): Promise<verifyOtpResponse> => {
  const response = await axios.post<verifyOtpResponse>(
    '/auth/verify-otp',
    data
  );
  return response.data;
};

export const resetPassword = async (
  data: resetPasswordPayload
): Promise<Message> => {
  const response = await axios.post<Message>('/auth/reset-password', data);
  return response.data;
};

export const signup = async (data: SignupPayload): Promise<SignUpResponse> => {
  const response = await axios.post<SignUpResponse>('/user/register', data);
  return response.data;
};

export const changePassword = async (data: ChangePasswordRequest) => {
  const response = await axios.post('/user/', data);
  return response.data;
};



export const getuserData = async (userId:string) => {
  const response = await axios.get(`user/${userId}`);
  return response.data;
};



export const updateProfileImage = async (data:string) => {

  
  const response = await axios.put('/user/', {
    profile:data
  });

  return response.data;
};
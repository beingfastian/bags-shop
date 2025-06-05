export interface LoginPayload {
  email: string;
  password: string;
}
export interface GoogleLoginPayload {
  idToken: string;
}
export interface FacebookLoginPayload {
  accessToken: string;
}
export interface forgotPasswordPayload {
  email: string;
}
export interface verifyOtpPayload {
  email: string;
  otp: string;
}
export interface resetPasswordPayload {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  displayName: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}
export interface verifyOtpResponse {
  message: string;
  resetToken: string;
}
export interface SignUpResponse {
  message: string;
}

export type User = {
  first_name: string | null;
  id: number;
  name: string;
  last_name: string;

  email: string;
  role: 'admin' | 'buyer';
  profile?: string;
};

export type Token = string;

export interface AuthState {
  user: User | null;
  token: Token | null;
  isAuthenticated: boolean;
  login: (user: User, token: Token) => void;
  logout: () => void;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

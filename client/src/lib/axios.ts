import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000', // Replace with your API URL
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.maaozofficialstore.shop",
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const getToken = (): string | null => {
  try {
    const auth = localStorage.getItem('auth-storage');
    if (auth) {
      const user = JSON.parse(auth);
      return user?.state?.token || null;
    }
  } catch (err) {
    console.error('Error retrieving token:', err);
  }
  return null;
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      toast.error('please login first');
      console.error('Unauthorized: Redirecting to login...');

      setTimeout(() => {
        localStorage.clear();
        window.location.href = '/login';
      }, 3000);

      // Add logic to handle 401 errors (e.g., redirect to login)
    } else if (error.response?.status === 500) {
      console.error(
        'Server error: ',
        error.response.data.message || 'Internal Server Error'
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

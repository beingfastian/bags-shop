import axios from '@/lib/axios'; // Import the axios instance
import { applyCoupon, Coupon, CouponSchema } from '@/types/coupon'; // Adjust the import path based on your file structure

// Fetch all coupons
export const getAllCoupons = async (
  page: number,
  pageSize: number
): Promise<Coupon[]> => {
  const response = await axios.get('/coupon', {
    params: { page, pageSize },
  });
  return response.data?.data;
};

// export const getAllCoupons = async (
//   page: number,
//   pageSize: number
// ): Promise<{ data: Coupon[]; totalItems: number }> => {
//   const response = await axios.get('/coupon', {
//     params: { page, pageSize },
//   });

//   return {
//     data: response.data,
//     totalItems: response.data?.totalItems,
//   };
// };
// Fetch a single coupon by its ID
export const getSingleCoupon = async (couponId: string): Promise<Coupon> => {
  const response = await axios.get(`/coupon/${couponId}`); // Use the axios instance
  return response.data;
};

// Create a new coupon
export const createCoupon = async (
  couponData: CouponSchema
): Promise<Coupon> => {
  const response = await axios.post('/coupon', couponData); // Use the axios instance
  return response.data;
};

export const ApplyCoupon = async (couponData: applyCoupon): Promise<Coupon> => {
  const formData = new FormData();
  formData.append('coupon_code', couponData as any);
  const response = await axios.post('/cart/coupon', formData);
  return response.data;
};

// Update an existing coupon by its ID
export const updateCoupon = async (
  couponId: string,
  couponData: Partial<CouponSchema>
): Promise<Coupon> => {
  const response = await axios.put(`/coupon/${couponId}`, couponData); // Use the axios instance
  return response.data;
};

// Delete a coupon by its ID
export const deleteCoupon = async (couponId: string): Promise<Response> => {
  const response = await axios.delete(`/coupon/${couponId}`); // Use the axios instance
  return response.data;
};

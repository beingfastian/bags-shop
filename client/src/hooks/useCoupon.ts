import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// Adjust the path based on your file structure
import { applyCoupon, Coupon, CouponSchema } from '@/types/coupon'; // Adjust the import path based on your file structure
import {
  ApplyCoupon,
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
} from '@/services/api/coupon';

// Fetch all coupons with pagination
export const useCoupons = (page: number, pageSize: number) => {
  return useQuery<Coupon[], Error>({
    queryKey: ['coupons', page, pageSize],
    queryFn: () => getAllCoupons(page, pageSize),
    staleTime: 5 * 1000,
  });
};
// export const useCoupons = (page: number, pageSize: number) => {
//   return useQuery<{ data: Coupon[]; totalItems: number }, Error>({
//     queryKey: ['coupons', page, pageSize],
//     queryFn: () => getAllCoupons(page, pageSize),
//     staleTime: 5 * 1000,
//   });
// };

// Hook to get a single coupon by ID
export const useSingleCoupon = (couponId: string) => {
  return useQuery<Coupon>({
    queryKey: ['coupon', couponId],
    queryFn: () => getSingleCoupon(couponId),
    enabled: !!couponId, // Only fetch if couponId is provided
  });
};

// Hook to create a new coupon
export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CouponSchema) => createCoupon(data),
    onSuccess: () => {
      // Invalidate the 'coupons' query to refetch the list after a successful creation
      queryClient.invalidateQueries({
        queryKey: ['coupons'],
      });
    },
  });
};

export const useApplyCoupon = () => {
  return useMutation({
    mutationFn: (data: applyCoupon) => ApplyCoupon(data),
    onSuccess: (data) => {
      console.log('Coupon applied successfully', data);
    },
    onError: (error) => {
      console.error('Error applying coupon:', error);
    },
  });
};

// Hook to update an existing coupon
export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      couponId,
      data,
    }: {
      couponId: string;
      data: Partial<CouponSchema>;
    }) => updateCoupon(couponId, data),
    onSuccess: () => {
      // Invalidate the 'coupons' query to refetch the list after a successful update
      queryClient.invalidateQueries({
        queryKey: ['coupons'],
      });
    },
  });
};

// Hook to delete a coupon
export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (couponId: string) => deleteCoupon(couponId),
    onSuccess: () => {
      // Invalidate the 'coupons' query to refetch the list after a successful deletion
      queryClient.invalidateQueries({
        queryKey: ['coupons'],
      });
    },
  });
};

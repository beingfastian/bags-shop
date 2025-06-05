import { createAddress, getAllAddress } from '@/services/api/addressService';
import { ICreateAddress, Params } from '@/types/address';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAddress = ({ page, pageSize }: Params) => {
  return useQuery({
    queryKey: ['address', page, pageSize],
    queryFn: () => getAllAddress({ page, pageSize }),
  });
};

export const useSingleAddress = (Id: string) => {
  return useQuery({
    queryKey: ['order', Id],
    // queryFn: () => getSingleAddress(productId),
    queryFn: () => Id,
    enabled: !!Id,
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateAddress) => createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['address'],
      });
    },
  });
};

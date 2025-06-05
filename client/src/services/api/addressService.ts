import axios from '@/lib/axios';
import { IAddress, ICreateAddress, Params } from '@/types/address';
import { Message, Response } from '@/types/response';

export const getAllAddress = async ({
  page,
  pageSize,
}: Params): Promise<Response<IAddress>> => {
  const response = await axios.get<Response<IAddress>>('/address', {
    params: {
      page,
      pageSize,
    },
  });
  return response.data;
};

export const createAddress = async (data: ICreateAddress): Promise<Message> => {
  const response = await axios.post<Message>('/address', data);
  return response.data;
};

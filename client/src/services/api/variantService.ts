import axios from '@/lib/axios';
import { Variant, VariantSchema } from '@/types/product';
import { Message, Response } from '@/types/response';
import { uploadOne } from '../uploadService';

export const getAllVariant = async (): Promise<Response<Variant>> => {
  const response = await axios.get<Response<Variant>>('/variant');
  return (
    response.data || {
      data: [],
    }
  );
};

export const getSingleVariant = async (variant: string): Promise<Variant> => {
  const response = await axios.get<Variant>(`/variant/${variant}`);
  return response.data;
};

export const updateVariant = async ({
  id,
  color,
  image,
  price,
  size,
  stock,
  discount,
}: VariantSchema): Promise<Message> => {
  let url: string = '';

  if (typeof image === 'string') {
    url = image;
  } else {
    const data = await uploadOne({ file: image });
    url = data?.data;
  }

  const response = await axios.put<Message>(`/variant/${id}`, {
    color,
    image: url,
    price,
    size,
    stock,
    discount,
  });
  return response.data;
};
export const addVariant = async ({
  image,
  ...otherData
}: VariantSchema): Promise<Message> => {
  let url: string = '';

  if (typeof image === 'string') {
    url = image;
  } else {
    const data = await uploadOne({ file: image });
    url = data?.data;
  }

  const response = await axios.post<Message>(`/variant`, {
    ...otherData,
    image: url,
  });
  return response.data;
};

export const getDeleteVariant = async (
  variantId: string | string[]
): Promise<Message> => {
  if (Array.isArray(variantId)) {
    await Promise.all(
      variantId.map((id) => axios.delete<Message>(`/variant/${id}`))
    );
    return { success: true, message: 'variant deleted successfully' };
  } else {
    await axios.delete<Message>(`/variant/${variantId}`);
    return { success: true, message: 'variant deleted successfully' };
  }
};

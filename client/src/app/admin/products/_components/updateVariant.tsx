'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import Spinner from '@/app/components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import Input from '@/app/components/Input';
import ImageUpload from '@/components/ImageUploader';
import { Variant } from '@/types/product';
import { useUpdateVariant } from '@/hooks/useVariant';

const variantSchema = yup.object().shape({
  color: yup.string().optional(),
  size: yup.string().optional(),
  price: yup.number().positive().optional(),
  discount: yup.number().optional(),
  stock: yup.number().optional(),
  image: yup.mixed().required('image is required'),
});

interface Props {
  data?: Variant;
  onClose?: () => void;
}

const UpdateVariant = ({ data, onClose }: Props) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useUpdateVariant();

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(variantSchema),
    defaultValues :{
      discount:0,
    }
  });

  useEffect(() => {
    reset({
      color: data?.color || '',
      image: data?.image,
      discount:data?.discount,
      size: data?.size || '',
      ...(data?.price ? { price: data?.price } : {}),
      ...(data?.stock ? { stock: data?.stock } : {}),
    });
  }, [data]);

  const onSubmit = async (update: any) => {
    try {
      await mutateAsync({ ...update, id: data?.id || '' });

      Swal.fire({
        title: 'Success',
        text: 'product added successfully',
        icon: 'success',
      });
      onClose?.();
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };
  const handleError = (error: any) => {
    console.log('Form Errors: ', error);
  };
  return (
    <div className="w-full ">
      <div className="border rounded-lg mb-4 overflow-y-auto h-[350px]">
        <div className="w-full flex flex-wrap mb-4 mt-2">
          <div className="md:w-1/2 w-full px-2">
            <label className="text-sm font-normal text-[#5A607F]">
              <div className="flex items-center gap-1">
                <p className="my-1">Colour</p>
              </div>
            </label>
            <Input
              type="text"
              // name="color"
              name={`color`}
              register={register as any}
              errors={errors as any}
              placeholder="Enter Color"
            />
          </div>

          <div className="md:w-1/2 w-full px-2">
            <label className="text-sm font-normal text-[#5A607F]">
              <div className="flex items-center gap-1">
                <p className="my-1">Quantity</p>
              </div>
            </label>
            <Input
              type="text"
              name="stock"
              register={register as any}
              errors={errors as any}
              placeholder="Enter Quantity"
            />
          </div>
        </div>
        <div className="w-full flex flex-wrap my-4">
          <div className="md:w-1/2 w-full px-2">
            <label className="text-sm font-normal text-[#5A607F]">
              <div className="flex items-center gap-1">
                <p className="my-1">Size</p>
              </div>
            </label>
            <Input
              type="text"
              name="size"
              register={register as any}
              errors={errors as any}
              placeholder="Enter Size"
            />
          </div>

          <div className="md:w-1/2 w-full px-2">
            <label className="text-sm font-normal text-[#5A607F]">
              <div className="flex items-center gap-1">
                <p className="my-1">Price</p>
              </div>
            </label>
            <Input
              type="text"
              name="price"
              register={register as any}
              errors={errors as any}
              placeholder="Enter Price"
            />
          </div>

          <div className="md:w-1/2 w-full px-2">
            <label className="text-sm font-normal text-[#5A607F]">
              <div className="flex items-center gap-1">
                <p className="my-1">Discount</p>
              </div>
            </label>
            <Input
              type="number"
              name="discount"
              register={register as any}
              errors={errors as any}
              placeholder="Enter dicount"
              max='100'
              min='0'
            />
          </div>
        </div>
        <div className="w-full p-2">
          <p className="mb-4 font-bold text-base">Images</p>
          <ImageUpload
            control={control}
            className=""
            name={`image`}
            defaultValue={watch('image') as any}
          />
        </div>
      </div>

      <div className="w-full flex gap-4 justify-end p-4 my-2 items-center">
        <button
          onClick={() => router.push('/admin/products')}
          className="border border-gray-300 px-4 rounded py-2"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit(onSubmit, handleError)}
          className="bg-primary text-white rounded px-4 py-2"
        >
          {isPending ? <Spinner /> : 'Submit'}
        </button>
      </div>
    </div>
  );
};
export default UpdateVariant;

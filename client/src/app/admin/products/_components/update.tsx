'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUpdateProduct } from '@/hooks/useProducts';
import { useCategory } from '@/hooks/useCategory';
import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';
import Spinner from '@/app/components/LoadingSpinner';
import Input from '@/app/components/Input';
import { Product } from '@/types/product';
const Dropdown = dynamic(() => import('@/app/components/Dropdown'), {
  ssr: false,
});
const productSchema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  description: yup.string().required('Product description is required'),
  price: yup.number().positive().required('Product price is required'),
  quantity: yup.number().required('quantity is required'),
  discount: yup.number().optional(),
  gender: yup.string().required('Gender is required'),
  category: yup.string().required('Category is required'),
  tags: yup.array().of(yup.string()),
});

const options = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Both', value: 'both' },
];

interface Props {
  data?: Product;
  onClose?: () => void;
}

const UpdateProduct = ({ data, onClose }: Props) => {
  const { mutateAsync, isPending } = useUpdateProduct();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  useEffect(() => {
    reset({
      category: data?.category_id,
      description: data?.description,
      discount: data?.discount,
      gender: data?.gender,
      name: data?.name,
      price: data?.price,
      quantity: data?.stock,
    });
  }, [data]);

  const { data: categories } = useCategory();

  const onSubmit = async ({
    name,
    description,
    price,
    discount,
    category,
    gender,
    quantity,
  }: any) => {
    try {
      await mutateAsync({
        id: data?.id || '',
        name,
        description,
        price,
        discount,
        category,
        gender,
        stock: quantity,
      });

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
      {/* <div className="w-full bg-slate-50"> */}
      <div className="flex flex-wrap items-start shadow-md  w-full overflow-y-auto h-[350px]">
        <div className="w-full rounded-[6px] bg-white shadow-lg p-4 ">
          <div className="w-full ">
            <label
              htmlFor=""
              className="text-sm font-normal font-OpenSans text-[#5A607F]"
            >
              <div className="flex items-center w-full gap-1">
                <p className="my-1">Category</p>
              </div>
            </label>
            <Dropdown
              options={
                categories?.map((item) => ({
                  label: item?.name,
                  value: item?.id,
                })) || []
              }
              placeholder={data?.Category?.name}
              onSelect={(selectedOption) => {
                setValue('category', selectedOption);
              }}
              className="!w-full"
              dropdownClassName="!rounded-[4px] !border !border-[#D9E1EC] !py-[7px] !md:w-0 !w-full !mt-0"
              optionlabelClassName="!text-gray-600 !placeholder-gray-100"
            />
          </div>
          <div className="w-full mt-2">
            <label
              htmlFor="username"
              className="text-sm font-normal font-OpenSans text-[#5A607F]"
            >
              <div className="flex items-center w-full gap-1">
                <p className="my-1">Product Name</p>
              </div>
            </label>
            <Input
              type="text"
              placeholder="Product Name"
              name="name"
              register={register as any}
              errors={errors as any}
              errorClass={'!text-[11px] -bottom-[19px] '}
            />
          </div>
          <div className="w-full mt-2">
            <label
              htmlFor="description"
              className="text-sm font-normal font-OpenSans text-[#5A607F]"
            >
              <div className="flex items-center w-full gap-1">
                <p className="my-1">Product Description</p>
              </div>
            </label>
            <textarea
              className="px-2 py-1 w-full rounded border text-black focus:outline-none focus:border-blue-300 placeholder:font-OpenSans placeholder:text-[#A1A7C4]}"
              placeholder="Product description"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="w-full flex flex-wrap">
            <div className="md:w-1/2 w-full px-2 ">
              <label
                htmlFor="username"
                className="text-sm font-normal font-OpenSans text-[#5A607F]"
              >
                <div className="flex items-center w-full gap-1">
                  <p className="my-1">Product Price</p>
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
              <label
                htmlFor="username"
                className="text-sm font-normal font-OpenSans text-[#5A607F]"
              >
                <div className="flex items-center w-full gap-1">
                  <p className="my-1">Discount Price</p>
                </div>
              </label>
              <Input
                type="text"
                name="discount"
                register={register as any}
                errors={errors as any}
                placeholder="Discount at percentage (%)"
              />
            </div>
          </div>
          <div className="w-full flex flex-wrap">
            <div className="md:w-1/2 w-full px-2 ">
              <label
                htmlFor="username"
                className="text-sm font-normal font-OpenSans text-[#5A607F]"
              >
                <div className="flex items-center w-full gap-1">
                  <p className="my-1">Quantity</p>
                </div>
              </label>
              <Input
                type="text"
                name="quantity"
                register={register as any}
                errors={errors as any}
                placeholder="Enter quantity"
              />
            </div>
            <div className="md:w-1/2 w-full px-2 ">
              <label
                htmlFor=""
                className="text-sm font-normal font-OpenSans text-[#5A607F]"
              >
                <div className="flex items-center w-full gap-1">
                  <p className="my-1">Gender</p>
                </div>
              </label>
              <Dropdown
                options={options}
                placeholder={watch('gender')}
                onSelect={(selectedOption) => {
                  setValue('gender', selectedOption);
                }}
                className="!w-full"
                dropdownClassName="!rounded-[4px] !border !border-[#D9E1EC] !py-[7px] !md:w-0 !w-full !mt-0"
                optionlabelClassName="!text-gray-600 !placeholder-gray-100"
              />
            </div>
            <div className="w-full flex gap-4 justify-end p-4 items-center">
              <button className="border bg-slate-100 hover:bg-slate-300 border-gray-300 px-4 rounded py-2">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit, handleError)}
                className="bg-primary hover:bg-blue-950 text-white rounded px-4 py-2"
              >
                {isPending ? <Spinner /> : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateProduct;

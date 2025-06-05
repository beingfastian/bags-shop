'use client';
import React, { useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { DeletProduct, Dots, Edit, Plus } from './Icons';

import Image from 'next/image';
import Modal from './Modal';
import ToggleSwitch from './ToggleButton';
import Input from './Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ImageUpload from './ImageUpload';
import FileUpload from './FileUpload';
const productSchema = yup.object().shape({
  categoryName: yup.string().required('categoryName is required'),
});
const BagsWomen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const WomenBags = [
    {
      image: '/product-image-lady.png',
      title: 'Women bridle bag',
    },
    {
      image: '/product-image-lady.png',
      title: 'Women bridle bag',
    },
    {
      image: '/shoping-bag.png',
      title: 'Women bridle bag',
    },
    {
      image: '/product-image-lady.png',
      title: 'Women bridle bag',
    },
    {
      image: '/product-image-lady.png',
      title: 'Women bridle bag',
    },
    {
      image: '/product-image-lady.png',
      title: 'Women bridle bag',
    },
    {
      image: '/product-image-lady.png',
      title: 'Women bridle bag',
    },
    {
      image: '/product-image-lady.png',
      title: 'Women bridle bag',
    },
    {
      image: '/product-image-lady.png',
      title: 'Women bridle bag',
    },
    {
      image: '/product-image-lady.png',
      title: 'Women bridle bag',
    },
    {
      image: '/product-image-lady.png',
      title: 'Women bridle bag',
    },
    {
      image: '/product-image-lady.png',
      title: 'Women bridle bag',
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });
  return (
    <div className="w-full bg-[#fff6f4]   px-8">
      <button className="flex  items-center justify-center font-OpenSans font-normal text-sm text-[#5A607F] leading-5 pt-3">
        <FaArrowLeftLong />
        <p> Back</p>
      </button>
      <h1 className="font-OpenSans font-bold text-2xl text-[#131523] leading-9 mb-4 ">
        Women Bags
      </h1>
      {/* main dev for products and buttons */}
      <div className="w-full  flex flex-col lg:flex-row  gap-5 ">
        {/* products dev */}
        <div className=" w-full lg:w-[70%] bg-white rounded-md px-5 pb-5">
          <p className="text-base font-OpenSans font-bold text-[#131523] leading-6 py-5">
            Products{' '}
            <span className="font-normal text-sm text-[#5A607F] leading-5">
              12
            </span>{' '}
          </p>
          <div className="flex flex-col gap-2">
            {/* delet and edit button  */}
            <div className="flex flex-col items-center justify-center gap-2">
              {WomenBags.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between py-2 rounded border border-gray-100 px-3"
                >
                  {/* 1st card */}
                  <div className="flex items-center gap-3">
                    <Dots />
                    <Image
                      src={item?.image}
                      width={48}
                      height={48}
                      alt="lady.png"
                    ></Image>
                    <h1 className="text-sm font-semibold font-OpenSans text-[#131523] leading-5">
                      {item?.title}
                    </h1>
                  </div>
                  {/* 2nd card */}
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => setIsModalOpen(true)}
                      className="cursor-pointer"
                    >
                      <Edit />
                    </div>
                    <DeletProduct />
                  </div>
                  <Modal
                    show={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    modalContainer="w-1/2"
                  >
                    <FileUpload />
                  </Modal>
                </div>
              ))}
            </div>

            <div className="w-full flex items-center justify-center  py-2 rounded border border-gray-100 px-3">
              <button className="flex items-center justify-center gap-3">
                <Plus />

                <h1 className="text-base font-medium font-Inter text-[#1E5EFF] leading-5">
                  Add Product
                </h1>
              </button>
            </div>
          </div>
        </div>
        {/* toggle right side buttons */}
        <div className="w-full lg:w-[30%]">
          <div className="bg-white shadow-sm rounded-md flex flex-col px-5 py-5 gap-5 ">
            <h1 className="font-OpenSans font-bold text-base text-[#131523]">
              Category visibility
            </h1>
            <ToggleSwitch
              label="visible on site"
              bgColor="bg-[#D9E4FF]"
              checkedBgColor="bg-blue-500"
              dotColor="bg-white"
              textColor="text-black"
              checked={isChecked}
              onChange={(checked) => setIsChecked(checked)}
            />
          </div>
          {/* copy this dev  */}
          <div className="w-full mt-3 bg-white shadow-sm rounded-md px-5 py-5">
            <div className="w-full mt-2">
              <label
                htmlFor="username"
                className="text-sm font-normal font-OpenSans text-[#5A607F]"
              >
                <h1 className="font-OpenSans font-bold text-base text-[#131523] mb-4">
                  Category info
                </h1>
                <div className="flex items-center w-full  gap-1">
                  <p className="font-OpenSans font-normal text-sm text-[#5A607F]  leading-5 my-1">
                    category name
                  </p>
                </div>
              </label>
              <Input
                type="text"
                placeholder="leather bags"
                name="productName"
                register={register as any}
                errors={errors as any}
                errorClass={'!text-[11px] -bottom-[19px] '}
              />
            </div>
            <div className="w-full mt-2">
              <p className="font-OpenSans font-normal mt-3 text-sm text-[#5A607F] mb-1 leading-5">
                Image
              </p>
              <ImageUpload control={control} className="!p-12" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-end border-t font-OpenSans font-semibold text-sm  gap-2  py-3 border-gray-300 mt-1">
        <button className="bg-white text-[#1E5EFF] py-1 px-4 border border-gray-200 rounded">
          Cancel
        </button>
        <button className="bg-[#1E5EFF] text-white py-1 px-4 border border-gray-200 rounded">
          Save
        </button>
      </div>
    </div>
  );
};

export default BagsWomen;

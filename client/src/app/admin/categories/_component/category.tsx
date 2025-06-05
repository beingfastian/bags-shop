'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Modal = dynamic(() => import('@/app/components/Modal'), { ssr: false });

import { useCreateCategory, useDeleteCategory } from '@/hooks/useCategory';
import { useCategory } from '@/hooks/useCategory';
import { Category } from '@/types/category';
import UpdateCategory from './UpdateCategory';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { DeleteIcon } from 'lucide-react';
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationMode';

const schema = yup.object().shape({
  name: yup.string().required('Category name is required'),
  icon: yup.mixed().required('Category icon is required'),
});

export default function CategoryPage() {
  const { mutateAsync } = useCreateCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmed, setIsConFirmed] = useState(false);
  const [selectCategory, setSelectedCategory] = useState('');

  const { data, refetch } = useCategory();
  const { mutateAsync: deleteCateogy } = useDeleteCategory();

  const onSubmit = async (data: any) => {
    try {
      console.log(data, 'test');
      const response = await mutateAsync({
        icon: data?.icon?.[0],
        name: data?.name,
      });
      setIsAddModalOpen(false);
      refetch();

      Swal.fire({
        title: 'Success',
        text: response?.message || 'Category added successfully',
        icon: 'success',
      });
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'Some thing went wrong',
        icon: 'error',
      });
    }
  };

  const onUpdate = (id: string) => {
    setIsModalOpen(true);
    setSelectedCategory(id);
  };

  const [itemToDelete, setItemToDelete] = useState<any>(null);

  useEffect(() => {
    const deleteItem = async () => {
      if (isConfirmed && itemToDelete) {
        await deleteCateogy(itemToDelete);
        refetch();
        setIsConFirmed(false);
        setItemToDelete(null);
      }
    };

    deleteItem();
  }, [isConfirmed]);

  const handleDelete = (id: any) => {
    setItemToDelete(id);
    setShowConfirmationModal(true);
  };

  const handleConfirmationModal = () => {
    setIsConFirmed(true);
    setShowConfirmationModal(false);
  };

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="flex flex-col xxs:flex-row justify-between pb-6 pt-0">
        <h1 className="text-2xl font-bold w-[128px] h-[36px] text-[#131523]">
          Categories
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="text-white bg-[#1E5EFF] font-semibold text-sm xxs:text-base rounded-sm py-1 px-1 xxs:px-3 xxs:h-[40px] max-w-[130px] xxs:min-w-[170px]"
        >
          + Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data &&
          data?.map((category: Category, index: any) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg flex flex-col relative group"
            >
              <div className="relative w-full h-[240px]">
                {category?.icon ? (
                  <Image
                    src={category.icon}
                    alt={`Image of ${category.name}`}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                ) : null}
                <div className="absolute flex gap-3 inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-t-lg">
                  <button
                    className="text-[#1E5EFF] bg-white py-1 pl-4 pr-6 rounded-sm flex"
                    onClick={() => handleDelete(category?.id)}
                  >
                    <DeleteIcon />
                    <span> Delete </span>
                  </button>

                  <button
                    className="text-[#1E5EFF] bg-white py-1 pl-4 pr-6 rounded-sm flex"
                    onClick={() => onUpdate(category?.id)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19 19C19.5523 19 20 19.4477 20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20C4 19.4477 4.44772 19 5 19H19ZM18.003 3.58492L19.4151 4.99703C20.195 5.77692 20.195 7.04137 19.4151 7.82126L11.1778 16.0586C11.025 16.2114 10.8268 16.3105 10.6129 16.341L6 17L6.65899 12.3871C6.68954 12.1732 6.78864 11.975 6.94141 11.8222L15.1787 3.58492C15.9586 2.80503 17.2231 2.80503 18.003 3.58492ZM16.5909 4.99703L8.58911 12.9988L8.35399 14.646L10.0012 14.4109L18.003 6.40914L16.5909 4.99703Z"
                        fill="#1E5EFF"
                      />
                    </svg>
                    <span> Edit </span>
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mt-2 pl-[28px] text-[16px] font-bold">
                {category.name}
              </p>
              <p className="text-gray-600 pl-[28px] text-[14px] font-normal pb-4">
                {category.name}
              </p>
            </div>
          ))}
      </div>

      <DeleteConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmationModal}
        message="Are you sure you want to delete this item? This action cannot be undone."
      />

      <UpdateCategory
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        id={selectCategory}
      />
      <Modal
        show={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        modalContainer="w-1/2"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-4 flex w-full flex-col">
            <h1 className="flex justify-start w-full pb-2 font-medium">
              Add Category
            </h1>

            {/* Category Name */}
            <div className="w-full mb-4">
              <label
                htmlFor="titleInput"
                className="block text-sm font-normal text-gray-400 mb-2"
              >
                Category Name
              </label>
              <input
                type="text"
                {...register('name')}
                placeholder="Enter title"
                className="border rounded w-full py-2 px-3"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div className="w-full mb-4">
              <label
                htmlFor="imageUpload"
                className="block text-sm font-normal text-gray-400 mb-2"
              >
                Upload Image
              </label>
              <input
                type="file"
                {...register('icon')}
                // accept="image/*"
                className="border rounded w-full py-2 px-3"
              />
            </div>

            {/* Action Buttons */}
            <div className="w-full flex gap-2 my-6 justify-end">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="border border-gray-300 py-1 px-4 rounded text-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 py-1 px-8 rounded text-white"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

// 'use client';

// import React, { useEffect } from 'react';
// import dynamic from 'next/dynamic';

// const ImageUpload = dynamic(() => import('@/components/ImageUploader'), {
//   ssr: false,
// });
// const Input = dynamic(() => import('@/app/components/Input'), { ssr: false });
// const Modal = dynamic(() => import('@/app/components/Modal'), { ssr: false });

// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useSingleCategory } from '@/hooks/useCategory';

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   id: string;
// }

// const schema = yup.object().shape({
//   name: yup.string().required('Category name is required'),
//   icon: yup
//     .mixed()
//     .required('Category icon is required')
//     .test('is-valid-type', 'Icon must be a string or a file', (value) => {
//       return typeof value === 'string' || value instanceof File;
//     }),
// });

// function UpdateCategory({ open, onClose, id }: Props) {
//   const { data } = useSingleCategory(id);
//   const {
//     control,
//     register,
//     // handleSubmit,
//     reset,
//     formState: { errors },
//     watch,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   useEffect(() => {
//     reset({
//       name: data?.name,
//       icon: data?.icon,
//     });
//   }, [data]);

//   // const onSubmit = ({ name, icon }: any) => {};

//   return (
//     <Modal show={open} onClose={onClose} modalContainer="w-1/2">
//       <div className="px-4 flex w-full flex-col">
//         <h1 className="flex justify-start w-full pb-2 font-medium">
//           Edit Category
//         </h1>
//         <div className="w-full">
//           <div className="mb-4">
//             <label
//               htmlFor="titleInput"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Title
//             </label>
//             <Input
//               type="text"
//               name="title"
//               register={register as any}
//               errors={errors as any}
//               placeholder="Enter title"
//               defaultValue={watch('name')}
//             />
//           </div>
//         </div>
//         <div>
//           <ImageUpload
//             control={control}
//             className="py-4"
//             name={`icon`}
//             defaultValue={watch('icon') as any}
//           />
//         </div>
//         <div className="w-full items-center flex gap-2 my-2 justify-end">
//           <button
//             onClick={onClose}
//             className="border border-gray-300 py-1 px-4 rounded text-black"
//           >
//             Cancel
//           </button>
//           <button className="bg-blue-500 py-1 px-4 rounded text-white">
//             Update
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// export default UpdateCategory;

'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  useSingleCategory,
  useEditCategory,
  useCategory,
} from '@/hooks/useCategory';
import Swal from 'sweetalert2';

const ImageUpload = dynamic(() => import('@/components/ImageUploader'), {
  ssr: false,
});
const Input = dynamic(() => import('@/app/components/Input'), { ssr: false });
const Modal = dynamic(() => import('@/app/components/Modal'), { ssr: false });

interface Props {
  open: boolean;
  onClose: () => void;
  id: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Category name is required'),
  icon: yup
    .mixed()
    .required('Category icon is required')
    .test('is-valid-type', 'Icon must be a string or a file', (value) => {
      return typeof value === 'string' || value instanceof File;
    }),
});

function UpdateCategory({ open, onClose, id }: Props) {
  const { data } = useSingleCategory(id);
  const editCategoryMutation = useEditCategory();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name,
        icon: data?.icon,
      });
    }
  }, [data, reset]);
  const { refetch } = useCategory();

  const onSubmit = async (formData: any) => {
    const { name, icon } = formData;

    editCategoryMutation.mutate(
      { categoryId: id, name, icon },
      {
        onSuccess: () => {
          Swal.fire({
            title: 'Category update sucessfully',

            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
          });
          refetch();
          reset();
          onClose();
        },
        onError: (error) => {
          console.error('Failed to update category:', error);
          Swal.fire({
            title: 'Failed to update category',
            text:
              error?.message ||
              'There was an error creating your account. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      }
    );
  };

  return (
    <Modal show={open} onClose={onClose} modalContainer="w-1/2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-4 flex w-full flex-col">
          <h1 className="flex justify-start w-full pb-2 font-medium">
            Edit Category
          </h1>

          {/* Title Input */}
          <div className="w-full mb-4">
            <label
              htmlFor="titleInput"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <Input
              type="text"
              name="name"
              register={register as any}
              errors={errors as any}
              placeholder="Enter category name"
              defaultValue={watch('name')}
            />
          </div>

          {/* Image Upload */}
          <div className="py-4">
            <ImageUpload
              control={control}
              className="py-4"
              name="icon"
              defaultValue={watch('icon') as any}
            />
          </div>

          {/* Buttons */}
          <div className="w-full items-center flex gap-2 my-2 justify-end">
            <button
              onClick={onClose}
              type="button"
              className="border border-gray-300 py-1 px-4 rounded text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 py-1 px-4 rounded text-white"
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default UpdateCategory;

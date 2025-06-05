// 'use client';

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import Swal from 'sweetalert2';
// import Spinner from '@/app/components/LoadingSpinner';
// import { useRouter } from 'next/navigation';
// import Input from '@/app/components/Input';
// import ImageUpload from '@/components/ImageUploader';
// import { useAddVariant } from '@/hooks/useVariant';

// const variantSchema = yup.object().shape({
//   color: yup.string().optional(),
//   size: yup.string().optional(),
//   price: yup.number().positive().optional(),
//   discount: yup.number().optional(),
//   stock: yup.number().optional(),
//   image: yup.mixed().required('image is required'),
// });

// interface Props {
//   product_id: string;
//   onClose?: () => void;
// }

// const AddVariant = ({ product_id, onClose }: Props) => {
//   const router = useRouter();
//   const { mutateAsync, isPending } = useAddVariant();

//   const {
//     control,
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(variantSchema),
//   });

//   const onSubmit = async (update: any) => {
//     try {
//       await mutateAsync({ ...update, product_id });
//       reset();
//       Swal.fire({
//         title: 'Success',
//         text: 'added successfully',
//         icon: 'success',
//       });
//       onClose?.();
//     } catch (error) {
//       console.error('Failed to create:', error);
//     }
//   };
//   const handleError = (error: any) => {
//     console.log('Form Errors: ', error);
//   };
//   return (
//     <div className="w-full">
//       <div className="border rounded-lg mb-4">
//         <div className="w-full flex flex-wrap mb-4 mt-2">
//           <div className="md:w-1/2 w-full px-2">
//             <label className="text-sm font-normal text-[#5A607F]">
//               <div className="flex items-center gap-1">
//                 <p className="my-1">Color</p>
//               </div>
//             </label>
//             <Input
//               type="text"
//               // name="color"
//               name={`color`}
//               register={register as any}
//               errors={errors as any}
//               placeholder="Enter Color"
//             />
//           </div>

//           <div className="md:w-1/2 w-full px-2">
//             <label className="text-sm font-normal text-[#5A607F]">
//               <div className="flex items-center gap-1">
//                 <p className="my-1">Quantity</p>
//               </div>
//             </label>
//             <Input
//               type="text"
//               name="stock"
//               register={register as any}
//               errors={errors as any}
//               placeholder="Enter Quantity"
//             />
//           </div>
//         </div>
//         <div className="w-full flex flex-wrap my-4">
//           <div className="md:w-1/2 w-full px-2">
//             <label className="text-sm font-normal text-[#5A607F]">
//               <div className="flex items-center gap-1">
//                 <p className="my-1">Size</p>
//               </div>
//             </label>
//             <Input
//               type="text"
//               name="size"
//               register={register as any}
//               errors={errors as any}
//               placeholder="Enter Size"
//             />
//           </div>

//           <div className="md:w-1/2 w-full px-2">
//             <label className="text-sm font-normal text-[#5A607F]">
//               <div className="flex items-center gap-1">
//                 <p className="my-1">Price</p>
//               </div>
//             </label>
//             <Input
//               type="text"
//               name="price"
//               register={register as any}
//               errors={errors as any}
//               placeholder="Enter Price"
//             />
//           </div>

//           <div className="md:w-1/2 w-full px-2">
//             <label className="text-sm font-normal text-[#5A607F]">
//               <div className="flex items-center gap-1">
//                 <p className="my-1">Discount</p>
//               </div>
//             </label>
//             <Input
//               type="number"
//               name="discount"
//               register={register as any}
//               errors={errors as any}
//               placeholder="Enter dicount"
//               min='0'
//               max='100'
//             />
//           </div>
//         </div>
//         <div className="w-full p-2">
//           <p className="mb-4 font-bold text-base">Images</p>
//           <ImageUpload
//             control={control}
//             className=""
//             name={`image`}
//             defaultValue={watch('image') as any}
//           />
//         </div>
//       </div>

//       <div className="w-full flex gap-4 justify-end p-4 my-2 items-center">
//         <button
//           onClick={() => router.push('/admin/products')}
//           className="border border-gray-300 px-4 rounded py-2"
//         >
//           Cancel
//         </button>
//         <button
//           type="button"
//           onClick={handleSubmit(onSubmit, handleError)}
//           className="bg-blue-500 text-white rounded px-4 py-2"
//         >
//           {isPending ? <Spinner /> : 'Submit'}
//         </button>
//       </div>
//     </div>
//   );
// };
// export default AddVariant;




'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import Spinner from '@/app/components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import Input from '@/app/components/Input';
import ImageUpload from '@/components/ImageUploader';
import { useAddVariant } from '@/hooks/useVariant';

const variantSchema = yup.object().shape({
  color: yup.string().optional(),
  size: yup.string().optional(),
  price: yup.number().positive().optional(),
  discount: yup.number().optional(),
  stock: yup.number().optional(),
  image: yup.mixed().required('image is required'),
});

interface Props {
  product_id: string;
  onClose?: () => void;
}

const AddVariant = ({ product_id, onClose }: Props) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useAddVariant();

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(variantSchema),
    defaultValues:{
    discount:0,
    }
  });

  const onSubmit = async (update: any) => {
    try {
      await mutateAsync({ ...update, product_id });
      reset();
      Swal.fire({
        title: 'Success',
        text: 'Variant added successfully',
        icon: 'success',
      });
      onClose?.();
    } catch (error) {
      console.error('Failed to create:', error);
    }
  };

  const handleError = (error: any) => {
    console.log('Form Errors:', error);
  };

  return (
    <div className="w-full max-w-4xl mx-auto  bg-white rounded-lg shadow-lg">
      {/* <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Variant</h2> */}
      <div className="border rounded-lg p-6 bg-gray-50 h-[350px] overflow-y-auto">
        <div className="w-full flex flex-wrap mb-4">
          <div className="md:w-1/2 w-full px-2 mb-4">
            <label className="text-sm font-medium text-gray-700">
              Colour
            </label>
            <Input
              type="text"
              name="color"
              register={register as any}
              errors={errors as any}
              placeholder="Enter Color"
              className="mt-1"
            />
          </div>

          <div className="md:w-1/2 w-full px-2 mb-4">
            <label className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <Input
              type="text"
              name="stock"
              register={register as any}
              errors={errors as any}
              placeholder="Enter Quantity"
              className="mt-1"
            />
          </div>
        </div>
        <div className="w-full flex flex-wrap mb-4">
          <div className="md:w-1/2 w-full px-2 mb-4">
            <label className="text-sm font-medium text-gray-700">
              Size
            </label>
            <Input
              type="text"
              name="size"
              register={register as any}
              errors={errors as any}
              placeholder="Enter Size"
              className="mt-1"
            />
          </div>

          <div className="md:w-1/2 w-full px-2 mb-4">
            <label className="text-sm font-medium text-gray-700">
              Price
            </label>
            <Input
              type="text"
              name="price"
              register={register as any}
              errors={errors as any}
              placeholder="Enter Price"
              className="mt-1"
            />
          </div>

          <div className="md:w-1/2 w-full px-2 mb-4">
            <label className="text-sm font-medium text-gray-700">
              Discount (%)
            </label>
            <Input
              type="number"
              name="discount"
              register={register as any}
              errors={errors as any}
              placeholder="Enter Discount"
              min="0"
              max="100"
              className="mt-1"
            />
          </div>
        </div>
        <div className="w-full px-2">
          <label className="text-sm font-medium text-gray-700">
            Images
          </label>
          <ImageUpload
            control={control}
            className="mt-1"
            name="image"
            defaultValue={watch('image') as any}
          />
        </div>
      </div>

      <div className="w-full flex gap-4 justify-end py-2 bg-gray-100 items-strat">
        <button
          onClick={() => router.push('/admin/products')}
          className="border border-gray-300 px-6 py-2 rounded-lg text-gray-700 bg-gray-100  hover:bg-gray-300 transition duration-200"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit(onSubmit, handleError)}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-950 transition duration-200"
        >
          {isPending ? <Spinner /> : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default AddVariant;
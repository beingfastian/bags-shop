// 'use client';
// import React, { useState } from 'react';
// import Input from './Input';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import {
//   FixedDiscount,
//   FreeShipping,
//   PercentageDiscount,
//   PriceDiscount,
// } from './Icons';
// import { useCreateCoupon } from '@/hooks/useCoupon';
// import Swal from 'sweetalert2';
// import Spinner from './LoadingSpinner';
// import { useRouter } from 'next/navigation';

// // Define types for the discount and coupon categories
// type DiscountType = 'Fixed Discount' | 'Percentage Discount';
// type CouponType = 'Shipping Discount' | 'Price Discount';

// // Array of available discount options (Fixed/Percentage)
// const couponDiscounts = [
//   { type: 'Fixed Discount', icon: <FixedDiscount /> },
//   { type: 'Percentage Discount', icon: <PercentageDiscount /> },
// ];

// // Array of available coupon types (Shipping/Price)
// const couponTypes = [
//   { type: 'Shipping Discount', icon: <FreeShipping /> },
//   { type: 'Price Discount', icon: <PriceDiscount /> },
// ];

// // Define the schema using Yup
// const productSchema = yup
//   .object({
//     code: yup.string().required('Coupon Code is required'),
//     couponName: yup.string().required('Coupon Name is required'),
//     discountValue: yup
//       .number()
//       .required('Discount Value is required')
//       .positive('Must be a positive number'),
//     start_date: yup.date().required('Start date is required'),
//     end_date: yup.date().required('End date is required'),
//     couponType: yup.string().required('Coupon Type is required'),
//     usageLimits: yup.number(),
//   })
//   .required();

// const CreateCouponsComponent = () => {
//   const router = useRouter();
//   const [selectedDiscountType, setSelectedDiscountType] =
//     useState<DiscountType | null>(null);
//   const [selectedCouponType, setSelectedCouponType] =
//     useState<CouponType | null>(null);

//   const { mutateAsync, isPending } = useCreateCoupon();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     reset,
//   } = useForm({
//     resolver: yupResolver(productSchema),
//   });

//   const handleDiscountSelect = (
//     type: DiscountType,
//     event: React.MouseEvent
//   ) => {
//     event.preventDefault();
//     setSelectedDiscountType(type);
//     setValue('couponType', type);
//   };

//   const handleCouponTypeSelect = (
//     type: CouponType,
//     event: React.MouseEvent
//   ) => {
//     event.preventDefault();
//     setSelectedCouponType(type);
//     setValue('couponType', type);
//   };

//   const onSubmit = async (data: any) => {
//     const formattedData = {
//       code: data.code,
//       name: data.couponName,
//       discount_value: data.discountValue,
//       start_date: data.start_date,
//       end_date: data.end_date,
//       usage_limit: data.usageLimits || undefined,
//       type:
//         data.couponType === 'Price Discount'
//           ? 'price'
//           : data.couponType === 'Shipping Discount'
//             ? 'delivery'
//             : undefined,
//       is_percentage: data.couponType === 'Percentage Discount' ? true : false,
//       status: 'active',
//     };

//     try {
//       await mutateAsync(formattedData as any);
//       Swal.fire({
//         title: 'Success',
//         text: 'Coupon created successfully',
//         icon: 'success',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       reset();
//     } catch  {
//       Swal.fire({
//         title: 'Error',
//         text: 'Something went wrong',
//         icon: 'error',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     }
//   };

//   const handleError = (error: any) => {
//     console.log('Form Errors:', error);
//   };

//   return (
//     <div className="w-full">
//       <div className="w-full px-4 py-6">
//         <h3 className="font-OpenSans text-2xl font-bold py-2">Create Coupon</h3>
//         <form
//           onSubmit={handleSubmit(onSubmit, handleError)}
//           className="flex flex-wrap items-start w-full"
//         >
//           <div className="w-full rounded-[6px] bg-white shadow-sm p-4">
//             <h3 className="font-OpenSans text-base font-bold">
//               Coupon Information
//             </h3>
//             <p className="font-OpenSans text-sm font-normal text-[#5A607F]">
//               Code will be used by users in checkout
//             </p>
//             <div className="w-full flex flex-wrap my-4">
//               <div className="md:w-1/2 w-full px-2">
//                 <label
//                   htmlFor="couponCode"
//                   className="text-sm font-normal font-OpenSans text-[#5A607F]"
//                 >
//                   <div className="flex items-center w-full gap-1">
//                     <p className="my-1">Coupon Code</p>
//                   </div>
//                 </label>
//                 <Input
//                   type="text"
//                   name="code"
//                   register={register as any}
//                   errors={errors as any}
//                   placeholder="Shipfree20"
//                 />
//               </div>
//               <div className="md:w-1/2 w-full px-2">
//                 <label
//                   htmlFor="couponName"
//                   className="text-sm font-normal font-OpenSans text-[#5A607F]"
//                 >
//                   <div className="flex items-center w-full gap-1">
//                     <p className="my-1">Coupon Name</p>
//                   </div>
//                 </label>
//                 <Input
//                   type="text"
//                   name="couponName"
//                   register={register as any}
//                   errors={errors as any}
//                   placeholder="Coupon Type"
//                 />
//               </div>
//             </div>

//             <hr className="border-[#D7DBEC] my-10 mx-2" />

//             <h3 className="font-OpenSans text-base font-bold">Coupon Type</h3>
//             {/* <p className="font-OpenSans text-sm font-normal text-[#5A607F]">
//               Type of coupon you want to create
//             </p> */}
//             <div className="w-full my-2 flex flex-wrap">
//               {/* Coupon Discounts Section */}
//              <div className='flex lg:w-1/2 w-full gap-2 px-2'>
//              {couponDiscounts.map(({ type, icon }) => (
//                 <button
//                   key={type}
//                   onClick={(e) => handleDiscountSelect(type as any, e)}
//                   className={`flex h-[108px] flex-col items-center p-4 border rounded-md w-full ${
//                     selectedDiscountType === type
//                       ? 'border-blue-500 text-blue-500'
//                       : 'border-gray-300 text-gray-700'
//                   }`}
//                 >
//                   {React.cloneElement(icon, {
//                     color:
//                       selectedDiscountType === type ? '#1E5EFF' : '#5A607F',
//                   })}
//                   <span
//                     className={`font-OpenSans text-base font-normal ${
//                       selectedDiscountType === type
//                         ? 'text-[#1E5EFF]'
//                         : 'text-[#5A607F]'
//                     }`}
//                   >
//                     {type}
//                   </span>
//                 </button>
//               ))}
//              </div>

//               {/* Coupon Types Section */}
//               <div className='flex lg:w-1/2 w-full lg:my-0 my-2 gap-2 px-2'>
//               {couponTypes.map(({ type, icon }) => (
//                 <button
//                   key={type}
//                   onClick={(e) => handleCouponTypeSelect(type as any, e)}
//                   className={`flex h-[108px] p-4 items-center flex-col border rounded-md w-full ${
//                     selectedCouponType === type
//                       ? 'border-blue-500 text-blue-500'
//                       : 'border-gray-300 text-gray-700'
//                   }`}
//                 >
//                   {React.cloneElement(icon, {
//                     color: selectedCouponType === type ? '#1E5EFF' : '#5A607F',
//                   })}
//                   <span
//                     className={`font-OpenSans text-base font-normal ${
//                       selectedCouponType === type
//                         ? 'text-[#1E5EFF]'
//                         : 'text-[#5A607F]'
//                     }`}
//                   >
//                     {type}
//                   </span>
//                 </button>
//               ))}
//               </div>
//             </div>

//             {/* Discount Value, Start Date, and End Date Inputs */}
//             <div className="w-full flex flex-wrap">
//               <div className="md:w-1/2 w-full px-2">
//                 <label
//                   htmlFor="discountValue"
//                   className="text-sm font-normal font-OpenSans text-[#5A607F]"
//                 >
//                   <p className="my-1">Discount Value</p>
//                 </label>
//                 <Input
//                   type="number"
//                   name="discountValue"
//                   register={register as any}
//                   placeholder="Amount"
//                 />
//               </div>
//               <div className="md:w-1/2 w-full px-2">
//                 <label
//                   htmlFor="start_date"
//                   className="text-sm font-normal font-OpenSans text-[#5A607F]"
//                 >
//                   <p className="my-1">Start Date</p>
//                 </label>
//                 <Input
//                   type="date"
//                   name="start_date"
//                   register={register as any}
//                   errors={errors as any}
//                 />
//               </div>
//               <div className="md:w-1/2 w-full px-2">
//                 <label
//                   htmlFor="end_date"
//                   className="text-sm font-normal font-OpenSans text-[#5A607F]"
//                 >
//                   <p className="my-1">End Date</p>
//                 </label>
//                 <Input
//                   type="date"
//                   name="end_date"
//                   register={register as any}
//                   errors={errors as any}
//                 />
//               </div>
//             </div>

//             {/* Usage Limits Input */}
//             <div className="md:w-1/2 w-full px-2 mt-4">
//               <label
//                 htmlFor="usageLimits"
//                 className="text-sm font-normal font-OpenSans text-[#5A607F]"
//               >
//                 <p className="my-1">Usage Limits</p>
//               </label>
//               <Input
//                 type="number"
//                 name="usageLimits"
//                 register={register as any}
//                 errors={errors as any}
//                 placeholder="Amount of uses"
//               />
//             </div>
//           </div>

//           {/* Submit Buttons */}
//           <div className="w-full flex justify-end gap-2 mt-8">
//             <button
//               type="button"
//               className="border border-gray-300 px-6 py-2 rounded-md"
//               onClick={() => router.push('/admin/coupons')}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-6 py-2 rounded-md"
//             >
//               {isPending ? <Spinner /> : 'Save'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateCouponsComponent;

'use client';
import React, { useState } from 'react';
import Input from './Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  FixedDiscount,
  FreeShipping,
  PercentageDiscount,
  PriceDiscount,
} from './Icons';
import { useCreateCoupon } from '@/hooks/useCoupon';
import Swal from 'sweetalert2';
import Spinner from './LoadingSpinner';
import { useRouter } from 'next/navigation';
import { BackIcon } from '../admin/dashboard/_components/Icons';
// import Router from 'next/router';

// Define types for the discount and coupon categories
type DiscountType = 'Fixed Discount' | 'Percentage Discount';
type CouponType = 'Shipping Discount' | 'Price Discount';

// Array of available discount options (Fixed/Percentage)
const couponDiscounts = [
  { type: 'Fixed Discount', icon: <FixedDiscount /> },
  { type: 'Percentage Discount', icon: <PercentageDiscount /> },
];

// Array of available coupon types (Shipping/Price)
const couponTypes = [
  { type: 'Shipping Discount', icon: <FreeShipping /> },
  { type: 'Price Discount', icon: <PriceDiscount /> },
];

// Define the schema using Yup
const productSchema = yup
  .object({
    code: yup.string().required('Coupon Code is required'),
    couponName: yup.string().required('Coupon Name is required'),
    discountValue: yup
      .number()
      .required('Discount Value is required')
      .positive('Must be a positive number'),
    start_date: yup.date().required('Start date is required'),
    end_date: yup.date().required('End date is required'),
    couponType: yup.string().required('Coupon Type is required'),
    usageLimits: yup.number(),
  })
  .required();

const CreateCouponsComponent = () => {
  const router = useRouter();
  const [selectedDiscountType, setSelectedDiscountType] =
    useState<DiscountType | null>(null);
  const [selectedCouponType, setSelectedCouponType] =
    useState<CouponType | null>(null);

  const { mutateAsync, isPending } = useCreateCoupon();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const handleDiscountSelect = (
    type: DiscountType,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    setSelectedDiscountType(type);
    setValue('couponType', type);
  };

  const handleCouponTypeSelect = (
    type: CouponType,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    setSelectedCouponType(type);
    setValue('couponType', type);
  };

  const onSubmit = async (data: any) => {
    const formattedData = {
      code: data.code,
      name: data.couponName,
      discount_value: data.discountValue,
      start_date: data.start_date,
      end_date: data.end_date,
      usage_limit: data.usageLimits || undefined,
      type:
        data.couponType === 'Price Discount'
          ? 'price'
          : data.couponType === 'Shipping Discount'
            ? 'delivery'
            : undefined,
      is_percentage: data.couponType === 'Percentage Discount' ? true : false,
      status: 'active',
    };

    try {
      await mutateAsync(formattedData as any);
      Swal.fire({
        title: 'Success',
        text: 'Coupon created successfully',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
      });
      reset();
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };
  const startDate = watch('start_date');

  const handleError = (error: any) => {
    console.log('Form Errors:', error);
  };

  return (
    <div className="w-full">
      <div className="w-full px-4 py-6">
      {/* <button
          onClick={() => router.push('/admin/coupons')}
          className="  text-gray-900 px-4 py-2 rounded font-semibold border flex  items-center gap-1"
        >
          <IoIosArrowRoundBack className='text-xl font-semibold'/> back
        </button> */}
         <div className='max-w-[70px] cursor-pointer flex  py-1 px-2 border rounded bg-primary  justify-center items-center text-xl'  onClick={() => router.push('/admin/coupons')} ><BackIcon/> <p className='mb-1 text-white'>back</p></div>
                
        <h3 className="font-OpenSans text-2xl font-bold py-2">Create Coupon</h3>
        <form
          onSubmit={handleSubmit(onSubmit, handleError)}
          className="flex flex-wrap items-start w-full"
        >
          <div className="w-full rounded-[6px] bg-white shadow-sm p-4">
            <h3 className="font-OpenSans text-base font-bold">
              Coupon Information
            </h3>
            <p className="font-OpenSans text-sm font-normal text-[#5A607F]">
              Code will be used by users in checkout
            </p>
            <div className="w-full flex flex-wrap my-4">
              <div className="md:w-1/2 w-full px-2">
                <label
                  htmlFor="couponCode"
                  className="text-sm font-normal font-OpenSans text-[#5A607F]"
                >
                  <div className="flex items-center w-full gap-1">
                    <p className="my-1">Coupon Code</p>
                  </div>
                </label>
                <Input
                  type="text"
                  name="code"
                  register={register as any}
                  errors={errors as any}
                  placeholder="Shipfree20"
                />
              </div>
              <div className="md:w-1/2 w-full px-2">
                <label
                  htmlFor="couponName"
                  className="text-sm font-normal font-OpenSans text-[#5A607F]"
                >
                  <div className="flex items-center w-full gap-1">
                    <p className="my-1">Coupon Name</p>
                  </div>
                </label>
                <Input
                  type="text"
                  name="couponName"
                  register={register as any}
                  errors={errors as any}
                  placeholder="Coupon Type"
                />
              </div>
            </div>

            <hr className="border-[#D7DBEC] my-10 mx-2" />

            <h3 className="font-OpenSans text-base font-bold">Coupon Type</h3>
            {/* <p className="font-OpenSans text-sm font-normal text-[#5A607F]">
              Type of coupon you want to create
            </p> */}
            <div className="w-full my-2 flex flex-wrap">
              {/* Coupon Discounts Section */}
              <div className="flex lg:w-1/2 w-full gap-2 px-2">
                {couponDiscounts.map(({ type, icon }) => (
                  <button
                    key={type}
                    onClick={(e) => handleDiscountSelect(type as any, e)}
                    className={`flex h-[108px] flex-col items-center p-4 border rounded-md w-full ${
                      selectedDiscountType === type
                        ? 'border-blue-500 text-blue-500'
                        : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    {React.cloneElement(icon, {
                      color:
                        selectedDiscountType === type ? '#1E5EFF' : '#5A607F',
                    })}
                    <span
                      className={`font-OpenSans text-base font-normal ${
                        selectedDiscountType === type
                          ? 'text-[#1E5EFF]'
                          : 'text-[#5A607F]'
                      }`}
                    >
                      {type}
                    </span>
                  </button>
                ))}
              </div>

              {/* Coupon Types Section */}
              <div className="flex lg:w-1/2 w-full lg:my-0 my-2 gap-2 px-2">
                {couponTypes.map(({ type, icon }) => (
                  <button
                    key={type}
                    onClick={(e) => handleCouponTypeSelect(type as any, e)}
                    className={`flex h-[108px] p-4 items-center flex-col border rounded-md w-full ${
                      selectedCouponType === type
                        ? 'border-blue-500 text-blue-500'
                        : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    {React.cloneElement(icon, {
                      color:
                        selectedCouponType === type ? '#1E5EFF' : '#5A607F',
                    })}
                    <span
                      className={`font-OpenSans text-base font-normal ${
                        selectedCouponType === type
                          ? 'text-[#1E5EFF]'
                          : 'text-[#5A607F]'
                      }`}
                    >
                      {type}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Discount Value, Start Date, and End Date Inputs */}
            <div className="w-full flex flex-wrap">
              <div className="md:w-1/2 w-full px-2">
                <label
                  htmlFor="discountValue"
                  className="text-sm font-normal font-OpenSans text-[#5A607F]"
                >
                  <p className="my-1">Discount Value</p>
                </label>
                <Input
                  type="number"
                  name="discountValue"
                  register={register as any}
                  placeholder="Amount"
                  min={0 as any}
                />
                {errors.discountValue && (
                  <p className="text-red-500 text-sm">
                    {errors.discountValue.message}
                  </p>
                )}
              </div>
              <div className="md:w-1/2 w-full px-2">
                <label
                  htmlFor="start_date"
                  className="text-sm font-normal font-OpenSans text-[#5A607F]"
                >
                  <p className="my-1">Start Date</p>
                </label>
                <Input
                  type="date"
                  name="start_date"
                  register={register as any}
                  // errors={errors as any}
                />
                {errors.start_date && (
                  <p className="text-red-500 text-sm">
                    {errors.start_date.message}
                  </p>
                )}
              </div>
              <div className="md:w-1/2 w-full px-2">
                <label
                  htmlFor="end_date"
                  className="text-sm font-normal font-OpenSans text-[#5A607F]"
                >
                  <p className="my-1">End Date</p>
                </label>
                {/* <Input
                  type="date"
                  name="end_date"
                  register={register as any}
                  // errors={errors as any}
                /> */}
                <Input
                  type="date"
                  name="end_date"
                  register={register as any}
                  min={startDate ? (startDate as any) : undefined}
                />
                {errors.end_date && (
                  <p className="text-red-500 text-sm">
                    {errors.end_date.message}
                  </p>
                )}
              </div>
            </div>

            {/* Usage Limits Input */}
            <div className="md:w-1/2 w-full px-2 mt-4">
              <label
                htmlFor="usageLimits"
                className="text-sm font-normal font-OpenSans text-[#5A607F]"
              >
                <p className="my-1">Usage Limits</p>
              </label>
              <Input
                type="number"
                name="usageLimits"
                register={register as any}
                // errors={errors as any}
                placeholder="Amount of uses"
              />
              {errors.usageLimits && (
                <p className="text-red-500 text-sm">
                  {errors.usageLimits.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="w-full flex justify-end gap-2 mt-8">
            <button
              type="button"
              className="border border-gray-300 px-6 py-2 rounded-md"
              onClick={() => router.push('/admin/coupons')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              {isPending ? <Spinner /> : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCouponsComponent;

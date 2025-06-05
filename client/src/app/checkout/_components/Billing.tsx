//old
// 'use client';
// import React, { useState } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { useCreateOrder } from '@/hooks/useOrder';
// import Spinner from '@/components/Spinner';
// import { useAddress, useCreateAddress } from '@/hooks/useAddress';
// import { ICreateAddress } from '@/types/address';
// // import { ApplyCoupon } from '@/services/api/coupon';

// import {
//   FaBuilding,
//   FaCheckCircle,
//   FaCity,
//   FaCreditCard,
//   FaEnvelope,
//   FaGlobe,
//   FaHome,
//   FaMapMarkerAlt,
//   FaMoneyBillWave,
//   FaPhone,
//   FaSave,
//   FaTimes,
// } from 'react-icons/fa';
// import Modal from '@/app/components/Modal';
// import { IoMdCloseCircle } from 'react-icons/io';
// // import Input from '@/app/components/Input';
// import { useGetCart } from '@/hooks/useCart';

// import { Cancel, ImageUpload } from '@/app/admin/products/_components/Icons';
// import { uploadOne } from '@/services/uploadService';
// import { Copy } from 'lucide-react';
// import { toast, ToastContainer } from 'react-toastify';
// import Input from '@/app/components/Input';

// interface Props {
//   className?: string;
// }

// const schema = yup.object().shape({
//   firstName: yup.string().required('First Name is required'),
//   lastName: yup.string().required('Last Name is required'),
//   contactNumber: yup
//     .string()
//     .matches(/^\d{11}$/, 'Contact Number must be 11 digits')
//     .required('Contact Number is required'),
//   email: yup
//     .string()
//     .email('Enter a valid email address')
//     .required('Email is required'),
//   address: yup.string().required('Address is required'),
//   city: yup.string().required('City is required'),
//   postCode: yup.string().required('Post Code is required'),
//   country: yup.string().required('Country is required'),
//   region: yup.string().required('Region/State is required'),
// });

// function Billing({ className = '' }: Props) {
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [isAddingNew, setIsAddingNew] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { data: cartData } = useGetCart();

//   const { data } = useAddress({});
//   const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
//     null
//   );

//   const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false);
//   const [isOrderErrorModalOpen, setIsOrderErrorModalOpen] = useState(false);
//   // const [couponCode, setCouponCode] = useState('');
//   // const [loading, setLoading] = useState(false);
//   // const [error, setError] = useState('');
//   const EsaypisaAccountNumber = '03035454074';
//   const BankAccountNumber = '08040106979060';
//   const IBANAccountNumber = 'PK12MEZN0008040106979060';

//   const handleEsaypisaAccount = () => {
//     navigator.clipboard.writeText(EsaypisaAccountNumber);
//     toast.success('EsayPisa Account number copied!');
//   };

//   const handleBankAccount = () => {
//     navigator.clipboard.writeText(BankAccountNumber);
//     toast.success('Bank Account number copied!');
//   };

//   const handleIBANAccount = () => {
//     navigator.clipboard.writeText(IBANAccountNumber);
//     toast.success('IBAN number copied!');
//   };

//   const { mutate: addAddress } = useCreateAddress();
//   const [newAddress, setNewAddress] = useState<ICreateAddress>({
//     street_address: '',
//     address_line2: '',
//     city: '',
//     state: '',
//     postal_code: '',
//     country: '',
//     phone: '',
//   });

//   // const handleCoupon = () => {
//   //   if (!couponCode) {
//   //     setError('Please enter a coupon code.');
//   //     return;
//   //   }
//   //   setError('');
//   //   setLoading(true);

//   //   ApplyCoupon(couponCode as any)
//   //     .then((response) => {
//   //       console.log('Coupon applied successfully:', response);
//   //     })
//   //     .catch((err) => {
//   //       setError('Failed to apply coupon. Please try again.');
//   //       console.error('Error applying coupon:', err);
//   //     })
//   //     .finally(() => {
//   //       setLoading(false);
//   //     });
//   // };

//   const handleAddAddress = () => {
//     addAddress(newAddress, {
//       onSuccess: () => {
//         setIsModalOpen(true);
//         setNewAddress({
//           street_address: '',
//           address_line2: '',
//           city: '',
//           state: '',
//           postal_code: '',
//           country: '',
//           phone: '',
//         });
//         setIsAddingNew(false);
//       },
//       onError: (error) => {
//         console.error('Failed to add address:', error);
//       },
//     });
//   };

//   const { mutateAsync, isPending } = useCreateOrder();
//   const { handleSubmit } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = () => {
//     console.log('first');
//   };

//   const onOrder = async () => {
//     console.log('payment methoid', selectedPayment);

//     if (!selectedAddressId) return null;
//     try {
//       const orderPayload = {
//         address_id: selectedAddressId,
//         payment_method: 'cash_on_delivery',
//         screenshot: '',
//         transactionId:""
//       };

//       if (selectedPayment === 'onlinePayment') {
//         if (!paymentScreenshot) {
//           throw new Error('Please upload payment screenshot');
//         }

//         try {
//           const uploadResponse = await uploadOne({ file: paymentScreenshot });

//           if (!uploadResponse?.data) {
//             throw new Error('Failed to upload payment screenshot');
//           }

//           orderPayload.screenshot = uploadResponse.data;
//           orderPayload.payment_method = selectedSubPayment || 'easypaisa';
//           orderPayload.transactionId=trackingNumber || ""
//         } catch (uploadError) {
//           console.error('Screenshot upload failed:', uploadError);
//           throw new Error('Failed to upload payment proof. Please try again.');
//         }
//       }

//       const response = await mutateAsync(orderPayload);

//       if (response) {
//         setIsOrderSuccessModalOpen(true);
//       }
//     } catch (err) {
//       console.log(err);

//       setIsOrderErrorModalOpen(true);
//     }
//   };

//   const handleSelectAddress = (addressId: string) => {
//     setSelectedAddressId(addressId);
//   };

//   const [selectedPayment, setSelectedPayment] = useState('');

//   const handlePaymentChange = (event: {
//     target: { id: React.SetStateAction<string> };
//   }) => {
//     setSelectedPayment(event.target.id);
//   };

//   const handleCardClick = (id: React.SetStateAction<string>) => {
//     setSelectedPayment(id);
//   };

//   // const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
//   const [selectedSubPayment, setSelectedSubPayment] = useState<string | null>(
//     null
//   );
//   const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [trackingNumber, setTrackingNumber] = useState('');

//   const handlePaymentSelection = (paymentType: string) => {
//     setSelectedPayment(paymentType);
//     setSelectedSubPayment(null); // Reset sub payment when changing main payment
//     setPaymentScreenshot(null); // Reset file when changing payment
//   };

//   const handleSubPaymentSelection = (method: string) => {
//     setSelectedSubPayment(method);
//     setPaymentScreenshot(null); // Reset file on change
//   };

//   const handleFileUpload = (event: any) => {
//     const file = event.target.files[0];

//     if (file) {
//       setPaymentScreenshot(file);
//       setImagePreview(URL.createObjectURL(file)); // Generate preview URL
//     }
//   };

//   const removeImage = () => {
//     setPaymentScreenshot(null);
//     setImagePreview('');
//   };

//   return (
//     <div className={`md:px-8 ${className}`}>
//       <h1 className="text-[#2B2B2D] text-xl font-OpenSans font-bold leading-6 py-5">
//         Billing Details
//       </h1>
//       <form
//         className="mt- sm:p-2 border border-[#E9E9E9] rounded-[5px]"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <h1 className="text-[#2B2B2D] text-[24px] font-OpenSans font-bold leading-tight mb-6">
//           Checkout Options
//         </h1>
//         <div className="flex flex-wrap items-center gap-6 mt-4">
//           {/* Existing Address Option */}
//           <span className="flex items-center gap-4">
//             <input
//               id="iio"
//               name="test"
//               type="radio"
//               className="hidden"
//               defaultChecked
//               checked={!isAddingNew}
//               onChange={() => setIsAddingNew(false)}
//             />
//             <label
//               htmlFor="iio"
//               className="flex items-center cursor-pointer text-[#4A4A4A] text-[16px] font-OpenSans font-medium leading-6 gap-3"
//             >
//               {/* Custom Animated Radio Button */}
//               <span className="relative w-6 h-6 flex items-center justify-center">
//                 <span
//                   className={`absolute w-6 h-6 border-2 rounded-full transition-all duration-300 ${
//                     !isAddingNew
//                       ? 'border-primary scale-100 '
//                       : 'border-gray-300 scale-90'
//                   }`}
//                 />
//                 <span
//                   className={`absolute w-3 h-3 bg-primary rounded-full transition-all duration-300 ${
//                     !isAddingNew ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
//                   }`}
//                 />
//                 {/* Hover Animation */}
//                 <span
//                   className={`absolute w-6 h-6 border-2 border-primary rounded-full transition-all duration-300 ${
//                     !isAddingNew ? 'animate-ping opacity-0 ' : 'opacity-0'
//                   }`}
//                 />
//               </span>
//               <span
//                 className={`transition-all duration-300 hover:text-primary  ${
//                   !isAddingNew ? 'text-primary ' : 'text-[#4A4A4A]'
//                 }`}
//               >
//                 I want to use an existing address
//               </span>
//             </label>
//           </span>

//           {/* New Address Option */}
//           <span className="flex items-center gap-4">
//             <input
//               id="ii"
//               name="test"
//               type="radio"
//               className="hidden"
//               checked={isAddingNew}
//               onChange={() => setIsAddingNew(true)}
//             />
//             <label
//               htmlFor="ii"
//               className="flex items-center cursor-pointer text-[#4A4A4A] text-[16px] font-OpenSans font-medium leading-6 gap-3"
//             >
//               {/* Custom Animated Radio Button */}
//               <span className="relative w-6 h-6 flex items-center justify-center">
//                 <span
//                   className={`absolute w-6 h-6 border-2 rounded-full transition-all duration-300 ${
//                     isAddingNew
//                       ? 'border-primary scale-100 '
//                       : 'border-gray-300 scale-90'
//                   }`}
//                 />
//                 <span
//                   className={`absolute w-3 h-3 bg-primary rounded-full transition-all duration-300 ${
//                     isAddingNew
//                       ? 'scale-100 opacity-100 '
//                       : 'scale-0 opacity-0 '
//                   }`}
//                 />
//                 {/* Hover Animation */}
//                 <span
//                   className={`absolute w-6 h-6 border-2 border-primary rounded-full transition-all duration-300 ${
//                     isAddingNew ? 'animate-ping opacity-0 ' : 'opacity-0 '
//                   }`}
//                 />
//               </span>
//               <span
//                 className={`transition-all duration-300 hover:text-primary  ${
//                   !isAddingNew ? 'text-[#4A4A4A] ' : ' text-primary'
//                 }`}
//               >
//                 I want to use a new address
//               </span>
//             </label>
//           </span>
//         </div>

//         {!isAddingNew ? (
//           <>
//             {data?.data?.length ? (
//               <ul className="space-y-4 mt-5">
//                 {data.data.map((address) => (
//                   <li
//                     key={address.id}
//                     onClick={() => handleSelectAddress(address.id)}
//                     className={`group border-2 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 relative cursor-pointer ${
//                       selectedAddressId === address.id
//                         ? 'border-primary bg-gradient-to-r from-primary/10 to-white'
//                         : 'border-gray-200 hover:border-primary/50'
//                     }`}
//                   >
//                     <div className="flex items-start gap-4">
//                       {/* Address Icon */}
//                       <div className="p-3 bg-primary/10 rounded-full">
//                         <FaMapMarkerAlt className="text-primary w-6 h-6" />
//                       </div>
//                       {/* Address Details */}
//                       <div>
//                         <p className="text-lg font-semibold text-gray-800">
//                           {address.street_address}
//                         </p>
//                         {address.address_line2 && (
//                           <p className="text-sm text-gray-600">
//                             {address.address_line2}
//                           </p>
//                         )}
//                         <p className="text-sm text-gray-600">
//                           {address.city}, {address.state} {address.postal_code}
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           {address.country}
//                         </p>
//                         <p className="text-sm text-gray-600 flex items-center gap-2">
//                           <FaPhone className="text-primary" />
//                           {address.phone}
//                         </p>
//                       </div>
//                     </div>
//                     {/* Custom Radio Button */}
//                     <label className="flex items-center absolute top-4 right-4">
//                       <input
//                         type="radio"
//                         name="selectedAddress"
//                         value={address.id}
//                         checked={selectedAddressId === address.id}
//                         className="hidden"
//                       />
//                       <span
//                         className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${
//                           selectedAddressId === address.id
//                             ? 'border-primary bg-primary'
//                             : 'border-gray-300 group-hover:border-primary'
//                         }`}
//                       >
//                         {selectedAddressId === address.id && (
//                           <FaCheckCircle className="w-4 h-4 text-white" />
//                         )}
//                       </span>
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <div className="text-center mt-5 p-6 bg-gray-50 rounded-lg">
//                 <FaMapMarkerAlt className="text-gray-400 w-10 h-10 mx-auto" />
//                 <p className="text-gray-500 text-sm mt-3">
//                   No addresses found. Add a new address to get started.
//                 </p>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="space-y-6 mt-5">
//             {/* Street Address */}

//             <div className="w-full flex  gap-2">
//               <div className="w-full md:w-[calc(50%-0.5rem)] relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Street Address
//                 </label>
//                 <div className="w-full relative">
//                   {/* <input
//                     type="text"
//                     placeholder="Street Address"
//                     value={newAddress.street_address}
//                     onChange={(e) =>
//                       setNewAddress((prev) => ({
//                         ...prev,
//                         street_address: e.target.value,
//                       }))
//                     }
//                     className="border border-gray-300 p-3 pl-12 rounded-lg w-full  focus:outline-[#3734A9] transition-all shadow-sm hover:shadow-md"
//                     required
//                   /> */}
//                   <Input
//                     type="text"
//                     placeholder="Street Address"
//                     value={newAddress.street_address}
//                     onChange={(e) =>
//                       setNewAddress((prev) => ({
//                         ...prev,
//                         street_address: e.target.value,
//                       }))
//                     }
//                     className="border border-gray-300 p-3 pl-12 rounded-lg w-full  focus:outline-[#3734A9] transition-all shadow-sm hover:shadow-md"
//                     // required
//                   />
//                   {errors.street_address && (
//                         <p className="text-red-500 text-sm mt-1">
//                           {errors.street_address}
//                         </p>
//                       )}
//                   <FaMapMarkerAlt className="absolute left-4 top-3.5 text-gray-400" />
//                 </div>
//               </div>

//               {/* Address Line 2 */}
//               <div className="w-full md:w-[calc(50%-0.5rem)] relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Address Line 2 (Opt)
//                 </label>
//                 <div className=" w-full relative">
//                   <input
//                     type="text"
//                     placeholder="Address Line 2 (Opt)"
//                     value={newAddress.address_line2}
//                     onChange={(e) =>
//                       setNewAddress((prev) => ({
//                         ...prev,
//                         address_line2: e.target.value,
//                       }))
//                     }
//                     className="border border-gray-300 p-3 pl-12 rounded-lg w-full focus:outline-[#3734A9] transition-all shadow-sm hover:shadow-md"
//                   />
//                   <FaHome className="absolute left-4 top-3.5 text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             {/* City */}
//             <div className="w-full flex flex-col sm:flex-row sm:flex-warp gap-2">
//               <div className="w-full md:w-[calc(33.33%-0.66rem)] relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   City
//                 </label>
//                 <div className=" relative">
//                   <input
//                     type="text"
//                     placeholder="City"
//                     value={newAddress.city}
//                     onChange={(e) =>
//                       setNewAddress((prev) => ({
//                         ...prev,
//                         city: e.target.value,
//                       }))
//                     }
//                     className="border border-gray-300 p-3 pl-12 rounded-lg w-full focus:outline-[#3734A9] transition-all shadow-sm hover:shadow-md"
//                     required
//                   />
//                   <FaCity className="absolute left-4 top-3.5 text-gray-400" />
//                 </div>
//               </div>

//               {/* State */}
//               <div className="w-full md:w-[calc(33.33%-0.66rem)] relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   State
//                 </label>
//                 <div className=" relative">
//                   <input
//                     type="text"
//                     placeholder="State"
//                     value={newAddress.state}
//                     onChange={(e) =>
//                       setNewAddress((prev) => ({
//                         ...prev,
//                         state: e.target.value,
//                       }))
//                     }
//                     className="border border-gray-300 p-3 pl-12 rounded-lg w-full focus:outline-[#3734A9] transition-all shadow-sm hover:shadow-md"
//                     required
//                   />
//                   <FaBuilding className="absolute left-4 top-3.5 text-gray-400" />
//                 </div>
//               </div>

//               {/* Postal Code */}
//               <div className="w-full md:w-[calc(33.33%-0.66rem)] relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-1 text-nowrap">
//                   Postal Code (Opt)
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Postal Code (Opt)"
//                     value={newAddress.postal_code}
//                     onChange={(e) =>
//                       setNewAddress((prev) => ({
//                         ...prev,
//                         postal_code: e.target.value,
//                       }))
//                     }
//                     className="border border-gray-300 p-3 pl-12 rounded-lg w-full focus:outline-[#3734A9] transition-all shadow-sm hover:shadow-md"
//                   />
//                   <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             {/* Country */}
//             {/* Country and Phone */}
//             <div className="w-full flex flex-wrap gap-4">
//               {/* Country */}
//               <div className="w-full md:w-[calc(50%-0.5rem)] relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Country
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Country"
//                     value={newAddress.country}
//                     onChange={(e) =>
//                       setNewAddress((prev) => ({
//                         ...prev,
//                         country: e.target.value,
//                       }))
//                     }
//                     className="border border-gray-300 p-3 pl-12 rounded-lg w-full focus:outline-[#3734A9] transition-all shadow-sm hover:shadow-md"
//                     required
//                   />
//                   <FaGlobe className="absolute left-4 top-3.5 text-gray-400" />
//                 </div>
//               </div>

//               {/* Phone */}
//               <div className="w-full md:w-[calc(50%-0.5rem)] relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Phone"
//                     value={newAddress.phone}
//                     onChange={(e) =>
//                       setNewAddress((prev) => ({
//                         ...prev,
//                         phone: e.target.value,
//                       }))
//                     }
//                     className="border border-gray-300 p-3 pl-12 rounded-lg w-full focus:outline-primary transition-all shadow-sm hover:shadow-md"
//                     required
//                   />
//                   <FaPhone className="absolute left-4 top-3.5 text-gray-400" />
//                 </div>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-col xxs:flex-row gap-6 justify-center mt-6">
//               <button
//                 type="button"
//                 onClick={handleAddAddress}
//                 className="w-full xxs:w-1/2 justify-center bg-primary text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-2 flex items-center gap-3"
//               >
//                 <FaSave className="w-6 h-6 transition-all duration-300 transform hover:rotate-180" />
//                 <span className=" font-semibold text-lg">Save Address</span>
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setIsAddingNew(false)}
//                 className="w-full xxs:w-1/2 justify-center bg-gradient-to-r from-[#a9a9a9] via-[#808080] to-[#696969] text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-2 flex items-center gap-3"
//               >
//                 <FaTimes className="w-6 h-6 transition-all duration-300 transform hover:rotate-180" />
//                 <span className="font-semibold text-lg">Cancel</span>
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="flex w-full">
//           <div className="w-full border-t-2 border-[#E9E9E9]  px-2 py-8 mt-8 bg-white ">
//             <h1 className="text-3xl font-bold leading-8 text-[#2B2B2D]">
//               Delivery & Payment Method
//             </h1>
//             <p className="text-[#7A7A7A] text-base mt-3 mb-6">
//               Please select the preferred shipping and payment method for your
//               order.
//             </p>

//             <div className="mt-8">
//               <h2 className="text-xl font-semibold text-[#2B2B2D] mb-4">
//                 Payment Method
//               </h2>

//               {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div className="w-full ">
//                   <div
//                     className={` relative flex flex-col items-center gap-4 p-2 border rounded-lg cursor-pointer transition-all ease-in-out duration-300 transform ${
//                       selectedPayment === 'cashOnDelivery'
//                         ? 'border-primary shadow-lg scale-105'
//                         : 'border-[#E9E9E9] hover:shadow-lg hover:border-primary'
//                     }`}
//                     onClick={() => handleCardClick('cashOnDelivery')}
//                   >
//                     <input
//                       type="radio"
//                       name="payment"
//                       id="cashOnDelivery"
//                       className="accent-primary absolute top-4 right-4"
//                       onChange={handlePaymentChange}
//                       checked={selectedPayment === 'cashOnDelivery'}
//                     />
//                     <FaMoneyBillWave
//                       className={`text-3xl text-[#2B2B2D] ${
//                         selectedPayment === 'cashOnDelivery'
//                           ? 'text-primary'
//                           : ''
//                       }`}
//                     />
//                     <div className="text-center">
//                       <label
//                         htmlFor="cashOnDelivery"
//                         className={`text-[#2B2B2D] text-xl font-semibold ${
//                           selectedPayment === 'cashOnDelivery'
//                             ? 'text-primary'
//                             : 'text-[#2B2B2D]'
//                         }`}
//                       >
//                         Cash on Delivery
//                       </label>
//                       <p className="text-[#7A7A7A] text-sm mt-2">
//                         Pay when you receive your order. Benefits:
//                       </p>
//                       <ul className="list-disc list-inside text-start text-[#7A7A7A] text-sm">
//                         <li>No need to share payment details online.</li>
//                         <li>Convenient and secure for cash payments.</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>

//                 <div
//                   className={`relative flex flex-col items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-300 transform ${
//                     selectedPayment === 'onlinePayment'
//                       ? 'border-primary shadow-lg scale-105'
//                       : 'border-gray-300 hover:shadow-md'
//                   }`}
//                   onClick={() => handlePaymentSelection('onlinePayment')}
//                 >
//                   <input
//                     type="radio"
//                     name="payment"
//                     className="accent-primary absolute top-4 right-4"
//                     checked={selectedPayment === 'onlinePayment'}
//                     readOnly
//                   />
//                   <FaCreditCard className="text-3xl text-[#2B2B2D]" />
//                   <span className="text-lg font-semibold">Online Payment</span>
//                   <p className="text-sm text-gray-600 text-center">
//                     Fast & secure digital payments.

//                   </p>

//                 </div>
//               </div> */}

// <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//   <div className="w-full ">
//     <div
//       className={`relative min-h-[220px] flex flex-col items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ease-in-out duration-300 transform ${
//         selectedPayment === 'cashOnDelivery'
//           ? 'border-primary shadow-lg scale-105'
//           : 'border-[#E9E9E9] hover:shadow-lg hover:border-primary'
//       }`}
//       onClick={() => handleCardClick('cashOnDelivery')}
//     >
//       <input
//         type="radio"
//         name="payment"
//         id="cashOnDelivery"
//         className="accent-primary absolute top-4 right-4"
//         onChange={handlePaymentChange}
//         checked={selectedPayment === 'cashOnDelivery'}
//       />
//       <FaMoneyBillWave
//         className={`text-3xl text-[#2B2B2D] ${
//           selectedPayment === 'cashOnDelivery' ? 'text-primary' : ''
//         }`}
//       />
//       <div className="">
//         <label
//           htmlFor="cashOnDelivery"
//           className={`text-[#2B2B2D] text-xl font-semibold ${
//             selectedPayment === 'cashOnDelivery'
//               ? 'text-primary'
//               : 'text-[#2B2B2D]'
//           }`}
//         >
//          <span className='w-full text-center'> Cash on Delivery</span>
//         </label>
//         <p className="text-[#7A7A7A] text-[13px] mt-2">
//           Pay when you receive your order. Benefits:
//         </p>
//         <ul className="list-disc list-inside text-start text-[#7A7A7A] text-[13px]">
//           <li>No need to share payment details online.</li>
//           <li>Convenient and secure for cash payments.</li>
//         </ul>
//       </div>
//     </div>
//   </div>

//   <div className="w-full ">
//     <div
//       className={`relative min-h-[220px] flex flex-col items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-300 transform ${
//         selectedPayment === 'onlinePayment'
//           ? 'border-primary shadow-lg scale-105'
//           : 'border-[#E9E9E9] hover:shadow-lg hover:border-primary'
//       }`}
//       onClick={() => handlePaymentSelection('onlinePayment')}
//     >
//       <input
//         type="radio"
//         name="payment"
//         className="accent-primary absolute top-4 right-4"
//         checked={selectedPayment === 'onlinePayment'}
//         readOnly
//       />
//       <FaCreditCard
//         className={`text-3xl text-[#2B2B2D] ${
//           selectedPayment === 'onlinePayment' ? 'text-primary' : ''
//         }`}
//       />
//       <div className="text-center">
//         <span className="text-xl font-semibold text-[#2B2B2D]">
//           Online Payment
//         </span>
//         <p className="text-[#7A7A7A] text-sm mt-2">
//           Fast & secure digital payments. Benefits:
//         </p>
//         <ul className="list-disc list-inside text-start text-[#7A7A7A] text-sm">
//           <li>Hassle-free and instant payment processing.</li>
//           <li>Receive a 5% discount for advance online payment.</li>
//         </ul>
//       </div>
//     </div>
//   </div>
// </div>

//               {selectedPayment === 'onlinePayment' && (
//                 <div className="mt-6">
//                   <h3 className="text-lg font-semibold text-[#2B2B2D] mb-4">
//                     Select Online Payment Method
//                   </h3>

//                   <div className="grid grid-cols-1 mdx:grid-cols-2 gap-4">
//                     {/* <div
//                       className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-300 transform ${
//                         selectedSubPayment === 'easypaisa'
//                           ? 'border-primary shadow-md scale-105'
//                           : 'border-gray-300 hover:shadow-md'
//                       }`}
//                       onClick={() => handleSubPaymentSelection('easypaisa')}
//                     >
//                       <div >
//                         <div className='flex justify-center'>
//                         <img src="/easypisa.png" alt="EasyPaisa" className='w-[70%] ' />
//                         </div>
//                         <p className="text-lg pt-5">
//                           {' '}
//                           <span className="text-gray-800 text-[15px]  font-semibold">
//                             A/C Title: Zia Ur Rehman
//                           </span>

//                         </p>

//                       </div>
//                     </div> */}

//                     {/* EasyPaisa Option */}
//                     <div
//                       className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-300 transform ${
//                         selectedSubPayment === 'easypaisa'
//                           ? 'border-primary shadow-md scale-105'
//                           : 'border-gray-300 hover:shadow-md'
//                       }`}
//                       onClick={() => handleSubPaymentSelection('easypaisa')}
//                     >
//                       <div>
//                         <div className="flex justify-center">
//                           <img
//                             src="/easypisa.png"
//                             alt="EasyPaisa"
//                             className="w-[70%]"
//                           />
//                         </div>
//                         <p className="text-xs xxs:text-sm sm:text-lg pt-5">
//                           <span className="text-gray-800 text-[15px] font-semibold">
//                             A/C Title: Zia Ur Rehman
//                           </span>
//                         </p>
//                         <p className="text-xs xxs:text-[15px] pt-5 flex items-center space-x-2">
//                           <span className="text-gray-800 font-semibold">
//                             A/C Number:
//                           </span>
//                           <span className="text-gray-900">
//                             {EsaypisaAccountNumber}
//                           </span>
//                           <button
//                             onClick={handleEsaypisaAccount}
//                             className="text-gray-500 hover:text-gray-700"
//                           >
//                             <Copy size={18} />
//                           </button>
//                         </p>
//                       </div>
//                     </div>

//                     {/* Bank Option */}
//                     <div
//                       className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-300 transform ${
//                         selectedSubPayment === 'bank_transfer'
//                           ? 'border-primary shadow-md scale-105'
//                           : 'border-gray-300 hover:shadow-md'
//                       }`}
//                       onClick={() => handleSubPaymentSelection('bank_transfer')}
//                     >
//                       <div className="w-full flex flex-col justify-center items-center">
//                         <img
//                           src="/symbols.png"
//                           alt="Bank"
//                           className="w-1/3 h-1/3 object-contain"
//                         />
//                         <div className="w-full flex flex-col gap-y-2 pt-3">
//                           <p className="w-full text-xs xxs:text-lg break-words text-center font-semibold">
//                             Meezan Bank
//                           </p>
//                           <p className="w-full  text-xs xxs:text-sm break-words text-gray-800 font-semibold">
//                             <span className="w-full  text-gray-800 font-semibold">
//                               A/C Title: ZK TRADERS
//                             </span>
//                           </p>
//                           <div className="w-full items-center flex text-xs xxs:text-sm break-words text-gray-800 font-semibold">
//                            <p className='gap-1'>
//                             <span className="w-full  text-gray-800 font-semibold">
//                               A/C Number:
//                             </span>
//                             <span>{BankAccountNumber}</span>
//                             </p>

//                             <button
//                               onClick={handleBankAccount}
//                               className="text-gray-500 hover:text-gray-700"
//                             >
//                               <Copy size={18} className=" pt-1" />
//                             </button>
//                             </div>
//                           <p className="w-full flex-col xxs:flex-row gap-1 text-sm break-words text-gray-800 font-semibold">
//                             <span className="text-gray-800 font-semibold">
//                               IBAN:
//                             </span>
//                             {IBANAccountNumber}
//                             <button
//                             onClick={handleIBANAccount}
//                             className="text-gray-500 hover:text-gray-700"
//                           >
//                             <Copy size={18} />
//                           </button>
//                           </p>
//                           {/* <div className="w-full flex flex-col xxs:flex-row sm:flex-col  lg:flex-row  gap-1 text-sm text-gray-800 font-semibold">
//                             <div className="flex gap-1 flex-col text-xs xxs:text-sm lg:text-sm xxs:flex-row  sm:w-[90%]">
//                               <span className="text-gray-800 font-semibold">
//                                 IBAN:
//                               </span>
//                               <span className="break-words text-xs text-[13px] lg:text-sm inline-block w-full">
//                               {' '}{IBANAccountNumber}
//                               </span>
//                             </div>
//                             <div className="sm:w-[10%]">
//                               <button
//                                 onClick={handleIBANAccount}
//                                 className="text-gray-500 hover:text-gray-700"
//                               >
//                                 <Copy size={18} />
//                               </button>
//                             </div>
//                           </div> */}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {selectedSubPayment && (
//                     <div className="mt-6 space-y-4">
//                       {/* Payment Tracking Number Input */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           <span className="flex items-center gap-2">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-5 w-5 text-[#3734A9]"
//                               viewBox="0 0 20 20"
//                               fill="currentColor"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6zm4 3a1 1 0 10-2 0v4a1 1 0 102 0V7zm2 3a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                             Upload Payment Tracking Number
//                           </span>
//                         </label>
//                         <input
//                           type="text"
//                           className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3734A9] focus:border-transparent transition-all placeholder-gray-400"
//                           placeholder="Enter tracking number"
//                           value={trackingNumber}
//                           onChange={(e) => setTrackingNumber(e.target.value)}
//                         />
//                       </div>

//                       {/* Payment Screenshot Upload */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           <span className="flex items-center gap-2">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-5 w-5 text-[#3734A9]"
//                               viewBox="0 0 20 20"
//                               fill="currentColor"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                             Upload Payment Screenshot ({selectedSubPayment})
//                           </span>
//                         </label>
//                         <div className="w-full lg:w-1/2 h-[300px] relative border-2 border-dashed border-gray-300 hover:border-primary rounded-lg p-3 bg-white hover:bg-gray-100 transition-all group">
//                           <input
//                             type="file"
//                             accept="image/*"
//                             onChange={handleFileUpload}
//                             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                           />
//                           {imagePreview ? (
//                             <div className="relative w-full h-full flex items-center justify-center">
//                               <img
//                                 src={imagePreview}
//                                 alt="Payment Screenshot Preview"
//                                 className="w-full h-full object-contain rounded-lg shadow-md"
//                               />
//                               <button
//                                 onClick={removeImage}
//                                 className="absolute -top-3 -right-3 bg-white p-1 rounded-full shadow-md hover:bg-[#3734A9] transition-all hover:scale-110"
//                               >
//                                 <Cancel />
//                               </button>
//                             </div>
//                           ) : (
//                             <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
//                               <ImageUpload />
//                               <p className="text-sm font-medium mt-2 text-center text-gray-400 group-hover:text-[#3734A9]">
//                                 Click to upload or drag & drop
//                               </p>
//                               <p className="text-xs  mt-1 text-gray-400 group-hover:text-[#3734A9]">
//                                 PNG, JPG, GIF (Max 2MB)
//                               </p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="w-full flex justify-center py-10">
//           <button
//             type="button"
//             onClick={onOrder}
//             className={`w-full px-8 py-3 rounded-lg text-white text-lg font-semibold shadow-lg transition-all duration-300 transform
//       ${
//         !selectedPayment ||
//         !selectedAddressId ||
//         cartData?.items.length === 0 ||
//         (selectedPayment === 'onlinePayment' &&
//           (selectedSubPayment === 'easyPaisa' ||
//             selectedSubPayment === 'bank') &&
//           (!paymentScreenshot || !trackingNumber))
//           ? 'bg-gray-400 cursor-not-allowed' // Disabled state
//           : 'bg-primary hover:shadow-2xl hover:scale-105' // Active state
//       }`}
//             disabled={
//               !selectedPayment ||
//               !selectedAddressId ||
//               cartData?.items.length === 0 ||
//               (selectedPayment === 'onlinePayment' &&
//                 (selectedSubPayment === 'easyPaisa' ||
//                   selectedSubPayment === 'bank') &&
//                 (!paymentScreenshot || !trackingNumber))
//             }
//           >
//             {isPending ? <Spinner /> : 'Place Order'}
//           </button>
//         </div>
//       </form>

//       {/* <div className="w-full py-4 mt-4 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4">
//         <div className="w-full  sm:w-3/4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Coupon No:
//           </label>
//           <Input
//             type="text"
//             placeholder="Enter Coupon Code"
//             className="w-full focus:outline-none rounded-lg text-[#4B4B4B] text-sm font-Poppins px-4 py-2 bg-gray-100 focus:ring-2 focus:ring-primary transition-all duration-300"
//             inputClassName="!py-2"
//             value={couponCode}
//             onChange={(e) => setCouponCode(e.target.value)} // Update state on input change
//           />
//           {error && <p className="text-red-500 text-xs mt-1">{error}</p>}{' '}
//         </div>
//         <div className="mt-4">
//           <button
//             onClick={handleCoupon}
//             className="bg-primary mt-2 sm:mt-0 py-2 px-6  rounded-lg text-white text-base font-semibold whitespace-nowrap hover:shadow-lg transition-all duration-300 transform hover:scale-105"
//             disabled={loading} // Disable button while loading
//           >
//             {loading ? 'Applying...' : 'Apply Coupon'}
//           </button>
//         </div>
//       </div> */}

//       <Modal
//         show={isOrderSuccessModalOpen}
//         onClose={() => setIsOrderSuccessModalOpen(false)}
//         modalContainer="bg-white p-8 rounded-lg w-11/12 md:w-1/2 lg:w-1/3"
//       >
//         <div
//           className="flex justify-end text-xl font-bold cursor-pointer"
//           onClick={() => setIsOrderSuccessModalOpen(false)}
//         >
//           <IoMdCloseCircle className="text-primary w-6 h-6" />
//         </div>
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-green-600 mb-4">
//             Congratulations!
//           </h2>
//           <p className="text-gray-700 mb-6">
//             Your order has been placed successfully!
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={() => {
//                 setIsOrderSuccessModalOpen(false);
//                 window.location.href = '/'; // Redirect to the shopping page
//               }}
//               className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-all"
//             >
//               Continue Shopping
//             </button>
//             <button
//               onClick={() => {
//                 setIsOrderSuccessModalOpen(false);
//                 window.location.href = '/order-history'; // Redirect to the orders page
//               }}
//               className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all"
//             >
//               View Order
//             </button>
//           </div>
//         </div>
//       </Modal>

//       <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div
//           className="flex justify-end text-xl font-bold cursor-pointer -mt-4"
//           onClick={() => setIsModalOpen(false)}
//         >
//           <IoMdCloseCircle className="text-primary w-6 h-6" />
//         </div>
//         <div className="p-6">
//           <h2 className="text-lg font-semibold text-center">
//             ✅ Address Saved Successfully!
//           </h2>

//           <button
//             onClick={() => setIsModalOpen(false)}
//             className="mt-4 bg-primary text-white px-4 py-2 rounded-lg w-full"
//           >
//             OK
//           </button>
//         </div>
//       </Modal>

//       <Modal
//         show={isOrderErrorModalOpen}
//         onClose={() => setIsOrderErrorModalOpen(false)}
//         modalContainer="bg-white p-0 rounded-lg w-11/12 md:w-1/2 lg:w-1/3"
//       >
//         <div
//           className="flex justify-end text-xl font-bold cursor-pointer"
//           onClick={() => setIsOrderErrorModalOpen(false)}
//         >
//           <IoMdCloseCircle className="text-primary w-6 h-6" />
//         </div>

//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">
//             Order Failed!
//           </h2>
//           <p className="text-gray-700 mb-6">
//             Your order could not be placed. Please Some thing Add to card
//           </p>
//           <div className="flex justify-center">
//             <button
//               onClick={() => setIsOrderErrorModalOpen(false)}
//               className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-all"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </Modal>
//       <ToastContainer />
//     </div>
//   );
// }
// export default Billing;



//new
'use client';
import React, { useState } from 'react';
import { useCreateOrder } from '@/hooks/useOrder';
import Spinner from '@/components/Spinner';
import { useAddress } from '@/hooks/useAddress';
// import { ICreateAddress } from '@/types/address';
// import { ApplyCoupon } from '@/services/api/coupon';

import {
  // FaBuilding,
  FaCheckCircle,
  // FaCity,
  FaCreditCard,
  // FaEnvelope,
  // FaGlobe,
  // FaHome,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPhone,
  // FaSave,
  // FaTimes,
} from 'react-icons/fa';
import Modal from '@/app/components/Modal';
import { IoMdCloseCircle } from 'react-icons/io';
// import Input from '@/app/components/Input';
import { useGetCart } from '@/hooks/useCart';

import { Cancel, ImageUpload } from '@/app/admin/products/_components/Icons';
import { uploadOne } from '@/services/uploadService';
import { Copy } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
// import Input from '@/app/components/Input';
import AddAddress from './AddAddress';

interface Props {
  className?: string;
}

function Billing({ className = '' }: Props) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: cartData, refetch: refetchCart } = useGetCart();

  const { data } = useAddress({});
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false);
  const [isOrderErrorModalOpen, setIsOrderErrorModalOpen] = useState(false);
  const EsaypisaAccountNumber = '03035454074';
  const BankAccountNumber = '08040106979060';
  const IBANAccountNumber = 'PK12MEZN0008040106979060';

  const handleEsaypisaAccount = () => {
    navigator.clipboard.writeText(EsaypisaAccountNumber);
    toast.success('EsayPisa Account number copied!');
  };

  const handleBankAccount = () => {
    navigator.clipboard.writeText(BankAccountNumber);
    toast.success('Bank Account number copied!');
  };

  const handleIBANAccount = () => {
    navigator.clipboard.writeText(IBANAccountNumber);
    toast.success('IBAN number copied!');
  };

  const { mutateAsync, isPending } = useCreateOrder();
  const onOrder = async () => {
    console.log('payment methoid', selectedPayment);

    if (!selectedAddressId) return null;
    try {
      const orderPayload = {
        address_id: selectedAddressId,
        payment_method: 'cash_on_delivery',
        screenshot: '',
        transactionId: '',
      };

      if (selectedPayment === 'onlinePayment') {
        if (!paymentScreenshot) {
          throw new Error('Please upload payment screenshot');
        }

        try {
          const uploadResponse = await uploadOne({ file: paymentScreenshot });

          if (!uploadResponse?.data) {
            throw new Error('Failed to upload payment screenshot');
          }

          orderPayload.screenshot = uploadResponse.data;
          orderPayload.payment_method = selectedSubPayment || 'easypaisa';
          orderPayload.transactionId = trackingNumber || '';
        } catch (uploadError) {
          console.error('Screenshot upload failed:', uploadError);
          throw new Error('Failed to upload payment proof. Please try again.');
        }
      }

      const response = await mutateAsync(orderPayload);

      if (response) {
        setIsOrderSuccessModalOpen(true);
        refetchCart();
      }
    } catch (err) {
      console.log(err);

      setIsOrderErrorModalOpen(true);
    }
  };

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  const [selectedPayment, setSelectedPayment] = useState('');

  const handlePaymentChange = (event: {
    target: { id: React.SetStateAction<string> };
  }) => {
    setSelectedPayment(event.target.id);
  };

  const handleCardClick = (id: React.SetStateAction<string>) => {
    setSelectedPayment(id);
  };

  const [selectedSubPayment, setSelectedSubPayment] = useState<string | null>(
    null
  );
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState('');

  const handlePaymentSelection = (paymentType: string) => {
    setSelectedPayment(paymentType);
    setSelectedSubPayment(null); // Reset sub payment when changing main payment
    setPaymentScreenshot(null); // Reset file when changing payment
  };

  const handleSubPaymentSelection = (method: string) => {
    setSelectedSubPayment(method);
    setPaymentScreenshot(null); // Reset file on change
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setPaymentScreenshot(file);
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const removeImage = () => {
    setPaymentScreenshot(null);
    setImagePreview('');
  };

  return (
    <div className={`md:px-8 ${className}`}>
      <h1 className="text-[#2B2B2D] text-xl font-OpenSans font-bold leading-6 py-5">
        Billing Details
      </h1>
      <div className="mt- sm:p-2 border border-[#E9E9E9] rounded-[5px]">
        <h1 className="text-[#2B2B2D] text-[24px] font-OpenSans font-bold leading-tight mb-6">
          Checkout Options
        </h1>
        <div className="flex flex-wrap items-center gap-6 mt-4">
          {/* Existing Address Option */}
          <span className="flex items-center gap-4">
            <input
              id="iio"
              name="test"
              type="radio"
              className="hidden"
              defaultChecked
              checked={!isAddingNew}
              onChange={() => setIsAddingNew(false)}
            />
            <label
              htmlFor="iio"
              className="flex items-center cursor-pointer text-[#4A4A4A] text-[16px] font-OpenSans font-medium leading-6 gap-3"
            >
              {/* Custom Animated Radio Button */}
              <span className="relative w-6 h-6 flex items-center justify-center">
                <span
                  className={`absolute w-6 h-6 border-2 rounded-full transition-all duration-300 ${
                    !isAddingNew
                      ? 'border-primary scale-100 '
                      : 'border-gray-300 scale-90'
                  }`}
                />
                <span
                  className={`absolute w-3 h-3 bg-primary rounded-full transition-all duration-300 ${
                    !isAddingNew ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                />
                {/* Hover Animation */}
                <span
                  className={`absolute w-6 h-6 border-2 border-primary rounded-full transition-all duration-300 ${
                    !isAddingNew ? 'animate-ping opacity-0 ' : 'opacity-0'
                  }`}
                />
              </span>
              <span
                className={`transition-all duration-300 hover:text-primary  ${
                  !isAddingNew ? 'text-primary ' : 'text-[#4A4A4A]'
                }`}
              >
                I want to use an existing address
              </span>
            </label>
          </span>

          {/* New Address Option */}
          <span className="flex items-center gap-4">
            <input
              id="ii"
              name="test"
              type="radio"
              className="hidden"
              checked={isAddingNew}
              onChange={() => setIsAddingNew(true)}
            />
            <label
              htmlFor="ii"
              className="flex items-center cursor-pointer text-[#4A4A4A] text-[16px] font-OpenSans font-medium leading-6 gap-3"
            >
              {/* Custom Animated Radio Button */}
              <span className="relative w-6 h-6 flex items-center justify-center">
                <span
                  className={`absolute w-6 h-6 border-2 rounded-full transition-all duration-300 ${
                    isAddingNew
                      ? 'border-primary scale-100 '
                      : 'border-gray-300 scale-90'
                  }`}
                />
                <span
                  className={`absolute w-3 h-3 bg-primary rounded-full transition-all duration-300 ${
                    isAddingNew
                      ? 'scale-100 opacity-100 '
                      : 'scale-0 opacity-0 '
                  }`}
                />
                {/* Hover Animation */}
                <span
                  className={`absolute w-6 h-6 border-2 border-primary rounded-full transition-all duration-300 ${
                    isAddingNew ? 'animate-ping opacity-0 ' : 'opacity-0 '
                  }`}
                />
              </span>
              <span
                className={`transition-all duration-300 hover:text-primary  ${
                  !isAddingNew ? 'text-[#4A4A4A] ' : ' text-primary'
                }`}
              >
                I want to use a new address
              </span>
            </label>
          </span>
        </div>

        {!isAddingNew ? (
          <>
            {data?.data?.length ? (
              <ul className="space-y-4 mt-5">
                {data.data.map((address) => (
                  <li
                    key={address.id}
                    onClick={() => handleSelectAddress(address.id)}
                    className={`group border-2 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 relative cursor-pointer ${
                      selectedAddressId === address.id
                        ? 'border-primary bg-gradient-to-r from-primary/10 to-white'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Address Icon */}
                      <div className="p-3 bg-primary/10 rounded-full">
                        <FaMapMarkerAlt className="text-primary w-6 h-6" />
                      </div>
                      {/* Address Details */}
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          {address.street_address}
                        </p>
                        {address.address_line2 && (
                          <p className="text-sm text-gray-600">
                            {address.address_line2}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} {address.postal_code}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.country}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <FaPhone className="text-primary" />
                          {address.phone}
                        </p>
                      </div>
                    </div>
                    {/* Custom Radio Button */}
                    <label className="flex items-center absolute top-4 right-4">
                      <input
                        type="radio"
                        name="selectedAddress"
                        value={address.id}
                        checked={selectedAddressId === address.id}
                        className="hidden"
                      />
                      <span
                        className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-300 ${
                          selectedAddressId === address.id
                            ? 'border-primary bg-primary'
                            : 'border-gray-300 group-hover:border-primary'
                        }`}
                      >
                        {selectedAddressId === address.id && (
                          <FaCheckCircle className="w-4 h-4 text-white" />
                        )}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center mt-5 p-6 bg-gray-50 rounded-lg">
                <FaMapMarkerAlt className="text-gray-400 w-10 h-10 mx-auto" />
                <p className="text-gray-500 text-sm mt-3">
                  No addresses found. Add a new address to get started.
                </p>
              </div>
            )}
          </>
        ) : (
          <AddAddress setIsAddingNew={setIsAddingNew} />
        )}

        <div className="flex w-full">
          <div className="w-full border-t-2 border-[#E9E9E9]  px-2 py-8 mt-8 bg-white ">
            <h1 className="text-3xl font-bold leading-8 text-[#2B2B2D]">
              Delivery & Payment Method
            </h1>
            <p className="text-[#7A7A7A] text-base mt-3 mb-6">
              Please select the preferred shipping and payment method for your
              order.
            </p>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-[#2B2B2D] mb-4">
                Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="w-full ">
                  <div
                    className={`relative min-h-[220px] flex flex-col items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ease-in-out duration-300 transform ${
                      selectedPayment === 'cashOnDelivery'
                        ? 'border-primary shadow-lg scale-105'
                        : 'border-[#E9E9E9] hover:shadow-lg hover:border-primary'
                    }`}
                    onClick={() => handleCardClick('cashOnDelivery')}
                  >
                    <input
                      type="radio"
                      name="payment"
                      id="cashOnDelivery"
                      className="accent-primary absolute top-4 right-4"
                      onChange={handlePaymentChange}
                      checked={selectedPayment === 'cashOnDelivery'}
                    />
                    <FaMoneyBillWave
                      className={`text-3xl text-[#2B2B2D] ${
                        selectedPayment === 'cashOnDelivery'
                          ? 'text-primary'
                          : ''
                      }`}
                    />
                    <div className="">
                      <label
                        htmlFor="cashOnDelivery"
                        className={`text-[#2B2B2D] text-xl font-semibold ${
                          selectedPayment === 'cashOnDelivery'
                            ? 'text-primary'
                            : 'text-[#2B2B2D]'
                        }`}
                      >
                        <span className="w-full text-center">
                          {' '}
                          Cash on Delivery
                        </span>
                      </label>
                      <p className="text-[#7A7A7A] text-[13px] mt-2">
                        Pay when you receive your order. Benefits:
                      </p>
                      <ul className="list-disc list-inside text-start text-[#7A7A7A] text-[13px]">
                        <li>No need to share payment details online.</li>
                        <li>Convenient and secure for cash payments.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="w-full ">
                  <div
                    className={`relative min-h-[220px] flex flex-col items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all duration-300 transform ${
                      selectedPayment === 'onlinePayment'
                        ? 'border-primary shadow-lg scale-105'
                        : 'border-[#E9E9E9] hover:shadow-lg hover:border-primary'
                    }`}
                    onClick={() => handlePaymentSelection('onlinePayment')}
                  >
                    <input
                      type="radio"
                      name="payment"
                      className="accent-primary absolute top-4 right-4"
                      checked={selectedPayment === 'onlinePayment'}
                      readOnly
                    />
                    <FaCreditCard
                      className={`text-3xl text-[#2B2B2D] ${
                        selectedPayment === 'onlinePayment'
                          ? 'text-primary'
                          : ''
                      }`}
                    />
                    <div className="text-center">
                      <span className="text-xl font-semibold text-[#2B2B2D]">
                        Online Payment
                      </span>
                      <p className="text-[#7A7A7A] text-sm mt-2">
                        Fast & secure digital payments. Benefits:
                      </p>
                      <ul className="list-disc list-inside text-start text-[#7A7A7A] text-sm">
                        <li>Hassle-free and instant payment processing.</li>
                        <li>
                          Receive a 5% discount for advance online payment.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {selectedPayment === 'onlinePayment' && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-[#2B2B2D] mb-4">
                    Select Online Payment Method
                  </h3>

                  <div className="grid grid-cols-1 mdx:grid-cols-2 gap-4">
                    <div
                      className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-300 transform ${
                        selectedSubPayment === 'easypaisa'
                          ? 'border-primary shadow-md scale-105'
                          : 'border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => handleSubPaymentSelection('easypaisa')}
                    >
                      <div>
                        <div className="flex justify-center">
                          <img
                            src="/easypisa.png"
                            alt="EasyPaisa"
                            className="w-[70%]"
                          />
                        </div>
                        <p className="text-xs xxs:text-sm sm:text-lg pt-5">
                          <span className="text-gray-800 text-[15px] font-semibold">
                            A/C Title: Zia Ur Rehman
                          </span>
                        </p>
                        <p className="text-xs xxs:text-[15px] pt-5 flex items-center space-x-2">
                          <span className="text-gray-800 font-semibold">
                            A/C Number:
                          </span>
                          <span className="text-gray-900">
                            {EsaypisaAccountNumber}
                          </span>
                          <button
                            onClick={handleEsaypisaAccount}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Copy size={18} />
                          </button>
                        </p>
                      </div>
                    </div>

                    {/* Bank Option */}
                    <div
                      className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-300 transform ${
                        selectedSubPayment === 'bank_transfer'
                          ? 'border-primary shadow-md scale-105'
                          : 'border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => handleSubPaymentSelection('bank_transfer')}
                    >
                      <div className="w-full flex flex-col justify-center items-center">
                        <img
                          src="/symbols.png"
                          alt="Bank"
                          className="w-1/3 h-1/3 object-contain"
                        />
                        <div className="w-full flex flex-col gap-y-2 pt-3">
                          <p className="w-full text-xs xxs:text-lg break-words text-center font-semibold">
                            Meezan Bank
                          </p>
                          <p className="w-full  text-xs xxs:text-sm break-words text-gray-800 font-semibold">
                            <span className="w-full  text-gray-800 font-semibold">
                              A/C Title: ZK TRADERS
                            </span>
                          </p>
                          <div className="w-full items-center flex text-xs xxs:text-sm break-words text-gray-800 font-semibold">
                            <p className="gap-1">
                              <span className="w-full  text-gray-800 font-semibold">
                                A/C Number:
                              </span>
                              <span>{BankAccountNumber}</span>
                            </p>

                            <button
                              onClick={handleBankAccount}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Copy size={18} className=" pt-1" />
                            </button>
                          </div>
                          <p className="w-full flex-col xxs:flex-row gap-1 text-sm break-words text-gray-800 font-semibold">
                            <span className="text-gray-800 font-semibold">
                              IBAN:
                            </span>
                            {IBANAccountNumber}
                            <button
                              onClick={handleIBANAccount}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Copy size={18} />
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedSubPayment && (
                    <div className="mt-6 space-y-4">
                      {/* Payment Tracking Number Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-[#3734A9]"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6zm4 3a1 1 0 10-2 0v4a1 1 0 102 0V7zm2 3a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Upload Payment Tracking Number
                          </span>
                        </label>
                        <input
                          type="text"
                          className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3734A9] focus:border-transparent transition-all placeholder-gray-400"
                          placeholder="Enter tracking number"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                        />
                      </div>

                      {/* Payment Screenshot Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <span className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-[#3734A9]"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Upload Payment Screenshot ({selectedSubPayment})
                          </span>
                        </label>
                        <div className="w-full lg:w-1/2 h-[300px] relative border-2 border-dashed border-gray-300 hover:border-primary rounded-lg p-3 bg-white hover:bg-gray-100 transition-all group">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {imagePreview ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <img
                                src={imagePreview}
                                alt="Payment Screenshot Preview"
                                className="w-full h-full object-contain rounded-lg shadow-md"
                              />
                              <button
                                onClick={removeImage}
                                className="absolute -top-3 -right-3 bg-white p-1 rounded-full shadow-md hover:bg-[#3734A9] transition-all hover:scale-110"
                              >
                                <Cancel />
                              </button>
                            </div>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                              <ImageUpload />
                              <p className="text-sm font-medium mt-2 text-center text-gray-400 group-hover:text-[#3734A9]">
                                Click to upload or drag & drop
                              </p>
                              <p className="text-xs  mt-1 text-gray-400 group-hover:text-[#3734A9]">
                                PNG, JPG, GIF (Max 2MB)
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center py-10">
          <button
            type="button"
            onClick={onOrder}
            className={`w-full px-8 py-3 rounded-lg text-white text-lg font-semibold shadow-lg transition-all duration-300 transform 
      ${
        !selectedPayment ||
        !selectedAddressId ||
        cartData?.items?.length === 0 ||
        (selectedPayment === 'onlinePayment' &&
          (selectedSubPayment === 'easyPaisa' ||
            selectedSubPayment === 'bank') &&
          (!paymentScreenshot || !trackingNumber))
          ? 'bg-gray-400 cursor-not-allowed' // Disabled state
          : 'bg-primary hover:shadow-2xl hover:scale-105' // Active state
      }`}
            disabled={
              !selectedPayment ||
              !selectedAddressId ||
              cartData?.items?.length === 0 ||
              (selectedPayment === 'onlinePayment' &&
                (selectedSubPayment === 'easyPaisa' ||
                  selectedSubPayment === 'bank') &&
                (!paymentScreenshot || !trackingNumber))
            }
          >
            {isPending ? <Spinner /> : 'Place Order'}
          </button>
        </div>
      </div>

      <Modal
        show={isOrderSuccessModalOpen}
        onClose={() => setIsOrderSuccessModalOpen(false)}
        modalContainer="bg-white p-8 rounded-lg w-11/12 md:w-1/2 lg:w-1/3"
      >
        <div
          className="flex justify-end text-xl font-bold cursor-pointer"
          onClick={() => setIsOrderSuccessModalOpen(false)}
        >
          <IoMdCloseCircle className="text-primary w-6 h-6" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Congratulations!
          </h2>
          <p className="text-gray-700 mb-6">
            Your order has been placed successfully!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setIsOrderSuccessModalOpen(false);
                window.location.href = '/'; // Redirect to the shopping page
              }}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-all"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => {
                setIsOrderSuccessModalOpen(false);
                window.location.href = '/order-history'; // Redirect to the orders page
              }}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all"
            >
              View Order
            </button>
          </div>
        </div>
      </Modal>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div
          className="flex justify-end text-xl font-bold cursor-pointer -mt-4"
          onClick={() => setIsModalOpen(false)}
        >
          <IoMdCloseCircle className="text-primary w-6 h-6" />
        </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-center">
            ✅ Address Saved Successfully!
          </h2>

          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 bg-primary text-white px-4 py-2 rounded-lg w-full"
          >
            OK
          </button>
        </div>
      </Modal>

      <Modal
        show={isOrderErrorModalOpen}
        onClose={() => setIsOrderErrorModalOpen(false)}
        modalContainer="bg-white p-0 rounded-lg w-11/12 md:w-1/2 lg:w-1/3"
      >
        <div
          className="flex justify-end text-xl font-bold cursor-pointer"
          onClick={() => setIsOrderErrorModalOpen(false)}
        >
          <IoMdCloseCircle className="text-primary w-6 h-6" />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Order Failed!
          </h2>
          <p className="text-gray-700 mb-6">
            Your order could not be placed. Please Some thing Add to card
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => setIsOrderErrorModalOpen(false)}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}
export default Billing;

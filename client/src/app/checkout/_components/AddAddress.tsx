// 'use clinet';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { ICreateAddress } from '@/types/address';
// import {
//   FaBuilding,
//   FaCity,
//   FaEnvelope,
//   FaGlobe,
//   FaHome,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaSave,
//   FaTimes,
// } from 'react-icons/fa';
// import Modal from '@/app/components/Modal';
// import { useState } from 'react';
// import { useCreateAddress } from '@/hooks/useAddress';
// import { IoMdCloseCircle } from 'react-icons/io';

// const schema = yup.object().shape({
//   street_address: yup.string().required('Street address is required'),
//   address_line2: yup.string().optional(),
//   city: yup.string().required('City is required'),
//   state: yup.string().required('State is required'),
//   postal_code: yup.string().optional(),
//   country: yup.string().required('Country is required'),
//   phone: yup.string().required('Phone number is required'),
// });

// function AddAddress({setIsAddingNew}:any) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ICreateAddress>({
//     resolver: yupResolver(schema),
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//  const { mutate: addAddress } = useCreateAddress();
//   const onSubmit = (data: ICreateAddress) => {
//      addAddress(data, {
//       onSuccess: () => {
//         setIsModalOpen(true);
//         setIsAddingNew(false);
//       },
//       onError: (error) => {
//         console.error('Failed to add address:', error);
//       },
//     });
//   };

//   return (
//     <>
//     <div className="space-y-6 mt-5">
//       <div className="w-full flex gap-2">
//         <div className="w-full md:w-[calc(50%-0.5rem)] relative">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Street Address
//           </label>
//           <div className="w-full relative">
//             <input
//               {...register('street_address')}
//               placeholder="Street Address"
//               className={`w-full border ${errors.street_address ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 mt-1`}
//             />
//             {errors.street_address && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.street_address.message}
//               </p>
//             )}
//             <FaMapMarkerAlt className="absolute left-4 top-3.5 text-gray-400" />
//           </div>
//         </div>
//         <div className="w-full md:w-[calc(50%-0.5rem)] relative">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Address Line 2 (Opt)
//           </label>
//           <div className="relative">
//             <input
//               {...register('address_line2')}
//               placeholder="Address Line 2 (Opt)"
//               className="border border-gray-300 p-3 pl-12 rounded-lg w-full focus:outline-primary"
//             />
//             <FaHome className="absolute left-4 top-3.5 text-gray-400" />
//           </div>
//         </div>
//       </div>
//       <div className="w-full flex gap-2">
//         <div className="w-full md:w-[calc(33.33%-0.66rem)] relative">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             City
//           </label>
//           <div className="relative">
//             <input
//               {...register('city')}
//               placeholder="City"
//               className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 mt-1`}
//             />
//             {errors.city && (
//               <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
//             )}
//             <FaCity className="absolute left-4 top-3.5 text-gray-400" />
//           </div>
//         </div>
//         <div className="w-full md:w-[calc(33.33%-0.66rem)] relative">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             State
//           </label>
//           <div className="relative">
//             <input
//               {...register('state')}
//               placeholder="State"
//               className={`w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 mt-1`}
//             />
//             {errors.state && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.state.message}
//               </p>
//             )}
//             <FaBuilding className="absolute left-4 top-3.5 text-gray-400" />
//           </div>
//         </div>
//         <div className="w-full md:w-[calc(33.33%-0.66rem)] relative">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Postal Code (Opt)
//           </label>
//           <div className="relative">
//             <input
//               {...register('postal_code')}
//               placeholder="Postal Code (Opt)"
//               className="border border-gray-300 p-3 pl-12 rounded-lg w-full"
//             />
//             <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
//           </div>
//         </div>
//       </div>
//       <div className="w-full flex gap-2">
//         <div className="w-full md:w-[calc(50%-0.5rem)] relative">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Country
//           </label>
//           <div className="relative">
//             <input
//               {...register('country')}
//               placeholder="Country"
//               className={`w-full border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 mt-1`}
//             />
//             {errors.country && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.country.message}
//               </p>
//             )}
//             <FaGlobe className="absolute left-4 top-3.5 text-gray-400" />
//           </div>
//         </div>
//         <div className="w-full md:w-[calc(50%-0.5rem)] relative">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Phone
//           </label>
//           <div className="relative">
//             <input
//               {...register('phone')}
//               placeholder="Phone"
//               className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 mt-1`}
//             />
//             {errors.phone && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.phone.message}
//               </p>
//             )}
//             <FaPhone className="absolute left-4 top-3.5 text-gray-400" />
//           </div>
//         </div>
//       </div>
//       <div className="flex gap-6 justify-center mt-6">
//         <button
//           type="button"
//           onClick={handleSubmit(onSubmit) }
//           className="w-1/2 bg-primary text-white px-8 py-4 rounded-lg flex items-center gap-3"
//         >
//           <FaSave className="w-6 h-6" />
//           <span className="font-semibold text-lg">Save Address</span>
//         </button>
//         <button
//           type="button"
//           onClick={() => setIsAddingNew(false)}
//           className="w-1/2 bg-gray-500 text-white px-8 py-4 rounded-lg flex items-center gap-3"
//         >
//           <FaTimes className="w-6 h-6" />
//           <span className="font-semibold text-lg">Cancel</span>
//         </button>
//       </div>
//     </div>

//     <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
//             <div
//               className="flex justify-end text-xl font-bold cursor-pointer -mt-4"
//               onClick={() => setIsModalOpen(false)}
//             >
//               <IoMdCloseCircle className="text-primary w-6 h-6" />
//             </div>
//             <div className="p-6">
//               <h2 className="text-lg font-semibold text-center">
//                 ✅ Address Saved Successfully!
//               </h2>
    
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="mt-4 bg-primary text-white px-4 py-2 rounded-lg w-full"
//               >
//                 OK
//               </button>
//             </div>
//           </Modal>
//           </>
//   );
// }

// export default AddAddress;



// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { ICreateAddress } from '@/types/address';
// import { useCreateAddress } from '@/hooks/useAddress';
// import Modal from '@/app/components/Modal';
// import {
//   FaBuilding,
//   FaCity,
//   FaEnvelope,
//   FaGlobe,
//   FaHome,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaSave,
//   FaTimes,
// } from 'react-icons/fa';
// import { IoMdCloseCircle } from 'react-icons/io';

// const schema = yup.object().shape({
//   street_address: yup.string().required('Street address is required'),
//   address_line2: yup.string().optional(),
//   city: yup.string().required('City is required'),
//   state: yup.string().required('State is required'),
//   postal_code: yup.string().optional(),
//   country: yup.string().required('Country is required'),
//   phone: yup.string().matches(/^\+?[0-9]{7,15}$/, 'Enter a valid phone number').required('Phone number is required'),
// });

// function AddAddress({ setIsAddingNew }: { setIsAddingNew: (value: boolean) => void }) {
//   const { register, handleSubmit, formState: { errors } } = useForm<ICreateAddress>({
//     resolver: yupResolver(schema),
//   });
  
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { mutate: addAddress } = useCreateAddress();

//   const onSubmit = (data: ICreateAddress) => {
//     addAddress(data, {
//       onSuccess: () => {
//         setIsModalOpen(true);
//         setIsAddingNew(false);
//       },
//       onError: (error) => console.error('Failed to add address:', error),
//     });
//   };

//   return (
//     <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 text-center">Add New Address</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {[
//           { name: 'street_address', label: 'Street Address', icon: FaMapMarkerAlt, required: true },
//           { name: 'address_line2', label: 'Address Line 2 (Optional)', icon: FaHome },
//           { name: 'city', label: 'City', icon: FaCity, required: true },
//           { name: 'state', label: 'State', icon: FaBuilding, required: true },
//           { name: 'postal_code', label: 'Postal Code (Optional)', icon: FaEnvelope },
//           { name: 'country', label: 'Country', icon: FaGlobe, required: true },
//           { name: 'phone', label: 'Phone', icon: FaPhone, required: true },
//         ].map(({ name, label, icon: Icon, required }) => (
//           <div key={name} className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
//             <div className="relative">
//               <input
//                 {...register(name as keyof ICreateAddress)}
//                 placeholder={label}
//                 className={`w-full border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 pl-10 focus:ring focus:ring-primary`}
//               />
//               <Icon className="absolute left-3 top-3 text-gray-400" />
//             </div>
//             {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>}
//           </div>
//         ))}

//         <div className="flex gap-4 justify-center mt-6">
//           <button type="submit" className="w-1/2 bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-3 justify-center font-semibold text-lg shadow-md hover:bg-primary-dark">
//             <FaSave className="w-5 h-5" /> Save Address
//           </button>
//           <button type="button" onClick={() => setIsAddingNew(false)} className="w-1/2 bg-gray-500 text-white px-6 py-3 rounded-lg flex items-center gap-3 justify-center font-semibold text-lg shadow-md hover:bg-gray-700">
//             <FaTimes className="w-5 h-5" /> Cancel
//           </button>
//         </div>
//       </form>

//       <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div className="p-6 text-center">
//           <IoMdCloseCircle className="text-primary w-8 h-8 mx-auto mb-2 cursor-pointer" onClick={() => setIsModalOpen(false)} />
//           <h2 className="text-lg font-semibold">✅ Address Saved Successfully!</h2>
//           <button onClick={() => setIsModalOpen(false)} className="mt-4 bg-primary text-white px-4 py-2 rounded-lg w-full hover:bg-primary-dark">OK</button>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default AddAddress;





'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ICreateAddress } from '@/types/address';
import {
  FaBuilding,
  FaCity,
  FaEnvelope,
  FaGlobe,
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import Modal from '@/app/components/Modal';
import { useState } from 'react';
import { useCreateAddress } from '@/hooks/useAddress';
import { IoMdCloseCircle } from 'react-icons/io';
import { motion } from 'framer-motion';

const schema = yup.object().shape({
  street_address: yup.string().required('Street address is required'),
  address_line2: yup.string().optional(),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  postal_code: yup.string().optional(),
  country: yup.string().required('Country is required'),
  phone: yup.string().required('Phone number is required'),
});

function AddAddress({ setIsAddingNew }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateAddress>({
    resolver: yupResolver(schema),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: addAddress } = useCreateAddress();

  const onSubmit = (data: ICreateAddress) => {
    addAddress(data, {
      onSuccess: () => {
        setIsModalOpen(true);
        setIsAddingNew(false);
      },
      onError: (error) => {
        console.error('Failed to add address:', error);
      },
    });
  };

  return (
    <>
      <div
       
        className="space-y-6 mt-5 p-6 bg-white rounded-lg shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Street Address */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <div className="relative">
              <input
                {...register('street_address')}
                placeholder="Street Address"
                className={`w-full border ${
                  errors.street_address ? 'border-red-500' : 'border-gray-300'
                } rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
              />
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
            </div>
            {errors.street_address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.street_address.message}
              </p>
            )}
          </div>

          {/* Address Line 2 */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2 (Optional)
            </label>
            <div className="relative">
              <input
                {...register('address_line2')}
                placeholder="Address Line 2 (Optional)"
                className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <FaHome className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* City */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <div className="relative">
              <input
                {...register('city')}
                placeholder="City"
                className={`w-full border ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                } rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
              />
              <FaCity className="absolute left-3 top-3 text-gray-400" />
            </div>
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* State */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <div className="relative">
              <input
                {...register('state')}
                placeholder="State"
                className={`w-full border ${
                  errors.state ? 'border-red-500' : 'border-gray-300'
                } rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
              />
              <FaBuilding className="absolute left-3 top-3 text-gray-400" />
            </div>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          {/* Postal Code */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code (Optional)
            </label>
            <div className="relative">
              <input
                {...register('postal_code')}
                placeholder="Postal Code (Optional)"
                className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Country */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <div className="relative">
              <input
                {...register('country')}
                placeholder="Country"
                className={`w-full border ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                } rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
              />
              <FaGlobe className="absolute left-3 top-3 text-gray-400" />
            </div>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <div className="relative">
              <input
                {...register('phone')}
                placeholder="Phone"
                className={`w-full border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
              />
              <FaPhone className="absolute left-3 top-3 text-gray-400" />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mt-6">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="w-1/2 bg-primary text-white px-8 py-3 rounded-lg flex items-center gap-3 hover:bg-primary-dark transition-all"
          >
            <FaSave className="w-6 h-6" />
            <span className="font-semibold text-lg">Save Address</span>
          </button>
          <button
            type="button"
            onClick={() => setIsAddingNew(false)}
            className="w-1/2 bg-gray-500 text-white px-8 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-600 transition-all"
          >
            <FaTimes className="w-6 h-6" />
            <span className="font-semibold text-lg">Cancel</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg p-6"
        >
          <div className="flex justify-end">
            <IoMdCloseCircle
              className="text-primary w-6 h-6 cursor-pointer hover:text-primary-dark transition-all"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
          <h2 className="text-lg font-semibold text-center mb-4">
            ✅ Address Saved Successfully!
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 bg-primary text-white px-4 py-2 rounded-lg w-full hover:bg-primary-dark transition-all"
          >
            OK
          </button>
        </motion.div>
      </Modal>
    </>
  );
}

export default AddAddress;
// 'use client';

// import React from 'react';
// import Card from './Card';
// import { useGetCart } from '@/hooks/useCart';
// import { applyDiscountToPrice } from '@/utils/discountUtils';

// function Summary() {
//   const { data } = useGetCart();

//   const subTotal =
//     data?.items?.reduce((acc, item) => {
//       const price =
//         applyDiscountToPrice(
//           item?.total_price || 0,
//           item?.Variant?.Product?.discount || 0
//         )?.priceAfterDiscount || 0;
//       return acc + price;
//     }, 0) || 0;

//   const deliveryCharges = 350;

//   const totalPrice = subTotal + deliveryCharges;

//   return (
//     <div className="w-full border border-[#E9E9E9] rounded-[5px] px-3 py-2">
//       <h1 className="text-xl font-OpenSans font-bold leading-6">Summary</h1>
//       <div className="mt-3 flex items-center justify-between">
//         <h1 className="text-[#7A7A7A] text-[13px] font-OpenSans">Sub-Total</h1>
//         <h1 className="text-[15px] font-OpenSans">Rs. {subTotal}</h1>
//       </div>
//       <div className="mt-2 flex items-center justify-between">
//         <h1 className="text-[#7A7A7A] text-[13px] font-OpenSans">
//           Delivery Charges
//         </h1>
//         <h1 className="text-[15px] font-OpenSans">RS. {deliveryCharges}</h1>
//       </div>
//       <div className="w-full h-[1px] bg-[#E9E9E9] mt-3" />
//       <div className="flex items-center justify-between mt-3">
//         <h1 className="text-[#2B2B2D] text-base font-OpenSans font-medium">
//           Total Amount
//         </h1>
//         <h1 className="text-base font-OpenSans font-medium">
//           Rs. {totalPrice}
//         </h1>
//       </div>
//       <div>
//         {data?.items?.map((e, index) => (
//           <Card
//             key={index}
//             src={e?.Variant?.image || ''}
//             title={e?.Variant?.Product?.name || ''}
//             originalPrice={
//               applyDiscountToPrice(
//                 e?.total_price || 0,
//                 e?.Variant?.Product?.discount || 0
//               )?.priceAfterDiscount
//             }
//             discountedPrice={e?.total_price || 0}
//             rating={0}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Summary;

// 'use client';

// import React from 'react';
// import Card from './Card';
// import { useGetCart } from '@/hooks/useCart';
// import { applyDiscountToPrice } from '@/utils/discountUtils';

// function Summary() {
//   const { data } = useGetCart();

//   const subTotal =
//     data?.items?.reduce((acc, item) => {
//       const price =
//         applyDiscountToPrice(
//           item?.total_price || 0,
//           item?.Variant?.Product?.discount || 0
//         )?.priceAfterDiscount || 0;
//       return acc + price;
//     }, 0) || 0;

//   // Set delivery charges dynamically
//   const deliveryCharges = subTotal < 1500 ? 350 : 0;

//   const totalPrice = subTotal + deliveryCharges;

//   return (
//     <div className="w-full border border-[#E9E9E9] rounded-[5px] px-3 py-2">
//       <h1 className="text-xl font-OpenSans font-bold leading-6">Summary</h1>
//       <div className="mt-3 flex items-center justify-between">
//         <h1 className="text-[#7A7A7A] text-[13px] font-OpenSans">Sub-Total</h1>
//         <h1 className="text-[15px] font-OpenSans">Rs. {subTotal}</h1>
//       </div>
//       <div className="mt-2 flex items-center justify-between">
//         <h1 className="text-[#7A7A7A] text-[13px] font-OpenSans">
//           Delivery Charges
//         </h1>
//         <h1 className="text-[15px] font-OpenSans">Rs. {deliveryCharges}</h1>
//       </div>
//       <div className="w-full h-[1px] bg-[#E9E9E9] mt-3" />
//       <div className="flex items-center justify-between mt-3">
//         <h1 className="text-[#2B2B2D] text-base font-OpenSans font-medium">
//           Total Amount
//         </h1>
//         <h1 className="text-base font-OpenSans font-medium">
//           Rs. {totalPrice}
//         </h1>
//       </div>
//       <div>
//         {data?.items?.map((e, index) => (
//           <Card
//             key={index}
//             src={e?.Variant?.image || ''}
//             title={e?.Variant?.Product?.name || ''}
//             originalPrice={
//               applyDiscountToPrice(
//                 e?.total_price || 0,
//                 e?.Variant?.Product?.discount || 0
//               )?.priceAfterDiscount
//             }
//             discountedPrice={e?.total_price || 0}
//             rating={0}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Summary;

'use client';

import React from 'react';
import Card from './Card';
import { useGetCart } from '@/hooks/useCart';
import { applyDiscountToPrice } from '@/utils/discountUtils';

function Summary() {
  const { data } = useGetCart();

  const subTotal =
    data?.items?.reduce((acc, item) => {
      const price =
        applyDiscountToPrice(
          item?.total_price || 0,
        item?.Variant?.discount ||  item?.Variant?.Product?.discount || 0
        )?.priceAfterDiscount || 0;
      return acc + price;
    }, 0) || 0;

  // Set delivery charges dynamically
  const deliveryCharges = subTotal < 2999 ? 350 : 0;

  const totalPrice = subTotal + deliveryCharges;

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="px-6 py-4 border-t-2 rounded-md sm:border-b border-[#E9E9E9]">
        <h1 className="text-2xl font-OpenSans font-bold text-[#2B2B2D]">
          Order Summary
        </h1>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[#7A7A7A] text-sm font-OpenSans">Sub-Total</h1>
          <h1 className="text-lg font-OpenSans font-semibold text-[#2B2B2D]">
          Rs. {subTotal?.toFixed(2)}
          </h1>
        </div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[#7A7A7A] text-sm font-OpenSans">
            Delivery Charges
          </h1>
          <h1 className="text-lg font-OpenSans font-semibold text-[#2B2B2D]">
            Rs. {deliveryCharges}
          </h1>
        </div>
        <div className="w-full h-[1px] bg-[#E9E9E9] my-4" />
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[#2B2B2D] text-lg font-OpenSans font-bold">
            Total Amount
          </h1>
          <h1 className="text-xl font-OpenSans font-bold text-[#2B2B2D]">
            Rs. {totalPrice?.toFixed(2)}
          </h1>
        </div>
      </div>
      <div className=" sm:px-2 md:px-2 lg:px-6 py-4 bg-[#F9F9F9]">
        <h2 className="text-lg font-OpenSans font-bold text-[#2B2B2D] mb-4">
          Items in Cart
        </h2>
        <div className="space-y-4">

          {data?.items?.map((e, index) => {
            const discountedPrice =
              applyDiscountToPrice(
                e?.total_price || 0,
             e.Variant?.discount ||   e?.Variant?.Product?.discount || 0
              )?.priceAfterDiscount || 0;

            return (
              <Card
                key={index}
                src={e?.Variant?.image || ''}
                title={e?.Variant?.Product?.name || ''}
                originalPrice={e?.total_price || 0}
                discountedPrice={discountedPrice}
                // rating={0}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Summary;

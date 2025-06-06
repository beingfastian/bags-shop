'use client';

import React from 'react';
import Card from './Card';
import { useGetCart } from '@/hooks/useCart';

function Summary() {
  const { data } = useGetCart();

  const subTotal =
    data?.items?.reduce((acc, item) => {
      const variantDiscount = item?.Variant?.discount || item?.Variant?.Product?.discount || 0;
      const totalPrice = item?.total_price || 0;
      
      // Calculate discounted price using same logic as backend
      const discountedPrice = variantDiscount > 0 
        ? Math.floor(totalPrice * (1 - variantDiscount / 100))
        : totalPrice;
      
      return acc + discountedPrice;
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
            Rs. {subTotal}
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
            Rs. {totalPrice}
          </h1>
        </div>
      </div>
      <div className=" sm:px-2 md:px-2 lg:px-6 py-4 bg-[#F9F9F9]">
        <h2 className="text-lg font-OpenSans font-bold text-[#2B2B2D] mb-4">
          Items in Cart
        </h2>
        <div className="space-y-4">
          {data?.items?.map((e, index) => {
            const variantDiscount = e?.Variant?.discount || e?.Variant?.Product?.discount || 0;
            const totalPrice = e?.total_price || 0;
            
            // Calculate discounted price using same logic as backend
            const discountedPrice = variantDiscount > 0 
              ? Math.floor(totalPrice * (1 - variantDiscount / 100))
              : totalPrice;

            return (
              <Card
                key={index}
                src={e?.Variant?.image || ''}
                title={e?.Variant?.Product?.name || ''}
                originalPrice={totalPrice}
                discountedPrice={discountedPrice}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Summary;
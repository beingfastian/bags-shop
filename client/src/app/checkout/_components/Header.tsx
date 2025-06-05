"use client"
import React from 'react';

import { ArrowLeft } from '@/app/components/Icons'; 
import { useRouter } from 'next/navigation';


function Header() {
  const router = useRouter();  

  return (
    <div className="mt-5 hidden md:block">
      <div className="bg-[#F8F8FF] lg:w-[55%] rounded-[10px] p-4 flex items-center gap-4">
        <h1
          className="cursor-pointer text-xs md:text-lg text-[#3734A9] font-OpenSans font-medium"
          onClick={() => router.push('/')}  // Correct way to navigate
        >
          Home
        </h1>
        <ArrowLeft />
        <h1
          className="cursor-pointer text-xs md:text-lg text-[#3734A9] font-OpenSans font-medium whitespace-nowrap"
          onClick={() => router.push('/products')}  // Correct navigation
        >
          Flat off Collection
        </h1>
        <ArrowLeft />
        {/* <h1
          className="text-xs md:text-lg text-[#3734A9] font-OpenSans font-medium whitespace-nowrap"
          onClick={() => router.push('/products/id')}  // Correct navigation
        >
          Product details
        </h1>
        <ArrowLeft /> */}
        <h1
          className="cursor-pointer text-xs md:text-lg text-[#3734A9] font-OpenSans font-medium whitespace-nowrap"
          onClick={() => router.push('/checkout')}  // Correct navigation
        >
          Checkout
        </h1>
      </div>
    </div>
  );
}

export default Header;

'use client';
import React from 'react';
import SignUpButton from './SignUpButton';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
// import { useRouter } from 'next/router';

export default function SignUpCard() {
  const router = useRouter();

  const handleSignUpClick = () => {
    router.push('/register');
  };

  return (
    // main dev
    <div className="w-full ">
      <div className="bg-[#3734A9] lg:w-[65%] mx-6  rounded-xl lg:mx-auto">
        {/*main dev for two dev */}
        <div className="flex flex-col py-10 gap-10 items-center justify-between px-5">
          {/* text dev */}
          <div className="">
            <h1 className="font-bold font-OpenSans  md:text-2xl text-lg leading-9 text-[#FDFDFD] text-center">
              Sign Up Now So Your Selected Items Are Saved To Your Personal
              Cart.
            </h1>
          </div>
          {/* search and sign up dev */}
          <div className="flex  justify-center w-[100%] xxs:w-1/2 bg-white py-2 xxs:py-5 gap-2 items-stretch  rounded-xl  mx-auto px-2 xxs:px-5">
            {/* <input
              type="text"
              placeholder="Enter Your Email"
              className="flex flex-grow py-2 rounded-lg border border-[#3734A9] placeholder:text-[#3734A9]  font-normal text-sm leading-5 px-2"
            /> */}
            {/* <button className="bg-[#3734A9] flex items-center justify-center text-white font-bold font-OpenSans w-[70%] lg:w-1/4 text-lg px-8 py-2 rounded-lg leading-[30px]">
              <span>Sign Up Now </span> <img src="/arrow.png" alt="" />
            </button> */}
            <SignUpButton
              className="w-full sm:w-11/12"
              onClick={handleSignUpClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

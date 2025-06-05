'use client';
import Image from 'next/image';
import React from 'react';
import { Facebook, GoogleIcon } from './Icons';
import { useRouter } from 'next/navigation';
import Input from './Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSignup } from '@/hooks/useAuth';
import { SignupPayload } from '@/types/auth';
import Swal from 'sweetalert2';
const schema = yup.object().shape({
  displayName: yup.string().required('User name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});
function SignUp() {
  const mutation = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const handleRoute = () => {
    router.push('/login');
  };

  const onSubmit = async (data: SignupPayload) => {
    try {
      console.log('Submitting data:', data);

      const response = await mutation.mutateAsync(data);

      console.log('reee', mutation);
      Swal.fire({
        title: 'Signup Successful!',
        text: response?.message,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error: any) {
      console.error('Signup failed:', error);

      Swal.fire({
        title: 'Signup Failed',
        text: error?.response?.data?.message || error?.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  return (
    <div className="w-full relative flex flex-wrap md:my-6">
      <div className="md:w-[55%] md:block hidden w-full relative">
        <Image
          src="/siginimage.png"
          alt=""
          fill
          unoptimized
          className="absolute w-full h-full "
        />
      </div>
      <div className="md:w-[45%]  w-11/12 mx-auto md:my-0 my-10">
        <div className="lg:max-w-[400px] md:max-w-[300px] mx-auto bg-[#E9E9E9] rounded-[10px] ">
          <div className="flex justify-center pt-6">
            <Image
              src="/WhatsApp Image 2025-02-08 at 1.30.33 AM.jpeg"
              alt=""
              width={10}
              height={10}
              unoptimized
              className="w-[100px] aspect-square rounded-full object-cover shadow-lg cursor-pointer"
              onClick={() => router.push('/')}
            />
          </div>
          <div className="flex flex-col items-center justify-center text-center w-full">
            <h4 className="text-2xl font-bold font-OpenSans text-[#3734A9] leading-7 mt-2">
              Register Your Self
            </h4>
            <p className="text-[#7A7A7A] text-sm w-[250px] my-2">
              Please enter your credentials to Sign In to your account.
            </p>
          </div>
          <div className="px-5">
            <div className="flex flex-col">
              <label
                htmlFor=""
                className="text-[#9794AA] font-OpenSans text-sm mb-2"
              >
                User Name
              </label>
              <Input
                type="text"
                name="displayName"
                register={register as any}
                errors={errors as any}
                placeholder="Enter Name"
                inputClassName="!bg-[#E9E9E9] !rounded-[6px] !border border-[#CBCAD7] !py-2"
              />
              <label
                htmlFor=""
                className="text-[#9794AA] font-OpenSans text-sm mb-1 mt-4"
              >
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                register={register as any}
                errors={errors as any}
                placeholder="Enter email address"
                inputClassName="!bg-[#E9E9E9] !rounded-[6px] !border border-[#CBCAD7] !py-2"
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="password"
                className="text-[#9794AA] font-OpenSans text-sm  "
              >
                Password
              </label>

              <div className="relative w-full mt-1">
                <Input
                  type="password"
                  name="password"
                  register={register as any}
                  errors={errors as any}
                  placeholder="Enter password"
                  inputClassName="!bg-[#E9E9E9] !rounded-[6px] !border border-[#CBCAD7] !py-2"
                />
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="w-full text-base text-white  font-semibold font-OpenSans bg-[#3734A9] px-6 py-3 rounded-[10px] mt-5"
            >
              Sign Up
            </button>

            <div className="w-full flex gap-2 items-center justify-center my-6 flex-nowrap">
              <hr className="border-[#CBCAD7] border-[1.5px] flex-grow" />
              <p className="text-[#686677] text-sm font-OpenSans whitespace-nowrap">
                Continue with
              </p>
              <hr className="border-[#CBCAD7] border-[1.5px] flex-grow" />
            </div>
            <div className="w-full flex hidden border-[#CBCAD7] border-[1px] rounded-[6px] bg-transparent opacity-80 py-3 px-2 items-center justify-center mt-3 gap-3 ">
              <button className="text-[#19181F] font-OpenSans text-sm">
                Login with Google
              </button>
              <GoogleIcon />
            </div>
            <div className="w-full flex hidden border-[#CBCAD7] border-[1px] rounded-[6px] bg-transparent opacity-80 py-3 px-2 items-center justify-center mt-3 gap-3 ">
              <button className="text-[#19181F] font-OpenSans text-sm">
                Login with Facebook
              </button>
              <Facebook />
            </div>
          </div>
          <p className="text-sm font-OpenSans text-[#49475A] py-4 text-center ">
            have an account?{' '}
            <span
              onClick={handleRoute}
              className="text-[#3548AA] font-semibold cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
      <Image
        src="/siginbg.png"
        alt=""
        width={10}
        height={10}
        unoptimized
        className="absolute md:w-10 lg:w-24 bottom-0 right-0 lg:block hidden"
      />
    </div>
  );
}

export default SignUp;

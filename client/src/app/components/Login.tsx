'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Input from './Input';
import { useLogin } from '@/hooks/useAuth';
import Swal from 'sweetalert2';
import { LoginPayload } from '@/types/auth';
import { useAuthStore } from '@/zustand/auth';
import LogInWithGoogle from '@/components/LogInWithGoogle';
import LogInWithFacebook from '@/components/LogInWithFacebook';
const schema = yup.object().shape({
  email: yup
    .string()
    .email('invalid email format')
    .required('email is required'),
  password: yup
    .string()
    .required('password is required')
    .min(6, 'password must be at least 6 characters long'),
});
function Login() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { mutateAsync } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const handleRoute = () => {
    router.push('/register');
  };

  const { login } = useAuthStore((state) => state);
  const onSubmit = async (data: LoginPayload) => {
    try {
      console.log('Submitting data:', data);

      setIsButtonDisabled(true);
      const response = await mutateAsync(data);
      login(response?.user, response?.token);

      Swal.fire({
        title: 'Login Successful!',
        text: 'Your account has been Login. Redirecting to Home...',
        icon: 'success',
        timer: 5000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push('/');
      }, 3000);

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 6000);
    } catch (error: any) {
      Swal.fire({
        title: 'Login Failed',
        text:
          error?.response?.data?.message ||
          'There was an error creating your account. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      setIsButtonDisabled(false);
    }
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'register':
        router.push('/register');
        break;
      case 'forgot-password':
        router.push('/forgot-password');
        break;
      default:
        break;
    }
  };

  // const handleForgotPasswordClick = () => {
  //   router.push('/forgot-password'); // Navigate to the Forgot Password page
  // };

  return (
    <div className="w-full relative flex flex-wrap md:my-6 ">
      <div className="hidden md:block md:w-[55%] h-[850px] lg:h-[700px] relative -mt-10">
        <img
          src="/Group 85289.png"
          alt=""
          // fill
          // unoptimized
          className="w-full h-full object-contain rounded-md "
        />
      </div>
      <div className="md:w-[45%]  w-11/12 mx-auto md:my-0 my-10 ">
        <div className="w-11/12 lg:w-[400px] mx-auto bg-[#E9E9E9] rounded-[10px]  ">
          <div className="flex justify-center pt-6 ">
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
              Sign In
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
                className="text-[#9794AA] font-OpenSans text-sm "
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
              {/* <p
                className="text-end text-xs py-1 cursor-pointer text-blue-500 hover:underline"
                onClick={handleForgotPasswordClick}
              >
                Forget Password
              </p> */}
              <p
                className="text-right text-xs text-blue-500 mt-2 cursor-pointer hover:underline"
                onClick={() => handleAction('forgot-password')}
              >
                Forgot Password?
              </p>
            </div>

            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="w-full text-base text-white font-semibold font-OpenSans bg-[#3734A9] px-6 py-3 rounded-[10px] mt-6"
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? 'Loading...' : 'Sign In'}
            </button>

            <div className="w-full flex gap-2 items-center justify-center my-6 flex-nowrap">
              <hr className="border-[#CBCAD7] border-[1.5px] flex-grow" />
              <p className="text-[#686677] text-sm font-OpenSans whitespace-nowrap">
                Continue with
              </p>
              <hr className="border-[#CBCAD7] border-[1.5px] flex-grow" />
            </div>
            <div className="cursor-pointer">
              <LogInWithGoogle />
            </div>
            <div className="hidden">
              <LogInWithFacebook />
            </div>
          </div>
          <p className="text-sm font-OpenSans text-[#49475A]  text-center py-4">
            {'Don’t have an account?'}

            <span
              onClick={handleRoute}
              className="text-[#3548AA] font-semibold cursor-pointer"
            >
              Register
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

export default Login;

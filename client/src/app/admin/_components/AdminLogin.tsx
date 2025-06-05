'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from '@/hooks/useAuth';
import { useAdminAuthStore } from '@/zustand/auth';
import Swal from 'sweetalert2';
import Input from '@/app/components/Input';


const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .test(
      'no-special-characters',
      'Email cannot start with a special character',
      (value) => {
        if (!value) return true; // Allow empty email field
        return /^[^!@#$%^&*(),.?":{}|<>_+-]/.test(value);
      }
    )
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: yup.boolean(),
});

const AdminLogin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const { mutateAsync, isPending } = useLogin();
  const { login } = useAdminAuthStore((state) => state);
  const onSubmit = async ({
    email,
    password,
  }: yup.InferType<typeof schema>) => {
    try {
      const { token, user, message } = await mutateAsync({
        email,
        password,
      });

      Swal.fire({
        title: 'SUCCESS',
        text: message,
        icon: 'success',
      });

      login(user, token);
    } catch (error: any) {
      Swal.fire({
        title: 'ERROR',
        text: error?.message,
        icon: 'error',
      });
    }
  };

  return (
    <div className="w-full h-screen bg-[#d1f8d9] justify-center items-center flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[350px] bg-white mx-auto px-4 py-8 rounded-md h-11/12"
      >
        <h3 className="text-center mb-4 font-OpenSans text-3xl font-bold">
          Sign In
        </h3>
        <div>
          <div className="w-full my-3">
            <label
              htmlFor="email"
              className="text-sm font-normal font-OpenSans text-[#5A607F]"
            >
              <div className="flex items-center w-full gap-1">
                <p className="my-1">Email</p>
              </div>
            </label>
            <Input
              type="email"
              placeholder="Example@gmail.com"
              name="email"
              register={register as any}
              errors={errors as any}
              errorClass={'!text-[11px] -bottom-[19px] '}
            />
          </div>
          <div className="w-full my-3">
            <label
              htmlFor="password"
              className="text-sm font-normal font-OpenSans text-[#5A607F]"
            >
              <div className="flex items-center w-full gap-1">
                <p className="my-1">Password</p>
              </div>
            </label>
            <Input
              type="password"
              placeholder="Enter password"
              name="password"
              register={register as any}
              errors={errors as any}
              errorClass={'!text-[11px] -bottom-[19px] '}
            />
          </div>
          <div className="flex my-4 items-center gap-1">
            <input
              type="checkbox"
              {...register('rememberMe')}
              id="rememberMe"
              className="cursor-pointer"
            />
            <label
              htmlFor="rememberMe"
              className="text-[#1E1E1E] cursor-pointer text-[11px] leading-3 "
            >
              Keep me Signed in
            </label>
          </div>
          <div className="flex justify-center items-center rounded-[4px] bg-[#1E2753]">
            <button
              type="submit"
              className="text-white h-[35px] font-OpenSans text-sm font-bold"
            >
              {isPending ? 'Loaging' : 'Sign In'}
            </button>
          </div>
         
          <hr className="border-[#D7DBEC] my-2" />
          
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;

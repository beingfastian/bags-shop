import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from './Input';

const emailSchema = yup.object().shape({
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
});

type EmailFormData = yup.InferType<typeof emailSchema>;

const ResetPassword = () => {
  const {
    register,
    formState: { errors },
  } = useForm<EmailFormData>({ resolver: yupResolver(emailSchema) });

  return (
    <div className="w-full h-screen bg-[#d1f8d9] justify-center items-center flex">
      <div className="w-[350px] bg-white mx-auto px-4 py-8 rounded-md">
        <h3 className="text-center mb-4 font-OpenSans text-3xl font-bold">
          Reset Password
        </h3>
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
        <div className="flex justify-center items-center my-4 rounded-[4px] bg-[#1E2753]">
          <button
            type="submit"
            className="text-white h-[35px] font-OpenSans text-sm font-normal"
          >
            Reset Password
          </button>
        </div>
        <hr className="border-[#D7DBEC] my-2" />
        <div className="flex w-full justify-center items-center py-4">
          <label
            htmlFor=""
            className="text-[11px] text-center cursor-pointer leading-3 font-OpenSans text-gray-500"
          >
            Remember your password
          </label>
        </div>
        <div className="flex justify-center items-center my-4 rounded-[4px] border ">
          <button
            type="submit"
            className="text-[#1E5EFF] h-[35px] font-OpenSans text-sm font-normal"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

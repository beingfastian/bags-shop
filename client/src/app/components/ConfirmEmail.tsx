import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from './Input';

const schema = yup.object().shape({
  password: yup.string().required('Confirmation Code is required'),
});

const ConfirmEmail = () => {
  const {
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema as any) });

  return (
    <div className="w-full h-screen bg-[#d1f8d9] justify-center items-center flex">
      <div className="w-[350px] bg-white mx-auto px-4 py-8 rounded-md h-11/12">
        <h3 className="text-center mb-4 font-OpenSans text-3xl font-bold">
          Confirm Email
        </h3>
        <h3 className="text-center text-[#5A607F] my-2 font-OpenSans text-base font-normal">
          Check Your Email and Enter Confirmation Code
        </h3>
        <div className="w-full my-3">
          <label
            htmlFor="email"
            className="text-sm font-normal font-OpenSans text-[#5A607F]"
          >
            <div className="flex items-center w-full gap-1">
              <p className="my-1">Cofirmation Code</p>
            </div>
          </label>
          <Input
            type="text"
            placeholder="Enter Code"
            name="confirmCode"
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
            Confirm Email
          </button>
        </div>
        <hr className="border-[#D7DBEC] my-2" />
        <div className="flex w-full justify-center items-center py-4">
          <label
            htmlFor=""
            className="text-[11px] text-center cursor-pointer leading-3 font-OpenSans text-gray-500"
          >
            have not recieve your code ?
          </label>
        </div>
        <div className="flex justify-center items-center my-4 rounded-[4px] border ">
          <button
            type="submit"
            className="text-[#1E5EFF] h-[35px] font-OpenSans text-sm font-normal"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;

'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useResetPassword } from '@/hooks/useAuth';
import Spinner from '@/components/Spinner';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import Input from '@/app/components/Input';

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [successMessage] = useState<string>('');
  const [errorMessage] = useState<string>('');
  const router = useRouter();

  const { mutateAsync, isPending } = useResetPassword();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!token) {
  //     router?.back();
  //     return;
  //   }

  //   if (!newPassword || !confirmPassword) {
  //     setErrorMessage('Please fill in both fields.');
  //     setSuccessMessage('');

  //     return;
  //   } else if (newPassword !== confirmPassword) {
  //     setErrorMessage('Passwords do not match.');
  //     setSuccessMessage('');
  //     return;
  //   }

  //   try {
  //     const response = await mutateAsync({
  //       confirmPassword,
  //       newPassword,
  //       resetToken: token as any,
  //     });
  //     setErrorMessage('');
  //     setSuccessMessage(
  //       response?.message || 'Your password has been successfully reset.'
  //     );
  //     console.log('New password set to:', newPassword);

  //     Swal.fire({
  //       title: 'Password Changed',
  //       text: response?.message || `Password has been changed Successfully`,
  //       icon: 'success',
  //       confirmButtonText: 'OK',
  //     }).then(() => router.push('/login'));
  //   } catch (error: any) {
  //     setErrorMessage(error?.message);
  //     setSuccessMessage('');
  //     Swal.fire({
  //       title: 'Invalid Password',
  //       text: error?.message || 'Please enter a valid Password',
  //       icon: 'error',
  //       confirmButtonText: 'OK',
  //     });
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      router?.back();
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in both fields.');
      return;
    } else if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    // Regex to check for at least one special character
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharacterRegex.test(newPassword)) {
      toast.error('Password must contain at least one special character.');
      return;
    }

    try {
      const response = await mutateAsync({
        confirmPassword,
        newPassword,
        resetToken: token as any,
      });

      toast.success(
        response?.message || 'Your password has been successfully reset.'
      );

      Swal.fire({
        title: 'Password Changed',
        text: response?.message || 'Password has been changed successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => router.push('/login'));
    } catch (error: any) {
      toast.error(error?.message || 'Please enter a valid password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-500 hover:text-blue-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>

      <div className="w-full max-w-md bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Reset Password
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your new password below to reset it.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            {/* <input
              type="password"
              id="newPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            /> */}
            <Input
              type="password"
              name='password'
              // id="newPassword"
              className="w-full  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={newPassword}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              // rigister
              // required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            {/* <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            /> */}
            <Input
              type="password"
              // id="confirmPassword"
              name="newpasswaord"
              className="w-full py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              // required
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-sm text-green-500 mb-4">{successMessage}</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 text-sm"
          >
            {isPending ? <Spinner /> : 'Reset Password'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;

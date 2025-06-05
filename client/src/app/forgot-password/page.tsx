'use client';

import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useForgotPassword, useVerifyOtp } from '@/hooks/useAuth';
import Spinner from '@/components/Spinner';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const router = useRouter();

  const { mutateAsync, isPending } = useForgotPassword();
  const { mutateAsync: verifyOtp, isPending: isPendingOtp } = useVerifyOtp();

  const handleEmailSubmit = async () => {
    if (!email.includes('@')) {
      Swal.fire({
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    try {
      const response = await mutateAsync({
        email,
      });
      Swal.fire({
        title: 'Email Sent',
        text:
          response?.message || `A verification code has been sent to ${email}.`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => setStep('otp'));
    } catch (error: any) {
      Swal.fire({
        title: 'Invalid Email',
        text: error?.message || 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 6) {
      Swal.fire({
        title: 'Invalid OTP',
        text: 'Please enter a valid 6-digit OTP.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const response = await verifyOtp({
        email,
        otp,
      });

      Swal.fire({
        title: 'OTP Verified',
        text: response?.message || 'Your OTP has been verified successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        router.push('/reset-password/' + response?.resetToken);
      });
    } catch (error: any) {
      Swal.fire({
        title: 'Invalid OTP',
        text: error?.message || 'Please enter a valid 6-digit OTP.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
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
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        {step === 'email' && (
          <>
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Forgot Password
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Enter your email address to receive a verification code.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleEmailSubmit}
              disabled={isPending}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {isPending ? <Spinner /> : 'Send Verification Code'}
            </button>
          </>
        )}

        {step === 'otp' && (
          <>
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Verify OTP
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Enter the 6-digit code sent to {email}.
            </p>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <div className="w-full flex justify-center items-center">
                  <input
                    {...props}
                    className="p-2 !w-10 xxs:!w-12 border border-gray-300 rounded-md text-center text-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
              inputStyle="mx-6 px-10"
            />

            <button
              onClick={handleOtpSubmit}
              disabled={isPendingOtp}
              className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {isPendingOtp ? <Spinner /> : 'Submit OTP'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

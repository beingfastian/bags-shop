'use client';
import React, { useState } from 'react';
import OTPInput from 'react-otp-input';

const OtpPage: React.FC = () => {
  const [otp, setOtp] = useState<string>('');

  const handleChange = (otp: string) => {
    setOtp(otp);
  };

  const handleSubmit = () => {
    if (otp.length === 6) {
      alert(`OTP submitted: ${otp}`);
      // Add your OTP verification logic here (e.g., API call)
    } else {
      alert('Please enter a valid 6-digit OTP.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Verify OTP
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit code sent to your email or phone.
        </p>
        <OTPInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          renderInput={(props) => (
            <input
              {...props}
              className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          )}
          inputStyle="mx-1"
        />
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit OTP
        </button>
      </div>
    </div>
  );
};

export default OtpPage;

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from '../components/Modal';
import * as yup from 'yup';
import Layout from '../components/MainLayout';
import { useChangePassword } from '@/hooks/useAuth';
import { useAuthStore } from '@/zustand/auth';
import { getuserData, updateProfileImage } from '@/services/api/authService';
import { uploadOne } from '@/services/uploadService';
import { toast, ToastContainer } from 'react-toastify';
import Input from '../components/Input';

const ClientProfile = () => {
  const { user, isAuthenticated } = useAuthStore((state) => state);

  const { mutateAsync } = useChangePassword();
 

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const passwordValidationSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .required('Old password is required.')
      .min(8, 'Password must be at least 8 characters.'),
    newPassword: yup
      .string()
      .required('New password is required.')
      .min(8, 'Password must be at least 8 characters.')
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/,
        'Password must contain at least one uppercase letter, one special character, and one number.'
      ),
    confirmPassword: yup
      .string()
      .required('Confirm password is required.')
      .oneOf([yup.ref('newPassword')], 'Passwords must match.'),
  });

  // const [profileImage, setProfileImage] = useState(profileData.profileImage);
  const [userData, setUserData] = useState<{
    email?: string;
    display_name?: string;
    profile?: string;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: '',
  });

  const fetchData = async () => {
    const response = await getuserData(user?.id as any);
    setUserData(response);
    console.log('user', response);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = await uploadOne({ file: file });
      console.log('file ulr', fileUrl.data);
      const upateprofile = await updateProfileImage(fileUrl.data);
      if (upateprofile) {
        fetchData();
        toast.success('profile updated sucessfully');
      }
    }
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordForm((prevState) => ({
      ...prevState,
      [name]: value,
      email: userData?.email || '',
    }));
  };

  const handleSubmitPassword = async () => {
    try {
      await passwordValidationSchema.validate(passwordForm, {
        abortEarly: false,
      });

      try {
        await mutateAsync(passwordForm);
        toast.success('Password updated successfully');
        console.log('password', user);
      } catch (error) {
        console.log('error', error);
        toast.error('Failed to update password');
      }
      console.log('Password updated successfully:', passwordForm);
      setShowModal(false);
      setErrors({});
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        validationError.inner.forEach((error) => {
          if (error.path) validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        toast.error('Please correct the errors in the form');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  if (!isAuthenticated) {
    // Router.push("/login")
    return null;
  }

  return (
    <Layout>
      <div className="bg-gray-100  py-10 px-6 flex justify-center">
        <ToastContainer />
        <div className="w-full max-w-6xl bg-[#3734A9] shadow-md rounded-md p-6 mt-10 py-4">
          <div className="w-full p-4">
            <h3 className="font-OpenSans text-white text-4xl font-bold mb-4">
              Client Profile
            </h3>
            <div className="flex flex-wrap items-start w-full">
              <div className="w-full rounded-[6px] bg-white shadow-lg px-4 py-2">
                <h3 className="font-Inter text-[16px] font-bold text-[#131523]">
                  Account
                </h3>
                <p className="font-Inter text-[#5A607F] text-sm">
                  Real-time information and activities of your profile.
                </p>
                <hr className="border-[#D7DBEC] my-4" />
                <div className="flex flex-wrap items-center justify-between w-full">
                  <div className="flex gap-5 items-center">
                    <Image
                      src={userData?.profile || '/download.png'}
                      alt=""
                      width={90}
                      height={90}
                      unoptimized
                      className="bg-white w-[90px] aspect-square"
                      style={{ borderRadius: '50%' }}
                    />
                    <div>
                      <p className="text-[#131523] text-sm font-Inter font-bold">
                        Profile picture
                      </p>
                      <p className="text-[#5A607F] font-Inter text-[12px]">
                        PNG, JPEG under 15MB
                      </p>
                    </div>
                  </div>

                  <label
                    htmlFor="upload-image"
                    className="text-base h-[34px] font-Inter text-[#5A607F] rounded-[4px] px-3 md:mt-0 mt-5 shadow-profileShadow border-[1px] py-1 cursor-pointer"
                  >
                    Upload new picture
                  </label>

                  <input
                    id="upload-image"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>

                {/* Other sections */}
                {/* <h2 className="mt-5 px-2">Full Name</h2> */}
                <div className="w-full flex flex-wrap mt-2">
                  <div className="md:w-1/2 w-full px-2">
                    <label className="text-sm font-normal font-OpenSans text-[#5A607F]">
                      <div className="flex items-center w-full gap-1 md:mt-0 mt-2">
                        <p className="my-1 text-[#5A607F] font-Inter">
                          Full Name
                        </p>
                      </div>
                    </label>
                    <div className="bg-gray-100 p-2 rounded-md">
                      {userData?.display_name}
                    </div>
                  </div>
                </div>

                <h2 className="text-sm text-[#131523] font-Inter font-bold mt-4 px-2">
                  Contact Email
                </h2>
                <p className="font-Inter text-sm px-2 text-[#5A607F]">
                  Manage your account email address for the invoices.
                </p>
                <div className="md:w-1/2 w-full px-2">
                  <label className="text-sm font-normal font-OpenSans text-[#5A607F]">
                    <div className="flex items-center w-full gap-1 mt-1">
                      <p className="my-1 text-[#5A607F] font-Inter text-sm">
                        Email Address
                      </p>
                    </div>
                  </label>
                  <div className="bg-gray-100 p-2 rounded-md">
                    {userData?.email}
                  </div>
                </div>

                <button
                  className="text-sm text-white font-Inter font-bold mt-4 px-2 py-2 bg-[#3734A9] rounded-md"
                  onClick={() => setShowModal(true)}
                >
                  Change Password
                </button>
                <p className="font-Inter text-sm px-2 text-[#5A607F]">
                  Modify your current password
                </p>

                <Modal
                  show={showModal}
                  onClose={() => setShowModal(false)}
                  modalContainer=" w-[80%] xxs:w-[70%] md:w-1/2"
                >
                  <h3 className="text-lg font-bold text-[#131523] mb-2 sm:mb-4">
                    Change Password
                  </h3>
                  <form>
                    <div className="mb-2 sm:mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Old Password
                      </label>
                      <Input
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className={`w-full  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm
                           ${
                             errors.currentPassword
                               ? 'border-red-500'
                               : 'border-gray-300'
                           } 
                          `}
                        placeholder="Enter old password"
                      />
                      {errors.currentPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.currentPassword}
                        </p>
                      )}
                    </div>
                    <div className="mb-2 sm:mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      {/* <input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className={`w-full border ${
                          errors.newPassword
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } rounded-md p-2 mt-1`}
                        placeholder="Enter new password"
                      /> */}
                       <Input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        // className={`w-full border
                        // ${
                        //   errors.newPassword
                        //     ? 'border-red-500'
                        //     : 'border-gray-300'
                        // } 
                        // rounded-md p-2 mt-1`}
                        className={`w-full  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm
                          ${
                            errors.newPassword
                              ? 'border-red-500'
                              : 'border-gray-300'
                          } 
                         `}
                        placeholder="Enter new password"
                      />
                      {errors.newPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.newPassword}
                        </p>
                      )}
                    </div>
                    <div className="mb-2 sm:mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      {/* <input
                        type="password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`w-full border
                         ${
                          errors.confirmPassword
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } rounded-md p-2 mt-1`}
                        placeholder="Confirm new password"
                      /> */}
                       <Input
                        type="password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`w-full  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm
                          ${
                          errors.confirmPassword
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }
                         `}
                        placeholder="Confirm new password"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-4 ">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmitPassword}
                        className="px-4 py-2 bg-[#3734A9] text-white rounded-md"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientProfile;

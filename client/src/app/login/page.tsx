'use client';
import React from 'react';
import Login from '../components/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';

const SignIn = () => {
  return (
    <GoogleOAuthProvider clientId="714439973973-6k69pahd0hs9f51tcbtk5nbpuunmu0an.apps.googleusercontent.com">
      <Login />
    </GoogleOAuthProvider>
  );
};

export default SignIn;

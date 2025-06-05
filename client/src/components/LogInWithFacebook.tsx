// src/components/SignInButton.tsx
'use client';
import { Facebook } from '@/app/components/Icons';
import { authFacebook } from '@/services/api/authService';
import { useAuthStore } from '@/zustand/auth';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const LogInWithFacebook = () => {
  const { login } = useAuthStore((state) => state);
  const router = useRouter();

  const responseFacebook = async (response: any) => {
    try {
      console.log(response, 'Facebook response');
      const { token, user } = await authFacebook({
        accessToken: response.accessToken,
      });

      login(user, token);
      Swal.fire({
        title: 'Login Successful!',
        text: 'Your account has been logged in. Redirecting to Home...',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        title: 'Login Failed',
        text:
          error?.message ||
          'There was an error creating your account. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <FacebookLogin
      appId="2521195921419651"
      onSuccess={responseFacebook}
      onFail={(error) => {
        console.log('Login Failed!', error);
      }}
      onProfileSuccess={(response) => {
        console.log('Get Profile Success!', response);
      }}
      render={({ onClick }) => (
        <div
          onClick={onClick}
          className="w-full flex border-[#CBCAD7] border-[1px] rounded-[6px] bg-transparent opacity-80 py-3 px-2 items-center justify-center mt-3 gap-3 "
        >
          <button className="text-[#19181F] font-OpenSans text-sm">
            Login with Facebook
          </button>
          <Facebook />
        </div>
      )}
    />
  );
};

export default LogInWithFacebook;

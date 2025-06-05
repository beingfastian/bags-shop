'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminHeader from './_components/AdminNavbar';
import Sidebar from './_components/Sidebar';
import { useAuthStore } from '@/zustand/auth';
import { getuserData } from '@/services/api/authService';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [profileimage,setProfileImage]=useState("download.png")


  const fetchData = async () => {
    const response = await getuserData(user?.id as any);
    setProfileImage(response?.profile);
    console.log('user', response);
  };

  useEffect(()=>{
 fetchData()
  },[])
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== 'admin' && !isLoading) {
      logout();
      router?.push('/login');
    }
    setIsLoading(false);
  }, [isLoading, user?.role]);

  if (user?.role !== 'admin') {
    return null;
  }

  if (pathname === '/admin') {
    return <>{children}</>;
  }



  

  return (
    <div className="h-screen flex flex-col">
      <AdminHeader name="Admin" image={ profileimage || "/download.png" }  notification="2" />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow bg-[#fff6f4] overflow-auto p-0 xxs:p-4">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

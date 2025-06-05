import React, { ReactNode } from 'react';

import Sidebar from '../admin/_components/Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* <AdminHeader /> */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="w-full h-full overflow-y-auto relative" id="style-3">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import { FiMenu } from 'react-icons/fi';
// import Link from 'next/link';
// import {
//   Category,
//   Coupons,
//   Dashboard,
//   Order,
//   Product,
// } from '@/app/components/Icons';
// import { Banner, Setting } from '../dashboard/_components/Icons';

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const navigationItems = [
//     { href: '/admin/dashboard', title: 'Dashboard', icon: Dashboard },
//     { href: '/admin/order', title: 'Orders', icon: Order },
//     { href: '/admin/products', title: 'Products', icon: Product },
//     { href: '/admin/categories', title: 'Categories', icon: Category },
//     { href: '/admin/coupons', title: 'Coupons', icon: Coupons },
//     { href: '/admin/profile-setting', title: 'Setting', icon: Setting },
//     { href: '/admin/banner', title: 'Banner', icon: Banner },
//   ];

//   return (
//     <div className="w-[250px] pt-3 hidden md:block bg-[#3734A9] relative ">
//       <button
//         className="md:hidden absolute top-6 left-4 z-50 p-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         onClick={toggleSidebar}
//         aria-label="Toggle Sidebar"
//       >
//         <FiMenu size={24} />
//       </button>
//       <aside
//         className={`text-white transform h-screen transition-transform duration-300 ease-in-out z-40
//           ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
//       >
//         <nav className="flex flex-col px-3 space-y-1">
//           {navigationItems.map((item) => (
//             <SidebarLink
//               key={item.title}
//               href={item.href}
//               title={item.title}
//               Icon={item.icon as any}
//             />
//           ))}
//         </nav>
//       </aside>
//     </div>
//   );
// };

// type SidebarLinkProps = {
//   href: string;
//   title: string;
//   Icon: any;
// };

// const SidebarLink: React.FC<SidebarLinkProps> = ({ href, title, Icon }) => {
//   const pathname = usePathname();
//   const [color, setColor] = useState('white');
//   const isActive = pathname === href;

  // useEffect(() => {
  //   if (isActive) {
  //     setColor('black');
  //   } else {
  //     setColor('white');
  //   }
  // }, [pathname, isActive]);

//   return (
//     <Link
//       onMouseEnter={() => setColor('black')}
//       onMouseLeave={() => setColor(isActive ? 'black' : 'white')}
//       href={href}
//       className={`flex items-center my-1 rounded-md text-sm font-medium transition-colors duration-200 ${
//         isActive ? 'bg-white text-black' : 'text-white'
//       }`}
//     >
//       <div
//         className={`px-4 w-full rounded-[4px] py-3 items-center flex group ${
//           isActive ? 'bg-white' : 'hover:bg-white'
//         }`}
//       >
//         <span className="mr-3 w-[24px] group-hover:fill-black">
//           {Icon({ color })}
//         </span>
//         <span
//           className={`text-sm font-OpenSans ${
//             isActive ? 'text-black' : 'text-[#FFFFFF]'
//           } group-hover:text-black`}
//         >
//           {title}
//         </span>
//       </div>
//     </Link>
//   );
// };

// export default Sidebar;


'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Category,
  // Coupons,
  Dashboard,
  Order,
  Product,
} from '@/app/components/Icons';
import { Banner, Setting } from '../dashboard/_components/Icons';

const Sidebar = () => {
  const navigationItems = [
    { href: '/admin/dashboard', title: 'Dashboard', icon: Dashboard },
    { href: '/admin/order', title: 'Orders', icon: Order },
    { href: '/admin/products', title: 'Products', icon: Product },
    { href: '/admin/categories', title: 'Categories', icon: Category },
    // { href: '/admin/coupons', title: 'Coupons', icon: Coupons },
    { href: '/admin/profile-setting', title: 'Setting', icon: Setting },
    { href: '/admin/banner', title: 'Banner', icon: Banner },
  ];

  return (
    <aside className=" w-[100px] sm:w-[200px] md:w-[250px] bg-[#3734A9] text-white md:block ">
      <nav className="flex flex-col p-4 space-y-2">
        {navigationItems.map((item) => (
          <SidebarLink
            key={item.title}
            href={item.href}
            title={item.title}
            Icon={item.icon as any}
          />
        ))}
      </nav>
    </aside>
  );
};

type SidebarLinkProps = {
  href: string;
  title: string;
  Icon: any;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, title, Icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  // Track hover state
  const [isHovered, setIsHovered] = useState(false);


  const handleMouseEnter = () => {
    setIsHovered(true);
    setTimeout(() => {
      setIsHovered(false);
    }, 3000); // Auto-hide tooltip after 3 seconds
  };

  return (

    <div className="relative group">
    <Link
      href={href}
      className={`flex items-center p-3 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive ? 'bg-white text-black' : 'hover:bg-white hover:text-black'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="mr-3">
        {Icon({ color: isActive || isHovered ? 'black' : 'white' })}
      </span>
      <span className="hidden sm:block font-OpenSans">{title}</span>
    </Link>
    {isHovered && (
        <div
          className="absolute left-full ml-3 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg shadow-lg transition-opacity duration-300 max-xxs:block hidden"
        >
          {title}
          {/* Tooltip arrow */}
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

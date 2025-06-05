'use client';
import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import { TbGardenCart } from 'react-icons/tb';
import { HiMenu } from 'react-icons/hi';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/zustand/auth';
import Search from '@/components/search';
import { getuserData } from '@/services/api/authService';

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onClick = () => {
    router?.push('/');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Login', path: '/login' },
  ];

  const checkout = () => {
    router?.push('/cart');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const toggleSearch = () => {
    setIsSearchActive((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
const [userData,setUserData]=useState<any>([])
  const { isAuthenticated, user, logout } = useAuthStore();
   const fetchData = async () => {
      const response = await getuserData(user?.id as any);
      setUserData(response);
      console.log('user', response);
    };

    useEffect(()=>{
      fetchData()
    },[])
  const isAdmin = user?.role === 'admin';
  return (
    <div className="w-full relative ">
      <Search open={isSearchActive} onClose={toggleSearch} />
      <div className="w-11/12 md:w-4/5 border-b mx-auto flex flex-row items-center py-1 xxs:py-3 md:py-0 justify-between px-2 md:px-0">
        <div
          className="w-[22%] xxs:w-[16%] sm:w-[12%] md:w-[8%] xxs:py-2 flex items-center justify-center gap-1 md:gap-5 cursor-pointer"
          onClick={onClick}
        >
          <img
            src=    "/WhatsApp Image 2025-02-08 at 1.30.33 AM.jpeg"
            alt="logo"
            className="w-full md:w-auto rounded-full"
          />
        </div>

        <div
          className={`mt-4 md:mt-0 md:block hidden ${
            isSearchActive ? 'hidden' : ''
          }`}
        >
          <ul className="flex flex-col md:flex-row items-center justify-center gap-5 min-[1050px]:gap-8 font-OpenSans font-semibold text-sm lg:text-base leading-7 text-[#00000080]">
            {/* {navItems.map((item) => (
              <li
                key={item.name}
                className={`relative cursor-pointer hover:text-[#3734A9] after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#3734A9] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out ${
                  pathname === item.path ? 'text-[#3734A9]' : ''
                }`}
              >
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))} */}
            {navItems
              .filter((item) => item.name !== 'Login')
              .map((item) => (
                <li
                  key={item.name}
                  className={`relative hover:text-[#3734A9]  after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#3734A9] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out ${
                    pathname === item.path ? 'text-[#3734A9] font-semibold' : ''
                  }`}
                >
                  <Link href={item.path}>{item.name}</Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="mt-4 md:mt-0 md:flex hidden">
          <ul className="flex items-center justify-center gap-3 lg:gap-5">
            <li
              className="w-[30px] lg:w-[40px] aspect-square cursor-pointer bg-[#FFFFFF80] flex items-center justify-center rounded-[20px]"
              onClick={toggleSearch}
            >
              <IoMdSearch className="w-[20px] h-[20px] lg:w-[27px] lg:h-[27px] text-[#3734A9]" />
            </li>
            <li
              className="text-[#3734A9] cursor-pointer font-medium text-base leading-6"
              onClick={toggleSearch} // Add this onClick handler
            >
              Search
            </li>
            <span
              className="flex items-center gap-4 cursor-pointer"
              onClick={checkout}
            >
              <li className="w-[30px] lg:w-[40px] aspect-square bg-[#FFFFFF80] cursor-pointer flex items-center justify-center rounded-[20px]">
                <TbGardenCart className="w-[20px] h-[20px] lg:w-[27px] lg:h-[27px]  text-[#3734A9]" />
              </li>
              <li className="text-[#3734A9] cursor-pointer font-medium text-base leading-6">
                Cart
              </li>
            </span>
            <li>
              {isAuthenticated ? (
                <div
                  ref={dropdownRef}
                  className="flex items-center space-x-2 cursor-pointer text-primary"
                  onClick={toggleDropdown}
                >
                  <img
                    src={userData?.profile || '/download.png'}
                    alt="User profile"
                    className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 border-white object-cover object-top"
                  />
                  <span className="hidden md:inline-block text-sm font-medium">
                    {userData?.display_name || 'User'}
                  </span>

                  {isDropdownOpen &&  (
                    <ul className="absolute right-10 mt-48 w-48 bg-white border rounded-lg shadow-lg z-10">
                     { isAdmin ? (
                      <li
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${isAdmin ? 'block' : 'hidden'}`}
                        onClick={() => router.push('/admin/dashboard')}
                      >
                        Admin Dashboard
                      </li>
) : null}             
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => router.push('/profile-details')}
                      >
                        Profile
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => router.push('/order-history')}
                      >
                        Order History
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => [logout(), router.push('/login')]}
                      >
                        Logout
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={'/login'}
                  className="bg-[#3734A9] rounded-[15px] py-1.5 px-6 text-[#FFFFFF] text-lg font-semibold"
                >
                  Get started
                </Link>
              )}
            </li>
          </ul>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ul className="flex items-center gap-5">
            <li
              className="w-[35px] h-[35px] bg-[#FFFFFF] flex items-center justify-center rounded-[20px]"
              onClick={toggleSearch}
            >
              <IoMdSearch className="w-[20px] h-[20px] text-[#3734A9]" />
            </li>
            <li className="text-[#3734A9] font-medium text-base sm:block hidden leading-4">
              Search
            </li>
            <li className="w-[35px] h-[35px] bg-[#FFFFFF] flex items-center justify-center rounded-[20px]">
              <Link href="/cart">
                <TbGardenCart className="w-[20px] h-[20px] text-[#3734A9]" />
              </Link>
            </li>
            <li className="text-[#3734A9] font-medium text-base sm:block hidden leading-4">
              Cart
            </li>
          </ul>

          <button onClick={toggleMenu} className="text-[#3734A9] md:px-2">
            {isMenuOpen ? (
              <IoMdClose className="w-[25px] h-[25px]" />
            ) : (
              <HiMenu className="w-[25px] h-[25px]" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="w-full flex absolute z-10 md:px-5 px-0 bg-[#8FCDE4] border-2 shadow-cardShadow rounded-b-3xl flex-col items-center justify-center gap-4 py-4">
            {navItems.map((item) =>
              isAuthenticated && item?.path === '/login' ? null : (
                <li
                  key={item.name}
                  className={`relative hover:text-[#3734A9]  after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#3734A9] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out ${
                    pathname === item.path ? 'text-[#3734A9] font-semibold' : ''
                  }`}
                >
                  <Link href={item.path}>{item.name}</Link>
                </li>
              )
            )}

            {/* Profile dropdown options for mobile */}
            {isAuthenticated && (
              <li className="w-full text-center">
                <ul className="flex flex-col gap-2">
                  <li
                    className={`w-full px-4 py-2 ${
                      pathname === '/profile-details'
                        ? 'font-bold hover:text-[#3734A9] text-[#3734A9]'
                        : ''
                    }`}
                    onClick={() => router.push('/profile-details')}
                  >
                    Profile
                  </li>
                  <li
                    className={`w-full px-4 py-2 ${
                      pathname === '/order-history'
                        ? ' font-bold hover:text-[#3734A9] text-[#3734A9] '
                        : ''
                    }`}
                    onClick={() => router.push('/order-history')}
                  >
                    Order History
                  </li>
                  <li
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${isAdmin ? 'block' : 'hidden'}`}
                        onClick={() => router.push('/admin/dashboard')}
                      >
                        Admin Dashboard
                      </li>
                  <li
                    className="w-full px-4 py-2 text-red-600"
                    onClick={() => {
                      logout();
                      router.push('/login');
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

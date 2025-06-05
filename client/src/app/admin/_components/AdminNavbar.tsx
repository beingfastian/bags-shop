'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
// import { FiBell } from 'react-icons/fi';

// Utility function to format time
const formatTimeAgo = (timestamp: Date) => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;
  interval = Math.floor(seconds / 60);
  if (interval >= 1)
    return `${interval} minute${interval === 1 ? '' : 's'} ago`;
  return 'just now';
};

interface Props {
  name: string;
  image: string;
  notification?: string;
}

const AdminHeader = ({ name, image }: Props) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5); // State to track how many notifications to show
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef<HTMLDivElement | null>(null); // Ref for the dropdown

  // Sample notifications data with timestamps
  const notifications = [
    {
      id: 1,
      message: 'New comment on your post',
      img: '/download.png',
      timestamp: new Date(Date.now() - 120000),
    }, // 2 minutes ago
    {
      id: 2,
      message: 'New like on your photo',
      img: '/path/to/image2.png',
      timestamp: new Date(Date.now() - 7200000),
    }, // 2 hours ago
    {
      id: 3,
      message: 'Friend request received',
      img: '/path/to/image3.png',
      timestamp: new Date(Date.now() - 86400000),
    }, // 1 day ago
    {
      id: 4,
      message: 'New follower',
      img: '/path/to/image4.png',
      timestamp: new Date(Date.now() - 172800000),
    }, // 2 days ago
    {
      id: 5,
      message: 'Your post was shared',
      img: '/path/to/image5.png',
      timestamp: new Date(Date.now() - 604800000),
    }, // 1 week ago
    {
      id: 6,
      message: 'New message from John',
      img: '/path/to/image6.png',
      timestamp: new Date(Date.now() - 86400000),
    }, // 1 day ago
    {
      id: 7,
      message: 'Event invitation',
      img: '/path/to/image7.png',
      timestamp: new Date(Date.now() - 432000000),
    }, // 5 days ago
    {
      id: 8,
      message: 'Reminder: Meeting at 3 PM',
      img: '/path/to/image8.png',
      timestamp: new Date(Date.now() - 1800000),
    }, // 30 minutes ago
  ];

  const onClick = () => {
    router.push('/admin/profile-setting');
  };

  // const toggleDropdown = () => {
  //   setIsDropdownOpen((prev) => !prev);
  // };

  const showMoreNotifications = () => {
    setVisibleCount((prev) => prev + 5); // Increase the count by 5
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        logoutRef.current &&
        !logoutRef.current.contains(event.target as Node)
      ) {
        setShowLogout(false); // Close logout dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        // Close logout dropdown if clicked outside
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const onClickhandle = () => {
    setShowLogout((prev) => !prev); // Toggle logout visibility
  };

  const logout = () => {
    // Implement your logout logic here (e.g., clearing session, redirecting to login)
    router.push('/login'); // Redirect to login page or wherever appropriate
  };

  return (
    <header className="text-white bg-[#3734A9] h-[90px] shadow-md z-50 sticky top-0">
      <div className="mx-auto flex items-center py-3 px-4 sm:px-6 lg:px-8">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center space-x-16">
            <div
              className="flex gap-4 items-center cursor-pointer "
              onClick={() => router.push('/')}
            >
              <Image
                src="/WhatsApp Image 2025-02-08 at 1.30.33 AM.jpeg"
                alt=""
                width={10}
                height={10}
                unoptimized
                className="w-[70px] aspect-square cursor-pointer bg-white rounded-full"
                onClick={() => router.push('/')}
              />
              <div className="text-base xxs:text-xl sm:text-2xl font-bold tracking-wide mr-4">MAAOZ OFFICIAL STORE</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* <button
              className="relative rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="User Notifications"
              onClick={toggleDropdown}
            >
              <FiBell size={20} />
              <div className="absolute flex items-center justify-center -top-2 bg-red-600 -right-1 h-4 w-4 rounded-full">
                <p className="text-xs">{notification || '0'}</p>
              </div>
            </button> */}

            {/* Notification Dropdown */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef} // Attach the ref to the dropdown
                className="absolute right-4 top-14 mt-2 w-64 bg-white text-black shadow-lg rounded-lg z-10 overflow-y-auto h-[300px] scrollbar-blue"
              >
                <div className="p-4">
                  <p className="font-bold text-sm text-[#3734A9]">
                    Notifications
                  </p>
                  <ul>
                    {notifications.slice(0, visibleCount).map((notif) => (
                      <li
                        key={notif.id}
                        className="py-2 text-sm flex items-center"
                      >
                        <img
                          src={notif.img}
                          alt="Notification"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <div>{notif.message}</div>
                          <div className="text-gray-500 text-xs">
                            {formatTimeAgo(notif.timestamp)}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {visibleCount < notifications?.length && (
                    <button
                      className="mt-2 text-[#3734A9] text-sm hover:underline"
                      onClick={showMoreNotifications}
                    >
                      Show more
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={onClick}
            >
              <img
                src={image || '/avator.png'}
                alt="User profile"
                className="w-10 h-10 rounded-full "
              />
              <span className="text-sm">{name}</span>
            </div> */}

            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={onClickhandle}
            >
              <img
                src={image || '/download.png'}
                alt="User profile"
                className="w-10 h-10 rounded-full "
              />
              <span className="text-sm">{name}</span>
            </div>

            {/* Conditionally render logout link */}
            {showLogout && (
              <div
                ref={logoutRef} // Attach the ref to the logout dropdown
                className="absolute flex flex-col right-4 top-14 bg-white text-black shadow-lg rounded-lg p-4 z-20"
              >
                {/* Setting Button */}
                <button
                  className="mb-2 text-blue-600 font-semibold hover:underline"
                  onClick={onClick}
                >
                  Setting
                </button>
                {/* Logout Button */}
                <button
                  className="text-red-600 font-semibold hover:underline"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

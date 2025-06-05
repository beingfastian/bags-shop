// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';
// import {  FaInstagram, FaTiktok } from 'react-icons/fa';
// // import { LuYoutube } from 'react-icons/lu';
// function Footer() {
//   const navItems = [
//     { name: 'Home', path: '/' },
//     { name: 'Products', path: '/products' },
//     { name: 'About', path: '/about' },
//     { name: 'Contact', path: '/contact' },
//     { name: 'Privacy Policy', path: '/privacy-policy' },
//     // { name: 'Customer Services', path: '/customer-services' },
//     // { name: 'Delivery & Payment Method', path: '/delivery' },
//     // { name: 'Refund Policy', path: '/refund-policy' },
//     // { name: 'Return Policy', path: '/return-policy' },
//   ];

//   return (
//     <div className="w-full mt-10 px-6 lg:px-0">
//       <hr className="w-[90%] lg:w-[70%] mx-auto border-[1.5px] border-[#3734A9]" />
//       <div className="w-full lg:w-[60%]  flex flex-wrap justify-between mt-10 mx-auto">
//         <div className="">
//           <div className="flex gap-2 items-center ">
//             <Image
//               // src="/Group.png"
//               src="/noBgColor__7_-removebg-preview.png"
//               alt=""
//               width={100}
//               height={100}
//               className="w-[90px] aspect-square"
//               unoptimized
//             />
//           </div>
//           <div className="mt-0 flex flex-col text-[#7F848D]">

//             <div className="flex flex-col">
//               <span className="font-bold text-[#293241]">Name:</span>
//               <span>MAAOZ OFFICIAL STORE</span>
//               <span className="font-bold text-[#293241]">Address:</span>
//               <span>
//                 I-161 chittian hittian iqbal road commetie chowk Rawalpindi
//               </span>
//               <span className="font-bold text-[#293241]">Phone:</span>+92 317 5657572
//               <span></span>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row  gap-6 lg:gap-20">
//           <div className="">
//             <ul className="grid lg:grid-cols-1 grid-cols-2 gap-3  mt-2 lg:mt-0 text-[#7F848D] text-[16px] leading-[21px]">
//               {navItems?.map((e, index) => (
//                 <Link key={index} href={e.path}>
//                   {e.name}
//                 </Link>
//               ))}
//             </ul>
//           </div>
//           <div className=''>
//             <ul className="grid lg:grid-cols-1 grid-cols-2 gap-3">
//               <li className="text-[16px] text-[#7F848D] leading-[21px] ">
//                 <Link href={'/refund-policy'}>Refund Policy</Link>
//               </li>
//               <li className="text-[16px] text-[#7F848D] leading-[21px]">
//                 <Link href={'/return-policy'}>Return Policy</Link>
//               </li>

//               <li className="text-[16px] text-[#7F848D] leading-[21px]">
//                 <Link href={'/delivery'}>Delivery & Payment</Link>
//               </li>

//               <li className="text-[16px] text-[#7F848D] leading-[21px]">
//                 <Link href={'/customer-services'}>Customer Services</Link>
//               </li>

//               <li className="text-[16px] text-[#7F848D] leading-[21px]">
//                 <Link href={'/terms-conditions'}>Terms & Conditions</Link>
//               </li>

//               <li className="text-[16px] font-bold leading-[21px] text-[#293241]">
//                 Social Media
//               </li>
//             </ul>
//             {/* <div className="flex gap-[10px] mt-3 ">
//               <div className="bg-[#EAEBEC] rounded-[8px] flex items-center justify-center w-[30px] h-[30px] 2xl:w-[44px] 2xl:h-[44px]">
//                 <FaInstagram className="text-[#7F848D] w-[18px] h-[18px] 2xl:w-[24px] 2xl:h-[24px]" />
//               </div>
//               <div className="bg-[#EAEBEC] rounded-[8px] flex items-center justify-center w-[30px] h-[30px] 2xl:w-[44px] 2xl:h-[44px]">
//                 <FaFacebookF className="text-[#7F848D] w-[18px] h-[18px] 2xl:w-[24px] 2xl:h-[24px]" />
//               </div>
//               <div className="bg-[#EAEBEC] rounded-[8px] flex items-center justify-center w-[30px] 2xl:w-[44px] aspect-square">
//                 <LuYoutube className="text-[#7F848D] w-[18px] h-[18px] 2xl:w-[24px] 2xl:h-[24px]" />
//               </div>
//             </div> */}

//             <div className="flex gap-[10px] mt-3">
//               {/* Instagram */}
//               <a
//                 href="https://www.instagram.com/maaozofficial.store?igsh=NjB5ODh5eDVmZW9z"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-[#EAEBEC] rounded-[8px] flex items-center justify-center w-[30px] h-[30px] 2xl:w-[44px] 2xl:h-[44px]"
//               >
//                 <FaInstagram className="text-[#7F848D] w-[18px] h-[18px] 2xl:w-[24px] 2xl:h-[24px]" />
//               </a>

//               {/* Facebook */}
//               {/* <a
//                 href="https://www.facebook.com/share/1EvTD2WADY/?mibextid=LQQJ4d"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-[#EAEBEC] rounded-[8px] flex items-center justify-center w-[30px] h-[30px] 2xl:w-[44px] 2xl:h-[44px]"
//               >
//                 <FaFacebookF className="text-[#7F848D] w-[18px] h-[18px] 2xl:w-[24px] 2xl:h-[24px]" />
//               </a> */}

//               {/* TikTok */}
//               <a
//                 href="https://www.tiktok.com/@maaozofficial.store?_t=8sH7WpcaXHF&_r=1"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-[#EAEBEC] rounded-[8px] flex items-center justify-center w-[30px] h-[30px] 2xl:w-[44px] 2xl:h-[44px]"
//               >
//                 <FaTiktok className="text-[#7F848D] w-[18px] h-[18px] 2xl:w-[24px] 2xl:h-[24px]" />
//               </a>

//               {/* <a
//                 href="#"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-[#EAEBEC] rounded-[8px] flex items-center justify-center w-[30px] 2xl:w-[44px] aspect-square"
//               >
//                 <LuYoutube className="text-[#7F848D] w-[18px] h-[18px] 2xl:w-[24px] 2xl:h-[24px]" />
//               </a> */}
//             </div>
//           </div>
//         </div>
//         <p className="text-sm lg:text-lg text-[#293241] leading-[32px] mt-2 lg:mt-0  w-full">
//           © 2024 All rights reserved.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Footer;

'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

function Footer() {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ];

  return (
    <div className="w-full mt-10">
      <hr className="w-[90%] lg:w-[60%] mx-auto border-[1.5px] border-[#3734A9]" />
      <footer className="py-12 px-2 xxs:px-6 lg:px-20">
        <div className="container mx-auto">
          {/* Top Section */}
          <div className="flex flex-wrap justify-between gap-10">
            {/* Logo and Information */}
            <div className="flex-1 min-w-[100px] xxs:min-w-[200px]">
              <div className="flex items-center mb-6 ">
                {/* <Image
                  src="/noBgColor__7_-removebg-preview.png"
                  alt="MAAOZ Logo"
                  width={120}
                  height={120}
                  className="w-[100px] aspect-square shadow-faqCard rounded-full"
                  unoptimized
                /> */}
                <Image
                                src="/WhatsApp Image 2025-02-08 at 1.30.33 AM.jpeg"
                                alt=""
                                width={10}
                                height={10}
                                unoptimized
                                className="w-[100px] aspect-square cursor-pointer bg-white rounded-full"
                                // onClick={() => router.push('/')}
                              />
              </div>
              <div className="text-sm leading-6">
                <p className="font-semibold text-[#3734A9]">Address:</p>
                <p>
                  I-161 Chittian Hittian, Iqbal Road, Committee Chowk,
                  Rawalpindi
                </p>
                <p className="mt-2">
                  <span className="font-semibold text-[#3734A9]">Phone:</span>{' '}
                  +92 317 5657572
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex-1 min-w-[100px] sm:min-w-[200px]">
              <h3 className="text-lg font-bold  mb-4 text-[#3734A9]">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.path}
                      className="hover:text-[#60A5FA] transition duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div className="flex-1 min-w-[100px] sm:min-w-[200px]">
              <h3 className="text-lg font-bold  mb-4 text-[#3734A9]">
                Policies
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/refund-policy"
                    className="hover:text-[#60A5FA] transition duration-200"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/return-policy"
                    className="hover:text-[#60A5FA] transition duration-200"
                  >
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/delivery"
                    className="hover:text-[#60A5FA] transition duration-200"
                  >
                    Delivery & Payment
                  </Link>
                </li>
                <li>
                  <Link
                    href="/customer-services"
                    className="hover:text-[#60A5FA] transition duration-200"
                  >
                    Customer Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-conditions"
                    className="hover:text-[#60A5FA] transition duration-200"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="flex-1  min-w-[100px] xxs:min-w-[250px]">
              <h3 className="text-lg font-bold  mb-4 text-[#3734A9]">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/maaozofficial.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-[#374151] h-6 sm:h-10 w-6 sm:w-10 flex justify-center items-center rounded-full bg-[#3734A9] transition duration-200"
                >
                  <FaInstagram className="text-white  sm:w-6 sm:h-6" />
                </a>
                <a
                  href="https://www.tiktok.com/@maaozofficial.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-[#374151] h-6 sm:h-10 w-6 sm:w-10 flex justify-center items-center rounded-full bg-[#3734A9] transition duration-200"
                >
                  <FaTiktok className="text-white sm:w-6 sm:h-6" />
                </a>
                <a
                href="https://www.facebook.com/share/1YPcZH7TFc/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-[#374151] h-6 sm:h-10 w-6 sm:w-10 flex justify-center items-center rounded-full bg-[#3734A9] transition duration-200"
              >
                <FaFacebook className="text-white sm:w-6 sm:h-6" />
              </a>
            {/*   <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-[#374151] p-3 rounded-full bg-[#3734A9] transition duration-200"
              >
                <FaTwitter className="text-white w-6 h-6" />
              </a> */}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-10 text-center text-sm text-[#9CA3AF]">
            © 2025 All rights reserved. MAAOZ OFFICIAL STORE.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

// 'use client';

// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { useCategory } from '@/hooks/useCategory';
// import Layout from '../components/MainLayout';

// const AboutTheLeatherBag = () => {
//   const { data: categories } = useCategory();

//   return (
//     <div className="min-h-screen bg-white">
//       <Layout>
//         <main className="relative">
//           <div className="container mx-auto px-4 py-12">
//             {/* Hero Section */}
//             <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-16">
//               <div className="w-full lg:w-1/2">
//                 <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-OpenSans text-[#3734A9]">
//                 WHO WE ARE & WHAT WE DO
//                 </h2>
//                 <p className="text-[#7A7A7A] text-sm font-OpenSans mb-6 leading-relaxed">
//                 MAAOZ was founded in Pakistan in 1990 and is entirely owned by
//                   5 brothers. With over 30+ years of experience in the bag
//                   industry, MAAOZ has built a reputation for excellence in
//                   product development and quality craftsmanship. Starting as a
//                   wholesale leader, MAAOZ has established a strong presence in
//                   Pakistan and is now focused on expanding into retail and
//                   online markets.
//                 </p>
//                 <p className="text-[#7A7A7A] text-sm font-OpenSans mb-6 leading-relaxed">
//                 Our expertise spans a diverse range of bag categories,
//                   designed to meet the needs of modern consumers. Whether it’s
//                   for school, work, travel, or leisure, our products blend
//                   functionality with contemporary style, ensuring quality and
//                   satisfaction for every customer.
//                 </p>

//                 {/* Stats Section */}
//   <div className="grid grid-cols-3 gap-4 mb-8 py-12 px-6 bg-[#F7F7F8] rounded-xl border border-[#E9E9E9]">
//     <div className="text-center">
//       <p className="font-bold text-[#7A7A7A] md:text-[30px] text-2xl">
//         <span className="text-[#3734A9] text-[36px] md:text-[60px]">
//           0.1
//         </span>
//         k
//       </p>
//       <p className="text-gray-500">Vendors</p>
//     </div>
//     <div className="text-center">
//       <p className="font-bold text-[#7A7A7A] md:text-[30px] text-2xl">
//         <span className="text-[#3734A9] text-[36px] md:text-[60px]">
//           23
//         </span>
//         k
//       </p>
//       <p className="text-gray-500">Customers</p>
//     </div>
//     <div className="text-center">
//       <p className="font-bold text-[#7A7A7A] md:text-[30px] text-2xl">
//         <span className="text-[#3734A9] text-[36px] md:text-[60px]">
//           2
//         </span>
//         k
//       </p>
//       <p className="text-gray-500">Products</p>
//     </div>
//   </div>
// </div>

//               <div className="w-full lg:w-1/2">
//                 <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
//                   {categories && categories.length > 0 && (
//                     <>
//                       <Swiper
//                         modules={[Navigation, Pagination, Autoplay]}
//                         spaceBetween={30}
//                         slidesPerView={1}
//                         // navigation
//                         pagination={{ clickable: true }}
//                         autoplay={{ delay: 1500, disableOnInteraction: false }}
//                         className="relative w-full h-[400px] rounded-lg overflow-hidden"
//                       >
//                         {categories.map((category, index) => (
//                           <SwiperSlide key={index}>
//                             <div className="relative w-full h-full">
//                               <img
//                                 src={category.icon}
//                                 alt={category.name}
//                                 className="w-full h-full object-cover"
//                               />
//                               <div className="absolute inset-0 bg-black/20"></div>
//                               <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
//                                 <h3 className="text-white text-center text-xl font-semibold">
//                                   {category.name}
//                                 </h3>
//                               </div>
//                             </div>
//                           </SwiperSlide>
//                         ))}
//                       </Swiper>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
//               <div className="bg-[#F7F7F8] border-[#E9E9E9] border shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
//                 <h4 className="font-bold font-poppins text-lg mb-4 text-[#3734A9]">
//                   Product Packing
//                 </h4>
//                 <p className="text-[#7A7A7A] font-normal text-sm leading-relaxed">
// We take great care in packing your items securely to ensure
// they arrive in perfect condition. Every product is carefully
// packaged with quality materials for safe delivery.
//                 </p>
//               </div>
//               <div className="bg-[#F7F7F8] border-[#E9E9E9] border shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
//                 <h4 className="font-bold font-poppins text-lg mb-4 text-[#3734A9]">
//                   24X7 Support
//                 </h4>
//                 <p className="text-[#7A7A7A] font-normal text-sm leading-relaxed">
// Our customer support is available 24/7 to assist you with any
// inquiries or issues. We are here to help anytime, ensuring a
// smooth shopping experience.
//                 </p>
//               </div>
//               <div className="bg-[#F7F7F8] border-[#E9E9E9] border shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
//                 <h4 className="font-bold font-poppins text-lg mb-4 text-[#3734A9]">
//                   Delivery in 5 Days
//                 </h4>
//                 <p className="text-[#7A7A7A] font-normal text-sm leading-relaxed">
// Enjoy fast and reliable delivery! Your order will arrive at
// your doorstep within 5 days, ensuring prompt service and
// satisfaction.
//                 </p>
//               </div>
//               <div className="bg-[#F7F7F8] border-[#E9E9E9] border shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
//                 <h4 className="font-bold font-poppins text-lg mb-4 text-[#3734A9]">
//                   Payment Secure
//                 </h4>
//                 <p className="text-[#7A7A7A] font-normal text-sm leading-relaxed">
// Shop with confidence! We offer secure payment options to
// protect your personal and financial information throughout the
// transaction.
//                 </p>
//               </div>
//             </div>

//           </div>
//         </main>
//       </Layout>
//     </div>
//   );
// };

// export default AboutTheLeatherBag;

'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useCategory } from '@/hooks/useCategory';
import Layout from '../components/MainLayout';

const AboutTheLeatherBag = () => {
  const { data: categories } = useCategory();

  return (
    <div className="min-h-screen bg-white">
      <Layout>
        <main className="relative">
          <div className="w-[80%] mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-16">
              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl lg:text-3xl font-bold mb-6 font-OpenSans text-[#3734A9]">
                  WHO WE ARE & WHAT WE DO
                </h2>
                <p className="text-[#7A7A7A] text-sm font-OpenSans mb-6 leading-relaxed">
                  MAAOZ was founded in Pakistan in 1990 and is entirely owned by
                  5 brothers. With over 30+ years of experience in the bag
                  industry, MAAOZ has built a reputation for excellence in
                  product development and quality craftsmanship. Starting as a
                  wholesale leader, MAAOZ has established a strong presence in
                  Pakistan and is now focused on expanding into retail and
                  online markets.
                </p>
                <p className="text-[#7A7A7A] text-sm font-OpenSans mb-6 leading-relaxed">
                  Our expertise spans a diverse range of bag categories,
                  designed to meet the needs of modern consumers. Whether it’s
                  for school, work, travel, or leisure, our products blend
                  functionality with contemporary style, ensuring quality and
                  satisfaction for every customer.
                </p>

                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-4 mb-8 py-12 px-6 bg-[#F7F7F8] rounded-xl border border-[#E9E9E9]">
                  <div className="text-center">
                    <p className="font-bold text-[#7A7A7A] md:text-[30px] text-2xl">
                      <span className="text-[#3734A9] text-[36px] md:text-[60px]">
                        0.1
                      </span>
                      k
                    </p>
                    <p className="text-gray-500">Vendors</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-[#7A7A7A] md:text-[30px] text-2xl">
                      <span className="text-[#3734A9] text-[36px] md:text-[60px]">
                        23
                      </span>
                      k
                    </p>
                    <p className="text-gray-500">Customers</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-[#7A7A7A] md:text-[30px] text-2xl">
                      <span className="text-[#3734A9] text-[36px] md:text-[60px]">
                        2
                      </span>
                      k
                    </p>
                    <p className="text-gray-500">Products</p>
                  </div>
                </div>
              </div>

              {/* Swiper Section */}
              <div className="w-full lg:w-1/2">
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                  {categories && categories.length > 0 && (
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={30}
                      slidesPerView={1}
                      // pagination={{ clickable: true }}
                      autoplay={{ delay: 2000, disableOnInteraction: false }}
                      className="relative w-full h-full"
                    >
                      {categories.map((category, index) => (
                        <SwiperSlide key={index}>
                          <div className="relative w-full h-full">
                            <img
                              src={category.icon}
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                              <h3 className="text-white text-center text-xl font-semibold">
                                {category.name}
                              </h3>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}

                  {/* Navigation Buttons */}
                </div>
              </div>
            </div>

            {/* "What We Bring to the Table" Section */}
            <div className="mb-16">
              <h3 className="text-2xl lg:text-3xl font-bold text-[#3734A9] mb-8">
                What We Bring to the Table
              </h3>
              <div className="text-[#7A7A7A] text-sm font-OpenSans leading-relaxed space-y-6">
                <p>
                  At MAAOZ, we blend practicality with elegance to create bags
                  that resonate with your lifestyle. From students to
                  professionals, travelers to adventurers, our diverse
                  collection has something for everyone.
                </p>
                <ul className="list-disc ml-6">
                  <li>
                    <strong>Durable School Bags:</strong> Designed for students
                    of all ages, these Bags combine style, comfort, and
                    resilience to withstand the rigors of daily use.
                  </li>
                  <li>
                    <strong>Laptop Bags:</strong> Perfect for professionals and
                    students, our sleek and functional laptop Bags protect your
                    devices while adding a touch of sophistication.
                  </li>
                  <li>
                    <strong>Backpacks:</strong> Whether for everyday use,
                    travel, or outdoor adventures, our versatile backpacks are
                    the perfect blend of durability and style.
                  </li>
                  <li>
                    <strong>Shoulder Bags:</strong> Elegant, practical, and easy
                    to carry, our shoulder Bags are crafted for modern
                    lifestyles, making them the ultimate daily companions.
                  </li>
                  <li>
                    <strong>Duffel Bags:</strong> Spacious, sturdy, and perfect
                    for travel or sports, our duffel Bags are built for those
                    who are always on the go.
                  </li>
                  <li>
                    <strong>Office Bags:</strong> 
                    Designed for the modern professional, our office bags offer exceptional organization, functionality, and a polished look for your workday essentials.
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                {
                  title: ' Product Packing',
                  description:
                    'We take great care in packing your items securely to ensure they arrive in perfect condition. Every product is carefully packaged with quality materials for safe delivery.',
                },
                {
                  title: '24X7 Support',
                  description:
                    'Our customer support is available 24/7 to assist you with any inquiries or issues. We are here to help anytime, ensuring a smooth shopping experience.',
                },
                {
                  title: 'Delivery in 3-5 Days',
                  description:
                    'Enjoy fast and reliable delivery! Your order will arrive at your doorstep within 3-5 days, ensuring prompt service and satisfaction.',
                },
                {
                  title: 'Payment Secure',
                  description:
                    'Shop with confidence! We offer secure payment options to protect your personal and financial information throughout the transaction.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#F7F7F8] border-[#E9E9E9] border shadow-md rounded-lg p-2 text-center hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-bold font-poppins text-lg mb-4 text-[#3734A9]">
                    {item.title}
                  </h4>
                  <p className="text-[#7A7A7A] font-normal text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default AboutTheLeatherBag;

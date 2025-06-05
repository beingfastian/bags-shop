'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';

const truncateReviewText = (text: string, maxWords = 16) => {
  const words = text.split(' ');
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
};

const reviews = [
  {
    id: 1,
    text: 'quality zabardast hai aur price bhi reasonable hai. Highly recommend!',
    image: '/images/review1.jpeg',
    name: 'Ahmed Khan',
  },
  {
    id: 2,
    text: 'The stationery set exceeded my expectations. The notebook’s quality is amazing, and the pens write so smoothly!',
    image: '/images/review5.jpeg',
    name: 'Ayesha Riaz',
  },
  // {
  //   id: 3,
  //   text: 'Ordered a handbag for my wife, and she absolutely loves it! The craftsmanship is excellent, and the leather smells genuine.',
  //   image: '/images/review2.jpeg',
  //   name: 'Bilal Qureshi',
  // },
  // {
  //   id: 4,
  //   text: 'Ye journal bohat zabardast hai! Pages ki quality bohat achi hai aur writing experience bhi smooth hai.',
  //   image: '/images/review4.jpeg',
  //   name: 'Sadia Malik',
  // },
  {
    id: 3,
    text: 'بیگ بہت اچھا ہے، مضبوط اور سٹائلش بھی۔ روزانہ کے استعمال کے لیے بالکل مناسب ہے۔ واقعی بہت فائدہ مند خریداری ہے!"',
    image: '/images/review2.jpeg',
    name: 'Hassan Ali',
  },
  // {
  //   id: 6,
  //   text: 'Planner ka design bohat acha hai, simple aur elegant. Daily tasks likhnay ke liye best option hai!',
  //   image: '/images/review6.jpeg',
  //   name: 'Nida Faisal',
  // },
  {
    id: 4,
    text: 'Been using their  bag for 6 months, abhi tak bilkul naye jaisa hai. Quality aur durability dono top-notch!',
    image: '/images/review12.jpeg',
    name: 'Rizwan Javed',
  },
  {
    id: 5,
    text: 'The  bag is spacious, stylish, and very high quality. I take it everywhere with me, and it still looks new!',
    image: '/photo-1544725176-7c40e5a71c5e.avif',
    name: 'Mehwish Noor',
  },
  {
    id: 6,
    text: 'Bags ki quality bohat zabardast hai, comfortable bhi hain aur price bhi reasonable hai!',
    image: '/images/review4.jpeg',
    name: 'Zain Abbas',
  },
  {
    id: 7,
    text: 'This laptop bag is sturdy, stylish, and has ample padding for protection. Fits my 15-inch laptop perfectly! Highly recommended.',
    image: '/83947156_208790300302962_1208166307430662144_n.jpg',
    name: 'Amir khan',
  },
  {
    id: 8,
    text: 'Love how lightweight yet spacious this bag is. Ideal for daily office use with a professional look.',
    image: '/images.png',
    name: 'Rahman Naeem',
  },
  {
    id: 9,
    text: 'This school bag is spacious, comfortable, and has strong zippers. My child loves the design and durability.',
    image: '/photo-1545996124-0501ebae84d0.avif',
    name: 'Adil Raza',
  },
  {
    id: 10,
    text: 'Padded straps of bag make  it easy to carry all day. Holds books, lunch, and even a water bottle with ease!',
    // image: '/images/review4.jpeg',
    image: '/images.png',

    name: 'Salman Khan',
  },
  {
    id: 10,
    text: 'This backpack is both stylish and functional. The padded back support makes carrying heavy books effortless',
    // image: '/images.png',
    image:'/png-clipart-female-profile-avatar-illustration-computer-icons-female-user-profile-female-girl-wife-woman-icon-miscellaneous-logo-thumbnail.png',
    name: 'Sana Amin',
  }

  // {
  //   id: 10,
  //   text: 'Premium quality Bags',
  //   image: '/images/review10.jpeg',
  //   name: 'Farhan Siddiqui',
  // },
];


export default function PeopleReview() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="w-4/5 mx-auto mt-6 people-review">
      <Swiper
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 2500, 
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="!opacity-100 !scale-100 transition-none">
            <div className="w-full bg-[#F5F6F8] h-[500px] rounded-[12px] px-6 2xl:px-7 py-5 shadow-profileShadow">
              <p className="text-sm 2xl:text-base tracking-[1%] leading-[20px] 2xl:leading-[28px] text-gray-700">
                {truncateReviewText(review.text)}
              </p>
              <div className="w-1/3 linear-primary h-[2px] mt-3"></div>
              <div className="flex gap-4 mt-5 items-center">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={50}
                  height={60}
                  className="w-10 h-10 rounded-full object-cover bg-black"
                />
                <div>
                  <h4 className="text-base leading-[24px] font-semibold">{review.name}</h4>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Navigation buttons */}
      {/* <div className="swiper-button-next hidden"></div>
      <div className="swiper-button-prev"></div> */}
    </div>
  );
}
'use client';

import ComplaintBox from '@/app/components/ComplainBox';
import { ArrowLeft } from '@/app/components/Icons';
import Layout from '@/app/components/MainLayout';
import ProductsInfo from '@/app/components/ProductsInfo';
import Slider from '@/app/components/ProductsSlider';
import ReviewComponent from '@/app/components/ReviewComponent';
// import ReviewsComponent from '@/app/components/ReviewsComponent';
import { useSingleProduct } from '@/hooks/useProducts';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

function ProductDetails() {
  const { id = '' } = useParams();

  const { data, isPending } = useSingleProduct(id?.toString());
  const router = useRouter();

  const handleContact = () => {
    router?.push('/contact');
  };

  // const onclick = () => {
  //   router?.push('/cart');
  // };

  const handleclick = () => {
    router?.push('https://wa.me/+923175657572');
  };
  const ratings = [
    { stars: 5, percentage: 95 },
    { stars: 4, percentage: 85 },
    { stars: 3, percentage: 10 },
    { stars: 2, percentage: 5 },
    { stars: 1, percentage: 1 },
  ];

  // const reviews = [
  //   // English Reviews
  //   {
  //     id: 1,
  //     username: 'Ali Hassan',
  //     url: '/images/review1.jpeg',
  //     timeAgo: '1 weeks ago',
  //     rating: 5,
  //     content:
  //       'fully satisfied with product and seller.',
  //   },
  //   {
  //     id: 2,
  //     url: '/images/review2.jpeg',
  //     username: 'Muhammad Imran',
  //     timeAgo: '1 weeks ago',
  //     rating: 4,
  //     content:
  //       'Great stationery set! The notebooks are sturdy, and the pens write smoothly. Slight reduction in rating due to slightly higher pricing.',
  //     replies: [],
  //   },

  //   {
  //     id: 108,
  //     username: 'Ayesha Siddiqui',
  //     url: '/images/review6.jpeg',
  //     timeAgo: '1 week ago',
  //     rating: 5,
  //     content:
  //       'Stationary set mein quality zabardast hai. Pen smooth chalti hai, notebook pages bhi premium quality ke hain.',
  //     replies: [
  //       {
  //         id: 1081,
  //         username: 'Faisal Ali',
  //         timeAgo: '4 days ago',
  //         content: 'Sahi kaha! Mujhe bhi pasand aaya.',
  //       },
  //     ],
  //   },

  //   {
  //     id: 109,
  //     username: 'jawad chudary',
  //     url: '/images/review10.jpeg',
  //     timeAgo: '2 months ago',
  //     rating: 4,
  //     content:
  //       'Great quality products, though the price point is a bit high. The leather bag is stylish and well-made, definitely a long-term investment.',
  //     replies: [],
  //   },

  //   {
  //     id: 3,
  //     username: 'Sarah Ahmed',
  //     url: '/images/review4.jpeg',
  //     timeAgo: ' 2 week ago',
  //     rating: 5,
  //     content:
  //       'Incredible attention to detail in both the Bags and stationery. As a designer, I appreciate the elegant design and functionality.',
  //     replies: [],
  //   },

  //   {
  //     id: 4,
  //     url: '/images/review3.jpeg',
  //     username: 'Nawaz ali',
  //     timeAgo: '2 weeks ago',
  //     rating: 5,
  //     content: 'bohut zabardast Bags hai i like it ',
  //     replies: [],
  //   },

  //   // Urdu Reviews

  //   {
  //     id: 110,
  //     username: 'Imran Khan',
  //     url: '/images/review12.jpeg',
  //     timeAgo: '3 weeks ago',
  //     rating: 5,
  //     content:
  //       'Bags ka design aur quality excellent hai. Professional aur casual dono occasions ke liye perfect.',
  //     replies: [],
  //   },
  // ];
  // const handleclick = () => {
  //   router?.push('https://wa.me/+923175657572');
  // };
  return (
    // <div className="">
    <Layout>
      <div className="w-full">
        <div className="px-6 sm:px-10 md:px-32 mt-5">
          {/* <div className="bg-[#F8F8FF] lg:w-[45%] rounded-[10px] p-4 flex items-center gap-4">
            <h1 className="text-xs md:text-xl text-[#3734A9] font-OpenSans ">
              Home
            </h1>
            <ArrowLeft />
            <h1 className="text-xs md:text-xl text-[#3734A9] font-OpenSans whitespace-nowrap">
              Featured Store
            </h1>
            <ArrowLeft />
            <h1 className="text-xs md:text-xl text-[#BABABA] font-OpenSans whitespace-nowrap">
              Product details
            </h1>
          </div> */}
          <div className="mt-5 hidden md:block">
            <div className="bg-[#F8F8FF] lg:w-[55%] rounded-[10px] p-4 flex items-center gap-4">
              <h1
                className="cursor-pointer text-xs md:text-lg text-[#3734A9] font-OpenSans font-medium"
                onClick={() => router.push('/')} // Correct way to navigate
              >
                Home
              </h1>
              <ArrowLeft />
              <h1
                className="cursor-pointer text-xs md:text-lg text-[#3734A9] font-OpenSans font-medium whitespace-nowrap"
                onClick={() => router.push('/products')} // Correct navigation
              >
                Flat off Collection
              </h1>
              <ArrowLeft />
              <h1
                className="cursor-pointer text-xs md:text-lg text-[#3734A9] font-OpenSans font-medium whitespace-nowrap"
                onClick={() => {
                  console.log('Current Route:', window.location.href); // Print current route to console
                  window.location.href = window.location.href; // Navigate to new route
                }}
              >
                Feature-Details
              </h1>
              {/* <ArrowLeft /> */}
              {/* <h1
                    className="text-xs md:text-lg text-[#3734A9] font-OpenSans font-medium whitespace-nowrap"
                    onClick={() => router.push('/products/cart')}  // Correct navigation
                  >
                    Checkout
                  </h1> */}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center bg-white">
          <div className='w-full flex justify-center sm:px-20'>
          <Image
            src="Element.png"
            alt=""
            width={0}
            height={0}
            className="w-20 absolute right-0 -bottom-[31%]"
            unoptimized
          />
          <div className="w-full sm:w-full lg:w-[60%] !max-h-1/2 py-8 relative">
            <Slider data={data} isPending={isPending} />
          </div>
          </div>
          <div className="w-full bg-[#F9F9F9] flex justify-center relative">
            <div className="w-5/6">
              <div className="w-full flex flex-col lg:flex-row lg:justify-between">
                <div className="w-full lg:w-1/2 flex flex-col py-5">
                  <ProductsInfo
                    // storeNumber="MAAOZ"
                    productName={data?.name || ''}
                    // price={data?.price?.toString() || ''}
                    data={data}
                    location="Pakistan"
                    onContactUs={handleContact}
                    onChat={() => router.push('https://wa.me/+923175657572')}
                    // onAddToCart={onclick}
                    onBuyNow={handleclick}
                  />
                </div>
                <div className="w-full lg:w-1/2 pt-10 pb-5  lg:pb-0">
                  <p className="text-center font-bold text-xl text-[#3734A9]">
                    Rating & Reviews (273)
                  </p>
                  <div className="flex flex-col lg:px-10 py-5">
                    <ReviewComponent ratings={ratings} totalReviews={273} />
                  </div>

                  <ComplaintBox />
                </div>
              </div>
            </div>

            <div
              className="absolute bottom-0 right-0 w-[150px] h-[330.24px] bg-cover bg-no-repeat"
              style={{ backgroundImage: 'url(/bganimated.png)' }}
            />
          </div>

          <div className="w-full px-10 md:px-32 py-5 relative ">
            <h1 className="!z-50 italic font-bold text-xl text-[#3734A9] h-[42px] max-w-[517px]  border-b border-[#EBEEEF]">
              Product Detail:
            </h1>
            <p className="text-sm pt-1 text-[#383939] ">{data?.description}</p>
            {/* <div
              className="absolute top-5 left-10 w-[59.91px] h-[64.91px] bg-cover bg-no-repeat hidden lg:block"
              style={{ backgroundImage: 'url(/Circle.png)' }}
            /> */}
          </div>

          {/* <div className="w-full px-10 md:px-32 py-5 relative">
            <h1 className="italic font-bold text-xl text-[#3734A9] h-[42px]  border-b border-[#EBEEEF]">
              Product Reviews & Comments
            </h1>
            <div className="py-6">
              {reviews.map((review) => (
                <ReviewsComponent key={review.id} review={review} />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;

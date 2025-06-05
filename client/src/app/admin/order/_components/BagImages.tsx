'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface Props {
  className?: string;
}

function BagImages({ className = '' }: Props) {
  const [mainImage, setMainImage] = useState('/Frame 8.png');
  const images = [
    {
      image: '/Frame 16.png',
    },
    {
      image: '/Frame 8.png',
    },
    {
      image: '/Frame 16.png',
    },
    {
      image: '/Frame 8.png',
    },
  ];
  return (
    <div className={`bg-white rounded-md px-3 py-4 ${className}`}>
      <Image
        src={mainImage}
        alt=""
        width={0}
        height={0}
        className="w-full"
        unoptimized
      />
      <div className="mt-3">
        <h1 className="text-[#00171F] text-xl font-OpenSans font-bold leading-6">
          A - shaped gown
        </h1>
        <div>
          <span className="flex items-center gap-5 mt-2">
            <h1 className="text-[#667479] text-[10px] font-OpenSans italic leading-[18PX] flex items-center gap-2">
              Gene: <span className="text-[#667479] font-bold">Female</span>
            </h1>
            <span className="w-1 aspect-square rounded-full bg-[#667479] flex" />
            <h1 className="text-[#667479] text-[10px] font-OpenSans italic leading-[18PX] flex items-center gap-2">
              Gene: <span className="text-[#667479] font-bold">Female</span>
            </h1>
          </span>
          <h1 className="text-[#00171F] text-base font-OpenSans font-bold leading-5 mt-2">
            N8.900.000{' '}
          </h1>
        </div>
        <div className="mt-4 flex items-center justify-between pb-5">
          {images?.map((e, index) => (
            <Image
              key={index}
              src={e?.image}
              alt=""
              width={0}
              height={0}
              className="cursor-pointer rounded-md !w-1/5 !aspect-square"
              unoptimized
              onClick={() => setMainImage(e.image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BagImages;

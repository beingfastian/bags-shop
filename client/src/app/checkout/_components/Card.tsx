import Rating from '@/app/components/RatingStars';
import Image from 'next/image';
import React from 'react';

interface Props {
  src: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
}

function Card({ src, title, originalPrice, discountedPrice }: Props) {
  const hasDiscount = originalPrice > discountedPrice;
  const randomRating = Math.random() * (5 - 4.5) + 4.5; 
  
  return (
    <div className="flex flex-row items-center md:flex-col lg:flex-row lg:items-center gap-2 mt-3 mb-3">
      <Image
        src={src}
        alt=""
        width={0}
        height={0}
        className="w-1/3 lg:w-1/4"
        unoptimized
      />
      <div>
        <h1 className="text-[15px] font-OpenSans text-gray-900 font-semibold">
          {title}
        </h1>
        <div className="ratingstar">
        <Rating rating={randomRating} />
          <span className="ml-2 text-sm font-semibold text-gray-500">
            ({randomRating.toFixed(1)})
          </span>
        </div>
        <span className="flex items-center gap-5">
          <h1 className="text-[#64B496] text-base font-OpenSans">
            Rs. {hasDiscount ? discountedPrice : originalPrice}
          </h1>
          {/* Show the original price with strikethrough if there's a discount */}
          {hasDiscount && (
            <h1 className="text-[#7A7A7A] text-[13px] font-OpenSans line-through">
              Rs. {originalPrice}
            </h1>
          )}
        </span>
      </div>
    </div>
  );
}

export default Card;
'use client';
// import { AiOutlineHeart } from 'react-icons/ai';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product } from '@/types/product';
import AddTocart from '@/components/addTocart';
import DiscountLabelGreen from '@/components/DiscountLabelGreen';
import StarRatings from 'react-star-ratings';

interface Props extends Product {
  className?: string;
  isPending?: boolean;
}

const ProductCard = ({ className, isPending = false, ...data }: Props) => {
  const truncateName = (name: string) => {
    const words = name?.split(' ');
    return words?.length > 2 ? `${words?.slice(0, 2).join(' ')}...` : name;
  };

  const randomRating = (Math.random() * (5 - 4.4) + 4.4).toFixed(1);
  
  // Use backend calculated discounted_price or fallback to original price
  const displayPrice = data?.discounted_price || data?.price || data?.Variants?.[0]?.price || 0;
  const originalPrice = data?.price || data?.Variants?.[0]?.price || 0;
  const hasDiscount = (data?.discount || data?.Variants?.[0]?.discount) > 0;
  
  return (
    <motion.div
      className={`relative bg-white w-full rounded-[12px] shadow-cardShadow overflow-hidden p-2 cursor-pointer transform transition-all duration-300 ease-in-out hover:shadow-lg ${className}`}
    >
      {data?.discount || data?.Variants?.[0]?.discount && !isPending ? (
        <DiscountLabelGreen discount={data?.discount || data?.Variants?.[0]?.discount} />
      ) : null}

      <div className="flex items-center justify-center w-full min-h-[150px] xxs:min-h-[250px] p-0 m-0">
        {!isPending ? (
          <Link href={`/products/${data?.id}`}>
            <motion.div
              whileHover={{
                rotateY: 20,
                rotateX: 10,
                scale: 1.2,
                transition: { duration: 3 },
              }}
              className="transform perspective-1000"
            >
              <img
                src={data?.Variants?.[0]?.image}
                alt={data?.name}
                className="h-[150px] w-full xxs:w-[178px] xxs:min-h-[250px] object-contain rounded-md mb-4"
              />
            </motion.div>
          </Link>
        ) : (
          <div className="w-full xxs:w-[178px] xxs:min-h-[250px] rounded-md mb-4 bg-slate-200 animate-pulse" />
        )}
      </div>

      {isPending ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-2 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        </div>
      ) : (
        <div className="mt-2 flex items-start justify-between">
          <Link href={`/products/${data?.id}`}>
            <h1 className="text-[#00171F] text-xs xxs:text-[15px] font-OpenSans font-semibold leading-6">
              {truncateName(data?.name)}
            </h1>
            <div className="flex items-center mt-1">
              <p className="text-sm font-semibold text-gray-800">
                Rs. {displayPrice}
                
                {hasDiscount && (
                  <span className="text-sm lg:text-[10px] text-red-500 line-through ml-2">
                    Rs. {originalPrice}
                  </span>
                )}
              </p>
            </div>
          </Link>
          {data ? <AddTocart data={data} /> : null}
        </div>
      )}

      <Link href={`/products/${data?.id}`}>
        <div className="flex items-center mt-2 flex justify-between">
          <StarRatings
            rating={parseFloat(randomRating)}
            starRatedColor="#FFAD33"
            starDimension="17px"
            starSpacing="0.5px"
          />
          <span> ({randomRating})</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
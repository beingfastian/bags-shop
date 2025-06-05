// 'use client';
// import { useState } from 'react';
// import { AiOutlineHeart } from 'react-icons/ai';
// import Rating from './RatingStars';
// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { Product } from '@/types/product';
// import AddTocart from '@/components/addTocart';
// import { applyDiscountToPrice } from '@/utils/discountUtils';
// import DiscountLabelGreen from '@/components/DiscountLabelGreen';

// interface Props extends Product {
//   className?: string;
//   isPending?: boolean;
// }

// const ProductCard = ({ className, isPending = false, ...data }: Props) => {
//   const [isFavorited, setIsFavorited] = useState(false);
//   const truncateName = (name: string) => {
//     const words = name.split(' ');
//     return words.length > 2 ? `${words.slice(0, 2).join(' ')}...` : name;
//   };

//   return (
//     <motion.div
//       className={`relative flex flex-col w-full overflow-hidden mb-4 cursor-pointer bg-white rounded-lg shadow-lg   hover:shadow-2xl hover:rounded-xl group`}
//       // whileHover={{ scale: 1.05 }} // Scale effect on hover for the entire card
//     >
//       {data?.discount ? <DiscountLabelGreen discount={data?.discount} /> : null}
//       <div
//         className={`relative flex items-center justify-center w-full min-h-[250px] overflow-hidden rounded-t-lg ${className}`}
//       >
//         {isPending ? (
//           <div className="w-[178px] min-h-[250px] rounded-md mb-4 bg-slate-200 animate-pulse" />
//         ) : (
//           <Link href={`/products/${data?.id}`}>
//             <motion.img
//               src={data?.Variants?.[0]?.image}
//               alt={data?.name}
//               className="w-[178px] min-h-[250px] object-cover"
//               whileHover={{ scale: 1.2, zIndex: 10 }} // Move image forward and scale
//               transition={{
//                 duration: 0.3, // Smooth transition
//                 ease: 'easeInOut',
//               }}
//             />
//           </Link>
//         )}

//         {}

//         {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> */}
//         {!isPending ? (
//           <button
//             onClick={() => setIsFavorited(!isFavorited)}
//             className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md transition-transform duration-300 hover:scale-125 hover:bg-red-100"
//           >
//             {isFavorited ? (
//               <AiOutlineHeart className="text-red-500 w-6 h-6" />
//             ) : (
//               <AiOutlineHeart className="text-gray-400 w-6 h-6" />
//             )}
//           </button>
//         ) : null}
//       </div>
//       {isPending ? (
//         <div className="animate-pulse flex space-x-4">
//           <div className="flex-1 space-y-2 py-1">
//             <div className="h-2 bg-slate-200 rounded"></div>
//             <div className="h-2 bg-slate-200 rounded"></div>
//             <div className="h-2 bg-slate-200 rounded"></div>
//           </div>
//           <div className="rounded-full bg-slate-200 h-10 w-10"></div>
//         </div>
//       ) : (
//         <div className="p-4 bg-white rounded-b-lg transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-gray-100 group-hover:to-white">
//           <p className="text-base font-bold text-gray-800">
//             {' '}
//             {truncateName(data?.name)}
//           </p>
//           <div className="flex justify-between items-center mt-2">
//             <Link href={`/products/${data?.id}`}>
//               <div className="flex items-center">
//                 <p className="text-[#DB4444] text-sm font-semibold flex items-center">
//                   <span className="text-sm">Rs. </span>
//                   {
//                     applyDiscountToPrice(data?.price, data?.discount)
//                       ?.priceAfterDiscount
//                   }
//                 </p>
//                 {/* <p className="line-through flex items-center text-xs font-semibold text-gray-600 ml-2">
//               <span className='text-xs'>Rs.{" "}</span>
//                  {data?.price}
//               </p> */}
//                 {data?.discount > 0 && (
//                   <p className="line-through flex items-center text-xs font-semibold text-gray-600 ml-2">
//                     <span className="text-xs">Rs. </span>
//                     {data?.price}
//                   </p>
//                 )}
//               </div>
//             </Link>
//             {data ? <AddTocart data={data} /> : null}
//           </div>
//           <Link href={`/products/${data?.id}`}>
//             <div className="flex items-center mt-2">
//               <Rating rating={0} isEditable={false} />
//               <span className="text-sm ml-2 font-semibold text-gray-500">
//                 ({0})
//               </span>
//             </div>
//           </Link>
//         </div>
//       )}

//       {/* </div> */}
//     </motion.div>
//   );
// };

// export default ProductCard;

// 'use client';
// import { useState } from 'react';
// import { AiOutlineHeart } from 'react-icons/ai';
// import Rating from './RatingStars';
// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { Product } from '@/types/product';
// import AddTocart from '@/components/addTocart';
// import { applyDiscountToPrice } from '@/utils/discountUtils';
// import DiscountLabelGreen from '@/components/DiscountLabelGreen';

// interface Props extends Product {
//   className?: string;
//   isPending?: boolean;
// }

// const ProductCard = ({ className, isPending = false, ...data }: Props) => {
//   const [isFavorited, setIsFavorited] = useState(false);
//   const truncateName = (name: string) => {
//     const words = name.split(' ');
//     return words.length > 2 ? `${words.slice(0, 2).join(' ')}...` : name;
//   };

//   return (
//     <motion.div
//       className={`relative flex flex-col w-full overflow-hidden mb-4 cursor-pointer bg-white rounded-lg shadow-lg   hover:shadow-2xl hover:rounded-xl group`}
//       // whileHover={{ scale: 1.05 }} // Scale effect on hover for the entire card
//     >
//       {data?.discount ? <DiscountLabelGreen discount={data?.discount} /> : null}
//       <div
//         className={`relative flex items-center justify-center w-full min-h-[250px] overflow-hidden rounded-t-lg ${className}`}
//       >
//         {isPending ? (
//           <div className="w-[178px] min-h-[250px] rounded-md mb-4 bg-slate-200 animate-pulse" />
//         ) : (
//           <Link href={`/products/${data?.id}`}>
//             <motion.img
//               src={data?.Variants?.[0]?.image}
//               alt={data?.name}
//               className="w-[178px] min-h-[250px] !object-cover rounded-md"
//               whileHover={{ scale: 1.2, zIndex: 10 }} // Move image forward and scale
//               transition={{
//                 duration: 0.3, // Smooth transition
//                 ease: 'easeInOut',
//               }}
//             />
//           </Link>
//         )}

//         {}

//         {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> */}
//         {!isPending ? (
//           <button
//             onClick={() => setIsFavorited(!isFavorited)}
//             className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md transition-transform duration-300 hover:scale-125 hover:bg-red-100"
//           >
//             {isFavorited ? (
//               <AiOutlineHeart className="text-red-500 w-6 h-6" />
//             ) : (
//               <AiOutlineHeart className="text-gray-400 w-6 h-6" />
//             )}
//           </button>
//         ) : null}
//       </div>
//       {isPending ? (
//         <div className="animate-pulse flex space-x-4">
//           <div className="flex-1 space-y-2 py-1">
//             <div className="h-2 bg-slate-200 rounded"></div>
//             <div className="h-2 bg-slate-200 rounded"></div>
//             <div className="h-2 bg-slate-200 rounded"></div>
//           </div>
//           <div className="rounded-full bg-slate-200 h-10 w-10"></div>
//         </div>
//       ) : (
//         <div className="p-2 bg-white rounded-b-lg transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-gray-100 group-hover:to-white">
//           <p className="text-[#00171F] text-xs xxs:text-[15px] font-OpenSans font-semibold leading-6">
//             {' '}
//             {truncateName(data?.name)}
//           </p>
//           <div className="flex justify-between items-center mt-2">
//             <Link href={`/products/${data?.id}`}>
//               <div className="flex items-center">
//                 <p className="text-[#DB4444] text-xs xxs:text-sm font-semibold flex items-center">
//                   <span className="text-xs xxs:text-sm">Rs. </span>
//                   {
//                     applyDiscountToPrice(data?.price, data?.discount)
//                       ?.priceAfterDiscount
//                   }
//                 </p>
//                 {/* <p className="line-through flex items-center text-xs font-semibold text-gray-600 ml-2">
//               <span className='text-xs'>Rs.{" "}</span>
//                  {data?.price}
//               </p> */}
//                 {data?.discount > 0 && (
//                   <p className="line-through flex items-center text-xs font-semibold text-gray-600 ml-2">
//                     <span className="text-xs">Rs. </span>
//                     {data?.price}
//                   </p>
//                 )}
//               </div>
//             </Link>
//             {data ? <AddTocart data={data} /> : null}
//           </div>
// <Link href={`/products/${data?.id}`}>
//   <div className="flex items-center mt-2">
//     <Rating rating={0} isEditable={false} />
//     <span className="text-sm ml-2 font-semibold text-gray-500">
//       ({0})
//     </span>
//   </div>
// </Link>
//         </div>
//       )}

//       {/* </div> */}
//     </motion.div>
//   );
// };

// export default ProductCard;

'use client';
// import { AiOutlineHeart } from 'react-icons/ai';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product } from '@/types/product';
import AddTocart from '@/components/addTocart';
import DiscountLabelGreen from '@/components/DiscountLabelGreen';
import StarRatings from 'react-star-ratings';
import { applyDiscountToPrice } from '@/utils/discountUtils';

interface Props extends Product {
  className?: string;
  isPending?: boolean;
}

const ProductCard = ({ className, isPending = false, ...data }: Props) => {
  // const [isFavorited, setIsFavorited] = useState(false);
  const truncateName = (name: string) => {
    const words = name?.split(' ');
    return words?.length > 2 ? `${words?.slice(0, 2).join(' ')}...` : name;
  };

  const randomRating = (Math.random() * (5 - 4.4) + 4.4).toFixed(1);
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
              // whileHover={{ scale: 1.2, transition: { duration: 0.4 } }}
              whileHover={{
                rotateY: 20, // Rotate on Y-axis for the 3D effect
                rotateX: 10, // Rotate on X-axis for the 3D effect
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
              {/* {data?.discount > 1 ? (
                <>
                  <h1 className="text-[#00171F] text-xs font-OpenSans font-semibold leading-5">
                    Rs.{' '}
                    <span>
                      {(
                        data.price - (data.price * data.discount) / 100 || 0
                      ).toFixed(2)}
                    </span>
                  </h1>
                  <p className="line-through flex items-center font-semibold text-[#DB4444] text-xs ml-2">
                    <span className="text-xs">Rs. </span>
                    {data?.price}
                  </p>
                </>
              ) : (
                <h1 className="text-[#00171F] text-xs font-OpenSans font-semibold leading-5">
                  Rs. <span>{data?.price}</span>
                </h1>
              )} */}
            <p className="text-sm font-semibold text-gray-800">
  Rs.{' '}
  {applyDiscountToPrice(
    (data?.price ?? 0) || (data?.Variants?.[0]?.price ?? 0),
    data?.discount || data?.Variants[0]?.discount
  )?.priceAfterDiscount.toFixed(2)}
  
  {(data?.discount || data?.Variants[0]?.discount  ) > 0 && (
    <span className="text-sm lg:text-[10px] text-red-500 line-through ml-2">
      Rs. {(data?.price ?? data?.Variants?.[0]?.price ?? 0).toFixed(1)}
    </span>
  )}
</p>


            </div>
          </Link>
          {data ? <AddTocart data={data} /> : null}
        </div>
      )}

      {/* {!isPending && (
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md transition-transform duration-300 hover:scale-125 hover:bg-red-100"
        >
          {isFavorited ? (
            <AiOutlineHeart className="text-red-500 w-6 h-6" />
          ) : (
            <AiOutlineHeart className="text-gray-400 w-6 h-6" />
          )}
        </button>
      )} */}

      <Link href={`/products/${data?.id}`}>
        <div className="flex items-center mt-2 flex justify-between">
          <StarRatings
            rating={parseFloat(randomRating)}
            starRatedColor="#FFAD33"
            // totalStars={maxRating}
            starDimension="17px"
            starSpacing="0.5px"
            // isSelectable={false}
          />
          <span> ({randomRating})</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

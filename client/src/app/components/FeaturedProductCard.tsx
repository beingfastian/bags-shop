

// import Image from 'next/image';
// import React from 'react';
// import Link from 'next/link';
// import AddTocart from '@/components/addTocart';
// import { Product } from '@/types/product';
// import DiscountLabel from '@/components/DiscountLabel';
// import { motion } from 'framer-motion';

// interface Props extends Product {
//   className?: string;
//   isPending?: boolean;
// }

// function FeaturedProductCard({ className, isPending, ...data }: Props) {
//   const truncateName = (name: string) => {
//     const words = name?.split(' ');
//     return words?.length > 2 ? `${words?.slice(0, 2).join(' ')}...` : name;
//   };

//   return (
//     <motion.div
//       className={`relative bg-white w-full rounded-[12px] shadow-cardShadow overflow-hidden p-2 cursor-pointer transform transition-all duration-300 ease-in-out hover:shadow-lg ${className}`}
//     >
//       {data?.discount && !isPending ? (
//         <DiscountLabel discount={data?.discount} />
//       ) : null}

//       <div className=" flex items-center justify-center w-full min-h-[150px] xxs:min-h-[250px] p-0 m-0">
//         {!isPending ? (
//           <Link href={`/featured-store/${data?.id}`}>
//             <motion.div
//               whileHover={{ scale: 1.2, transition: { duration: 0.4 } }}
//             >
//               <Image
//                 src={data?.Variants?.[0]?.image}
//                 alt=""
//                 width={0}
//                 height={0}
//                 className="h-[150px] w-full xxs:w-[250px] xxs:min-h-[250px] object-contain rounded-md mb-4"
//                 unoptimized
//                 quality={100}
//               />
//             </motion.div>
//           </Link>
//         ) : (
//           <div className="w-full xxs:w-[250px] xxs:min-h-[250px] rounded-md mb-4 bg-slate-200 animate-pulse" />
//         )}
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
//         <div className="mt-2 flex items-start justify-between">
//           <Link href={`/featured-store/${data?.id}`}>
//             <h1 className="text-[#00171F] text-xs xxs:text-[15px] font-OpenSans font-semibold leading-6">
//               {truncateName(data?.name)}
//             </h1>
//             <div className="flex items-center gap-10 mt-2">
//               <h1 className="text-[#667479] text-[10px] font-OpenSans italic">
//                 Gene:{' '}
//                 <span className="text-[#667479] text-[10px] font-OpenSans font-semibold leading-[18px]">
//                   {data?.gender}
//                 </span>
//               </h1>
//             </div>
//             <div className="flex items-center mt-1">
//               {/* <h1 className="text-[#00171F] text-xs font-OpenSans font-semibold leading-5">
//               Rs. <span>{data?.price}</span>
//             </h1> */}
//               {data?.discount > 1 ? (
//                 <>
//                   <h1 className="text-[#00171F] text-xs font-OpenSans font-semibold leading-5">
//                     Rs.{' '}
//                     <span>
//                       {((data.price - (data.price * data.discount) / 100)|| 0).toFixed(2)}
//                     </span>
//                   </h1>
//                   <p className="line-through flex items-center text-xs font-semibold text-gray-600 ml-2">
//                     <span className="text-xs">Rs. </span>
//                     {data?.price}
//                   </p>
//                 </>
//               ) : (
//                 <h1 className="text-[#00171F] text-xs font-OpenSans font-semibold leading-5">
//                   Rs. <span>{data?.price}</span>
//                 </h1>
//               )}
//             </div>
//           </Link>
//           {data ? <AddTocart data={data} /> : null}
//         </div>
//       )}
//     </motion.div>
//   );
// }

// export default FeaturedProductCard;





import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import AddTocart from '@/components/addTocart';
import { Product } from '@/types/product';
import DiscountLabel from '@/components/DiscountLabel';
import { motion } from 'framer-motion';
import { applyDiscountToPrice } from '@/utils/discountUtils';

interface Props extends Product {
  className?: string;
  isPending?: boolean;
}

function FeaturedProductCard({ className, isPending, ...data }: Props) {
  const truncateName = (name: string) => {
    const words = name?.split(' ');
    return words?.length > 2 ? `${words?.slice(0, 2).join(' ')}...` : name;
  };

  // Get the first variant
  const firstVariant = data?.Variants?.[0];

  return (
    <motion.div
      className={`relative bg-white w-full rounded-[12px] shadow-cardShadow overflow-hidden p-2 cursor-pointer transform transition-all duration-300 ease-in-out hover:shadow-lg ${className}`}
    >
      {data?.discount && !isPending ? (
        <DiscountLabel discount={data?.discount} />
      ) : null}

      {firstVariant?.discount && !isPending ? (
        <DiscountLabel discount={firstVariant?.discount} />
      ): null}

      <div className="flex items-center justify-center w-full min-h-[150px] xxs:min-h-[250px] p-0 m-0">
        {!isPending ? (
          <Link href={`/featured-store/${data?.id}`}>
            <motion.div whileHover={{ scale: 1.2, transition: { duration: 0.4 } }}>
              <Image
                src={firstVariant?.image}
                alt=""
                width={0}
                height={0}
                className="h-[150px] w-full xxs:w-[250px] xxs:min-h-[250px] object-contain rounded-md mb-4"
                unoptimized
                quality={100}
              />
            </motion.div>
          </Link>
        ) : (
          <div className="w-full xxs:w-[250px] xxs:min-h-[250px] rounded-md mb-4 bg-slate-200 animate-pulse" />
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
          <Link href={`/featured-store/${data?.id}`}>
            <h1 className="text-[#00171F] text-xs xxs:text-[15px] font-OpenSans font-semibold leading-6">
              {truncateName(data?.name)}
            </h1>
            <div className="flex items-center gap-10 mt-2">
              <h1 className="text-[#667479] text-[10px] font-OpenSans italic">
                Gene:{' '}
                <span className="text-[#667479] text-[10px] font-OpenSans font-semibold leading-[18px]">
                  {data?.gender}
                </span>
              </h1>
            </div>
            {/* <div className="flex items-center mt-1">
              {firstVariant?.discount > 0 ? (
                <>
                  <h1 className="text-[#00171F] text-xs font-OpenSans font-semibold leading-5">
                    Rs.{' '}
                    <span>
                      {(
                        firstVariant?.price || 0 -
                        (firstVariant?.price || 0 * firstVariant.discount) / 100
                      ).toFixed(2)}
                    </span>
                  </h1>
                  <p className="line-through flex items-center text-xs font-semibold text-gray-600 ml-2">
                    <span className="text-xs">Rs. </span>
                    {firstVariant?.price}
                  </p>
                </>
              ) : (
                <h1 className="text-[#00171F] text-xs font-OpenSans font-semibold leading-5">
                  Rs. <span>{firstVariant?.price}</span>
                </h1>
              )}
            </div> */}
            {/* <p className="text-sm font-semibold text-gray-800">
  Rs.
  {applyDiscountToPrice(
    firstVariant?.price || 0, 
    firstVariant?.discount || 0
  )?.priceAfterDiscount.toFixed(2)}

  {firstVariant?.discount > 0 && (
    <span className="text-xs text-red-500 line-through ml-2">
      Rs. {firstVariant?.price?.toFixed(2)}
    </span>
  )}
</p> */}
   <p className="text-sm font-semibold text-gray-800">
  Rs.{' '}
  {applyDiscountToPrice(
    (data?.price ?? 0) || (data?.Variants?.[0]?.price ?? 0),
    data?.discount || data?.Variants[0]?.discount
  )?.priceAfterDiscount.toFixed(2)}
  
  {(data?.discount || data?.Variants[0]?.discount  ) > 0 && (
    <span className="text-xs text-red-500 line-through ml-2">
      Rs. {(data?.price ?? data?.Variants?.[0]?.price ?? 0).toFixed(2)}
    </span>
  )}
</p>
          </Link>
          {data ? <AddTocart data={data} /> : null}
        </div>
      )}
    </motion.div>
  );
}

export default FeaturedProductCard;
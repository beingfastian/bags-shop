// /* eslint-disable jsx-a11y/alt-text */ /* eslint-disable @next/next/no-img-element */
// //new
// import { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Swiper as SwiperType } from 'swiper';
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';

// import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
// import { Product } from '@/types/product';
// import Image from 'next/image';
// import { applyDiscountToPrice } from '@/utils/discountUtils';
// import Zoom from 'react-medium-image-zoom'; // Import the zoom component
// import 'react-medium-image-zoom/dist/styles.css';

// interface SliderProps {
//   data: Product | null | undefined;
//   isPending: boolean;
// }

// export default function Slider({ data, isPending }: SliderProps) {
//   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
//   const isVariantOutOfStock = data?.Variants?.every(variant => variant.stock == 0);

//   if (isPending) {
//     return (
//       <div className="slider-container">
//         {/* Main Image Skeleton */}
//         <div className="animate-pulse bg-gray-300 h-[500px] w-full rounded-lg" />
//         {/* Thumbnails Skeleton */}
//         <div className="flex justify-center mt-4 gap-4">
//           {Array(4)
//             .fill(null)
//             .map((_, index) => (
//               <div
//                 key={index}
//                 className="animate-pulse bg-gray-300 h-[100px] w-[80px] rounded-md"
//               />
//             ))}
//         </div>
//       </div>
//     );
//   }
//   if (!data) return null;

//   return (
//     <div className="slider-container flex">
//       {/* Main Swiper */}
//       <div className="w-3/4">
//         <Swiper
//           style={
//             {
//               '--swiper-navigation-color': '#000',
//               '--swiper-pagination-color': '#000',
//             } as React.CSSProperties
//           }
//           spaceBetween={10}
//           navigation={{
//             nextEl: '.swiper-button-next-custom',
//             prevEl: '.swiper-button-prev-custom',
//           }}
//           thumbs={{ swiper: thumbsSwiper }}
//           modules={[FreeMode, Navigation, Thumbs]}
//           className="mySwiper2"
//         >
//           {data?.Variants?.map((item, index) => (
//             <SwiperSlide key={index}>
//               <div className="w-full flex justify-center items-center md:!min-h-[500px] lg:!min-h-[300px] xl:!min-h-[400px]  px-0 sm:px-0">
//                 <Zoom>
//                   <Image
//                     src={item?.image}
//                     alt={data?.name || 'Slide Image'}
//                     className="rounded-lg !object-contain w-full !min-h-[300px] lg:!min-h-[300px] xl:!min-h-[400px]"
//                     height={100}
//                     width={100}
//                     quality={100}
//                   />
//                 </Zoom>
//               </div>
//               {data?.name && (
//                 <div className="w-full flex flex-col py-5 gap-y-2">
//                   <p className="text-xl font-bold">{data?.name}</p>
//                   {data?.description && (
//                     <div className="w-1/2">
//                       <div className="w-full flex justify-between">
//                         <div className="w-1/2"></div>
//                       </div>
//                     </div>
//                   )}

//                   <p className="flex text-lg font-semibold text-gray-800">
//                     <span className="text-lg font-bold text-gray-800">Rs. </span>
//                     {
//                       applyDiscountToPrice(
//                         item?.price || data?.price,
//                         item?.discount || data?.discount
//                       )?.priceAfterDiscount.toFixed(2)}
//                     {item?.discount || data?.discount ? (
//                       <span className="text-sm text-red-500  line-through ml-2 flex items-center ">
//                         <span className="text-base font-bold text-red-500">
//                           Rs.{' '}
//                         </span>{' '}
//                         {(item?.price || data?.price).toFixed(2)}
//                       </span>
//                     ) : null}
//                   </p>

//                   <div className="flex justify-between items-center">
//                     <div className="w-1/2">
//                       {/* {data?.stock && ( */}
//                       <p className="text-sm font-semibold text-gray-800 flex w-full gap-2">
//                         <>
//                           {/* {(item?.stock || data?.stock) * */}
//                           <p className="text-sm font-semibold text-gray-800 flex w-full gap-2">
//                             {Math.floor(Math.random() * 11) + 10} Sold Out
//                           </p>
//                         </>
//                       </p>
//                       {/* )} */}
//                     </div>

//                     <div className="w-1/2 flex justify-end  items-center gap-2">
//                       {isVariantOutOfStock ? (
//                         <div className="flex font-semibold items-center gap-2">
//                           <span> Available: </span>
//                           <p className="text-sm font-semibold text-red-500">
//                             {' '} Out of Stock
//                           </p>
//                         </div>
//                       ) : (
//                         <div className="flex font-semibold items-center gap-2">
//                           <span> Available:</span>
//                           <p className="text-sm font-semibold text-green-500">
//                             {' '} In Stock
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}




              
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Custom Navigation Buttons */}
//         <div className="swiper-button-prev-custom">
//         </div>
//         <div className="swiper-button-next-custom">
//         </div>
//       </div>


//       {/* Thumbnails Swiper */}
//       <div className="w-full sm:pl-4">
//         <Swiper
//           onSwiper={setThumbsSwiper}
//           direction="vertical"
//           spaceBetween={10}
//           slidesPerView={4}
//           freeMode={true}
//           watchSlidesProgress={true}
//           modules={[FreeMode, Navigation, Thumbs]}
//           className="mySwiper"
//         >
//           {data?.Variants.map((image, index) => (
//             <SwiperSlide key={index} className="flex justify-center items-center">
//               <img
//                 src={image.image}
//                 alt={data?.name || 'Thumbnail Image'}
//                 className="w-full h-auto !min-h-[50px] sm:!min-h-[100px] object-contain"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }




// //old
// // import { useState } from 'react';
// // import { Swiper, SwiperSlide } from 'swiper/react';
// // import { Swiper as SwiperType } from 'swiper';
// // import 'swiper/css';
// // import 'swiper/css/free-mode';
// // import 'swiper/css/navigation';
// // import 'swiper/css/thumbs';

// // import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
// // import { Product } from '@/types/product';
// // import Image from 'next/image';
// // import { applyDiscountToPrice } from '@/utils/discountUtils';
// // import Zoom from 'react-medium-image-zoom'; // Import the zoom component
// // import 'react-medium-image-zoom/dist/styles.css';

// // interface SliderProps {
// //   data: Product | null | undefined;
// //   isPending: boolean;
// // }

// // export default function Slider({ data, isPending }: SliderProps) {
// //   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
// //   const isVariantOutOfStock = data?.Variants?.every(variant => variant.stock == 0);

// //   if (isPending) {
// //     return (
// //       <div className="slider-container">
// //         {/* Main Image Skeleton */}
// //         <div className="animate-pulse bg-gray-300 h-[500px] w-full rounded-lg" />
// //         {/* Thumbnails Skeleton */}
// //         <div className="flex justify-center mt-4 gap-4">
// //           {Array(4)
// //             .fill(null)
// //             .map((_, index) => (
// //               <div
// //                 key={index}
// //                 className="animate-pulse bg-gray-300 h-[100px] w-[80px] rounded-md"
// //               />
// //             ))}
// //         </div>
// //       </div>
// //     );
// //   }
// //   if (!data) return null;

// //   return (
// //     <div className="slider-container ">
// //       {/* Main Swiper */}
// //       <Swiper
// //         style={
// //           {
// //             '--swiper-navigation-color': '#000',
// //             '--swiper-pagination-color': '#000',
// //           } as React.CSSProperties
// //         }
// //         spaceBetween={10}
// //         navigation={{
// //           nextEl: '.swiper-button-next-custom',
// //           prevEl: '.swiper-button-prev-custom',
// //         }}
// //         thumbs={{ swiper: thumbsSwiper }}
// //         modules={[FreeMode, Navigation, Thumbs]}
// //         className="mySwiper2"
// //       >
// //         {data?.Variants?.map((item, index) => (
// //           <SwiperSlide key={index}>
// //             <div className="w-full flex justify-center items-center md:!min-h-[500px] lg:!min-h-[300px] xl:!min-h-[400px]  px-0 sm:px-0">
// //               {/* <Image
// //                 src={item?.image}
// //                 alt={data?.name || 'Slide Image'}
// //                 className="rounded-lg !object-contain w-full !min-h-[500px]"
// //                 height={100}
// //                 width={100}
// //                 quality={100}
// //               /> */}
// //               <Zoom>
// //                 <Image
// //                   src={item?.image}
// //                   alt={data?.name || 'Slide Image'}
// //                   className="rounded-lg !object-contain w-full !min-h-[300px] lg:!min-h-[300px] xl:!min-h-[400px]"
// //                   height={100}
// //                   width={100}
// //                   quality={100}
// //                 />
// //               </Zoom>
// //             </div>
// //             {data?.name && (
// //               <div className="w-full flex flex-col py-5 gap-y-2">
// //                 <p className="text-xl font-bold">{data?.name}</p>
// //                 {data?.description && (
// //                   <div className="w-1/2">
// //                     <div className="w-full flex justify-between">
// //                       <div className="w-1/2"></div>
// //                     </div>
// //                   </div>
// //                 )}

// //                 <p className="flex text-lg font-semibold text-gray-800">
// //                   <span className="text-lg font-bold text-gray-800">Rs. </span>
// //                   {
// //                     applyDiscountToPrice(
// //                       item?.price || data?.price,
// //                       item?.discount || data?.discount
// //                     )?.priceAfterDiscount.toFixed(2)}
// //                   {item?.discount || data?.discount ? (
// //                     <span className="text-sm text-red-500  line-through ml-2 flex items-center ">
// //                       <span className="text-base font-bold text-red-500">
// //                         Rs.{' '}
// //                       </span>{' '}
// //                       {(item?.price || data?.price).toFixed(2)}
// //                     </span>
// //                   ) : null}
// //                 </p>

// //                 <div className="flex justify-between items-center">
// //                   <div className="w-1/2">
// //                     {/* {data?.stock && ( */}
// //                     <p className="text-sm font-semibold text-gray-800 flex w-full gap-2">
// //                       <>
// //                         {/* {(item?.stock || data?.stock) * */}
// //                         <p className="text-sm font-semibold text-gray-800 flex w-full gap-2">
// //                           {Math.floor(Math.random() * 11) + 10} Sold Out
// //                         </p>
// //                       </>
// //                     </p>
// //                     {/* )} */}
// //                   </div>

// //                   <div className="w-1/2 flex justify-end  items-center gap-2">
// //                     {isVariantOutOfStock ? (
// //                       <div className="flex font-semibold items-center gap-2">
// //                         <span> Available: </span>
// //                         <p className="text-sm font-semibold text-red-500">
// //                         {' '} Out of Stock
// //                         </p>
// //                       </div>
// //                     ) : (
// //                       <div className="flex font-semibold items-center gap-2">
// //                         <span> Available:</span>
// //                         <p className="text-sm font-semibold text-green-500">
// //                         {' '} In Stock
// //                         </p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>

// //       {/* Custom Navigation Buttons */}
// //       <div className="swiper-button-prev-custom">
// //         <img src="/LeftBUtton.png" alt="Left Button" />
// //       </div>
// //       <div className="swiper-button-next-custom">
// //         <img src="/rightButon.png" alt="Right Button" />
// //       </div>

// //       {/* Thumbnails Swiper */}
// //       <Swiper
// //         onSwiper={setThumbsSwiper}
// //         spaceBetween={10}
// //         slidesPerView={4}
// //         freeMode={true}
// //         watchSlidesProgress={true}
// //         modules={[FreeMode, Navigation, Thumbs]}
// //         className="mySwiper"
// //       >
// //         {data?.Variants.map((image, index) => (
// //           <SwiperSlide key={index} className="flex justify-center items-center">
// //             <img
// //               src={image.image}
// //               alt={data?.name || 'Thumbnail Image'}
// //               className=" w-full h-auto !min-h-[100px] object-cover "
// //             />
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>
// //     </div>
// //   );
// // }

// // /* eslint-disable jsx-a11y/alt-text */ /* eslint-disable @next/next/no-img-element */
// // import { useState } from 'react';
// // import { Swiper, SwiperSlide } from 'swiper/react';
// // import { Swiper as SwiperType } from 'swiper';

// // import 'swiper/css';
// // import 'swiper/css/free-mode';
// // import 'swiper/css/navigation';
// // import 'swiper/css/thumbs';

// // import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
// // import { Product } from '@/types/product';

// // // Define TypeScript interfaces

// // interface SliderProps {
// //   data: Product | null | undefined;
// // }

// // export default function Slider({ data }: SliderProps) {
// //   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

// //   if (!data) return null;

// //   return (
// //     <div className="slider-container ">
// //       {/* Main Swiper */}
// //       <Swiper
// //         style={
// //           {
// //             '--swiper-navigation-color': '#000',
// //             '--swiper-pagination-color': '#000',
// //           } as React.CSSProperties
// //         }
// //         spaceBetween={10}
// //         navigation={{
// //           nextEl: '.swiper-button-next-custom',
// //           prevEl: '.swiper-button-prev-custom',
// //         }}
// //         thumbs={{ swiper: thumbsSwiper }}
// //         modules={[FreeMode, Navigation, Thumbs]}
// //         className="mySwiper2"
// //       >
// //         {data?.Variants?.map((item, index) => (
// //           <SwiperSlide key={index}>
// //             <div className="flex justify-center">
// //               <img
// //                 src={item?.image}
// //                 alt={data?.name || 'Slide Image'}
// //                 className="rounded-lg"
// //               />
// //             </div>
// //             {data?.name && (
// //               <div className="w-full flex flex-col py-5 gap-y-2">
// //                 <p className="text-xl font-bold">{data?.name}</p>
// //                 {data?.description && (
// //                   <div className="w-1/2">
// //                     <div className="w-full flex justify-between">
// //                       <div className="w-1/2">
// //                         {/* <p className="text-[#667479] text-[8px] sm:text-[10px]">
// //                           Gene:{' '}
// //                           <span className="text-[#667479] font-bold text-[8px] sm:text-[10px]">
// //                             {data.details.gene}
// //                           </span>
// //                         </p> */}
// //                       </div>
// //                       {/* <div className="w-1/2">
// //                         <p className="text-[#667479] text-[8px] sm:text-[10px]">
// //                           Range:{' '}
// //                           <span className="text-[#667479] font-bold text-[8px] sm:text-[10px]">
// //                             {image.details.range}
// //                           </span>
// //                         </p>
// //                       </div> */}
// //                     </div>
// //                   </div>
// //                 )}
// //                 {data?.price && (
// //                   <p className="font-bold leading-5 decoration-slice">
// //                     {item?.price || data?.price}
// //                   </p>
// //                 )}
// //               </div>
// //             )}
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>

// //       {/* Custom Navigation Buttons */}
// //       <div className="swiper-button-prev-custom">
// //         <img src="/LeftButton.png" alt="Left Button" />
// //       </div>
// //       <div className="swiper-button-next-custom">
// //         <img src="/rightButon.png" alt="Right Button" />
// //       </div>

// //       {/* Thumbnails Swiper */}
//       // <Swiper
//       //   onSwiper={setThumbsSwiper}
//       //   spaceBetween={10}
//       //   slidesPerView={4}
//       //   freeMode={true}
//       //   watchSlidesProgress={true}
//       //   modules={[FreeMode, Navigation, Thumbs]}
//       //   className="mySwiper"
//       // >
//       //   {data?.Variants.map((image, index) => (
//       //     <SwiperSlide key={index}>
//       //       <img src={image.image} alt={data?.name || 'Thumbnail Image'} />
//       //     </SwiperSlide>
//       //   ))}
//       // </Swiper>
// //     </div>
// //   );
// // }




import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Product } from '@/types/product';
import Image from 'next/image';
import { applyDiscountToPrice } from '@/utils/discountUtils';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface SliderProps {
  data: Product | null | undefined;
  isPending: boolean;
}

export default function Slider({ data, isPending }: SliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const isVariantOutOfStock = data?.Variants?.every(variant => variant.stock === 0);

  // Function to get all images for the selected variant
  console.log("set",setThumbsSwiper)
  const getVariantImages = (variant: any) => {
    if (!variant) return [];
    const images = [variant.image];
    if (variant.images && Array.isArray(variant.images)) {
      images.push(...variant.images);
    }
    return images;
  };

  // Handle variant selection
  const handleVariantSelect = (index: number) => {
    setSelectedVariant(index);
    // Reset main swiper to first slide
    if (mainSwiper) {
      mainSwiper.slideTo(0);
    }
  };

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    if (mainSwiper) {
      mainSwiper.slideTo(index);
    }
  };

  if (isPending) {
    return (
      <div className="slider-container">
        {/* Main Image Skeleton */}
        <div className="animate-pulse bg-gray-300 h-[500px] w-full rounded-lg" />
        {/* Thumbnails Skeleton */}
        <div className="flex justify-center mt-4 gap-4">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-300 h-[100px] w-[80px] rounded-md"
              />
            ))}
        </div>
      </div>
    );
  }
  
  if (!data) return null;

  const currentVariant = data.Variants[selectedVariant];
  const variantImages = getVariantImages(currentVariant);

  return (
    <div className="slider-container flex flex-col md:flex-row">
      {/* Left Side - Main Image */}
      <div className="w-full  relative md:w-3/4 md:pr-4">
        <Swiper
          style={
            {
              '--swiper-navigation-color': '#000',
              '--swiper-pagination-color': '#000',
            } as React.CSSProperties
          }
          spaceBetween={10}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
          onSwiper={setMainSwiper}
        >
          {variantImages.map((imageUrl, index) => (
            <SwiperSlide key={`main-${selectedVariant}-${index}`}>
              <div className="w-full flex justify-center items-center md:!max-h-[300px] lg:!min-h-[300px] xl:!min-h-[400px]   px-0 sm:px-0">
                <Zoom>
                  <Image
                    src={imageUrl}
                    alt={`${data?.name || 'Product'} - View ${index + 1}`}
                    className="rounded-lg !object-contain w-full !min-h-[300px] lg:!max-h-[300px] xl:!max-h-[400px]"
                    height={100}
                    width={100}
                    quality={100}
                  />
                </Zoom>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-4 ">


        <div className="w-full flex flex-col py-5 gap-y-2">
          <p className="text-xl font-bold">{data?.name}</p>
          {data?.description && (
            <div className="w-full md:w-1/2">
              <div className="w-full flex justify-between">
                <div className="w-1/2"></div>
              </div>
            </div>
          )}

          <p className="flex text-lg font-semibold text-gray-800">
            <span className="text-lg font-bold text-gray-800">Rs. </span>
            {
              applyDiscountToPrice(
                currentVariant?.price || data?.price,
                currentVariant?.discount || data?.discount
              )?.priceAfterDiscount.toFixed(2)}
            {currentVariant?.discount || data?.discount ? (
              <span className="text-sm text-red-500 line-through ml-2 flex items-center">
                <span className="text-base font-bold text-red-500">
                  Rs.{' '}
                </span>{' '}
                {(currentVariant?.price || data?.price).toFixed(2)}
              </span>
            ) : null}
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="w-full sm:w-1/2">
              <p className="text-sm font-semibold text-gray-800">
                {Math.floor(Math.random() * 11) + 10} Sold Out
              </p>
            </div>

            <div className="w-full sm:w-1/2 flex justify-start sm:justify-end items-center gap-2 mt-2 sm:mt-0">
              {isVariantOutOfStock ? (
                <div className="flex font-semibold items-center gap-2">
                  <span> Available: </span>
                  <p className="text-sm font-semibold text-red-500">
                    {' '} Out of Stock
                  </p>
                </div>
              ) : (
                <div className="flex font-semibold items-center gap-2">
                  <span> Available:</span>
                  <p className="text-sm font-semibold text-green-500">
                    {' '} In Stock
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
          <div className="flex flex-wrap gap-2">
            {variantImages.map((imageUrl, index) => (
              <div 
                key={`thumb-${selectedVariant}-${index}`} 
                className="border border-gray-300 rounded-lg p-1 cursor-pointer hover:border-blue-500 transition-all"
                onClick={() => handleThumbnailClick(index)}
              >
                <img 
                  src={imageUrl} 
                  alt={`${data.name} - View ${index + 1}`} 
                  className="w-[60px] h-[60px] object-cover rounded-lg" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
      
      </div>

      {/* Right Side - Variant Thumbnails */}
      <div className="w-full md:w-1/4 mt-4 md:mt-0  overflow-x-auto">
        <p className="text-sm font-semibold mb-2 text-gray-700">Product Variants:</p>
        <div className="flex flex-row md:flex-col gap-2 md:w-[100px] md:h-[100px] overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
          {data.Variants.map((variant, index) => (
            <div 
              key={index} 
              className={`border-2 rounded-lg p-1 cursor-pointer flex-shrink-0 transition-all ${
                selectedVariant === index ? 'border-blue-500 shadow-sm' : 'border-gray-200 hover:border-gray-400'
              }`}
              onClick={() => handleVariantSelect(index)}
            >
              <img
                src={variant.image}
                alt={`${data?.name} - Variant ${index + 1}`}
                className="w-16 h-16 md:w-full md:h-auto object-contain rounded-lg"
              />
              {variant.color && (
                <p className="text-xs text-center mt-1 text-gray-700">{variant.color}</p>
              )}
            </div>
          ))}
        </div>

     
      
      </div>
    </div>
  );
}

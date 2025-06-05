// import { useState } from 'react';

// const ImageSlider = () => {
//   const images = [
//     { id: 1, src: '/heroimage.png', alt: 'Image 1' },
//     { id: 2, src: '/Frame 8.png', alt: 'Image 2' },
//     { id: 3, src: '/heroimage.png', alt: 'Image 3' },
//     { id: 4, src: '/heroimage.png', alt: 'Image 4' },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleThumbnailClick = (index: number) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <div className="flex flex-col items-center">
//       {/* Main Image */}
//       <div className="relative w-full max-w-md overflow-hidden">
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {images.map((image) => (
//             <img
//               key={image.id}
//               src={image.src}
//               alt={image.alt}
//               className="w-full object-cover"
//             />
//           ))}
//         </div>
//       </div>

//       {/* Thumbnails */}
//       <div className="bg-[#FFFFFF70] flex gap-2 rounded-lg p-3">
//         {images.map((image, index) => (
//           <button
//             key={image.id}
//             onClick={() => handleThumbnailClick(index)}
//             className={`border-2 rounded ${
//               currentIndex === index ? 'border-blue-500' : 'border-transparent'
//             }`}
//           >
//             <img
//               src={image.src}
//               alt={image.alt}
//               className="w-16 h-16 object-cover rounded cursor-pointer"
//             />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageSlider;

// import { useState } from 'react';

// interface Image {
//   id: number;
//   src: string;
//   alt: string;
// }

// interface ImageSliderProps {
//   images: Image[];
// }

// const ImageSlider = ({ images }: ImageSliderProps) => {
//   const [currentIndex, setCurrentIndex] = useState(0); // Default the index to 0, so the first image is shown initially

//   const handleThumbnailClick = (index: number) => {
//     setCurrentIndex(0);
//   };

//   return (
//     <div className="flex flex-col items-center">
//       {/* Main Image */}
//       <div className="relative w-full max-w-md overflow-hidden">
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{
//             transform: currentIndex == 0 ? `translateX(-${currentIndex * 100}%)` : 'none',
//           }}
//         >
//           {images.map((image) => (
//             <img
//               key={image.id}
//               src={image.src}
//               alt={image.alt}
//               className="w-full object-contain"
//             />
//           ))}
//         </div>
//       </div>

//       {/* Thumbnails */}
//       <div className="bg-[#FFFFFF70] flex gap-2 rounded-lg p-3">
//         {images.map((image, index) => (
//           <button
//             key={image.id}
//             onClick={() => handleThumbnailClick(index)}
// className={`border-2 rounded ${
//   currentIndex === index ? 'border-blue-500' : 'border-transparent'
// }`}
//           >
//             <img
//               src={image.src}
//               alt={image.alt}
//               className="w-16 h-16 object-cover rounded cursor-pointer"
//             />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageSlider;

// import { useState, useRef } from 'react';
// import { Autoplay } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';

// interface Image {
//   id: number; // Add id to the Image interface
//   src: string;
//   alt: string;
// }

// interface ImageSliderProps {
//   images: Image[]; // Images will include id, src, and alt properties
// }

// const ImageSlider = ({ images }: ImageSliderProps) => {
//   const [currentIndex, setCurrentIndex] = useState(0); // Track the currently selected thumbnail
//   const swiperRef = useRef<any>(null); // Create a reference to the Swiper instance

//   const handleThumbnailClick = (index: number) => {
//     setCurrentIndex(index); // Update current index when a thumbnail is clicked
//     swiperRef.current.swiper.slideTo(index); // Move to the corresponding slide
//   };

//   return (
//     <div className="flex flex-col items-center w-full">
//       {/* Main Image Slider using Swiper */}
//       <div className="relative w-full max-w-md overflow-hidden">
//         <Swiper
//           spaceBetween={10} // Space between slides
//           slidesPerView={1} // Show 1 slide at a time
//           loop // Enable infinite looping
//           effect="slide" // Slide effect for transitions
//           className="w-full"
//           initialSlide={currentIndex} // Start at the currentIndex
//           onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)} // Update index when slide changes
//           ref={swiperRef} // Attach the swiper instance reference
//           autoplay={{
//             delay: 2000, // Auto-slide every 2 seconds
//             disableOnInteraction: true, // Keep autoplay active when interacting
//           }}
//           modules={[Autoplay]}
//         >
//           {images.map((image) => (
//             <SwiperSlide key={image.id}> {/* Use image.id as the key */}
//               <div className="w-full flex justify-center items-center  relative rounded-md"> {/* Set fixed height */}
//                 <img
//                   src={image.src}
//                   alt={image.alt}
//                   className="h-96  object-contain !rounded-lg " // Ensures consistent sizing
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* Thumbnails for navigation */}
//       <div className="bg-[#FFFFFF70] flex gap-2 rounded-lg p-3 z-30 mt-3">
//         {images.map((image, index) => (
//           <button
//             key={image.id} // Use image.id as the key
//             onClick={() => handleThumbnailClick(index)} // Update current index on thumbnail click
//             className={`border-2  rounded ${currentIndex === index ? 'border-primary' : 'border-white'}`}
//           >
//             <img
//               src={image.src}
//               alt={image.alt}
//               className="w-16 h-16 object-cover rounded cursor-pointer"
//             />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageSlider;

import { useState, useRef } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Image {
  id: number;
  src: string;
  alt: string;
}

interface ImageSliderProps {
  images: Image[];
  isPending: boolean; // Add isPending to indicate loading state
}

const ImageSlider = ({ images, isPending }: ImageSliderProps) => {
  console.log(isPending, 'isPendingisPending');

  const [currentIndex, setCurrentIndex] = useState(0); // Track the currently selected thumbnail
  const swiperRef = useRef<any>(null); // Create a reference to the Swiper instance

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index); // Update current index when a thumbnail is clicked
    swiperRef.current.swiper.slideTo(index); // Move to the corresponding slide
  };

  // Skeleton loader for the ImageSlider
  const renderSkeleton = () => (
    <div className="w-full flex justify-center items-center relative rounded-md bg-gray-200 animate-pulse">
      <div className="w-full h-96 bg-gray-300 rounded-md"></div>
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full">
      {/* Main Image Slider using Swiper */}
      <div className="relative w-full max-w-md overflow-hidden">
        <Swiper
          spaceBetween={10} // Space between slides
          slidesPerView={1} // Show 1 slide at a time
          loop // Enable infinite looping
          effect="slide" // Slide effect for transitions
          className="w-full"
          initialSlide={currentIndex} // Start at the currentIndex
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)} // Update index when slide changes
          ref={swiperRef} // Attach the swiper instance reference
          autoplay={{
            delay: 2000, // Auto-slide every 2 seconds
            disableOnInteraction: true, // Keep autoplay active when interacting
          }}
          modules={[Autoplay]}
        >
          {isPending
            ? Array.from({ length: 5 }).map((_, index) => (
                <SwiperSlide key={index}>{renderSkeleton()}</SwiperSlide>
              ))
            : images.map((image) => (
                <SwiperSlide key={image.id}>
                  {' '}
                  {/* Use image.id as the key */}
                  <div className="w-full flex justify-center items-center relative rounded-md">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-96 object-contain !rounded-lg"
                    />
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>

      {/* Thumbnails for navigation */}
      <div className="bg-[#FFFFFF70] flex gap-2 rounded-lg p-3 z-30 mt-3">
        {isPending
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="w-16 h-16 bg-gray-300 rounded animate-pulse"
              />
            ))
          : images.map((image, index) => (
              <button
                key={image.id} // Use image.id as the key
                onClick={() => handleThumbnailClick(index)} // Update current index on thumbnail click
                className={`border-2 rounded ${currentIndex === index ? 'border-primary' : 'border-white'}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-16 h-16 object-cover rounded cursor-pointer"
                />
              </button>
            ))}
      </div>
    </div>
  );
};

export default ImageSlider;

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import ServicesBannar from './ServicesBannar';
import TrustSection from './TrustSection';
import Image from 'next/image';
import { NavBar } from './NavBar';
import { useRouter } from 'next/navigation';
import ImageSlider from './Slider';
import { fetchHeroImages } from '@/services/HeroSectionUpload';

function HeroSection() {
  const router = useRouter();

  const [images, setImages] = useState<
    { id: number; src: string; alt: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await fetchHeroImages();
        const heroImages = response.filter(
          (image: { type: string }) => image.type === "hero"
        );
        // const formattedImages = response.map(
        //   (image: { id: number; image: string; name: string }) => ({
        //     id: image.id,
        //     src: image.image,
        //     alt: image.name,
        //   })
        // );
        const formattedImages = heroImages.map(
          (image: { id: number; image: string; name: string }) => ({
            id: image.id,
            src: image.image,
            alt: image.name,
          })
        );
  
        
        setImages(formattedImages);
      } catch (error) {
        console.error('Failed to fetch hero images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, []);

  const onClick = () => {
    router?.push('/products');
  };
  return (
    <div className="w-full flex flex-col">
      <div className="relative w-full flex flex-col justify-center  bg-gradient-to-r from-[#b9e1ef] to-[#78c3df]">
        <div className="">
          <NavBar />
        </div>
        <div className="w-5/6 mx-auto flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/2 flex flex-col md:gap-y-5 pt-10 md:pb-20">
            <div className="w-full flex flex-col mt-5">
              <div className="w-10/12">
                <ServicesBannar />
              </div>
            </div>
            <p className="w-full text-lg md:text-xl lg:text-3xl xl:text-4xl 2xl:text-[60px] font-light sm:leading-[70px] tracking-[-0.03em] text-left font-OpenSans">
              Uncompromising Quality, Unmatched Style Of Bag & Stationery
            </p>
            <p className="text-[#3734A9] font-extrabold text-lg md:text-xl lg:text-3xl xl:text-4xl 2xl:text-[70px]">
              Been easier!
            </p>
            <p className="text-[#5B5B5B] text-xs sm:text-sm md:text-base lg:text-lg">
              {/* There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form. */}
              Your one-stop shop for premium Bags and Stationery! Discover
              unmatched quality, stylish designs, and essential Stationery to
              elevate your daily life. Perfect for work, school, or leisure.
            </p>
            <div className="w-full" onClick={onClick}>
              <button className="bg-[#3734A9] rounded-[8px] py-2 my-2 px-2 md:px-6 text-[#FFFFFF] text-xs sm:text-sm md:text-base xl:text-lg font-semibold">
                Shop Collection
              </button>
            </div>
            <p className="text-[#5B5B5B] text-xs sm:text-sm md:text-base lg:text-lg">
              Join Maaoz Official, Pakistan fastest-growing brand with over
              10,000+ happy customers. Discover quality Bags and Stationery
              crafted for quality, style, and affordability.
            </p>
          </div>

          <div className="w-full md:w-1/2 md:pt-10 pb-20">
            <ImageSlider images={images} isPending={isLoading} />
          </div>
        </div>

        <Image
          src="Element.png"
          alt=""
          width={0}
          height={0}
          className="w-20 absolute -bottom-32 right-0"
          unoptimized
        />

        <img
          src="/Vector 4.png"
          alt="Banner"
          className="absolute bottom-[10%] right-[40%] w-[180px] h-[109.28px] -rotate-12 hidden md:block"
        />
      </div>

      <div className="w-full -mt-5 z-10">
        <div className="w-full flex justify-center ">
          <TrustSection />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

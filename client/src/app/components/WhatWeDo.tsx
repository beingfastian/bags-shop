"use client"
import Image from 'next/image';

const WhatWeDo = () => {
  const features = [
    {
      title: 'Use Certified Fabric',
      description:
        'Crafted with certified fabrics, our Bags and Stationery combine quality, style, and sustainability. Perfect for your daily needs, designed to last.',
      icon: '/shopingCart.png',
      bgColor: 'bg-[#FFF3E8]',
    },
    {
      title: 'Smart & High Quality Zippers',
      description:
        'Equipped with smart and high-quality zippers, our Bags ensure durability, smooth functionality, and a touch of elegance in every detail.',
      icon: '/key.png',
      bgColor: 'bg-[#F1F0FF]',
    },
    {
      title: 'Easy to Purchase',
      description:
        'Easy to purchase, our Bags and Stationery are just a click away—offering convenience, quality, and style at your fingertips.',
      icon: '/ant.png',
      bgColor: 'bg-[#E2F3FF]',
    },
    {
      title: 'Get your wears delivered to you',
      description:
        'Get your Bags and Stationery delivered right to your doorstep—convenience and quality, just for you!',
      icon: '/car.png',
      bgColor: 'bg-[#EDFFE7]',
    },
  ];

  return (
    <div className="w-full flex box-border relative py-12  overflow-x-hidden mx-auto">
      <div className=" hidden sm:block w-[85%] bg-[#fbfbfb] rounded-md mx-auto relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10">
          <h2 className="text-2xl md:text-5xl font-bold font-OpenSans leading-tight text-[#000000] text-center mb-6">
            What we do
          </h2>
          <div className=" gap-6  relative">
            <hr className=" w-[85%] left-1/2 -translate-x-1/2 absolute top-1/2 border-t border-[#D2D2D2]" />
            <div className="bg-white !z-20 rounded-xl shadow-lg p-5 grid grid-cols-1 lg:grid-cols-2">
              {features.map((feature, index) => (
                <div key={index} className="">
                  <div className="flex my-6 items-center md:flex-row flex-col justify-center gap-4">
                    <h3 className="text-lg block md:hidden md:text-[25px] leading-6 font-semibold font-OpenSans">
                      {feature.title}
                    </h3>
                    <div
                      className={`w-[60px] h-[60px] sm:w-[70px] aspect-square flex items-center justify-center rounded-[20px] ${feature.bgColor}`}
                    >
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={35}
                        height={35}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg md:block hidden md:text-[25px] leading-6 font-semibold font-OpenSans">
                        {feature.title}
                      </h3>
                      <p className="text-sm font-normal font-OpenSans leading-5 text-[#797979]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#3734A3] w-1/4  absolute -top-5 -bottom-5 lg:bottom-auto -right-10 lg:-right-44 -z-10 rounded-e-lg lg:w-[300px] lg:rotate-[45deg] lg:rounded-[50px] lg:h-[250px] " />
            <div className="bg-[#3734A3] w-1/4  absolute -top-5 -bottom-5 lg:-bottom-10 lg:top-auto -left-10 lg:-left-[160px] -z-10 rounded-s-lg lg:w-[300px] lg:rotate-[45deg] lg:rounded-[50px] lg:h-[250px]" />
          </div>
        </div>
      </div>
      <div className="block sm:hidden w-full flex ">
        <div className="w-full flex justify-center">
          <div className="w-[85%] xs:w-[40%] flex flex-col items-center justify-center rounded-md">
            <h1 className="text-4xl font-bold font-OpenSans leading-tight text-[#3734A3] text-center mb-6">
              What we do
            </h1>
            <div className="xxs:w-[420px] flex flex-col gap-y-6 ">
              <div className="w-full border border-[#3734A3] p-4 rounded-md shadow-cardShadow">
                <div
                  className={`w-[60px] h-[60px] sm:w-[70px] aspect-square flex items-center justify-center rounded-[20px] bg-[#FFF3E8]`}
                >
                  <Image
                    src="/shopingCart.png"
                    alt="icons"
                    width={35}
                    height={35}
                  />
                </div>
                <div>
                  <h3 className="text-2xl py-2 md:text-[25px] leading-6 font-bold font-OpenSans text-black">
                    Use Certified Fabric
                  </h3>
                  <p className="text-base font-normal font-OpenSans leading-5 text-[#797979]">
                    Crafted with certified fabrics, our Bags and Stationery
                    combine quality, style, and sustainability. Perfect for your
                    daily needs, designed to last.
                  </p>
                </div>
              </div>

              <div className="w-full border border-[#3734A3] p-4 rounded-md shadow-cardShadow">
                <div
                  className={`w-[60px] h-[60px] sm:w-[70px] aspect-square flex items-center justify-center rounded-[20px] bg-[#F1F0FF]`}
                >
                  <Image src="/key.png" alt="icons" width={35} height={35} />
                </div>
                <div>
                  <h3 className="text-2xl py-2 md:text-[25px] leading-6 font-bold font-OpenSans text-black">
                    Smart & High Quality Zippers
                  </h3>
                  <p className="text-base font-normal font-OpenSans leading-5 text-[#797979]">
                    Equipped with smart and high-quality zippers, our Bags
                    ensure durability, smooth functionality, and a touch of
                    elegance in every detail.
                  </p>
                </div>
              </div>

              <div className="w-full border border-[#3734A3] p-4 rounded-md shadow-cardShadow">
                <div
                  className={`w-[60px] h-[60px] sm:w-[70px] aspect-square flex items-center justify-center rounded-[20px] bg-[#E2F3FF]`}
                >
                  <Image src="/ant.png" alt="icons" width={35} height={35} />
                </div>
                <div>
                  <h3 className="text-2xl py-2  md:text-[25px] leading-6 font-bold font-OpenSans text-black">
                    Easy to Purchase
                  </h3>
                  <p className="text-base font-normal font-OpenSans leading-5 text-[#797979]">
                    Easy to purchase, our Bags and Stationery are just a click
                    away—offering convenience, quality, and style at your
                    fingertips.
                  </p>
                </div>
              </div>

              <div className="w-full border border-[#3734A3] p-4 rounded-md shadow-cardShadow">
                <div
                  className={`w-[60px] h-[60px] sm:w-[70px] aspect-square flex items-center justify-center rounded-[20px] bg-[#EDFFE7]`}
                >
                  <Image src="/car.png" alt="icons" width={35} height={35} />
                </div>
                <div>
                  <h3 className="text-2xl py-2  md:text-[25px] leading-6 font-bold font-OpenSans text-black">
                    Get your wears delivered to you
                  </h3>
                  <p className="text-base font-normal font-OpenSans leading-5 text-[#797979]">
                    Get your Bags and Stationery delivered right to your
                    doorstep—convenience and quality, just for you!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;

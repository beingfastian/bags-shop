/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { SubArrow } from './Icons';
// import Backpacks from './BackPacks';

function FeaturedHero() {
  // State to hold the countdown values
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  // Countdown function to calculate the time difference
  const calculateTimeLeft = () => {
    const targetDate = new Date('2024-12-31T23:59:59'); // Set your target date here
    const currentTime = new Date();
    const difference = (targetDate as any) - (currentTime as any);

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setCountdown({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    }
  };

  // useEffect to update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="bg-[#3734A9] w-full rounded-[10px] relative overflow-hidden flex items-center  flex-wrap lg:max-h-[350px]">
      <div className="relative w-full lg:w-1/2 flex justify-center -z-0">
        <Image
          src="/Rectangle 1.png"
          alt=""
          width={0}
          height={0}
          className="w-full absolute -bottom-28 -left-10 z-10 hidden lg:block"
          unoptimized
        />
        <Image
          src="/Mask group.png"
          alt=""
          width={0}
          height={0}
          className="w-1/2 md:w-[40%] lg:ml-2 relative z-10"
          unoptimized
        />
      </div>
      <div className="w-full lg:w-[50%]  relative">
        <div className="w-full bg-[#EBEBFF] aspect-[553/300] min-h-[320px] sm:aspect-[553/300] md:aspect-[553/250] lg:aspect-[553/505] lg:rounded-[80px] lg:rotate-[37deg] mt-2 lg:mt-0" />
        <Image
          src="/Vector 333.png"
          alt=""
          width={0}
          height={0}
          className="w-1/2 top-32 -left-44 absolute lg:block hidden"
          unoptimized
        />
        <div className="absolute inset-0 h-full flex flex-col items-center py-4 px-2">
          <h1 className="text-[#3734A9] text-lg font-ProtestRiot lg:-ml-10">
            50% OFF
          </h1>
          <h1 className="text-[#3734A9] text-[20px] md:text-[40px] font-OpenSans lg:-ml-5">
            Trendy Styles..
          </h1>
          <h1 className="text-[#3734A9] text-lg lg:-ml-3">
            Thousands styles More!
          </h1>
          <p className="text-[#3734A9] text-xs text-center md:text-end font-OpenSans md:w-[500px] lg:w-[380px] lg:-ml-5">
            Having a pet means you have more joy, a new friend, a happy person
            who will always be with you to have fun. We have 200+ different pets
            that can meet your needs!
          </p>
          <div className="flex items-center gap-3 mt-5">
            <span className="w-14 aspect-square rounded-full bg-white flex flex-col items-center justify-center">
              <h1 className="text-[#3734A9] text-sm font-OpenSans font-bold leading-5">
                {countdown.days}
              </h1>
              <h1 className="text-[#3734A9] text-[8px] font-OpenSans font-bold leading-4">
                Days
              </h1>
            </span>
            <span className="w-14 aspect-square rounded-full bg-white flex flex-col items-center justify-center">
              <h1 className="text-[#3734A9] text-sm font-OpenSans font-bold leading-5">
                {countdown.hours}
              </h1>
              <h1 className="text-[#3734A9] text-[8px] font-OpenSans font-bold leading-4">
                Hours
              </h1>
            </span>
            <span className="w-14 aspect-square rounded-full bg-white flex flex-col items-center justify-center">
              <h1 className="text-[#3734A9] text-sm font-OpenSans font-bold leading-5">
                {countdown.minutes}
              </h1>
              <h1 className="text-[#3734A9] text-[8px] font-OpenSans font-bold leading-4">
                Minutes
              </h1>
            </span>
            <span className="w-14 aspect-square rounded-full bg-white flex flex-col items-center justify-center">
              <h1 className="text-[#3734A9] text-sm font-OpenSans font-bold leading-5">
                {countdown.seconds}
              </h1>
              <h1 className="text-[#3734A9] text-[8px] font-OpenSans font-bold leading-4">
                Seconds
              </h1>
            </span>
          </div>
          <div className="mt-8">
            <button className="bg-[#3734A9] text-[#FFFFFF] font-OpenSans font-bold text-lg px-6 py-1 rounded-[10px] flex items-center gap-3">
              <h1 className="text-white text-[10px] font-OpenSans">
                Shop collections
              </h1>
              <SubArrow />
            </button>
          </div>
        </div>
        {/* <Backpacks/> */}
      </div>
    </div>
  );
}

export default FeaturedHero;

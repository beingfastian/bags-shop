import React from 'react';
import TickIcon from './Icons';

function ServicesBannar() {
  return (
    <div className="w-full  bg-white/40 flex justify-center rounded-2xl">
      <div className="w-full  flex flex-col lg:flex-row lg:items-center lg:justify-center py-2 lg:py-0 h-auto lg:h-[70px] gap-y-5 lg:gap-y-0">
        <div className="w-full lg:w-1/3 flex items-center justify-start sm:justify-center px-2 sm:px-0 gap-3">
          <div className="w-[18px] h-[18px] bg-[#3734A9] rounded-full flex items-center justify-center">
            <TickIcon />
          </div>
          <div className="text-[#757095] text-xs 2xl:text-base">
            Free Register
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex items-center justify-start sm:justify-center px-2 sm:px-0 gap-3">
          <div className="w-[18px] h-[18px] bg-[#3734A9] rounded-full flex items-center justify-center">
            <TickIcon />
          </div>
          <div className="text-[#757095]  text-xs 2xl:text-base">
            Great Service
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex items-center justify-start sm:justify-center px-2 sm:px-0 gap-3">
          <div className="w-[18px] h-[18px] bg-[#3734A9] rounded-full flex items-center justify-center">
            <TickIcon />
          </div>
          <div className="text-[#757095]  text-xs 2xl:text-base">
            Easy payment
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesBannar;

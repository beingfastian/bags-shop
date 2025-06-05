import React from 'react';

interface Props {
  discount: number | string;
}

const DiscountLabelGreen = ({ discount }: Props) => {
  return (
    <div className="absolute !z-[9] top-0 left-0 h-6 w-16">
      <div
        className="absolute transform -rotate-45 bg-green-500 text-center text-white font-semibold 
        top-[12px] left-[-45px] text-xs xxs:text-base w-[140px] xxs:w-[140px] h-[25px] flex items-center justify-center "
      >
        {discount}% off
      </div>
    </div>
  );
};

export default DiscountLabelGreen;

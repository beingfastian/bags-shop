import React from 'react';

interface Props {
  discount: number | string;
}
const DiscountLabel = ({ discount }: Props) => {
  return (
    <div className="absolute z-10 right-0 top-0 h-6 w-16">
      <div className="absolute text-xs xxs:text-base transform rotate-45 bg-red-600 text-center text-white font-semibold right-[-35px] top-[20px] w-[100px] xxs:w-[140px]">
        {discount}% off
      </div>
    </div>
  );
};

export default DiscountLabel;

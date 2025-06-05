import React, { useState } from 'react';
import { ArrowDown } from './Icons';

interface Props {
  className?: string;
}

function BagDetails({ className = '' }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Payment Confirm');

  const options = ['Payment Confirmed', 'Place Order', 'Delivered Order'];

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };
  const bagDetails = [
    {
      title: 'Store Number',
      subtitle: '56hp90',
    },
    {
      title: 'Gender',
      subtitle: 'Female',
    },
    {
      title: 'Age',
      subtitle: 'Ranges',
    },
    {
      title: 'Size',
      subtitle: 'Medium adult',
    },
    {
      title: 'Color',
      subtitle: 'Brown and yellow',
    },
    {
      title: 'Measurment request',
      subtitle: 'Yes',
    },
    {
      title: 'Published Date',
      subtitle: '16/11/2022',
    },
    {
      title: 'Order Place Date',
      subtitle: '16/11/2022',
    },
    {
      title: 'Payment Method',
      subtitle: 'Cash On Deliver',
    },
    {
      title: 'Store Number',
      subtitle: '56hp90',
    },
  ];
  return (
    <div className={`mt-4 ${className}`}>
      <h1 className="text-[#99A2A5] text-sm font-OpenSans leading-5">
        Store Number: 56hp90
      </h1>
      <h1 className="text-[#00171F] text-2xl font-OpenSans font-bold leading-9">
        Yellow Leather Bag
      </h1>
      <h1 className="text-primary text-xl font-OpenSans font-bold leading-8">
        $ 96.00
      </h1>
      <div className="mt-5">
        {bagDetails?.map((e, index) => (
          <div key={index} className="border-b-[1.5px]">
            <span className="flex items-center justify-between py-2">
              <h1 className="text-[#383939] text-sm font-OpenSans font-light italic leading-5 w-1/2">
                {e?.title}
              </h1>
              <h1 className="text-[#383939] text-sm font-OpenSans leading-5 w-1/2">
                {e?.subtitle}
              </h1>
            </span>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center gap-6 mt-10">
        <div className="relative inline-block">
          <button
            className="bg-primary rounded-[10px] px-8 py-3 text-white text-lg font-OpenSans font-bold flex gap-5 items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedOption}
            <div
              className={`text-white p-1 ${
                isDropdownOpen ? 'rotate-180 duration-200 ease-in-out' : ''
              }`}
            >
              <ArrowDown />
            </div>
          </button>
          {isDropdownOpen && (
            <div className="absolute bottom-14 right-0 bg-white rounded-[5px] mt-2 shadow-md z-10">
              {options.map((option) => (
                <div
                  key={option}
                  className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BagDetails;

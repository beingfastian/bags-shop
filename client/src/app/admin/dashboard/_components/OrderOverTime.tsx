'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from './Icons';
import LineChart from './LineChart';

interface Data {
  date: string;
  totalAmount: number;
}
interface Props {
  data: Data[];
}
function OrderOverTime({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState('year');
  // Reference to the dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const options = ['day', 'week', 'month', 'year'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const handleSelect = (option: any) => {
  //   setSelectedOption(option);
  //   setIsOpen(false);
  // };
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-[#131523] text-base font-OpenSans font-bold leading-6">
          Orders Over Time
        </h1>
        <span
          onClick={toggleDropdown}
          ref={dropdownRef}
          className="flex items-center gap-2 cursor-pointer relative"
        >
          {/* <h1 className="text-[#5A607F] text-sm font-Inter leading-5">
            {selectedOption}
          </h1> */}
          <span
            className={`${isOpen ? 'rotate-180 duration-300 ease-in-out' : ''}`}
          >
            <ArrowDown />
          </span>
          {/* {isOpen && (
            <div className="w-[150px] absolute top-5 right-0 mt-2 bg-white border rounded-md shadow-lg z-10">
              <ul className="py-2">
                {options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(option)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )} */}
        </span>
      </div>
      <LineChart data={data} />
    </div>
  );
}

export default OrderOverTime;

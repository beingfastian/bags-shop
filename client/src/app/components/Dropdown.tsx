import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface OptionType {
  label: string;
  value: string;
}

interface DropdownProps {
  options: OptionType[];
  placeholder?: string;
  onSelect: (selectedOption: string) => void;
  dropdownClassName?: string;
  className?: string;
  optionClassName?: string;
  optionlabelClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Select an option',
  onSelect,
  dropdownClassName,
  optionClassName,
  className,
  optionlabelClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        console.log('Clicked outside, closing dropdown'); // Debug log
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: OptionType) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value);
  };

  return (
    <div
      ref={dropdownRef} // Ensure the ref is attached here
      className={`relative inline-block sm:w-[167px] cursor-pointer w-full ${className}`}
    >
      <div className="relative inline-block cursor-pointer w-full">
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className={`border border-[#3734A9] rounded-[20px] !gap-0 xxs:gap-5 !px-2 xxs:px-3  w-full py-0.5 xxs:py-1.5 flex items-center xxs:justify-between mt-2 ${dropdownClassName}`}
        >
          <h1
            className={`text-xs xxs:text-sm text-[#3734A9] font-OpenSans leading-[19px] ${optionlabelClassName}`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </h1>
          <IoIosArrowDown />
        </div>
        {isOpen && (
          <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${optionClassName}`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;

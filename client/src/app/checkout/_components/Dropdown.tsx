import { Arrow } from '@/app/components/Icons';
import { useState } from 'react';

interface DropdownProps {
  options: string[];
  placeholder?: string;
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'city',
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative w-full">
      <button
        className="border border-[#E9E9E9] rounded-[5px] px-2 py-1.5 w-full text-[#757575] text-sm font-SegoeUi text-left flex items-center justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOption || placeholder}
        <span>
          <Arrow />
        </span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 bg-white border border-[#E9E9E9] rounded-[5px] w-full shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-2 py-1.5 text-[#757575] text-sm hover:bg-[#f0f0f0] cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

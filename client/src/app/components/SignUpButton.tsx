import React from 'react';
import { SubArrow } from './Icons';

interface Props {
  className?: string;
  onClick?: () => void; // Add onClick prop
}
const SignUpButton = ({ className = '', onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center text-nowrap justify-center px-2 xxs:px-4 py-2 bg-[#3734A9] text-white text-[10px] xxs:text-sm sm:text-lg font-bold rounded-lg ${className}`}
    >
      Sign up now
      <span className="ml-1 xxs:ml-2 text-xs xxs:text-lg">
        <SubArrow />
      </span>
    </button>
  );
};

export default SignUpButton;

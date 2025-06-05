import React from 'react';

interface SpinnerProps {
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-6 h-6 border-4 border-t-4 border-white rounded-full animate-spin ${className}`}
      ></div>
    </div>
  );
};

export default Spinner;

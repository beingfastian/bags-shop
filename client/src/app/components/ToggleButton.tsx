import React from 'react';

interface ToggleSwitchProps {
  label: string;
  bgColor?: string;
  checkedBgColor?: string;
  dotColor?: string;
  textColor?: string;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  bgColor = 'bg-gray-300',
  checkedBgColor = 'bg-blue-500',
  dotColor = 'bg-white',
  textColor = 'text-gray-700',
  onChange,
  checked = false,
}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange && onChange(e.target.checked)}
        />
        <div
          className={`block w-12 h-6 rounded-full transition-colors duration-300 ${
            checked ? checkedBgColor : bgColor
          } peer-checked:${checkedBgColor}`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition-all duration-300 ease-in-out transform ${
            dotColor
          } ${checked ? 'translate-x-6' : ''}`}
        ></div>
      </div>
      <span className={`ml-2 ${textColor} font-OpenSans text-base font-normal`}>
        {label}
      </span>
    </label>
  );
};

export default ToggleSwitch;

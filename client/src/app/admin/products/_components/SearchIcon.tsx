'use client';

import React, { useState } from 'react';
import { Search } from './Icons';

interface Props {
  className?: string;
  onSearch?: (value: string) => void; // Callback function to pass search input
}

function SearchIcon({ className, onSearch }: Props) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <div
      className={`w-full md:w-1/3 px-3 flex items-center border border-[#D9E1EC] rounded-[4px] h-[42px] ${className}`}
    >
      <Search />
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder="Search..."
        className="px-1 outline-none w-full bg-transparent"
      />
    </div>
  );
}

export default SearchIcon;

'use client';

import React from 'react';

interface Props {
  className?: string;
}

function Loader({ className = '' }: Props) {
  return (
    <div
      className={`absolute left-1/2 top-1/2 animate-spin -translate-1/2 ${className}`}
    >
      <div className="grid grid-cols-2 grid-rows-2 gap-1">
        <i className="w-2 aspect-square bg-primary opacity-20 rounded-full" />
        <i className="w-2 aspect-square bg-primary opacity-50  rounded-full" />
        <i className="w-2 aspect-square bg-primary opacity-80 rounded-full" />
        <i className="w-2  aspect-square bg-primary rounded-full" />
      </div>
    </div>
  );
}

export default Loader;

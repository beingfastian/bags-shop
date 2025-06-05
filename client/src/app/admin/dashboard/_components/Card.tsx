import React, { ReactNode } from 'react';


interface Props {
  price: number;
  title: string;
 
  icon: ReactNode;
}

function Card({ price, title, icon }: Props) {
  return (
    <div className="w-full bg-white gap-1 flex flex-wrap items-center justify-between shadow-revenueCard px-8 py-2 rounded-md">
      <div>
        <h1 className="text-[#131523] text-base font-Inter font-bold">
          {price}
        </h1>
        <h1 className="text-[#5A607F] text-[10px] font-Inter">{title}</h1>
        
      </div>
      {icon}
    </div>
  );
}

export default Card;

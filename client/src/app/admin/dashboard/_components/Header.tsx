import React from 'react';
// import { Sitting } from './Icons';

function Header() {
  return (
    <div className="w-full px-6 py-4 flex items-center justify-between">
      <h1 className="text-[#131523] text-2xl font-OpenSans font-bold leading-9">
        Dashboard
      </h1>
      {/* <div className="w-28 bg-white border border-[#D7DBEC] rounded-[4px] flex items-center justify-center gap-2 py-1 cursor-pointer">
        <span className="">
          <Sitting />
        </span>
        <h1 className="text-[#1E5EFF] text-base font-Inter leading-6">
          Manage
        </h1>
      </div> */}
    </div>
  );
}

export default Header;

'use client';
import React from 'react';
import Billing from './_components/Billing';
import Summary from './_components/Summary';

function Page() {
  return (
    <div className="w-full flex flex-col md:flex-row">
      <Billing className="w-full md:w-[70%]" />
      <div className="w-full md:w-1/3 mt-5">
        <Summary />
      </div>
    </div>
  );
}

export default Page;

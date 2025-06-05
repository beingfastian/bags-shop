import { useOrders } from '@/hooks/useOrder';
import React from 'react';

function RecentOrders() {


  
    const {data}=useOrders({})

  return (
    <div className="bg-white shadow-revenueCard rounded-md px-6 py-3">
      <h2 className="text-[#131523] text-base font-OpenSans font-bold leading-6">
        Recent Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto min-w-[400px] mt-3">
          <thead>
            <tr className="text-left border-b-2 border-gray-200">
              <th className=" text-[#5A607F] text-sm font-Inter">Name</th>
              <th className="px-4 text-[#5A607F] text-sm font-Inter">Date</th>
              <th className="px-4 text-[#5A607F] text-sm font-Inter">Amount</th>
              <th className="px-4 text-[#5A607F] text-sm font-Inter">Status</th>
            </tr>
          </thead>
          <tbody>
          {(data?.data || [])?.slice(0, 7).map((item, index) => (
  <tr
    className="hover:bg-gray-50 border-b-2 border-gray-100"
    key={index}
  >
    <td className="text-[#131523] text-sm font-Inter font-medium">
      {item?.User?.display_name}
    </td>
    <td className="py-3 px-4 text-[#131523] text-sm font-Inter">
      {new Date(item?.createdAt ).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}
    </td>
    <td className="py-3 px-4 text-[#131523] text-sm font-Inter">
      {item?.total_price}
    </td>
    <td className={`px-4 text-[#06A561] text-sm font-Inter`}>
      <span
        className={`rounded-sm px-2 ${
          item?.status === 'Delivered'
            ? 'bg-[#C4F8E2]'
            : 'bg-[#E6E9F4] text-[#5A607F]'
        }`}
      >
        {item?.status === 'Delivered' ? 'Delivered' : 'Pending'}
      </span>
    </td>
  </tr>
))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;

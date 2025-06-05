'use client';

import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';

import { useBuyerOrders } from '@/hooks/useOrder';
import { useRouter } from 'next/navigation';

import Layout from '../components/MainLayout';

function Page() {
  const [status, setStatus] = useState<string | undefined>(undefined);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const { data: order } = useBuyerOrders({
    pageSize: 100,
    status,
  });

  const router = useRouter();

  const onClick = (id: any) => {
    console.log('Calling');
    router?.push(`/order-history/${id}`);
  };

  const options = [
    { label: 'pending', value: 'pending' },
    { label: 'confirmed', value: 'confirmed' },
    { label: 'inprogress', value: 'inprogress' },
    { label: 'ontheway', value: 'ontheway' },
    { label: 'cancelled', value: 'cancelled' },
    { label: 'delivered', value: 'cancelled' },
  ];
  const handleSelect = (selectedOption: string) => {
    console.log('Selected:', selectedOption);
    setStatus(selectedOption);
  };

  return (
    <Layout>
      <div className="w-full flex xxs:px-6 py-6  justify-center items-center">
        <div className="w-[90%] xxs:w-[80%] items-center flex flex-col ">
          <div className="w-full py-1">
            <h1 className="text-primary  text-[24px] font-OpenSans font-bold ">
              Orders History
            </h1>
          </div>
          <div className="w-full bg-white px-6 py-1 border-[1px] border-#E6E9F4 rounded-md shadow-cardShadow">
            <div className="w-full flex flex-col md:flex-row  md:gap-0 gap-2 items-center justify-between mt-4">
              <div className="w-full flex flex-wrap items-center gap-2 ">
                <Dropdown
                  options={options}
                  placeholder="Filter"
                  onSelect={handleSelect}
                  dropdownClassName="!rounded-[4px] !border !border-[#D9E1EC] !py-[10px] !md:w-full !w-full !mt-0"
                  optionClassName="text-gray-700 !w-full"
                  optionlabelClassName="!text-gray-600 !w-full"
                />
                {/* <SearchIcon  onSearch={setName}/> */}
              </div>

              {/* <div className="w-full md:w-[35%] flex flex-wrap items-center justify-end gap-2 ">
            <div className="rounded-sm border cursor-pointer">
              <DeleteIcon />
            </div>
          </div> */}
            </div>
            {/* <OrderTable /> */}

            {/*  table */}

            <div className="overflow-x-auto pt-6 pb-6">
              <table className="table-auto w-full border-collapse min-w-[700px] shadow-revenueCard">
                <thead>
                  <tr className=" text-[#5A607F] border-b-[2px] border-[#E6E9F4] font-bold">
                    {/* <th className="px-4 text-left text-sm  ">
              <input
                className="p-3 w-4 h-4"
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedOrders(
                      order?.map((order: any) => order.id) as any
                    );
                  } else {
                    setSelectedOrders([]);
                  }
                }}
                checked={selectedOrders.length === 100}
              />
            </th> */}
                    <th className="py-2  text-left text-sm  ">Order</th>
                    <th className="py-2 px-4 text-left text-sm  ">Date</th>

                    {/* <th className="py-2 px-4 text-left text-sm ">Product</th> */}
                    {/* <th className="py-2 px-4 text-left text-sm  ">Payment Status</th> */}
                    <th className="py-2 px-4 text-left text-sm ">
                      Order Status
                    </th>
                    <th className="py-2 px-4 text-left text-sm ">Time</th>
                    <th className="py-2 px-4 text-left text-sm ">Tracking Id</th>
                    <th className="py-2 px-4 text-left text-sm ">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.map((item: any) => (
                    // order.OrderItems?.map((item: any , index:number) => (

                    <tr
                      onClick={() => onClick(item.id)}
                      key={item.id}
                      className="hover:bg-gray-50 border-b-[1px] border-gray-200 text-[#131523] cursor-pointer"
                    >
                      {/* <td className="pl-4 ">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectedOrders?.includes(item.order_id)}
                  onChange={() => handleSelectOrder(item.order_id)}
                />
              </td> */}
                      <td className="py-2  text-sm font-semibold h-[52px]">
                        {item.id}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-700">
                        {formatDate(item.createdAt)}
                      </td>

                      {/* <td className="py-2 px-4 text-sm text-gray-700">
                    {item.product || 'product 1'}
                  </td> */}

                      <td className="py-2 px-4 text-sm">
                        <span className="px-2 py-1 bg-[#F99600] text-white rounded-md">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-700">
                        {new Date(item.createdAt)?.toLocaleTimeString()}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-700">
                        {item?.trackingId || "N/A"}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-700">
                        {item?.total_price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* table */}
            {/* <div className="flex justify-between">
            <Pagination
              totalPages={order?.totalPages || 0} // Pass the totalPages value here
              currentPage={page}
              onPageChange={handlePageChange}
            />
            <button className="text-[#5A607F] text-sm font-Inter">
              {order?.data?.length} Results
            </button>
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Page;

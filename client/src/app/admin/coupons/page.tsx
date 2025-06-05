'use client';
import Dropdown from '@/app/components/Dropdown';
import React, { useEffect, useState } from 'react';
import SearchIcon from '../products/_components/SearchIcon';
import { Dollar, Dollar2 } from '../products/_components/Icons';
import Pagination from '@/app/components/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCoupons, useDeleteCoupon } from '@/hooks/useCoupon';
import Spinner from '@/app/components/LoadingSpinner';
import Swal from 'sweetalert2';
import { IoMdTrash } from 'react-icons/io';

export default function Coupons() {
  const pageSize = 10;
  const Router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const { mutateAsync, isPending } = useDeleteCoupon();
  const { data, isLoading } = useCoupons(currentPage, pageSize);

  const [activeTab, setActiveTab] = useState('All Coupons');
  const [selectAll, setSelectAll] = useState(false);
  const [checkedState, setCheckedState] = useState<boolean[]>([]);
  const searchParams = useSearchParams();

  const totalCount = data?.length || 0;
  console.log(totalCount, 'totalcount');
  const totalPages = totalCount ? Math.ceil(totalCount / pageSize) : 0;
  console.log(totalPages, 'totalpages');
  const handlePageChange = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  React.useEffect(() => {
    setCheckedState(new Array(data?.length).fill(false));
  }, [data?.length]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCheckedState(new Array(data?.length).fill(newSelectAll));
  };

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedState = [...checkedState];
    updatedCheckedState[index] = !updatedCheckedState[index];
    setCheckedState(updatedCheckedState);

    const allSelected = updatedCheckedState.every((checked) => checked);
    const noneSelected = updatedCheckedState.every((checked) => !checked);
    setSelectAll(allSelected && !noneSelected);
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' } as any;
    const start = new Date(startDate).toLocaleDateString('en-US', options);
    const end = new Date(endDate).toLocaleDateString('en-US', options);
    return `${start} - ${end}`;
  };
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
  ];
  const handleSelect = (selectedOption: string) => {
    console.log('Selected:', selectedOption);
  };
  const handleSearch = () => {
    console.log('search');
  };
  const filteredCoupons = data?.filter((coupon) => {
    if (!coupon) return false;

    console.log('Coupon Status:', coupon?.status);

    if (activeTab === 'Active Coupons') {
      return coupon?.status === 'active';
    }
    if (activeTab === 'Expired Coupons') {
      return coupon?.status === 'inactive';
    }
    return true;
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const encodedTab = tab.replace(' ', '-');
    Router.push(`?tab=${encodedTab}`);
  };
  useEffect(() => {
    const tab = searchParams.get('tab')?.replace('-', ' ') || 'All Coupons';
    setActiveTab(tab);
  }, [searchParams]);
  const handleDelete = () => {
    const selectedCoupons = checkedState
      .map((checked, index) => checked && data?.[index]?.id)
      .filter(Boolean);

    selectedCoupons.forEach((couponId) => {
      mutateAsync(couponId as string)
        .then(() => {
          Swal.fire({
            title: 'Success',
            text: 'Coupon deleted successfully',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
          });
        })
        .catch(() => {
          Swal.fire({
            title: 'Error',
            text: 'There was an error deleting the coupon',
            icon: 'error',
            timer: 3000,
            showConfirmButton: false,
          });
        });
    });

    setCheckedState(new Array(data?.length).fill(false));
    setSelectAll(false);
  };

  return (
    <div className="p-6 sm:p-8">
      {/* First Row */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coupons</h1>
        <button
          onClick={() => Router.push('/admin/create-coupon')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create
        </button>
      </div>

      {/* Second Section */}
      <div className="bg-white p-6 rounded shadow">
        {/* Tabs for Filtering */}
        <div className="w-full flex flex-wrap sm:flex-row border-b gap-4 border-gray-200 mb-4">
          {['All Coupons', 'Active Coupons', 'Expired Coupons'].map((tab) => (
            <button
              key={tab}
              className={`xxs:px-4 py-2 text-sm font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="w-full flex items-center gap-2 mb-4 justify-between">
          <div className="w-full flex flex-col  md:flex-row">
            <div className="w-full md:w-[80%] flex flex-col xxs:flex-row items-center gap-2">
              <Dropdown
                options={options}
                placeholder="Filter"
                onSelect={handleSelect}
                dropdownClassName="!rounded-[4px] !border !border-[#D9E1EC] !py-[7px] !md:w-full !w-full !mt-0"
                optionClassName="text-gray-700 !w-full"
                optionlabelClassName="!text-gray-600 !w-full"
                className="!min-w-[100px] sm:!min-w-[150px]"
              />
              <SearchIcon
                className="xxs:!w-[350px] ml-2 !h-[35px]"
                onSearch={handleSearch}
              />
            </div>

            <div className="w-full md:w-[20%] flex justify-end  md:justify-end pt-4 md:pt-0">
              <div
                onClick={handleDelete}
                className="max-w-8 max-h-8  flex justify-end items-center  rounded-sm p-[3px] cursor-pointer"
              >
                {isPending ? (
                  <Spinner className="!w-4 !h-4 !border-blue-600" />
                ) : (
                  <IoMdTrash className=" border-[#3734A8] text-primary hover:bg-primary hover:text-white border-[1px] w-8 h-8 rounded-md" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Header Row */}
        {/* <div className="grid grid-cols-2 text-sm font-semibold text-gray-600 py-2 border-b-2      border-gray-200 mb-2">
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <span>Coupon Name</span>
            </div>
          </div>
          <div className="flex pl-8">
            <div className="w-[120px]">Usage</div>
            <div className="w-[120px]">Status</div>
            <div className="">Date</div>
          </div>
        </div> */}

        {/* Data Rows */}
        {/* <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            filteredCoupons?.map((coupon, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-2 text-sm text-gray-700 py-2 border-b"
                >
                  <div>
                    <div className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="mr-2 cursor-pointer"
                        checked={checkedState[index]}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <div
                        className={`p-2 border rounded-[3.5px] ${
                          coupon?.couponType === 'Shipping Discount'
                            ? 'bg-[#7E84A3]'
                            : 'bg-[#1E5EFF]'
                        }`}
                      >
                        {coupon?.couponType === 'Shipping Discount' ? (
                          <Dollar />
                        ) : (
                          <Dollar2 />
                        )}
                      </div>
                      <div className="pl-2">
                        <p className="p-0 m-0 leading-1 text-[13px] ">
                          {coupon?.name}
                        </p>
                        <p className={`p-0 m-0 leading-1 text-[12px]`}>
                          {coupon?.couponType}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex pl-8">
                    <div className="w-[100px] text-[12px] whitespace-nowrap">
                      {coupon?.usage_limit}
                    </div>
                    <div className={`w-[100px] text-[12px] pl-6 `}>
                      {' '}
                      <span
                        className={`py-1 px-2 border rounded-sm text-[#]
                          ${
                            coupon?.status === 'active'
                              ? 'bg-[#C4F8E2] text-[#06A561]'
                              : 'bg-[#E6E9F4] text-[#5A607F]'
                          }
                        `}
                      >
                        {coupon?.status}
                      </span>{' '}
                    </div>
                    <div className="md:text-[14px] text-[12px] pl-8">
                      {formatDateRange(coupon?.start_date, coupon?.end_date)}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div> */}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            {/* Header Row */}
            <thead>
              <tr className="w-full text-sm font-semibold text-gray-600 py-2 border-b-2 border-gray-200">
                <th className="px-2 py-1 !min-w-28 xxs:w-auto">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                    <span className='!min-w-28 xxs:w-auto'>Coupon Name</span>
                  </div>
                </th>
                <th className="px-2 py-1 text-center !min-w-28 xxs:w-auto">Usage</th>
                <th className="px-2 py-1 text-center !min-w-28 xxs:w-auto">Status</th>
                <th className="px-2 py-1 text-center !min-w-28 xxs:w-auto">Date</th>
              </tr>
            </thead>

            {/* Data Rows */}
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-2">
                    Loading...
                  </td>
                </tr>
              ) : (
                filteredCoupons?.map((coupon, index) => (
                  <tr
                    key={index}
                    className="text-sm text-gray-700 py-2 border-b"
                  >
                    <td className="px-2 py-1">
                      <div className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="mr-2 cursor-pointer"
                          checked={checkedState[index]}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <div
                          className={`p-2 border rounded-[3.5px] ${
                            coupon?.couponType === 'Shipping Discount'
                              ? 'bg-[#7E84A3]'
                              : 'bg-[#1E5EFF]'
                          }`}
                        >
                          {coupon?.couponType === 'Shipping Discount' ? (
                            <Dollar />
                          ) : (
                            <Dollar2 />
                          )}
                        </div>
                        <div className="pl-2">
                          <p className="p-0 m-0 leading-1 text-[13px]">
                            {coupon?.name}
                          </p>
                          <p className={`p-0 m-0 leading-1 text-[12px]`}>
                            {coupon?.couponType}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-1 text-center">
                      {coupon?.usage_limit}
                    </td>
                    <td className="px-2 py-1 text-center">
                      <span
                        className={`py-1 px-2 border rounded-sm text-[#]
                  ${
                    coupon?.status === 'active'
                      ? 'bg-[#C4F8E2] text-[#06A561]'
                      : 'bg-[#E6E9F4] text-[#5A607F]'
                  }
                `}
                      >
                        {coupon?.status}
                      </span>
                    </td>
                    <td className="!min-w-20 xxs:w-auto px-2 py-1 text-center md:text-[14px] text-[12px] ">
                      {formatDateRange(coupon?.start_date, coupon?.end_date)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between flex-nowrap pt-3">
          <div className="item-start flex w-full">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
          <p className="flex flex-nowrap text-[13px] whitespace-nowrap">
            {filteredCoupons?.length} Reults
          </p>
        </div>
      </div>
    </div>
  );
}

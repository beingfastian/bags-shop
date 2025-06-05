'use client';
import React, { useState } from 'react';
import Dropdown from '@/app/components/Dropdown';
import SearchIcon from '../products/_components/SearchIcon';
import Pagination from '../products/_components/Pagination';

import { useOrders } from '@/hooks/useOrder';
import { useRouter, useSearchParams } from 'next/navigation';
import usePagination from '@/hooks/usePagination';
import { changeOrderStatus } from '@/services/api/orderService';
import { toast, ToastContainer } from 'react-toastify';
import Modal from '@/app/components/Modal';
import { Cross } from '@/app/components/Icons';
import { FaCopy } from 'react-icons/fa';

function Page() {
  const searchParams = useSearchParams();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const { page, pageSize, setPage } = usePagination();
  const [name, setName] = useState('');
  const [status, setStatus] = useState(searchParams.get('status') || '');

  const [showModal, setShowModal] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const { data: order, refetch } = useOrders({
    page,
    pageSize,
    status,
    name,
  });

  const router = useRouter();

  const handleStatusChange = async (newStatus: string, orderId: string) => {
    console.log('this is ', newStatus);
    if (newStatus === 'ontheway') {
      setShowModal(true);
      setSelectedOrderId(orderId);
    } else {
      console.log('St', newStatus);
      try {
        const response = await changeOrderStatus(
          trackingId || '',
          orderId,
          newStatus
        );
        refetch();
        if (response) {
          toast.success(`Status changed successfully to ${newStatus}`);
        }
      } catch (error) {
        console.error('Failed to update order status', error);
        toast.error('Error occurred during status update');
      }
    }
  };

  const closeModal = async () => {
    setShowModal(false);

    if (!trackingId.trim() && selectedOrderId) {
      try {
        const response = await changeOrderStatus(
          trackingId,
          selectedOrderId,
          'ontheway'
        );
        if (response) {
          toast.success('Status changed to ontheway');
          refetch();
        }
      } catch (error) {
        console.error('Failed to update order status', error);
        toast.error('Error updating order status');
      }
    }

    setTrackingId('');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
        toast.error('Failed to copy text');
      });
  };

  const onClick = (id: any) => {
    console.log('Calling');
    router?.push(`/admin/order/${id}`);
  };

  const options = [
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'In Progress', value: 'inprogress' },
    { label: 'Ontheway', value: 'ontheway' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Delivered', value: 'delivered' },
  ];
  const handleSelect = (selectedOption: string) => {
    setStatus(selectedOption);

    const params = new URLSearchParams(searchParams.toString());
    params.set('status', selectedOption);

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleTrackingSubmit = async () => {
    if (!trackingId.trim()) {
      toast.error('Please enter a tracking ID');
      return;
    }

    try {
      const response = await changeOrderStatus(
        trackingId,
        selectedOrderId as any,
        'ontheway'
      );
      if (response) {
        toast.success('Tracking ID added successfully');
        setShowModal(false);
        setTrackingId('');
        refetch();
      }
    } catch (error) {
      console.error('Failed to add tracking ID', error);
      toast.error('Error updating tracking ID');
    }
  };

  return (
    <>
      <ToastContainer />

      <div className=" px-6 pt-3 bg-[#fff6f4] xxs:py-6">
        <div className="flex flex-wrap justify-between py-1">
          <h1 className="text-[#131523] text-[24px] font-OpenSans font-bold ">
            Orders
          </h1>
        </div>
        <div className=" bg-white px-6 py-1 border-[1px] border-#E6E9F4 rounded-md">
          <div className="w-full flex flex-col md:flex-row  md:gap-0 gap-2 items-center justify-between mt-4">
            <div className="w-full md:w-[65%] flex flex-wrap items-center gap-2 ">
              <Dropdown
                options={options}
                placeholder={
                  options?.find((item) => item?.value === status)?.label ||
                  'Filter'
                }
                onSelect={handleSelect}
                dropdownClassName="!rounded-[4px] !border !border-[#D9E1EC] !py-[10px] !md:w-full !w-full !mt-0"
                optionClassName="text-gray-700 !w-full"
                optionlabelClassName="!text-gray-600 !w-full"
              />
              <SearchIcon onSearch={setName} />
            </div>
          </div>

          <div className="overflow-x-auto pt-6 pb-6">
            <table className="table-auto w-full border-collapse min-w-[700px]">
              <thead>
                <tr className=" text-[#5A607F] border-b-[2px] border-[#E6E9F4] font-bold">
                  <th className="py-2  text-left text-sm  ">Order</th>
                  <th className="py-2 px-4 text-left text-sm  ">Date</th>
                  <th className="py-2 px-4 text-left text-sm  ">Customer</th>
                  <th className="py-2 px-4 text-left text-sm ">Order Status</th>
                  <th className="py-2 px-4 text-left text-sm">Tracking ID</th>
                  <th className="py-2 px-4 text-left text-sm ">Total</th>
                </tr>
              </thead>
              <tbody>
                {order?.data?.map((item: any) => (
                  <tr
                    onClick={() => onClick(item.id)}
                    key={item.id}
                    className="hover:bg-gray-50 border-b-[1px] border-gray-200 text-[#131523] cursor-pointer"
                  >
                    {/* <td className="py-2  text-sm font-semibold h-[52px]">
                      {item.id}
                    </td> */}
                    <td className="py-2 text-sm font-semibold h-[52px] flex items-center">
                      {item.id}
                      <FaCopy
                        className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          handleCopy(item.id);
                        }}
                      />
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-700">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-700">
                      <td className="py-2 px-4 text-sm text-gray-700">
                        {item.User?.display_name ||
                          `${item.User?.first_name} ${item.User?.last_name}`}
                      </td>
                    </td>

                    <td
                      className="py-2 px-4 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        className="px-1 py-1 bg-gray-400 text-white rounded-md outline-none cursor-pointer"
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(e.target.value, item.id)
                        }
                        onClick={(e) => e.stopPropagation()} // Prevents row click
                      >
                        <option value="pending">Pending</option>
                        <option value="cancelled">canceled</option>
                        <option value="confirmed">confirmed</option>
                        <option value="inprogress">inprogress</option>
                        <option value="ontheway">ontheway</option>

                        <option value="delivered">delivered</option>
                      </select>
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-700">
                      {item?.trackingId || 'N/A'}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-700">
                      {item.total_price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* table */}
          <div className="flex justify-between">
            <Pagination
              totalPages={order?.totalPages || 0} // Pass the totalPages value here
              currentPage={page}
              onPageChange={handlePageChange}
            />
            <button className="text-[#5A607F] text-sm font-Inter">
              {order?.data?.length} Results
            </button>
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={closeModal}>
        <div
          className="flex justify-end -mt-2 cursor-pointer"
          onClick={closeModal}
        >
          <Cross />
        </div>
        <h2 className="text-xl font-semibold mb-4">
          Enter Leopard Tracking ID
        </h2>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleTrackingSubmit}
        >
          Submit
        </button>
      </Modal>
    </>
  );
}

export default Page;

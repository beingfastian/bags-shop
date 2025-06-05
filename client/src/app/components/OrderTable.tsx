import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const OrderTable = () => {
  const router = useRouter();

  const onClick = (id: any) => {
    router?.push(`/admin/order/${id}`);
  };
  const orders = [
    {
      id: 1,
      order: '#12512B',
      date: 'May 5, 4:20 PM',
      customer: 'Mr. Qamar',
      product: 'Yellow Leather',
      paymentStatus: 'Paid',
      orderStatus: 'Pending',
      total: '$49.90',
    },
    {
      id: 2,
      order: '#12523C',
      date: 'May 5, 4:15 PM',
      customer: 'Mr. Qamar',
      product: 'Yellow Leather',
      paymentStatus: 'Paid',
      orderStatus: 'Pending',
      total: '$34.36',
    },
    {
      id: 3,
      order: '#23534D',
      date: 'May 5, 4:12 PM',
      customer: 'Mr. Qamar',
      product: 'Yellow Leather',
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
      total: '$50.54',
    },
    {
      id: 4,
      order: '#12523A',
      date: 'May 5, 4:15 PM',
      customer: 'Mr. Qamar',
      product: 'Yellow Leather',
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
      total: '$5.51',
    },
    // Add more rows here
  ] as any;

  const [selectedOrders, setSelectedOrders] = useState<any[]>([]);

  // Handle checkbox toggle
  const handleSelectOrder = (id: string) => {
    setSelectedOrders((prev: any) =>
      prev.includes(id)
        ? prev.filter((orderId: any) => orderId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="overflow-x-auto pt-6 pb-6">
      <table className="table-auto w-full border-collapse min-w-[700px]">
        <thead>
          <tr className=" text-[#5A607F] border-b-[2px] border-[#E6E9F4] font-bold">
            <th className="px-4 text-left text-sm  ">
              <input
                className="p-3 w-4 h-4"
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedOrders(
                      orders?.map((order: any) => order.id) as any
                    );
                  } else {
                    setSelectedOrders([]);
                  }
                }}
                checked={selectedOrders.length === orders.length}
              />
            </th>
            <th className="py-2  text-left text-sm  ">Order</th>
            <th className="py-2 px-4 text-left text-sm  ">Date</th>
            <th className="py-2 px-4 text-left text-sm  ">Customer</th>
            <th className="py-2 px-4 text-left text-sm ">Product</th>
            <th className="py-2 px-4 text-left text-sm  ">Payment Status</th>
            <th className="py-2 px-4 text-left text-sm ">Order Status</th>
            <th className="py-2 px-4 text-left text-sm ">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr
              onClick={() => onClick(order?.id)}
              key={order.id}
              className="hover:bg-gray-50 border-b-[1px] border-gray-200 text-[#131523] cursor-pointer"
            >
              <td className="pl-4 ">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectedOrders?.includes(order?.id)}
                  onChange={() => handleSelectOrder(order?.id)}
                />
              </td>
              <td className="py-2  text-sm font-semibold h-[52px]">
                {order.order}
              </td>
              <td className="py-2 px-4 text-sm text-gray-700">{order.date}</td>
              <td className="py-2 px-4 text-sm text-gray-700">
                {order.customer}
              </td>
              <td className="py-2 px-4 text-sm text-gray-700">
                {order.product}
              </td>
              <td className="py-2 px-4 text-sm">
                <span
                  className={`px-2 py-1 rounded-md ${
                    order.paymentStatus === 'Paid'
                      ? 'bg-green-100 text-[#06A561]'
                      : 'bg-gray-100 text-[#5A607F]'
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </td>
              <td className="py-2 px-4 text-sm">
                <span className="px-2 py-1 bg-[#F99600] text-white rounded-md">
                  {order.orderStatus}
                </span>
              </td>
              <td className="py-2 px-4 text-sm text-gray-700">{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;

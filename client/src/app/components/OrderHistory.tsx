// // components/OrderTable.tsx
// import React from 'react';

// interface Order {
//   id: string;
//   productImage: string;
//   productName: string;
//   quantity: number;
//   payment: string;
//   paymentStatus: string;
//   orderDate: string;
//   shippingDate: string;
//   shippingStatus: string;
// }

// interface Props {
//   orders: Order[];
// }

// const OrderHistory: React.FC<Props> = ({ orders }) => {
//   return (
//     <div className="overflow-x-auto px-2 py-2">
//       <table className="min-w-full table-auto border-collapse">
//         <thead>
//           <tr className="bg-[#3734A9] text-white">
//             <th className="py-2 px-4 text-left text-sm font-bold ">
//               S. No
//             </th>
//             <th className="py-2 px-4 text-left text-sm font-bold ">
//               Product Image
//             </th>
//             <th className="py-2 px-4 text-left text-sm font-bold ">
//               Order Date
//             </th>
//             <th className="py-2 px-4 text-left text-sm font-bold ">
//               Shipping Date
//             </th>
//             <th className="py-2 px-4 text-left text-sm font-bold ">
//               Shipping Status
//             </th>
//             <th className="py-2 px-4 text-left text-sm font-bold">
//               Price
//             </th>
//             <th className="py-2 px-4 text-left text-sm font-bold ">
//               Quantity
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order, index) => (
//             <tr
//               key={order.id}
//               className="border-b border-gray-200 hover:bg-gray-50"
//             >
//               <td className="py-2 px-4 text-sm text-gray-600">{index + 1}</td>
//               <td className="py-2 px-4">
//                 <img
//                   src={order.productImage}
//                   alt={order.productName}
//                   className="w-16 h-16 object-cover rounded-md"
//                 />
//               </td>
//               <td className="py-2 px-4 text-sm text-gray-600">
//                 {new Date(order.orderDate).toLocaleDateString()}
//               </td>
//               <td className="py-2 px-4 text-sm text-gray-600">
//                 {new Date(order.shippingDate).toLocaleDateString()}
//               </td>
//               <td className="py-2 px-4 text-sm">
//                 <span
//                   className={`px-2 py-1 rounded-md ${
//                     order.shippingStatus === 'Shipped'
//                       ? 'bg-green-100 text-[#06A561]'
//                       : 'bg-gray-100 text-[#5A607F]'
//                   }`}
//                 >
//                   {order.shippingStatus}
//                 </span>
//               </td>
//               <td className="py-2 px-4 text-sm text-gray-600">
//                 Rs: {order.payment}
//               </td>
//               <td className="py-2 px-4 text-sm text-gray-600">
//                 {order.quantity}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrderHistory;

// components/OrderTable.tsx

import React from 'react';
import Pagination from '../components/Pagination';

interface Order {
  id: string;
  productImage: string;
  productName: string;
  quantity: number;
  payment: string;
  paymentStatus: string;
  orderDate: string;
  shippingStatus: string;
}

interface Props {
  orders: Order[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const OrderHistory: React.FC<Props> = ({
  orders,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="overflow-x-auto px-2 py-2">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-[#3734A9] text-white">
            <th className="py-2 px-4 text-left text-sm font-bold">S. No</th>
            <th className="py-2 px-4 text-left text-sm font-bold">
              Product Image
            </th>
            <th className="py-2 px-4 text-left text-sm font-bold">
              Product Name
            </th>
            <th className="py-2 px-4 text-left text-sm font-bold">
              Order Date
            </th>
            <th className="py-2 px-4 text-left text-sm font-bold">
              Shipping Status
            </th>
            <th className="py-2 px-4 text-left text-sm font-bold">Quantity</th>
            <th className="py-2 px-4 text-left text-sm font-bold">Price</th>
            <th className="py-2 px-4 text-left text-sm font-bold">Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-2 px-4 text-sm text-gray-600">{index + 1}</td>
              <td className="py-2 px-4">
                <img
                  src={order.productImage}
                  alt={order.productName}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </td>
              <td className="py-2 px-4 text-sm text-gray-600">
                {order.productName}
              </td>
              <td className="py-2 px-4 text-sm text-gray-600">
                {new Date(order.orderDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 text-sm">
                <span
                  className={`px-2 py-1 rounded-md ${
                    order.shippingStatus === 'Shipped'
                      ? 'bg-green-100 text-[#06A561]'
                      : 'bg-gray-100 text-[#5A607F]'
                  }`}
                >
                  {order.shippingStatus}
                </span>
              </td>
              <td className="py-2 px-4 text-sm text-gray-600">
                {order.quantity}
              </td>
              <td className="py-2 px-4 text-sm text-gray-600">
                Rs: {order.payment}
              </td>
              <td className="py-2 px-4 text-sm text-gray-600">
                Rs: {parseInt(order.payment) * order.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="w-full flex justify-end py-2 pt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default OrderHistory;

// import React from 'react';

// function DeliveryMethod() {
//   return (
//     <div className="border border-[#E9E9E9] rounded-[5px] px-3 py-2 mt-8">
//       <h1 className="text-xl font-OpenSans font-bold leading-6">
//         Delivery Method
//       </h1>
//       <p className="text-[#7A7A7A] text-sm font-OpenSans mt-2">
//         Please select the preferred shipping method to use on this order.
//       </p>
//       <div className="flex items-center gap-10 mt-4">
//         <div>
//           <label
//             htmlFor=""
//             className="text-[#2B2B2D] text-[15px] font-OpenSans"
//           >
//             Free Shipping
//           </label>
//           <div className="flex items-center gap-3">
//             <input
//               type="radio"
//               name="radio"
//               id=""
//               className="accent-[#F53E32]"
//               defaultChecked
//             />
//             <label
//               htmlFor=""
//               className="text-[#7A7A7A] text-sm font-OpenSans whitespace-nowrap"
//             >
//               Rate - RS.0.00
//             </label>
//           </div>
//         </div>
//         <div>
//           <label
//             htmlFor=""
//             className="text-[#2B2B2D] text-[15px] font-OpenSans"
//           >
//             Flat Rate
//           </label>
//           <div className="flex items-center gap-3">
//             <input
//               type="radio"
//               name="radio"
//               id=""
//               className="accent-[#F53E32]"
//             />
//             <label
//               htmlFor=""
//               className="text-[#7A7A7A] text-sm font-OpenSans whitespace-nowrap"
//             >
//               Rate - RS.0.00
//             </label>
//           </div>
//         </div>
//       </div>
//       <div className="mt-3">
//         <label htmlFor="" className="text-[#2B2B2D] text-[15px] font-OpenSans">
//           Add Comments About Your Order
//         </label>
//         <textarea
//           name=""
//           id=""
//           className="border w-full rounded-md mt-1"
//           rows={4}
//         ></textarea>
//       </div>
//     </div>
//   );
// }

// export default DeliveryMethod;

import React, { useState } from 'react';
import { FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';

function DeliveryMethod() {
  const [selectedPayment, setSelectedPayment] = useState('');

  const handlePaymentChange = (event: {
    target: { id: React.SetStateAction<string> };
  }) => {
    setSelectedPayment(event.target.id);
  };

  const handleCardClick = (id: React.SetStateAction<string>) => {
    setSelectedPayment(id);
  };

  return (
    <div className="border border-[#E9E9E9] rounded-[10px] px-8 py-8 mt-8 bg-white shadow-lg">
      <h1 className="text-3xl font-bold leading-8 text-[#2B2B2D]">
        Delivery & Payment Method
      </h1>
      <p className="text-[#7A7A7A] text-base mt-3 mb-6">
        Please select the preferred shipping and payment method for your order.
      </p>

      {/* Payment Method */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#2B2B2D] mb-4">
          Payment Method
        </h2>
        <div className="flex w-full space-y-6">
          {/* Cash on Delivery */}
          <div
            className={`w-1/2 relative flex flex-col items-center gap-4 p-6 border rounded-lg cursor-pointer transition-all ease-in-out duration-300 transform ${
              selectedPayment === 'cashOnDelivery'
                ? 'border-primary shadow-lg scale-105'
                : 'border-[#E9E9E9] hover:shadow-lg hover:border-primary'
            }`}
            onClick={() => handleCardClick('cashOnDelivery')}
          >
            <input
              type="radio"
              name="payment"
              id="cashOnDelivery"
              className="accent-primary absolute top-4 right-4"
              onChange={handlePaymentChange}
              checked={selectedPayment === 'cashOnDelivery'}
            />
            <FaMoneyBillWave className="text-3xl text-[#F53E32]" />
            <div className="text-center">
              <label
                htmlFor="cashOnDelivery"
                className={`text-[#2B2B2D] text-xl font-semibold ${
                  selectedPayment === 'cashOnDelivery'
                    ? 'text-primary'
                    : 'text-[#2B2B2D]'
                }`}
              >
                Cash on Delivery
              </label>
              <p className="text-[#7A7A7A] text-sm mt-2">
                Pay when you receive your order. Benefits:
              </p>
              <ul className="list-disc list-inside text-[#7A7A7A] text-sm">
                <li>No need to share payment details online.</li>
                <li>Convenient and secure for cash payments.</li>
              </ul>
            </div>
          </div>

          {/* Pay Fast */}
          <div
            className={`w-1/2 relative flex flex-col items-center gap-4 p-6 border rounded-lg cursor-pointer transition-all ease-in-out duration-300 transform ${
              selectedPayment === 'payFast'
                ? 'border-primary shadow-lg scale-105'
                : 'border-[#E9E9E9] hover:shadow-lg hover:border-primary'
            }`}
            onClick={() => handleCardClick('payFast')}
          >
            <input
              type="radio"
              name="payment"
              id="payFast"
              className="accent-primary absolute top-4 right-4"
              onChange={handlePaymentChange}
              checked={selectedPayment === 'payFast'}
            />
            <FaCreditCard className={`text-3xl text-[#F53E32] `} />
            <div className="text-center">
              <label
                htmlFor="payFast"
                className={`text-[#2B2B2D] text-xl font-semibold ${
                  selectedPayment === 'payFast'
                    ? 'text-primary'
                    : 'text-[#2B2B2D]'
                }`}
              >
                Pay Fast
              </label>
              <p className="text-[#7A7A7A] text-sm mt-2">
                Fast and secure online payments. Benefits:
              </p>
              <ul className="list-disc list-inside text-[#7A7A7A] text-sm">
                <li>Instant payment confirmation.</li>
                <li>Get 5% off on your order with cash advance.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryMethod;

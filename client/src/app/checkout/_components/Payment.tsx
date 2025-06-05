import React from 'react';

function Payment() {
  return (
    <div className="border border-[#E9E9E9] rounded-[5px] px-3 py-2 mt-8">
      <h1 className="text-xl font-OpenSans font-bold leading-6">
        Payment Method
      </h1>
      <p className="text-[#7A7A7A] text-sm font-OpenSans font-light mt-2">
        Please select the preferred payment method to use on this order.
      </p>
      <div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            id=""
            className="accent-[#F53E32]"
          />
          <h1 className="text-[#7A7A7A] text-sm font-OpenSans">
            Cash on Delivery
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            id=""
            className="accent-[#F53E32]"
          />
          <h1 className="text-[#7A7A7A] text-sm font-OpenSans">Easy-peasy</h1>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            id=""
            className="accent-[#F53E32]"
          />
          <h1 className="text-[#7A7A7A] text-sm font-OpenSans">
            Cash on Delivery
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Payment;

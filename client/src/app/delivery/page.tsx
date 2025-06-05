"use client"
import React from 'react';
import Layout from '../components/MainLayout';

function Page() {
  return (
    <Layout>
      <div className="bg-gray-100 text-[#3734A9] py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <section className="mb-8">
            <h2 className="text-4xl font-extrabold mb-4 text-[#3734A9]">
              DELIVERY & PAYMENT METHOD
            </h2>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#3734A9] mb-2">
                Order Processing & Delivery Time:
              </h3>
              <p className="text-lg text-gray-700">
                Orders typically take one working day to process. Those received
                between Monday to Saturday are processed and dispatched on the
                same day, while orders placed after 4:30 PM are processed the
                next working day. Orders placed on Sundays or holidays are
                handled on the next working day.
              </p>
              <p className="text-lg text-gray-700">
                Order delivery takes 2 to 3 working days once dispatched.
              </p>
              <p className="text-lg text-gray-700 font-medium">
                Additionally, all orders require phone verification from the
                customer before processing.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#3734A9] mb-2">
                Shipping Partner:
              </h3>
              <p className="text-lg text-gray-700">
                For shipping, we use{' '}
                <span className="text-lg font-bold text-[#3734A9]">M&P</span> or{' '}
                <span className="text-lg font-bold text-[#3734A9]">POSTEX</span>
                , and customers receive a tracking number once their order is
                dispatched.
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#3734A9] mb-2">
                If Advnace Payment:
              </h3>
              <p className="text-lg text-gray-700">
                Customers who make advance payments for their items or products
                will receive a{' '}
                <span className="text-lg font-bold text-[#3734A9] mb-2">
                  5% discount
                </span>{' '}
                on the items they buy.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#3734A9] mb-2">
                Payment Method:
              </h3>
              <p className="text-lg text-gray-700">
                We offer various payment options, including{' '}
                <span className="text-lg font-bold text-[#3734A9]">
                  Online Bank Transfer
                </span>{' '}
                and{' '}
                <span className="text-lg font-bold text-[#3734A9]">
                  Cash On Delivery
                </span>
                .
              </p>
              <p className="text-lg text-gray-700 font-medium">
                Enjoy free delivery nationwide! 🚚
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default Page;

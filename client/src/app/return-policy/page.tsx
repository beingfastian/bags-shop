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
              RETURN & EXCHANGE POLICY
            </h2>

            {/* Policy Details */}
            <ul className="list-disc pl-5 space-y-4 text-lg text-gray-700">
              <li>
                We will gladly accept any unused, unwashed, and undamaged
                merchandise with original packing and tags of your purchase for
                an exchange or a return.
              </li>
              <li>
                We will gladly accept any unused item within{' '}
                <span className="text-lg font-bold text-[#3734A9]">5 Days</span>{' '}
                of purchase for a refund or an exchange.
              </li>
              <li>
                Customers need to return the merchandise via traceable delivery,
                i.e., courier or registered post, at their own expense to our
                address.
              </li>
              <li>Delivery charges will not be refunded.</li>
              <li>Return shipment charges will be paid by the customer.</li>
              <li>
                Refund requests will be processed within{' '}
                <span className="text-lg font-bold text-[#3734A9]">
                  7 working days
                </span>{' '}
                after receiving the returned products.
              </li>
            </ul>

            {/* Contact for More Information */}
            <div className="mt-4">
              <p className="text-lg text-gray-700">
                For more information about exchanges and returns, please contact
                us.
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default Page;

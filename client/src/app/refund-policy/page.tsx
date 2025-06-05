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
              REFUND POLICY
            </h2>

            <div className="mb-4">
              <h3 className="text-lg font-extrabold text-[#3734A9]">
                HOW WILL MY MONEY BE REFUNDED?
              </h3>
              <p className="text-lg text-gray-700">
                Once the return has been approved and submitted to
                <a
                  href="https://maaozofficialstore.shop/"
                  className="text-gray-700  font-semibold ml-1"
                >
                  https://maaozofficialstore.shop/
                </a>{' '}
                (items must be in perfect condition and have their inside
                labels), you will receive the amount via Bank Transfer.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-extrabold text-[#3734A9]">
                WHEN WILL I RECEIVE THE REFUND FOR MY RETURN?
              </h3>
              <p className="text-lg text-gray-700">
                After the return is approved, you will receive a confirmation
                email or WhatsApp message indicating that the amount will be
                reimbursed via the same bank information you have provided at
                the time of return confirmation.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-extrabold text-[#3734A9]">
                WHAT SHOULD I DO IF THE RETURN AMOUNT IS INCORRECT?
              </h3>
              <p className="text-lg text-gray-700">
                <a
                  href="https://maaozofficialstore.shop/"
                  className="text-gray-700 font-semibold"
                >
                  https://maaozofficialstore.shop/
                </a>{' '}
                reserves the right to refuse returns requested or sent outside
                the set deadline, or for items that are not in the same
                condition in which they were received.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                DO YOU REFUND THE SHIPPING COSTS IF I RETURN ALL THE ITEMS IN AN
                ORDER?
              </h3>
              <p className="text-lg text-gray-700 font-bold">No!</p>
            </div>

            <div className="mt-4 bg-yellow-100 p-4 rounded">
              <p className="text-lg text-gray-700 ">
                <span className="text-gray-700 font-bold">NOTE:</span> Special
                sales items will not be Exchanged or Refundable.
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default Page;

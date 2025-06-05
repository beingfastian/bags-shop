"use client"
import React from 'react';
import Layout from '../components/MainLayout';

function Page() {
  return (
    <div>
      <Layout>
        <div className="bg-gray-100 text-[#3734A9] py-10 px-6">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-4xl font-extrabold text-[#3734A9] mb-4">
              Customer Services
            </h1>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-[#3734A9] mb-2">
                HOW CAN I CONTACT MAAOZOFFICIAL CUSTOMER SERVICE DEPARTMENT?
              </h2>
              <p className="text-lg text-gray-700">
                You can contact us with any question through the following
                channels:
              </p>
              <ul className="list-disc pl-6 text-lg text-gray-700">
                <li>Through our Need Help service on the website</li>
                <li>Our social media pages on Facebook, Instagram, etc.</li>
                <li>
                  <span className="text-xl text-gray-700 font-semibold">
                    Customer Service Department Hours:
                  </span>{' '}
                  Monday to Saturday from 10:00 am to 06:00 pm PST
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-[#3734A9] mb-2">
                HOW CAN I FILE A COMPLAINT?
              </h2>
              <p className="text-lg text-gray-700 ">
                You can contact our Customer Service department or drop an
                email.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-[#3734A9] mb-2">
                HOW CAN I SUGGEST IMPROVEMENTS?
              </h2>
              <p className="text-lg text-gray-700">
                You can send us your suggestions using all the contact mediums
                mentioned above. We would be happy to receive your comments and
                suggestions.
              </p>
            </section>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Page;

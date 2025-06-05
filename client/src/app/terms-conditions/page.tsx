
"use client"
import React from 'react';
import Layout from '../components/MainLayout';

function Page() {
  return (
    <Layout>
      <div className="bg-gray-100 text-[#3734A9] py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          {/* Terms & Conditions Section */}
          <section className="mb-8">
            <h2 className="text-4xl font-extrabold text-[#3734A9] mb-4">
              Terms & Conditions
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              This website is operated by{' '}
              <span className="font-bold">maaozofficialstore.shop</span>.
              Throughout the site, the terms “we,” “us,” and “our” refer to{' '}
              <span className="font-bold">maaozofficialstore.shop</span>.
              maaozofficialstore.shop offers this website, including all
              information, tools, and services available from this site to you,
              the user, conditioned upon your acceptance of all terms,
              conditions, policies, and notices stated here.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              {` By visiting our site and/or purchasing something from us, you
              engage in our "Service" and agree to be bound by the following
              terms and conditions ("Terms of Service", "Terms"), including
              those additional terms and conditions and policies referenced
              herein and/or available by hyperlink. These Terms of Service apply
              to all users of the site, including without limitation users who
              are browsers, vendors, customers, merchants, and/or contributors
              of content.`}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Please read these Terms of Service carefully before accessing or
              using our website. By accessing or using any part of the site, you
              agree to be bound by these Terms of Service. If you do not agree
              to all the terms and conditions of this agreement, then you may
              not access the website or use any services. If these Terms of
              Service are considered an offer, acceptance is expressly limited
              to these Terms of Service.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Any new features or tools which are added to the current store
              shall also be subject to the Terms of Service. You can review the
              most current version of the Terms of Service at any time on this
              page. We reserve the right to update, change or replace any part
              of these Terms of Service by posting updates and/or changes to our
              website. It is your responsibility to check this page periodically
              for changes. Your continued use of or access to the website
              following the posting of any changes constitutes acceptance of
              those changes.
            </p>
            {/* <p className="text-lg text-gray-700">
              Our store is hosted on <span className="font-bold">Shopify Inc.</span> They provide us with the online e-commerce platform that allows us to sell our products and services to you.
            </p> */}
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default Page;

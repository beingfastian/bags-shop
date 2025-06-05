'use client';
import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

type FAQ = {
  question: string;
  answer: string | string[];
};

const HomeFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs: FAQ[] = [
    {
      question: 'How can I order?',
      answer:
        'Ordering is simple! Just browse our collection, add your favourite items to the cart, and proceed to checkout. You can pay via bank transfer or cash on delivery (COD).',
    },
    {
      question: 'Can I order Bags or Stationery in bulk quantity?',
      answer:
        'Yes, you can place bulk orders for Bags and Stationery. For inquiries and orders, please contact us on WhatsApp +92 317 5657572.',
    },
    {
      question: 'Will I Receive The Same Products I See In The Photo?',
      answer:
        'Yes, we have made every effort to display as accurately as possible the colors of our products that appear on the website. However, as the actual colors you see will depend on your screen resolution, we cannot guarantee that your screen’s display of any color will accurately reflect the color of the product on delivery.',
    },
    {
      question: 'What types of Bags and School Supplies do you Offer?',
      answer:
        'We offer a variety of Bags, including School Bags, Backpacks, Laptop Bags, Duffle Bags and Office Bags. Our school supplies include pens, pencils, markers, Lunch Box, Water bottles, Pouches and much more.',
    },
    {
      question: 'How Can I Make Sure My Purchase Was Made Correctly?',
      answer:
        'Once you place your order you will receive a confirmation e-mail. If you do not receive the e-mail, contact our Customer Service department at maaozofficialstorehelp@gmail.com.',
    },

    {
      question: 'What is your return and refund policy?',
      answer:
        'If you’re not satisfied with your purchase, you can return the item in its original condition within 7 days. Once approved, refunds will be processed via bank transfer. Note: Sale items are non-refundable.',
    },
    {
      question: 'Can I Place an Order by Phone?',
      answer: [
        ' Browse the Collection – Select a garment type and view the product(s) you are interested in. Click on an item for details, including composition, available sizes, reference number, and price.',
        'Add to Cart – Choose your preferred size and color, then click "Add to Cart."',
        ' Enter Your Information – Fill in your details and verify they are correct. Click "Continue to Shipping."',
        'Continue Shopping or Checkout – You can either keep browsing or proceed to checkout by clicking on your Shopping Cart.',
        ' Select a Payment Method – Choose your preferred payment method, such as Online Bank Transfer or  Cash on Delivery (COD). Note: For COD orders, the billing and shipping address must be the same.',
        'Complete Your Order – Click "Complete Order" to finalize your purchase.',
      ],
    },
    {
      question: 'How long does delivery take?',
      answer:
        'Delivery time varies based on location. Typically, it takes 3-5 business days for major cities and 5-7 days for other areas. You’ll receive tracking details once your order is shipped.',
    },

    {
      question: 'How can I track my order?',
      answer:
        'You can check your order status in order history in the profile section.',
    },
    {
      question: 'Order Cancellation',
      answer:
        'For cash on delivery orders, we follow the practice of verifying orders with a maximum number of 2 confirmation calls., if left unattended your order will be cancelled. Orders can be cancelled upon customers request any time before they are processed, MAAOZ OFFICIAL STORE  may cancel orders for any reasons which may include: Out of stock items, incorrect mobile number or technical errors.',
    },
  ];

  return (
    <div className="flex flex-col items-center px-6 py-12 bg-gradient-to-r from-gray-100 to-gray-200">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#3734A9] text-center font-OpenSans mb-12">
        Frequently Asked Questions
      </h2>

      <div className="flex flex-col md:flex-row items-start justify-center gap-12 max-w-5xl w-full">
        {/* FAQ List */}
        <div className="w-full md:w-2/3">
          <div className="space-y-6">
            {/* {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg p-4 shadow-md transition-transform duration-300 hover:scale-105"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full text-left text-lg font-semibold text-[22px] text-black focus:outline-none"
                >
                  {faq.question}
                  <span className="text-[#3734A9]">
                    {openIndex === index ? <FaTimes /> : <FaPlus />}
                  </span>
                </button>
                {openIndex === index && (
                  <p className="text-base text-gray-700 mt-1 font-OpenSans">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))} */}

            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg p-4 shadow-md transition-transform duration-300 hover:scale-105"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full text-left text-lg font-semibold text-[22px] text-black focus:outline-none"
                >
                  {faq.question}
                  <span className="text-[#3734A9]">
                    {openIndex === index ? <FaTimes /> : <FaPlus />}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="text-base text-gray-700 mt-1 font-OpenSans">
                    {/* Render the answer as a list if it's an array */}
                    {Array.isArray(faq.answer) ? (
                      <ol className="list-decimal pl-6 space-y-2">
                        {faq.answer.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    ) : (
                      <p>{faq.answer}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFaq;

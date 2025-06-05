'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import Layout from '../components/MainLayout';
import { sendMessage } from '@/services/api/ContactUsService';
interface FormData {
  name: string;
  email: string;
  phone: string;
  service: 'general' | 'bags' | 'stationery' | 'custom';
  message: string;
}

// interface ContactInfo {
//   icon: React.ElementType;
//   title: string;
//   details: string;
//   description: string;
// }

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: 'general',
    message: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await sendMessage(formData);
      if (response) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'general',
          message: '',
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen overflow-x-hidden bg-[#93D0E6]">
        <div className="relative pt-5 sm:pt-24 pb-20">
          <div className="relative max-w-7xl mx-auto text-wrap px-4 pt-16 pb-12 text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Trusted Destination
              <span className="block text-[#3734A9]">
                for Premium Stationery & Bags
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our high-quality collection of Bags and Stationery. Find
              the perfect essentials for your needs with us!
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4 mb-16">
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="border border-blue-100 bg-[#C9E8F2] p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-[#3734A9] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                <p className="text-[#3734A9] font-medium mb-1">+923175657572</p>
                <p className="text-gray-600">Mon to Sat: 11:00 am - 6:00 pm </p>
              </div>

              <div className="border border-blue-100 bg-[#C9E8F2] p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-[#3734A9] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                <p className="text-[#3734A9] font-medium mb-1">
                  maaozofficialstorehelp@gmail.com
                </p>
                {/* <p className="text-gray-600">Mon to Sat: 11:00 am - 6:00 pm </p> */}
              </div>

              <div className="border border-blue-100 bg-[#C9E8F2] p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-[#3734A9] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Visit Us
                </h3>
                <p className="text-[#3734A9] font-medium mb-1">
                  I-161 Chittian Hittian, Iqbal Road, Committee Chowk, Rawalpindi
                </p>
                <p className="text-gray-600">Rawalpindi, Pakistan</p>
              </div>

              <div className="border border-blue-100 bg-[#C9E8F2] p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-[#3734A9] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Services
                </h3>
                <p className="text-[#3734A9] font-bold text-2xl mb-1 text-center">
                  24/7 Support
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-[#C9E8F2] shadow-lg rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <MessageSquare className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600">
                    We will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Product Category
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="bags">Bags & Backpacks</option>
                        <option value="stationery">Stationery Items</option>
                        <option value="custom">Custom Orders</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#3734A9] hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;

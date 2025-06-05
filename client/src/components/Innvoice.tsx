'use client';

import React, { useState } from 'react';
import {
  Building2,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  Truck,
  Package,
  Clock,
  CheckCircle2,
  Phone,
  Image as ImageIcon,
  User,
  LocateIcon,
  MapIcon,
  PoundSterling,
  Copy,
  CheckCheck,
  Printer,
  Download,
  Share2,
  Disc2Icon,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface Address {
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
}

interface Payment {
  payment_method: string;
  payment_status: string;
  transfer_screenshot: string;
  transaction_id: string;
  amount: string;
}

interface Order {
  status: string;
  createdAt: string;
  Address: Address;
  Payment: Payment;
  trackingId: string;
}

interface InvoiceItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  image: string;
}

interface InvoiceProps {
  invoiceNumber: string;
  customerName: string;
  delivery_fee: number;
  customerEmail: string;
  items: InvoiceItem[];
  companyName: string;
  companyAddress: string;
  companyLogo?: string;
  companyEmail: string;
  companyPhone: string;
  order: Order;
}

interface Totals {
  subtotal: number;
  deliveryCharge: number;
  total: number;
}

const CopyButton: React.FC<{ text: string; label: string }> = ({
  text,
  label,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative flex items-center hover:bg-gray-100 p-1 rounded-lg transition-colors"
      title={`Copy ${label}`}
    >
      {copied ? (
        <CheckCheck className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
      )}
      <span className="sr-only">Copy {label}</span>
    </button>
  );
};

const InfoCard: React.FC<{ icon: any; label: string; value: string }> = ({
  icon: Icon,
  label,
  value,
}) => (
  <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="flex-shrink-0">
      <Icon className="h-5 w-5 text-[#3734A9]" />
    </div>
    <div className="flex-grow">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
    <CopyButton text={value} label={label} />
  </div>
);

const ActionButton: React.FC<{
  icon: any;
  label: string;
  onClick: () => void;
}> = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-lg rounded-lg hover:bg-white/30 transition-colors"
  >
    <Icon className="h-5 w-5 mr-2 text-white" />
    <span className="text-white font-medium">{label}</span>
  </button>
);

const ProfessionalInvoice: React.FC<InvoiceProps> = ({
  invoiceNumber,
  customerName,
  customerEmail,
  delivery_fee,
  items = [],
  companyName,
  companyAddress,
  companyLogo,
  companyEmail,
  companyPhone,
  order,
}) => {
  const calculateTotals = (): Totals => {
    const subtotal = items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    const deliveryCharge = delivery_fee || 0;
    return {
      subtotal,
      deliveryCharge,
      total: subtotal + deliveryCharge,
    };
  };

  console.log('order', order);
  const { subtotal, deliveryCharge, total } = calculateTotals();

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(order.createdAt));

  const getStatusColor = (status: Order['status']): string => {
    const statusColors: Record<Order['status'], string> = {
      pending:
        'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 border-amber-200',
      processing:
        'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200',
      completed:
        'bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200',
      cancelled:
        'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200',
    };
    return statusColors[status];
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    try {
      // Get the invoice element
      console.log('downlaod is called');
      const invoiceElement = document.querySelector('.invoice-container');
      if (!invoiceElement) return;

      // Create a canvas from the invoice element
      const canvas = await html2canvas(invoiceElement as any, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS for images
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Create PDF
      const pdf = new jsPDF({
        format: 'a4',
        unit: 'px',
      });

      // Calculate dimensions
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to PDF
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        imgWidth,
        imgHeight
      );

      // Download PDF
      pdf.save(`Invoice-${invoiceNumber}.pdf`);
    } catch (error) {
      console.error('Failed to download invoice:', error);
      alert('Failed to download invoice. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Invoice #${invoiceNumber}`,
        text: `Invoice from ${companyName} for ${customerName}`,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  console.log('data');

  return (
    <div className="min-h-screen invoice-container bg-gray-100 py-8 print:py-0 print:bg-white">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden print:shadow-none">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-[#3734A9] via-[#4040B5] to-[#545AED] p-6 md:p-10 print:break-inside-avoid">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex items-start space-x-6">
              {companyLogo ? (
                <img
                  src={companyLogo}
                  alt={companyName}
                  className="h-16 w-16 object-contain bg-white p-2 rounded-xl"
                />
              ) : (
                <div className="bg-white/20 backdrop-blur-lg p-4 rounded-xl">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
              )}
              <div className="text-white">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {companyName}
                </h1>
                <div className="mt-4 space-y-2 text-sm text-gray-100">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 opacity-80" />
                    <p className="font-medium">{companyAddress}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 opacity-80" />
                    <p className="font-medium">
                      {'maaozofficialstorehelp@gmail.com'}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 opacity-80" />
                    <p className="font-medium">{'+92 317 5657572'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <ActionButton
                    icon={Printer}
                    label="Print"
                    onClick={handlePrint}
                  />
                  <ActionButton
                    icon={Download}
                    label="Download"
                    onClick={handleDownload}
                  />
                  <ActionButton
                    icon={Share2}
                    label="Share"
                    onClick={handleShare}
                  />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Invoice</h2>
                <div className="space-y-3 text-gray-100 text-sm">
                  <p className="flex items-center justify-end font-medium">
                    <FileText className="h-5 w-5 mr-2 opacity-80" />#
                    {invoiceNumber}
                  </p>
                  <p className="flex items-center justify-end font-medium">
                    <Calendar className="h-5 w-5 mr-2 opacity-80" />
                    {formattedDate}
                  </p>
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {order.status.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client & Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 pb-4 mb-6 border-b border-gray-200 flex items-center">
              <Package className="h-6 w-6 mr-3 text-[#3734A9]" />
              Client Information
            </h3>
            <div className="space-y-4">
              <InfoCard icon={User} label="Full Name" value={customerName} />

              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h4 className="font-semibold text-gray-700 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-[#3734A9]" />
                  Address Details
                </h4>
                <InfoCard
                  icon={LocateIcon}
                  label="Street Address"
                  value={order?.Address?.street_address}
                />
                <InfoCard
                  icon={User}
                  label="City"
                  value={order?.Address?.city}
                />
                <InfoCard
                  icon={MapIcon}
                  label="State"
                  value={order?.Address?.state}
                />
                <InfoCard
                  icon={PoundSterling}
                  label="Postal Code"
                  value={order?.Address?.postal_code}
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h4 className="font-semibold text-gray-700 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-[#3734A9]" />
                  Contact Information
                </h4>
                <InfoCard icon={Mail} label="Email" value={customerEmail} />
                <InfoCard
                  icon={Phone}
                  label="Phone"
                  value={order?.Address?.phone}
                />
              </div>
            </div>
          </div>

          {/* Payment Information Section */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 pb-4 mb-6 border-b border-gray-200 flex items-center">
              <CreditCard className="h-6 w-6 mr-3 text-[#3734A9]" />
              Payment Information
            </h3>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h4 className="font-semibold text-gray-700 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-[#3734A9]" />
                  Payment Details
                </h4>
                <InfoCard
                  icon={CreditCard}
                  label="Payment Method"
                  value={order?.Payment?.payment_method.replace(/_/g, ' ')}
                />
                <InfoCard
                  icon={CheckCircle2}
                  label="Payment Status"
                  value={order?.Payment?.payment_status}
                />

                <InfoCard
                  icon={CheckCircle2}
                  label="transaction Id"
                  value={order?.Payment?.transaction_id}
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h4 className="font-semibold text-gray-700 flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-[#3734A9]" />
                  Shipping Details
                </h4>
                <InfoCard
                  icon={Truck}
                  label="Tracking ID"
                  value={order.trackingId}
                />
              </div>

              {/* <div className="mt-4 cursor-pointer">
                <a 
                  href={order.Payment.transfer_screenshot} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center w-full px-4 py-3 bg-[#3734A9] text-white rounded-xl hover:bg-[#545AED] transition-colors"
                >
                  <ImageIcon className="h-5 w-5 mr-2" />
                  View Payment Screenshot
                </a>
              </div> */}

              {order.Payment.payment_method != 'cash_on_delivery' ? (
                <div className="mt-4 cursor-pointer">
                  <a
                    href={order.Payment.transfer_screenshot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-3 bg-[#3734A9] text-white rounded-xl hover:bg-[#545AED] transition-colors"
                  >
                    <ImageIcon className="h-5 w-5 mr-2" />
                    View Payment Screenshot
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="p-6 text-nowrap md:p-10">
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <th className="px-4 md:px-6 py-4 md:py-5 text-left text-sm font-bold text-gray-900">
                    Product
                  </th>
                  <th className="px-4 md:px-6 py-4 md:py-5 text-left text-sm font-bold text-gray-900">
                    Name
                  </th>
                  <th className="px-4 md:px-6 py-4 md:py-5 text-center text-sm font-bold text-gray-900">
                    Qty
                  </th>
                  <th className="px-4 md:px-6 py-4 md:py-5 text-right text-sm font-bold text-gray-900">
                    Unit Price
                  </th>
                  <th className="px-4 md:px-6 py-4 md:py-5 text-right text-sm font-bold text-gray-900">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 md:px-6 py-4 md:py-5">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 md:h-20 md:w-20 object-cover rounded-xl shadow-sm"
                        />
                        <span className="font-semibold text-gray-900 md:hidden">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 md:py-5 hidden md:table-cell">
                      <div className="font-semibold text-gray-900">
                        {item.name}
                      </div>
                      {/* {item.description && (
                        <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                      )} */}
                    </td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-center font-medium">
                      {item.quantity}
                    </td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-right">
                      PKR{' '}
                      {item.price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-4 md:px-6 py-4 md:py-5 text-right font-semibold text-gray-900">
                      PKR{' '}
                      {(item.quantity * item.price).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Totals */}
        <div className="p-6 md:p-10 bg-gradient-to-b from-white to-gray-50">
          <div className="ml-auto w-full md:w-96">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-100 space-y-4">
              <div className="flex justify-between text-gray-600">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">
                  PKR{' '}
                  {subtotal.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center font-medium">
                  <Truck className="h-5 w-5 mr-2 text-[#3734A9]" />
                  Delivery Charges
                </span>
                <span className="font-semibold">
                  PKR{' '}
                  {deliveryCharge.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span className="flex items-center font-medium">
                  <Disc2Icon className="h-5 w-5 mr-2 text-[#3734A9]" />
                  Discount
                </span>
                <span className="font-semibold">
                  PKR{' '}
                  {(parseFloat(total as any) -
                    parseFloat(order?.Payment?.amount)).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-lg md:text-xl font-bold text-gray-900 pt-6 border-t">
                <span className="flex items-center">
                  {/* <DollarSign className="h-6 w-6 mr-2 text-[#3734A9]" /> */}
                  Total Amount
                </span>
                <span>PKR {order?.Payment?.amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="p-6 md:p-10 bg-gradient-to-r from-[#3734A9] via-[#4040B5] to-[#545AED]">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
              <div className="flex items-center text-white">
                <Mail className="h-5 w-5 mr-2" />
                <span className="font-medium">{companyEmail}</span>
              </div>
              <div className="hidden md:block text-white/40">|</div>
              <div className="flex items-center text-white">
                <Phone className="h-5 w-5 mr-2" />
                <span className="font-medium">{companyPhone}</span>
              </div>
            </div>
            <p className="text-white text-sm md:text-base font-medium">
              Thank you for your business! For any questions or concerns, please
              do not hesitate to contact our support team.
            </p>
            <div className="pt-4 text-white/80 text-sm">
              <p>Invoice generated on {formattedDate}</p>
              <p>Invoice ID: #{invoiceNumber}</p>
            </div>
          </div>
        </div>

        {/* Print Styles */}
        <style>
          {`
            @media print {
              @page {
                margin: 0;
                size: A4;
              }
              body {
                margin: 1.6cm;
              }
              .print\\:hidden {
                display: none !important;
              }
              .print\\:break-inside-avoid {
                break-inside: avoid;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ProfessionalInvoice;

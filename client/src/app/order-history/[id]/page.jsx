'use client';
import React, { useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { useSingleOrder } from '@/hooks/useOrder';
// import Invoice from '@/components/Innvoice';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/app/components/MainLayout';
import dynamic from 'next/dynamic';

const Invoice = dynamic(() => import('@/components/Innvoice'), {
  ssr: false,
});

function Page() {
  const params = useParams();
  const id = params.id;
  const { data: order } = useSingleOrder(id);

  const router = useRouter();

  const onClick = () => {
    router?.push('/order-history');
  };

  useEffect(() => {
    console.log('Useorder', order);
  }, [order]);

  return (
    <Layout>
      <div className="w-full px-6 py-4">
        <div>
          <h1 className="text-[#131523] text-2xl font-Inter font-bold leading-9">
            Order Details
          </h1>
          <div
            className="flex items-center gap-1.5 w-10 cursor-pointer"
            onClick={onClick}
          >
            <span className="mt-0.5">
              <ArrowLeft />
            </span>
            <h1 className="text-[#5A607F] text-sm font-OpenSans font-bold leading-5">
              Back
            </h1>
          </div>
        </div>
        {order && (
          <Invoice
            invoiceNumber={order.id}
            customerName={`${order?.User?.display_name || ''} ${order?.User?.last_name || ''}`.trim()}
            customerEmail={order?.User?.email || ''}
            delivery_fee={order?.delivery_fee}
            items={
              order?.OrderItems?.map((item) => ({
                id: item.id,
                name: item.Variant?.Product?.name || 'Product',
                quantity: item.quantity,
                price: item.unit_price,
                image: item.Variant?.image,
              })) || []
            }
            companyName="Maaoz Official Store"
            companyAddress="I-161 Chittian Hittian, Iqbal Road, Committee Chowk, Rawalpindi"
            order={order}
          />
        )}
      </div>
    </Layout>
  );
}

export default Page;

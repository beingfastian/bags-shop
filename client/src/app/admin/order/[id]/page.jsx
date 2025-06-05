'use client';

import React, { useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { useSingleOrder } from '@/hooks/useOrder';
// import Invoice from '@/components/Innvoice';
import { BackIcon } from '../../dashboard/_components/Icons';
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
    router?.back();
  };

  useEffect(() => {
    console.log('Useorder', order);
  }, [order]);

  return (
    <div className="w-full px-6 py-4">
      <div>
        <h1 className="text-[#131523] text-2xl font-Inter font-bold leading-9">
          Order Details
        </h1>
        <div
          className="!max-w-[80px] flex cursor-pointer  py-1 px-2 border rounded bg-primary  justify-center items-center text-xl"
          onClick={onClick}
        >
          <BackIcon /> <p className="mb-1 text-white">back</p>
        </div>
      </div>
      {order && (
        <Invoice
          invoiceNumber={order?.id}
          customerName={`${order?.User?.display_name || ''} ${order?.User?.last_name || ''}`.trim()}
          customerEmail={order?.User?.email || ''}
          delivery_fee={order?.delivery_fee}
          items={
            order?.OrderItems?.map((item) => ({
              id: item?.id,
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
  );
}

export default Page;

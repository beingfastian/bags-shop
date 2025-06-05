'use client';

import React, { useEffect, useMemo } from 'react';
// import ProductList from '../components/ProductList';
import { useRouter } from 'next/navigation';
import Checkout from '../components/CheckoutCard';
// import { Product } from '@/types/product';
import Layout from '../components/MainLayout';
import { useGetCart } from '@/hooks/useCart';
import ProductList from '../components/ProductList';
import { useProducts } from '@/hooks/useProducts';
// import { useGetCart } from '@/hooks/useCart';

function Page() {
  const router = useRouter();
  const viewProducts = () => {
    router?.push('/products');
  };

  const { data: cartData } = useGetCart();

  console.log(cartData, 'products');

  useEffect(() => {
    if (cartData?.items) {
      cartData.items.forEach((item) => {
        console.log(item?.Variant?.Product?.category_id, 'products');
      });
    }
  }, [cartData?.items]);

  const category = useMemo(
    () =>
      cartData?.items?.map((item) => item?.Variant?.Product?.category_id) || [],
    [cartData]
  ) as string[];

  const { data, isLoading } = useProducts({
    categories: category,
  });

  console.log(data, isLoading);

  // const productsData: Product[] = [];

  return (
    <div>
      {/* <p className='text-center border-b text-sm py-1 text-primary font-semibold'> Free Delivery Charges on Order Above 1000Rs !</p>
      <NavBar /> */}
      <Layout>
        <div>
          <Checkout />
        </div>
        <div className="mt-10 px-6 sm:px-10 md:px-32">
          <div className="flex items-center gap-3">
            <span className="w-5 h-10 bg-primary rounded-[4px] flex"></span>
            <h1 className="text-primary text-base font-poppins font-semibold leading-5">
              This Month
            </h1>
          </div>
          <div className="flex items-center justify-between mt-3">
            <h1 className="sm:text-2xl lg:text-4xl font-OpenSans font-semibold leading-[48px]">
              Related Products
            </h1>
            <button
              onClick={viewProducts}
              className="bg-primary rounded-md px-6 py-1.5 text-[#FAFAFA] text-[15px] font-poppins font-medium"
            >
              Veiw All
            </button>
          </div>
          <div className="py-5">
            <ProductList products={data?.data as any} className="" />
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Page;

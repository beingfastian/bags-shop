'use client';

import dynamic from 'next/dynamic';

import { Price } from './_components/Icons';
import { useDashboard } from '@/hooks/useDashbaord';

const Card = dynamic(() => import('./_components/Card'), {
  ssr: false,
});

const OrderOverTime = dynamic(() => import('./_components/OrderOverTime'), {
  ssr: false,
});
// const WeekSale = dynamic(() => import('./_components/WeekSale'), {
//   ssr: false,
// });
const RecentOrders = dynamic(() => import('./_components/RecentOrders'), {
  ssr: false,
});
const Header = dynamic(() => import('./_components/Header'), {
  ssr: false,
});
const TopProducts = dynamic(() => import('./_components/TopProducts'), {
  ssr: false,
});
const BarChart = dynamic(() => import('./_components/BarChart'), {
  ssr: false,
});

function Page() {
  const { data } = useDashboard({
    // startDate: new Date().toISOString().split('T')[0],
    // endDate: '2025-01-01',
  });

  return (
    <>
      <Header />
      <div className="px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* {cardData?.map((item, index) => (
           
          ))} */}

          <Card
            price={data?.totalRevenue || 0}
            title={'Total Revenue'}
            // percentage={item?.percentage}
            icon={<Price />}
          />

          <Card
            price={data?.dailyRevenue || 0}
            title={'Daily Revenue'}
            // percentage={item?.percentage}
            icon={<Price />}
          />
          <BarChart
            price={data?.uniqueVisitors?.count || 0}
            title={'unique visitor'}
            percentage={'10.5'}
            color="#FFC700"
          />
          <BarChart
            price={data?.allVisitors?.count || 0}
            title={'Total visitor'}
            percentage={'10.5'}
            color="#1FD286"
          />
          <BarChart
            price={data?.allUsers?.count || 0}
            title={'Total Users'}
            percentage={'10.5'}
            color="#1E5EFF"
          />
        </div>
        <div className="w-full flex flex-col md:flex-row mt-4 gap-5">
          <div className="w-full  bg-white shadow-revenueCard p-3 rounded-md">
            <OrderOverTime data={data?.revenuePeriod || []} />
          </div>
          {/* <div className="w-full md:w-1/4">
            <WeekSale />
          </div> */}
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6 pb-5">
          <RecentOrders />
          <TopProducts />
        </div>
      </div>
    </>
  );
}

export default Page;

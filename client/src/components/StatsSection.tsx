'use client';
import { useQuery } from '@tanstack/react-query';
import { getTotalOrdersCount } from '@/services/api/orderService';
import { useEffect, useState } from 'react';

const StatsSection = () => {
  const [displayCount, setDisplayCount] = useState(0);
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['totalOrdersCount'],
    queryFn: getTotalOrdersCount,
    retry: 3, // Retry 3 times before failing
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
    refetchOnWindowFocus: false, // Don't refetch when window gains focus
  });

  // Log errors for debugging
  useEffect(() => {
    if (isError) {
      console.error('Orders count API error:', error);
    }
  }, [isError, error]);

  // Animated counter effect
  useEffect(() => {
    if (data?.totalOrders) {
      let start = 0;
      const end = data.totalOrders;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 50);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayCount(end);
          clearInterval(timer);
        } else {
          setDisplayCount(Math.floor(start));
        }
      }, 50);

      return () => clearInterval(timer);
    }
  }, [data?.totalOrders]);

  // Don't hide on error, show fallback instead

  return (
    <div className="bg-gradient-to-r from-[#b9e1ef] to-[#78c3df] py-8 px-6 rounded-lg shadow-lg">
      <div className="text-center">
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {/* Total Orders Stat */}
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {isLoading ? (
                <div className="animate-pulse bg-primary/20 rounded h-12 w-20"></div>
              ) : isError ? (
                <span className="font-OpenSans">1000+</span>
              ) : (
                <span className="font-OpenSans">
                  {displayCount.toLocaleString()}+
                </span>
              )}
            </div>
            <p className="text-primary font-semibold text-lg font-OpenSans">
              Happy Customers
            </p>
            <p className="text-primary/80 text-sm font-OpenSans">
              Orders Delivered Successfully
            </p>
          </div>

          {/* Additional stats can be added here */}
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-primary mb-2 font-OpenSans">
              100%
            </div>
            <p className="text-primary font-semibold text-lg font-OpenSans">
              Quality Assured
            </p>
            <p className="text-primary/80 text-sm font-OpenSans">
              Premium Products Only
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-primary mb-2 font-OpenSans">
              24/7
            </div>
            <p className="text-primary font-semibold text-lg font-OpenSans">
              Customer Support
            </p>
            <p className="text-primary/80 text-sm font-OpenSans">
              Always Here to Help
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
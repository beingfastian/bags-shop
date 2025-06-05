'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { ArrowUp } from './Icons';

// Dynamically import ReactApexChart to avoid server-side rendering issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface Props {
  price: number;
  title: string;
  percentage: string;
  color?: string;
}

function Card({ price, title, percentage, color = '#FFC400' }: Props) {
  // Chart configuration options
  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 60,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '80%',
        borderRadius: 4,
      },
    },
    colors: [color], // Customize bar color
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], // Example categories
    },
    tooltip: {
      enabled: false,
    },
  };

  // Example chart data
  const chartSeries = [
    {
      name: 'Data',
      data: [20, 30, 50, 30, 20], // Replace with dynamic data if needed
    },
  ];

  return (
    <div className="w-full bg-white gap-1 flex flex-wrap items-center justify-between shadow-revenueCard px-3 py-1 rounded-md">
      <div>
        <h1 className="text-[#131523] text-base font-Inter font-bold">
          {price}
        </h1>
        <h1 className="text-[#5A607F] text-[10px] font-Inter">{title}</h1>
        <h1 className="text-[#06A561] text-[10px] font-Inter flex items-center gap-2">
          {percentage}
          <span>
            <ArrowUp />
          </span>
        </h1>
      </div>
      {/* Replace icon with the chart */}
      <div className="flex items-center justify-center">
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={30}
          width={60}
        />
      </div>
    </div>
  );
}

export default Card;

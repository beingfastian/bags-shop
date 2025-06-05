'use client';
import React from 'react';
import Chart from 'react-apexcharts';

function WeekSale() {
  const chartData = {
    series: [
      {
        name: 'Revenue',
        data: [1500, 2000, 1800, 5000, 2200, 3200, 2600], // Sample data for each day
      },
    ],
    options: {
      chart: {
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      colors: ['#00E396'],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['12', '13', '14', '15', '16', '17', '18'], // Days of the month
      },
      yaxis: {
        show: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: '30%',
        },
      },
    },
  };
  return (
    <div className="bg-white shadow-revenueCard rounded-md px-4 py-2">
      <h1 className="text-[#131523] text-base font-OpenSans font-bold leading-6">
        Last 7 Days Sales
      </h1>
      <div className="mt-3">
        <h1 className="text-[#131523] text-xl font-Inter font-bold">1,259</h1>
        <h2 className="text-[#5A607F] text-sm font-Inter">Items Sold</h2>
      </div>
      <div className="mt-3">
        <h1 className="text-[#131523] text-xl font-Inter font-bold">Rs:12,546</h1>
        <h2 className="text-[#5A607F] text-sm font-Inter">Revenue</h2>
      </div>
      <div className="w-full h-[0.5px] bg-[#E6E9F4] mt-6" />
      <Chart
        options={chartData.options as any}
        series={chartData.series}
        type="bar"
        height={170}
      />
    </div>
  );
}

export default WeekSale;

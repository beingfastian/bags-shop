import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface Data {
  date: string;
  totalAmount: number;
}

interface Props {
  data: Data[];
}

const DualAxisChart = ({ data }: Props) => {
  const chartData = {
    series: [
      {
        name: 'Total Amount',
        data: data.map((item) => item.totalAmount),
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: { show: false },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      colors: ['#2563EB', '#EAB308'],
      xaxis: {
        type: 'datetime',
        categories: data.map((item) => item.date),
        labels: {
          style: { colors: '#6B7280' },
        },
      },
      yaxis: [
        {
          title: { text: 'Total Amount', style: { color: '#2563EB' } },
          labels: { style: { colors: '#2563EB' } },
        },
      ],
      tooltip: {
        x: { format: 'yyyy-MM-dd HH:mm' },
      },
      legend: {
        show: true,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options as any}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default DualAxisChart;

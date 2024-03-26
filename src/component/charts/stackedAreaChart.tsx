import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface StackedAreaChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      fill: boolean;
    }[];
  };
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({ data }) => {
  return (
    <div className="bg-white border-secondary border-2 flex flex-col gap-8 text-center pt-4 items-center">
    <h3 className="libre-baskerville-bold tracking-widest border-b-2 text-secondary-dark border-secondary pb-4 w-8.5/10">
      Stacked Area Chart
    </h3>    <Line 
      data={data} 
      options={{
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          }
        }
      }} 
    />
    </div>
  );
};

export default StackedAreaChart;

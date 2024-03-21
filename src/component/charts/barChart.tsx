import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  title?: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white border-secondary border-2 flex flex-col gap-8 text-center pt-4 items-center">
      <h3 className="libre-baskerville-bold tracking-widest border-b-2 text-secondary-dark border-secondary pb-4 w-8.5/10">{title}</h3>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;

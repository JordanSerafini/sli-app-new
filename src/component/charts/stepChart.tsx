import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StepChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      fill: boolean;
      tension: number;
      stepped: boolean | "before" | "after" | "middle";
    }[];
  };
}

const StepChart: React.FC<StepChartProps> = ({ data }) => {
  return (
    <div className="bg-white border-secondary border-2 flex flex-col gap-8 text-center pt-4 items-center">
    <h3 className="libre-baskerville-bold tracking-widest border-b-2 text-secondary-dark border-secondary pb-4 w-8.5/10">
      Step Chart
    </h3>      {" "}
      <Line
        data={data}
        options={{ elements: { line: { tension: 0, stepped: true } } }}
      />
      
    </div>
  );
};

export default StepChart;

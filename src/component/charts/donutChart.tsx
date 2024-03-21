import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Enregistrement des composants nécessaires de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  return (
    <div className="bg-white border-secondary border-2 flex flex-col gap-8 text-center pt-4 items-center">
      <h3 className="libre-baskerville-bold tracking-widest border-b-2 text-secondary-dark border-secondary pb-4 w-8.5/10">
        Donut Chart
      </h3>{" "}
      <div className="bg-white">
        {" "}
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default DonutChart;

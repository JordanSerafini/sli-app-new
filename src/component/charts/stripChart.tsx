import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Enregistrement des composants nécessaires
ChartJS.register(LinearScale, PointElement, Title, Tooltip, Legend);

interface StripChartProps {
  data: {
    datasets: {
      label: string;
      data: { x: number; y: number }[];
      backgroundColor: string;
    }[];
  };
}

const StripChart: React.FC<StripChartProps> = ({ data }) => {
  return (
    <div className="bg-white border-secondary border-2 flex flex-col gap-8 text-center pt-4 items-center">
    <h3 className="libre-baskerville-bold tracking-widest border-b-2 text-secondary-dark border-secondary pb-4 w-8.5/10">
      Strip Chart
    </h3>      {" "}
      <Scatter
        data={data}
        options={{
          scales: {
            x: {
              type: "linear",
              position: "bottom",
            },
            y: {
              // Configuration spécifique pour simuler un Strip Chart
              beginAtZero: true,
            },
          },
        }}
      />
      
    </div>
  );
};

export default StripChart;

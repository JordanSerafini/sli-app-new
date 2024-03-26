import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface PolarChartProps {
  data: ChartData<"polarArea", number[], string>;
}

const PolarChart: React.FC<PolarChartProps> = ({ data }) => {
  return (
    <div className="bg-white border-secondary border-2 flex flex-col gap-8 text-center pt-4 items-center">
    <h3 className="libre-baskerville-bold tracking-widest border-b-2 text-secondary-dark border-secondary pb-4 w-8.5/10">
      Polar Chart
    </h3>      {" "}
      <PolarArea data={data} />
    </div>
  );
};

export default PolarChart;

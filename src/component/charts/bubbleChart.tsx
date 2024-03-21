import React from "react";
import { Bubble } from "react-chartjs-2";
import { Chart as ChartJS, ChartData, Tooltip, Legend } from "chart.js";

ChartJS.register(Tooltip, Legend);

interface BubbleChartProps {
  data: ChartData<"bubble">;
}

const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
  return (
    <div className="bg-white border-secondary border-2 flex flex-col gap-8 text-center pt-4 items-center">
    <h3 className="libre-baskerville-bold tracking-widest border-b-2 text-secondary-dark border-secondary pb-4 w-8.5/10">
      Bubble Chart
    </h3>      <Bubble data={data} />
    </div>
  );
};

export default BubbleChart;

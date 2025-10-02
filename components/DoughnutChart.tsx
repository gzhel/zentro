"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accountNames = accounts.map((a) => a.name);
  const balances = accounts.map((a) => a.currentBalance);

  const data: ChartData<"doughnut", number[], string> = {
    labels: accountNames,
    datasets: [
      {
        label: "Banks",
        data: balances,
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Doughnut data={data as unknown as any} options={options} />;
};

export default DoughnutChart;

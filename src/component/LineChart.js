import React from "react";
import { Line } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ options,ChartData }) {
  return <Line options={options} data={ChartData} />;
}
export default LineChart;
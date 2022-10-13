import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const LineChart = () => {
  const labels = ["jan", "feb", "mar", "april", "may", "june", "july"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Monthwise Interview Data",
        data: [5, 6, 8, 4, 2, 5, 4],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };
  return (
    <>
      <div style={{ width: "50%",marginLeft:'27%',marginTop:'3%'}}>
        <Line data={data} />
      </div>
    </>
  );
};

export default LineChart;

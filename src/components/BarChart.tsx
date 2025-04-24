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
import { PlayerData } from "@/utils/playerData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: PlayerData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((player) => player.name),
    datasets: [
      {
        label: "Sessions",
        data: data.map((player) => player.sessions),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Time Played (hours)",
        data: data.map((player) => Math.round(player.playerTime / 3600)),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      // {
      //   label: "Healing",
      //   data: data.map((player) => player.healing),
      //   backgroundColor: "rgba(54, 149, 229, 0.2)",
      //   fill: true,
      // },
      // {
      //   label: "Games",
      //   data: data.map((player) => player.games),
      //   backgroundColor: "rgba(95, 212, 12, 0.6)",
      // },
      // {
      //   label: "Wins",
      //   data: data.map((player) => player.wins),
      //   backgroundColor: "rgba(54, 162, 235, 0.6)",
      // },
      // {
      //   label: "Kills",
      //   data: data.map((player) => player.kills),
      //   backgroundColor: "rgba(255, 99, 132, 0.6)",
      // },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Player Performance - Sessions, and Time Played",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;

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
import { PlayerData } from "@/utils/playerData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: PlayerData[];
}

const LineChart = ({ data }: { data: PlayerData[] }) => {
  const chartData = {
    labels: data.map((player) => player.name),
    datasets: [
      // {
      //   label: "Time Played (hours)",
      //   data: data.map((player) => Math.round(player.playerTime / 3600)),
      //   borderColor: "rgba(75, 192, 192, 1)",
      //   backgroundColor: "rgba(75, 192, 192, 0.2)",
      //   fill: true,
      // },
      //   {
      //     label: "Healing",
      //     data: data.map((player) => player.healing),
      //     borderColor: "rgba(54, 149, 229, 1)",
      //     backgroundColor: "rgba(54, 149, 229, 0.2)",
      //     fill: true,
      //   },
      {
        label: "Games",
        data: data.map((player) => player.games),
        borderColor: "rgba(95, 212, 12, 1)",
        backgroundColor: "rgba(95, 212, 12, 0.6)",
      },
      {
        label: "Wins",
        data: data.map((player) => player.wins),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Kills",
        data: data.map((player) => player.kills),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Deaths",
        data: data.map((player) => player.deaths),
        borderColor: "rgba(239, 15, 67, 1)",
        backgroundColor: "rgba(239, 15, 67, 0.2)",
        fill: true,
      },
      {
        label: "Treasures",
        data: data.map((player) => player.treasures),
        borderColor: "rgba(252, 255, 30, 1)",
        backgroundColor: "rgba(252, 255, 30, 0.2)",
        fill: true,
      },
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
        text: "Games, Wins, Kills, Deaths and Treasure of Player",
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;

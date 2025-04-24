import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { PlayerData } from "@/utils/playerData";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: PlayerData[];
}

export const PlayerStatsPieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = {
    labels: [
      "Mitigation",
      "Healing",
      "Damage",
      "Gold",
      "Kills",
      "Deaths",
      "Assists",
      "Treasures",
      "Games",
      "Wins",
    ],
    datasets: [
      {
        label: "Mitigation",
        data: data.map((player) => player.mitigation),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        hoverOffset: 20,
        borderWidth: 0.5,
      },
      {
        label: "Healing",
        data: data.map((player) => player.healing),
        backgroundColor: "rgba(155, 49, 150, 0.75)",
        hoverOffset: 20,
        borderWidth: 0.5,
      },
      {
        label: "Damage",
        data: data.map((player) => player.damage),
        backgroundColor: "rgba(135, 206, 235, 0.5)",
        hoverOffset: 20,
        borderWidth: 0.5,
      },
      {
        label: "Gold",
        data: data.map((player) => player.gold),
        backgroundColor: "rgba(255, 127, 80, 0.5)",
        hoverOffset: 20,
        borderWidth: 0.5,
      },
      {
        label: "Kills",
        data: data.map((player) => player.kills),
        backgroundColor: "rgba(34, 139, 34, 0.75)",
        hoverOffset: 20,
        borderWidth: 0.5,
      },
      {
        label: "Deaths",
        data: data.map((player) => player.deaths),
        backgroundColor: "rgba(218, 165, 32, 1)",
        hoverOffset: 20,
        borderWidth: 0.5,
      },
      {
        label: "Assists",
        data: data.map((player) => player.assists),
        backgroundColor: "rgba(99, 255, 132, 0.5)",
        hoverOffset: 20,
        borderWidth: 0.5,
      },
      {
        label: "Treasures",
        data: data.map((player) => player.treasures),
        backgroundColor: "rgba(199, 21, 133, 1)",
        hoverOffset: 20,
        borderWidth: 0.5,
      },
      {
        label: "Games",
        data: data.map((player) => player.games),
        backgroundColor: "rgba(112, 40, 199, 0.75)",
        hoverOffset: 20,
        borderWidth: 0.5,
      },
      {
        label: "Wins",
        data: data.map((player) => player.wins),
        backgroundColor: "rgba(221, 160, 200, 1)",
        hoverOffset: 20,
        borderWidth: 0.25,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          generateLabels: function (chart: any) {
            const datasets = chart.data.datasets;
            return datasets.map((dataset: any) => ({
              text: dataset.label,
              fontColor: "rgba(91, 91, 90, 1)",
              fillStyle: dataset.backgroundColor,
              strokeStyle: "rgba(255, 255, 255, 1)",
              hidden: false,
            }));
          },
        },
      },
      title: {
        display: true,
        text: "Players data Proportions",
      },
      tooltip: {
        callbacks: {
          title: function () {
            return "";
          },
          label: function (tooltipItem: any) {
            const datasetIndex = tooltipItem.datasetIndex;
            const dataIndex = tooltipItem.dataIndex;

            const chart = tooltipItem.chart;

            const player = data[dataIndex];

            const datasetLabel = chart.data.datasets[datasetIndex].label;
            const value = chart.data.datasets[datasetIndex].data[dataIndex];

            return `${player.name} - ${datasetLabel}: ${value}`;
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

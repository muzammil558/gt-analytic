import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, Tooltip, Legend } from "chart.js";
import { PlayerData } from "@/utils/playerData";

ChartJS.register(RadialLinearScale, Tooltip, Legend);

interface PolarAreaChartProps {
  data: PlayerData[];
}

export const PlayerStatsPolarAreaChart: React.FC<PolarAreaChartProps> = ({
  data,
}) => {
  const chartData = {
    labels: data.map((player) => player.name),
    datasets: [
      //   {
      //     label: "Damage",
      //     data: data.map((player) => player.damage),
      //     backgroundColor: data.map(
      //       (_, index) =>
      //         `rgba(${255 - index * 40}, ${99 + index * 30}, 132, 0.5)`
      //     ),
      //   },
      {
        label: "Games",
        data: data.map((player) => player.games),
        backgroundColor: data.map(
          (_, index) =>
            `rgba(${255 - index * 40}, ${99 + index * 30}, 132, 0.5)`
        ),
      },
      {
        label: "Wins",
        data: data.map((player) => player.wins),
        backgroundColor: data.map(
          (_, index) =>
            `rgba(${255 - index * 40}, ${99 + index * 30}, 132, 0.5)`
        ),
      },
      {
        label: "Assists",
        data: data.map((player) => player.assists),
        backgroundColor: data.map(
          (_, index) =>
            `rgba(${255 - index * 40}, ${99 + index * 30}, 132, 0.5)`
        ),
      },
    //   {
    //     label: "Kills",
    //     data: data.map((player) => player.kills),
    //     backgroundColor: data.map(
    //       (_, index) =>
    //         `rgba(${255 - index * 40}, ${99 + index * 30}, 132, 0.5)`
    //     ),
    //   },
      {
        label: "Deaths",
        data: data.map((player) => player.deaths),
        backgroundColor: data.map(
          (_, index) =>
            `rgba(${255 - index * 40}, ${99 + index * 30}, 132, 0.5)`
        ),
      },
      {
        label: "Treasures",
        data: data.map((player) => player.treasures),
        backgroundColor: data.map(
          (_, index) =>
            `rgba(${255 - index * 40}, ${99 + index * 30}, 132, 0.5)`
        ),
      },
    //   {
    //     label: "Gold",
    //     data: data.map((player) => player.gold),
    //     backgroundColor: data.map(
    //       (_, index) =>
    //         `rgba(${255 - index * 40}, ${99 + index * 30}, 132, 0.5)`
    //     ),
    //   },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Damage Contribution by Player",
      },
    },
  };

  return <PolarArea data={chartData} options={options} />;
};

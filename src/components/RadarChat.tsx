import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, Tooltip, Legend } from "chart.js";
import { PlayerData } from "@/utils/playerData";

ChartJS.register(RadialLinearScale, Tooltip, Legend);

interface RadarChartProps {
  data: PlayerData[];
}

export const PlayerStatsRadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const chartData = {
    labels: [
      "Games",
      "Wins",
      "Assists",
      "Kills",
      "Deaths",
    //   "Damage",
      "Treasures",
      "Gold",
    ],
    datasets: data.map((player, index) => ({
      label: player.name,
      data: [
        player.games,
        player.wins,
        player.assists,
        player.kills,
        player.deaths,
        // player.damage,
        player.treasures,
        player.gold,
      ],
      fill: true,
      backgroundColor: `rgba(${255 - index * 40}, ${
        99 + index * 30
      }, 132, 0.2)`,
      borderColor: `rgba(${255 - index * 40}, ${99 + index * 30}, 132, 1)`,
      pointBackgroundColor: `rgba(${255 - index * 40}, ${
        99 + index * 30
      }, 132, 1)`,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Player Stats Radar Chart",
      },
    },
  };

  return <Radar data={chartData} options={options} />;
};

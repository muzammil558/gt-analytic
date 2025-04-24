/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { getPlayersListWithStats } from "@/actions/analytics-prod";
import { PlayerData } from "@/utils/playerData";
import Row from "@/components/TableRow-copy";
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import { PlayerStatsPieChart } from "@/components/PieChart";
import { PlayerStatsRadarChart } from "@/components/RadarChat";
import { PlayerStatsPolarAreaChart } from "@/components/PolarAreaChart";

export default function StatsGraph() {
  const [analyticsPlayersList, setAnalyticsPlayersList] = useState<
    PlayerData[]
  >([]);
  const [count, setCount] = useState(6);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(600));

  useEffect(() => {
    const fetchPlayersData = async () => {
      setLoading(true);

      const playersListData = await getPlayersListWithStats(count, 0);
      // const playersListData = await getPlayersListWithStats(10, 0);

      if (playersListData && !playersListData.error) {
        setCount(playersListData.count);
        setAnalyticsPlayersList(playersListData);
      }
      setLoading(false);
    };

    fetchPlayersData();

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 12000);

    return () => clearTimeout(loadingTimeout);
  }, [count]);

  // Handle sorting
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = analyticsPlayersList?.players?.sort((a: any, b: any) => {
    if (orderBy === "name" || orderBy === "id") {
      return order === "asc"
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
    return order === "asc"
      ? (a[orderBy] || 0) - (b[orderBy] || 0)
      : (b[orderBy] || 0) - (a[orderBy] || 0);
  });

  return (
    <div className="leaderboard-container">
      <div className="header">
        <div className="header-left">
          <Link href={"/"}>
            <button className="back-button">
              <ArrowBackIosIcon sx={{ fontSize: 18 }} />
              {!isMobile && "Back"}
            </button>
          </Link>
          <h1>Player Stats</h1>
        </div>
      </div>
      {sortedData?.length > 0 || loading ? (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#011316",
            margin: "25px auto",
            maxHeight: "470px",
            "@media (max-width: 1199.95px)": {
              margin: "18px auto",
            },
            "@media (max-width: 769.95px)": {
              margin: "15px auto",
              maxHeight: "448px",
            },
          }}
        >
          <Table
            aria-label="collapsible table"
            sx={{ backgroundColor: "#011316" }}
          >
            <TableHead sx={{ backgroundColor: "#001316" }}>
              <TableRow>
                <TableCell>SNo.</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "games"}
                    direction={orderBy === "games" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "games")}
                  >
                    Games
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "wins"}
                    direction={orderBy === "wins" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "wins")}
                  >
                    Wins
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "assists"}
                    direction={orderBy === "assists" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "assists")}
                  >
                    Assists
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "kills"}
                    direction={orderBy === "kills" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "kills")}
                  >
                    Kills
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "deaths"}
                    direction={orderBy === "deaths" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "deaths")}
                  >
                    Deaths
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "damage"}
                    direction={orderBy === "damage" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "damage")}
                  >
                    Damage
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "treasures"}
                    direction={orderBy === "treasures" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "treasures")}
                  >
                    Treasures
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "gold"}
                    direction={orderBy === "gold" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "gold")}
                    sx={{ color: "#FEB938" }}
                  >
                    Gold
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "healing"}
                    direction={orderBy === "healing" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "healing")}
                    sx={{ color: "#7AFF60" }}
                  >
                    Healing
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "mitigation"}
                    direction={orderBy === "mitigation" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "mitigation")}
                  >
                    Mitigation
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "id"}
                    direction={orderBy === "id" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "id")}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    sx={{ padding: "150px 0" }}
                    colSpan={20}
                    align="center"
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((row: any, index: number) => (
                  <Row key={row.id} row={row} index={index} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#011316",
              margin: "25px auto",
              maxHeight: "470px",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "@media (max-width: 1199.95px)": {
                margin: "18px auto",
              },
              "@media (max-width: 769.95px)": {
                margin: "15px auto",
                maxHeight: "448px",
              },
            }}
          >
            <Table
              aria-label="collapsible table"
              sx={{ backgroundColor: "#011316" }}
            >
              <TableHead sx={{ backgroundColor: "#001316" }}>
                <TableRow>
                  <TableCell>SNo.</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "name")}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "games"}
                      direction={orderBy === "games" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "games")}
                    >
                      Games
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "wins"}
                      direction={orderBy === "wins" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "wins")}
                    >
                      Wins
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "assists"}
                      direction={orderBy === "assists" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "assists")}
                    >
                      Assists
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "kills"}
                      direction={orderBy === "kills" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "kills")}
                    >
                      Kills
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "deaths"}
                      direction={orderBy === "deaths" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "deaths")}
                    >
                      Deaths
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "damage"}
                      direction={orderBy === "damage" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "damage")}
                    >
                      Damage
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "treasures"}
                      direction={orderBy === "treasures" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "treasures")}
                    >
                      Treasures
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "gold"}
                      direction={orderBy === "gold" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "gold")}
                      sx={{ color: "#FEB938" }}
                    >
                      Gold
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "healing"}
                      direction={orderBy === "healing" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "healing")}
                      sx={{ color: "#7AFF60" }}
                    >
                      Healing
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "mitigation"}
                      direction={orderBy === "mitigation" ? order : "asc"}
                      onClick={(event) =>
                        handleRequestSort(event, "mitigation")
                      }
                    >
                      Mitigation
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === "id"}
                      direction={orderBy === "id" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "id")}
                    >
                      ID
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>

          <div className="notFoundWrapper">
            <img src={"/assets/imgs/not-found.png"} alt="Not Found" />
          </div>
        </>
      )}

      {sortedData?.length > 6 && (
        <div className="chartsContainer">
          <div>
            <PlayerStatsPieChart data={sortedData} />
            {/* <PlayerStatsPolarAreaChart data={sortedData} /> */}
          </div>
          {/* <div>
            <LineChart data={sortedData} />
          </div> */}
        </div>
      )}

      {/* <div className="backBtnWrapper">
        <Link href={"/"}>
          <button className="backBtn">Home</button>
        </Link>
      </div> */}
    </div>
  );
}

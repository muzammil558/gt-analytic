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
  TablePagination,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import {
  getPlayerSessionsForPeriod,
  getPlayersListWithStats,
  getTotalPlayerSessionsTimeInSecForPeriod,
} from "../../../actions/analytics-dev";
import { convertSecondsToMDHMS } from "@/utils/timeConverter";
import {
  calculateTimePlayed,
  convertEpochToLocalTime,
} from "@/utils/epochToLocalTimeConverter";
import { PlayerData } from "@/utils/playerData";
import Row from "@/components/TableRow";
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";

export default function PlayersStats() {
  const [analyticsPlayersList, setAnalyticsPlayersList] = useState<
    PlayerData[]
  >([]);
  const [addedTimeData, setAddedTimeData] = useState<PlayerData[]>([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(600));

  useEffect(() => {
    const fetchPlayersData = async () => {
      setAddedTimeData([]);
      setLoading(true);

      const playersListData = await getPlayersListWithStats(rowsPerPage, page);

      if (playersListData && !playersListData.error) {
        const initialTime = 1690830000; // August 1, 2023
        const curTime = Math.floor(Date.now() / 1000); // current time

        setCount(playersListData.count);

        const addedTime = await Promise.all(
          playersListData.players.map(async (item: PlayerData) => {
            const playerTimeData =
              await getTotalPlayerSessionsTimeInSecForPeriod(
                item.name,
                initialTime,
                curTime
              );
            const playerSessionsData = await getPlayerSessionsForPeriod(
              item.name,
              initialTime,
              curTime
            );

            // let playerTime: string | undefined;
            // if (playerTimeData?.time > 0) {
            //   playerTime = convertSecondsToMDHMS(playerTimeData.time);
            // }

            const convertedTimes = playerSessionsData?.sessions?.map(
              (session: any) => ({
                ...session,
                startLocalTime: convertEpochToLocalTime(session.start),
                endLocalTime: convertEpochToLocalTime(session.end),
                playedTime: calculateTimePlayed(session.start, session.end),
              })
            );

            return {
              ...item,
              sessions: convertedTimes?.length,
              convertedTimes,
              playerTime: playerTimeData?.time > 0 && playerTimeData.time,
            };
          })
        );

        setAddedTimeData(addedTime);
        setAnalyticsPlayersList(playersListData);
      }
      setLoading(false);
    };

    fetchPlayersData();

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 12000);

    return () => clearTimeout(loadingTimeout);
  }, [page, rowsPerPage]);

  // Handle pagination change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle sorting
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = addedTimeData.sort((a, b) => {
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
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <Link href={"/"}>
            <button className="back-button">
              <ArrowBackIosIcon sx={{ fontSize: 18 }} />
              {!isMobile && "Back"}
            </button>
          </Link>
          <h1>GT Dev - Player Stats</h1>
        </div>
      </div>

      {addedTimeData?.length > 0 || loading ? (
        <>
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#001316",
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
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "name")}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    width={120}
                    align="right"
                    sx={{ whiteSpace: "nowrap" }}
                    // sortDirection={orderBy === "playerTime" ? order : false}
                  >
                    Time Played
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "sessions"}
                      direction={orderBy === "sessions" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "sessions")}
                    >
                      Sessions
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
                  sortedData.map((row) => <Row key={row.id} row={row} />)
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              sx={{ backgroundColor: "#001316" }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              showFirstButton={true}
              showLastButton={true}
              slotProps={{
                actions: {
                  firstButton: {
                    disabled: loading || page == 0 ? true : false,
                  },
                  lastButton: {
                    disabled:
                      loading ||
                      Math.min(count, (page + 1) * rowsPerPage) == count
                        ? true
                        : false,
                  },
                  previousButton: {
                    disabled: loading || page == 0 ? true : false,
                  },
                  nextButton: {
                    disabled:
                      loading ||
                      Math.min(count, (page + 1) * rowsPerPage) == count
                        ? true
                        : false,
                  },
                },
              }}
            />
          </TableContainer>
        </>
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
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "name")}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    width={120}
                    align="right"
                    sx={{ whiteSpace: "nowrap" }}
                    // sortDirection={orderBy === "playerTime" ? order : false}
                  >
                    Time Played
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === "sessions"}
                      direction={orderBy === "sessions" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "sessions")}
                    >
                      Sessions
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

      {sortedData.length > 0 && (
        <div className="chartsContainer">
          <div>
            <BarChart data={sortedData} />
          </div>
          <div>
            <LineChart data={sortedData} />
          </div>
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

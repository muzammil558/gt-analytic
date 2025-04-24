"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
} from "@mui/material";

import {
  getPlayerSessionsForPeriod,
  getPlayersListWithStats,
  getTotalPlayerSessionsTimeInSecForPeriod,
} from "@/actions/analytics-dev";
import { convertSecondsToMDHMS } from "@/utils/timeConverter";
import {
  calculateTimePlayed,
  convertEpochToLocalTime,
} from "@/utils/epochToLocalTimeConverter";
import { PlayerData } from "@/utils/playerData";
import Row from "@/components/TableRow";
import Link from "next/link";

export default function PlayersStats() {
  const [analyticsPlayersList, setAnalyticsPlayersList] = useState<
    PlayerData[]
  >([]);
  const [addedTimeData, setAddedTimeData] = useState<PlayerData[]>([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = useState<string>("latestSession");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchPlayersData = async () => {
      setAddedTimeData([]);
      setLoading(true);

      const playersListData = await getPlayersListWithStats(rowsPerPage, page);
      // const playersListData = await getPlayersListWithStats(50, 0);

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

            const latestSessionEndTime = convertedTimes
              ? Math.max(...convertedTimes.map((session: any) => session.end))
              : 0;

            return {
              ...item,
              sessions: convertedTimes?.length,
              convertedTimes,
              playerTime: playerTimeData?.time > 0 && playerTimeData.time,
              latestSessionEndTime,
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

  const isNumericField = (field: string) => {
    return [
      "sessions",
      "games",
      "wins",
      "assists",
      "kills",
      "deaths",
      "damage",
      "treasures",
      "gold",
      "healing",
      "mitigation",
    ].includes(field);
  };

  const sortedData = addedTimeData.sort((a, b) => {
    if (orderBy === "name" || orderBy === "id") {
      // Handle string sorting for "name" and "id"
      return order === "asc"
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    } else if (isNumericField(orderBy)) {
      // Handle numeric sorting for columns like "sessions", "kills", etc.
      return order === "asc"
        ? (a[orderBy] || 0) - (b[orderBy] || 0)
        : (b[orderBy] || 0) - (a[orderBy] || 0);
    } else if (orderBy === "latestSession") {
      // Handle sorting by the latest session played
      return order === "asc"
        ? (a.latestSessionEndTime || 0) - (b.latestSessionEndTime || 0)
        : (b.latestSessionEndTime || 0) - (a.latestSessionEndTime || 0);
    }
    return 0;
  });

  return (
    <div className="wrapper">
      <h1>Latest Session Players Stats</h1>

      <TableContainer
        component={Paper}
        sx={{
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
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }} align="right">
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
              <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                <TableSortLabel
                  active={orderBy === "latestSession"}
                  direction={orderBy === "latestSession" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "latestSession")}
                >
                  Latest Session
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
                >
                  Gold
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === "healing"}
                  direction={orderBy === "healing" ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, "healing")}
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
            ) : addedTimeData.length > 0 ? (
              sortedData.map((row) => <Row key={row.id} row={row} />)
            ) : (
              <TableRow>
                <TableCell
                  sx={{ padding: "150px 0" }}
                  colSpan={20}
                  align="center"
                >
                  <h3 className="no-session">No Stats Found</h3>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton={true}
          showLastButton={true}
          slotProps={{
            actions: {
              firstButton: { disabled: loading || page == 0 ? true : false },
              lastButton: {
                disabled:
                  loading || Math.min(count, (page + 1) * rowsPerPage) == count
                    ? true
                    : false,
              },
              previousButton: { disabled: loading || page == 0 ? true : false },
              nextButton: {
                disabled:
                  loading || Math.min(count, (page + 1) * rowsPerPage) == count
                    ? true
                    : false,
              },
            },
          }}
        />
      </TableContainer>

      <div className="backBtnWrapper">
        <Link href={""}>
          <button className="backBtn" onClick={() => router.back()}>
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}

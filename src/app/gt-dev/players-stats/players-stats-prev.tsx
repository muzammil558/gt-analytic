"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Collapse,
  // Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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

// const columns: GridColDef[] = [
//   {
//     field: "playerTime",
//     headerName: "Time Played",
//     width: 180,
//     sortable: false,
//   },
//   { field: "name", headerName: "Name", width: 150 },
//   {
//     field: "sessions",
//     headerName: "Sessions",
//     type: "number",
//     width: 100,
//   },
//   { field: "games", headerName: "Games", type: "number", width: 100 },
//   {
//     field: "wins",
//     headerName: "Wins",
//     type: "number",
//     width: 100,
//   },
//   {
//     field: "assists",
//     headerName: "Assists",
//     type: "number",
//     width: 100,
//   },
//   {
//     field: "kills",
//     headerName: "Kills",
//     type: "number",
//     width: 100,
//   },
//   {
//     field: "deaths",
//     headerName: "Deaths",
//     type: "number",
//     width: 100,
//   },
//   {
//     field: "damage",
//     headerName: "Damage",
//     type: "number",
//     width: 100,
//   },
//   {
//     field: "treasures",
//     headerName: "Treasures",
//     type: "number",
//     width: 120,
//   },
//   {
//     field: "gold",
//     headerName: "Gold",
//     type: "number",
//     width: 100,
//   },
//   {
//     field: "healing",
//     headerName: "Healing",
//     type: "number",
//     width: 130,
//   },
//   {
//     field: "mitigation",
//     headerName: "Mitigation",
//     type: "number",
//     width: 140,
//   },
//   { field: "id", headerName: "ID", width: 300 },
// ];

export default function PlayersStats() {
  const [analyticsPlayersList, setAnalyticsPlayersList] = useState<any>();
  const [analyticsPlayersTime, setAnalyticsPlayersTime] = useState<any>();
  const [analyticsPlayersSessions, setAnalyticsPlayersSessions] =
    useState<any>();
  const [addedTimeData, setAddedTimeData] = useState<any>();
  const [size, setSize] = useState(5);
  const page = 0;
  const [times, setTimes] = useState([]);
  const [isExecutedPlayersList, setIsExecutedPlayersList] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const fetchPlayersData = async () => {
      const playersListData = await getPlayersListWithStats(size, page);

      if (!playersListData || playersListData.error) {
        setAnalyticsPlayersList(playersListData?.error);
      } else {
        let playerTime: string | undefined;
        let convertedTimes: [] | undefined;
        const initialTime = 1690830000; // August 1, 2023
        const curTime = Math.floor(Date.now() / 1000); // current time

        const addedTime = await Promise.all(
          playersListData?.players?.map(async (item: any) => {
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

            if (!playerTimeData || playerTimeData.error) {
              setAnalyticsPlayersTime(playerTimeData?.error);
            } else if (
              !playerSessionsData ||
              playerSessionsData.error ||
              playerSessionsData.sessions == null
            ) {
              setAnalyticsPlayersSessions(playerSessionsData?.error);
              setTimes([]);
            } else {
              if (playerTimeData.time && playerTimeData.time > 0) {
                playerTime = convertSecondsToMDHMS(playerTimeData.time);
              }

              convertedTimes = playerSessionsData?.sessions?.map(
                (item: any) => ({
                  ...item,
                  startLocalTime: convertEpochToLocalTime(item.start),
                  endLocalTime: convertEpochToLocalTime(item.end),
                  playedTime: calculateTimePlayed(item.start, item.end),
                })
              );
              setAnalyticsPlayersTime(playerTimeData);
              setTimes(convertedTimes ?? []);
              setAnalyticsPlayersSessions(playerSessionsData);
            }

            return {
              ...item,
              sessions: convertedTimes?.length,
              convertedTimes,
              playerTime,
            };
          })
        );

        setAddedTimeData(addedTime);
        setAnalyticsPlayersList(playersListData);
        setSize(playersListData.count);
        setIsExecutedPlayersList(true);
      }
    };

    fetchPlayersData();
  }, [size]);

  // const rows = addedTimeData;

  // const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="wrapper">
      <h1>Players Stats</h1>

      {/* Players Stats */}
      {/* {isExecutedPlayersList && (
        <Paper sx={{ height: 490, width: "100%", margin: "20px auto" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 15, 20, 25, 30]}
            sx={{
              background: "#141414",
              border: 0,
              color: "#ffffff",
            }}
          />
        </Paper>
      )} */}

      {/* Selected Player's Sessions */}
      {/* {isSelected ? (
        times.length > 0 && analyticsPlayersSessions?.sessions !== null ? (
          <Grid container className="playerSessionsWrapper">
            <Grid item xl={12} lg={12} md={12} sm={12} className="outputHead">
              Player Sessions for Period:
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Grid container className="tabHead">
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                  Session Count
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                  Start Time
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                  End Time
                </Grid>
              </Grid>
            </Grid>

            {times.map((item: any, index: any) => (
              <Grid
                container
                key={`${item.start}-${item.end}`}
                className="dataWrapper"
              >
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                  {index + 1 >= 10 ? index + 1 : `0${index + 1}`}
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                  {item.startLocalTime}
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                  {item.endLocalTime}
                </Grid>
              </Grid>
            ))}
          </Grid>
        ) : (
          <h3 className="no-session">No Session</h3>
        )
      ) : null} */}

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Time Played</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Sessions</TableCell>
              <TableCell align="right">Games</TableCell>
              <TableCell align="right">Wins</TableCell>
              <TableCell align="right">Assists</TableCell>
              <TableCell align="right">Kills</TableCell>
              <TableCell align="right">Deaths</TableCell>
              <TableCell align="right">Damage</TableCell>
              <TableCell align="right">Treasures</TableCell>
              <TableCell align="right">Gold</TableCell>
              <TableCell align="right">Healing</TableCell>
              <TableCell align="right">Mitigation</TableCell>
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addedTimeData &&
              addedTimeData.map((row: any) => <Row key={row.name} row={row} />)}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="backBtnWrapper">
        <Link href={"/"}>
          <button className="backBtn">Back</button>
        </Link>
      </div>
    </div>
  );
}

function createData(
  playerTime: string,
  name: string,
  sessions: string,
  games: string,
  wins: string,
  assists: string,
  kills: string,
  deaths: string,
  damage: string,
  treasures: string,
  gold: string,
  healing: string,
  mitigation: string,
  id: string,
  convertedTimes: [],
  playedTime: string
) {
  return {
    playerTime,
    name,
    sessions,
    games,
    wins,
    assists,
    kills,
    deaths,
    damage,
    treasures,
    gold,
    healing,
    mitigation,
    id,
    convertedTimes,
    playedTime,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {open ? "Close Sessions" : "View Sessions"}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.playerTime}
        </TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.sessions}</TableCell>
        <TableCell align="right">{row.games}</TableCell>
        <TableCell align="right">{row.wins}</TableCell>
        <TableCell align="right">{row.assists}</TableCell>
        <TableCell align="right">{row.kills}</TableCell>
        <TableCell align="right">{row.deaths}</TableCell>
        <TableCell align="right">{row.damage}</TableCell>
        <TableCell align="right">{row.treasures}</TableCell>
        <TableCell align="right">{row.gold}</TableCell>
        <TableCell align="right">{row.healing}</TableCell>
        <TableCell align="right">{row.mitigation}</TableCell>
        <TableCell>{row.id}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={20}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sessions
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Session count</TableCell>
                    <TableCell align="center">Start Time</TableCell>
                    <TableCell align="center">End Time</TableCell>
                    <TableCell align="center">Time Played</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row &&
                    row.convertedTimes.map(
                      (sessionsRow: any, index: number) => (
                        <TableRow key={sessionsRow.date}>
                          <TableCell component="th" scope="row" align="center">
                            {index + 1 >= 10 ? index + 1 : `0${index + 1}`}
                          </TableCell>
                          <TableCell align="center">
                            {sessionsRow.startLocalTime}
                          </TableCell>
                          <TableCell align="center">
                            {sessionsRow.endLocalTime}
                          </TableCell>
                          <TableCell align="center">
                            {sessionsRow.playedTime}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

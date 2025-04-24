import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  styled,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { PlayerData } from "@/utils/playerData";
import {
  getPlayerSessionsForPeriod,
  getTotalPlayerSessionsTimeInSecForPeriod,
} from "@/actions/analytics-prod";
import {
  calculateTimePlayed,
  convertEpochToLocalTime,
} from "@/utils/epochToLocalTimeConverter";

function Row(props: { row: PlayerData; index: number }) {
  const { row, index } = props;

  const [open, setOpen] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [sessionsData, setSessionsData] = useState<PlayerData[]>([]);

  const initialTime = 1690830000; // August 1, 2023
  const curTime = Math.floor(Date.now() / 1000);

  // const handleToggle = async (row: PlayerData) => {
  //   setOpen(!open);

  //   // If the row is being expanded and session data is not already loaded
  //   if (!open && (!row.convertedTimes || row.convertedTimes.length === 0)) {
  //     setLoadingSessions(true);

  //     const initialTime = 1690830000; // August 1, 2023
  //     const curTime = Math.floor(Date.now() / 1000); // current time

  //     try {
  //       // Fetch the player's total session time
  //       const playerTimeData = await getTotalPlayerSessionsTimeInSecForPeriod(
  //         row.name,
  //         initialTime,
  //         curTime
  //       );

  //       // Fetch the player's sessions
  //       const playerSessionsData = await getPlayerSessionsForPeriod(
  //         row.name,
  //         initialTime,
  //         curTime
  //       );

  //       // Convert session data for display
  //       const convertedTimes = playerSessionsData?.sessions?.map(
  //         (session: any) => ({
  //           ...session,
  //           startLocalTime: convertEpochToLocalTime(session.start),
  //           endLocalTime: convertEpochToLocalTime(session.end),
  //           playedTime: calculateTimePlayed(session.start, session.end),
  //         })
  //       );

  //       // // Update the row with fetched session data
  //       // const updatedRow = {
  //       //   ...row,
  //       //   sessions: convertedTimes?.length,
  //       //   convertedTimes,
  //       //   playerTime: playerTimeData?.time > 0 && playerTimeData.time,
  //       // };
  //       // // Update state to reflect the new session data
  //       // setSessionsData([updatedRow]);

  //       // Cache the fetched data in the row to avoid refetching
  //       row.convertedTimes = convertedTimes;
  //       row.playerTime = playerTimeData?.time > 0 ? playerTimeData.time : 0;
  //       row.sessions = convertedTimes?.length;

  //       // Update state to reflect the new session data
  //       setSessionsData([row]);
  //       setLoadingSessions(false);
  //     } catch (error) {
  //       console.error("Error fetching session data:", error);
  //       setLoadingSessions(false);
  //     }
  //   } else {
  //     // Toggle open state when the data is already available
  //     setSessionsData([row]);
  //   }
  // };

  // Handle async data fetching
  const fetchData = useCallback(async () => {
    try {
      const [playerTimeData, playerSessionsData] = await Promise.all([
        getTotalPlayerSessionsTimeInSecForPeriod(
          row.name,
          initialTime,
          curTime
        ),
        getPlayerSessionsForPeriod(row.name, initialTime, curTime),
      ]);

      const convertedTimes = playerSessionsData?.sessions?.map(
        (session: any) => ({
          ...session,
          startLocalTime: convertEpochToLocalTime(session.start),
          endLocalTime: convertEpochToLocalTime(session.end),
          playedTime: calculateTimePlayed(session.start, session.end),
        })
      );

      row.convertedTimes = convertedTimes;
      row.playerTime = playerTimeData?.time > 0 ? playerTimeData.time : 0;
      row.sessions = convertedTimes?.length;
      setSessionsData([row]);
      setLoadingSessions(false);
    } catch (error) {
      console.error("Error fetching session data:", error);
      setLoadingSessions(false);
    }
  }, [row, initialTime, curTime]);

  // Toggle open state and conditionally fetch data
  const handleToggle = () => {
    setLoadingSessions(true);
    setOpen((prev) => {
      const newOpen = !prev;

      if (newOpen && (!row.convertedTimes || row.convertedTimes.length === 0)) {
        fetchData();
      } else {
        setLoadingSessions(false); // If data is already cached
      }
      return newOpen;
    });
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    border:"none",
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    border:"none",
    "&:nth-of-type(odd)": {
      backgroundColor: "#022A30",

    },
    "&:nth-of-type(even)": {
      backgroundColor: "#001316",
    },
  }));
  const StyledTableRowMain = styled(TableRow)(() => ({
    border:"none",
    "&:nth-of-type(4n-3)": {
      backgroundColor: "#022A30",
    },
    "&:nth-of-type(4n-1)": {
      backgroundColor: "#001316", // Rows: 3, 7, 11, 15...
    },
  }));
  return (
    <React.Fragment>
      <StyledTableRowMain>
        {/* <TableCell sx={{ whiteSpace: "nowrap" }}>
          {open ? "Close Sessions" : "View Sessions"}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleToggle(row)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        <StyledTableCell align="center">{index + 1}</StyledTableCell>
        <StyledTableCell sx={{ whiteSpace: "nowrap" }}>
          {row.name ? row.name : "-"}
        </StyledTableCell>
        <StyledTableCell align="right">
          {row.games >= 0 ? row.games : "-"}
        </StyledTableCell>
        <StyledTableCell align="right">
          {row.wins >= 0 ? row.wins : "-"}
        </StyledTableCell>
        <StyledTableCell align="right">
          {row.assists >= 0 ? row.assists : "-"}
        </StyledTableCell>
        <StyledTableCell align="right">
          {row.kills >= 0 ? row.kills : "-"}
        </StyledTableCell>
        <StyledTableCell align="right">
          {row.deaths >= 0 ? row.deaths : "-"}
        </StyledTableCell>
        <StyledTableCell align="right">
          {row.damage >= 0 ? row.damage : "-"}
        </StyledTableCell>
        <StyledTableCell align="right">
          {row.treasures >= 0 ? row.treasures : "-"}
        </StyledTableCell>
        <StyledTableCell align="right">
          {row.gold >= 0 ? row.gold : "-"}
        </StyledTableCell>
        <StyledTableCell align="right">
          {row.healing >= 0 ? row.healing : "-"}
        </StyledTableCell>
        <StyledTableCell align="right">
          {row.mitigation >= 0 ? row.mitigation : "-"}
        </StyledTableCell>
        <StyledTableCell
          align="center"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {row.id ? row.id : "-"}{" "}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleToggle}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
      </StyledTableRowMain>

      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={20}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sessions
              </Typography>

              {loadingSessions ? (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{ padding: "60px 0" }}
                        colSpan={20}
                        align="center"
                      >
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Session count</TableCell>
                      <TableCell align="center">Start Time</TableCell>
                      <TableCell align="center">End Time</TableCell>
                      <TableCell>Time Played</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sessionsData.length > 0 ? (
                      sessionsData.map((sessionsRow: any) =>
                        sessionsRow.convertedTimes.map(
                          (sessionDetails: any, index: number) => (
                            <StyledTableRow key={sessionDetails.end}>
                              <StyledTableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {index + 1 >= 10 ? index + 1 : `0${index + 1}`}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {sessionDetails.startLocalTime}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {sessionDetails.endLocalTime}
                              </StyledTableCell>
                              <StyledTableCell>{sessionDetails.playedTime}</StyledTableCell>
                            </StyledTableRow>
                          )
                        )
                      )
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No sessions available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// export default Row;
export default React.memo(Row);

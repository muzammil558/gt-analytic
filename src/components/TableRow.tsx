import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  // TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { PlayerData } from "@/utils/playerData";
import { convertEpochToLocalTime } from "@/utils/epochToLocalTimeConverter";
import { convertSecondsToMDHMS } from "@/utils/timeConverter";

function Row(props: { row: PlayerData }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    border: "none",
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    border: "none",
    "&:nth-of-type(odd)": {
      backgroundColor: "#022A30",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#001316",
    },
  }));
  const StyledTableRowMain = styled(TableRow)(() => ({
    border: "none",
    "&:nth-of-type(4n-3)": {
      backgroundColor: "#022A30", // Rows: 1, 5, 9, 13...
    },
    "&:nth-of-type(4n-1)": {
      backgroundColor: "#001316", // Rows: 3, 7, 11, 15...
    },
  }));

  return (
    <React.Fragment>
      <StyledTableRowMain>
        <StyledTableCell sx={{ whiteSpace: "nowrap" }}>
          {row.name ? row.name : "-"}
        </StyledTableCell>
        <StyledTableCell align="right" sx={{ whiteSpace: "nowrap" }}>
          {row.playerTime ? convertSecondsToMDHMS(row.playerTime) : "-"}
        </StyledTableCell>
        <StyledTableCell align="right">
          {row.sessions >= 0 ? row.sessions : "-"}
        </StyledTableCell>
        {pathname.split("/").includes("sorted-list") && (
          <StyledTableCell align="right" sx={{ whiteSpace: "nowrap" }}>
            {row.latestSessionEndTime >= 0
              ? convertEpochToLocalTime(row.latestSessionEndTime)
              : "-"}
          </StyledTableCell>
        )}
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
          {row.id ? row.id : "-"}
          {row.sessions && (
            <>
              {/* {open ? "Close Sessions" : "View Sessions"} */}
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </>
          )}
        </StyledTableCell>
      </StyledTableRowMain>

      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={20}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sessions
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead sx={{ backgroundColor: "#001316" }}>
                  <TableRow>
                    <TableCell align="center">Session count</TableCell>
                    <TableCell align="center">Start Time</TableCell>
                    <TableCell align="center">End Time</TableCell>
                    <TableCell>Time Played</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row &&
                    row.convertedTimes?.map(
                      (sessionsRow: any, index: number) => (
                        <StyledTableRow key={sessionsRow.date}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            {index + 1 >= 10 ? index + 1 : `0${index + 1}`}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {sessionsRow.startLocalTime}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {sessionsRow.endLocalTime}
                          </StyledTableCell>
                          <StyledTableCell>
                            {sessionsRow.playedTime}
                          </StyledTableCell>
                        </StyledTableRow>
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

export default Row;

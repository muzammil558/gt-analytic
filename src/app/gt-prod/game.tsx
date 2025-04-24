"use client";

import { useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  tableCellClasses,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { convertISO8601ToLocalTime } from "@/utils/iso8601ToLocalTimeConverter";
import { getGameSessions } from "../../actions/analytics-prod";
import CustomDatePicker from "../../components/DatePicker";

const columns: GridColDef[] = [
  { field: "id", headerName: "Players ID", width: 100 },
  { field: "session", headerName: "Session", width: 150 },
  { field: "created", headerName: "Created", width: 100 },
  { field: "finished", headerName: "Finished", width: 100 },
  { field: "players", headerName: "Players", width: 100 },
  { field: "playersStatus", headerName: "Players Status", width: 100 },
];

export default function GameContent() {
  const [analytics, setAnalytics] = useState<any>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [size, setSize] = useState(5);
  const [page, setPage] = useState(0);
  const [isExecuted, setIsExecuted] = useState(false);
  const [convertedData, setConvertedData] = useState([]);

  const handleStartTime = (time: any) => {
    setStartTime(time);
  };
  const handleEndTime = (time: any) => {
    setEndTime(time);
  };

  const handleSubmitGameSessions = async (e: any) => {
    e.preventDefault();

    setAnalytics(null);

    if (startTime && endTime && size) {
      const gameSessionsData = await getGameSessions(
        Number(startTime),
        Number(endTime),
        Number(size),
        Number(page)
      );

      if (
        !gameSessionsData ||
        gameSessionsData.error ||
        gameSessionsData.sessions == null
      ) {
        setAnalytics(gameSessionsData?.error);
        setConvertedData([]);
      } else {
        const convertedTimeData = gameSessionsData?.sessions?.map(
          (item: any) => ({
            ...item,
            createdLocalTime: convertISO8601ToLocalTime(item.created),
            finishedLocalTime: convertISO8601ToLocalTime(item.finished),
          })
        );
        setConvertedData(convertedTimeData);

        setAnalytics(gameSessionsData);
        setIsExecuted(true);
      }
    }
  };

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

  const rows = convertedData;

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      {/* Game */}
      <div>
        <h2>Game Status</h2>
        <form onSubmit={handleSubmitGameSessions}>
          <table cellSpacing={10}>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="startTime">
                    Start Time<span>*</span>:
                  </label>
                </td>
                <CustomDatePicker
                  onEpochTimeChange={handleStartTime}
                  id="startTime"
                  required={true}
                />
              </tr>
              <tr>
                <td>
                  <label htmlFor="endTime">
                    End Time<span>*</span>:
                  </label>
                </td>
                <CustomDatePicker
                  onEpochTimeChange={handleEndTime}
                  id="endTime"
                  required={true}
                />
              </tr>
              <tr>
                <td>
                  <label htmlFor="pageSize">
                    Page Size<span>*</span>:
                  </label>
                </td>
                <td colSpan={2}>
                  <input
                    type="number"
                    id="pageSize"
                    onChange={(e: any) => setSize(e.target.value)}
                    required
                    placeholder="Page size in number"
                    className={"search-input"}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="page">
                    Page<span>*</span>:
                  </label>
                </td>
                <td colSpan={2}>
                  <input
                    type="number"
                    id="page"
                    onChange={(e: any) => setPage(e.target.value)}
                    required
                    placeholder="Page in number"
                    className={"search-input"}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button type="submit" className="executeBtn">
            Execute
          </button>
        </form>

        {isExecuted ? (
          startTime &&
          endTime &&
          convertedData.length > 0 &&
          analytics?.sessions !== null ? (
            <div className="playerSessionsWrapper">
              <div className="outputHead">Game Sessions for Period:</div>

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
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#001316" }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#001316" }}
                      >
                        Session
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#001316" }}
                      >
                        Created
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#001316" }}
                      >
                        Finished
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ backgroundColor: "#001316" }}
                      >
                        Players
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {convertedData.map((item: any, index: any) => (
                      <StyledTableRow
                        key={`${item.start}-${item.end}-${index}`}
                      >
                        <StyledTableCell sx={{ whiteSpace: "nowrap" }}>
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          {item.session}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          {item.createdLocalTime}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          {item.finishedLocalTime}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.players
                            ? item.players.map((player: any, index: number) =>
                                index + 1 === item.players.length
                                  ? player.name
                                  : player.name + ", "
                              )
                            : "No Player"}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <h3 className="no-session">No Session</h3>
          )
        ) : null}

        {/* {isExecuted ? (
          startTime && endTime && analytics?.count > 0 ? (
            <Grid container className="playerTimeWrapper">
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className="outputHead"
              >
                Game Count for Period:
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <p className="time-info">{analytics?.count}</p>
              </Grid>
            </Grid>
          ) : (
            <h3 className="no-session">No Session</h3>
          )
        ) : null} */}

        {/* {isExecuted && (
          <Paper sx={{ height: 530, width: "100%", margin: "20px auto" }}>
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
      </div>
    </>
  );
}

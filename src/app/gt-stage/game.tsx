"use client";

import { useState } from "react";
import { Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { convertISO8601ToLocalTime } from "@/utils/iso8601ToLocalTimeConverter";
import { getGameSessions } from "../../actions/analytics-stage";
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
            <Grid container className="playerSessionsWrapper">
              <Grid item xl={12} lg={12} md={12} sm={12} className="outputHead">
                Game Sessions for Period:
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid container className="tabHead">
                  <Grid item xl={1.4} lg={1.4} md={1.4} sm={1.4} xs={1.4}>
                    ID
                  </Grid>
                  <Grid item xl={2.9} lg={2.9} md={2.9} sm={2.9} xs={2.9}>
                    Session
                  </Grid>
                  <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                    Created
                  </Grid>
                  <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                    Finished
                  </Grid>
                  <Grid item xl={2.9} lg={2.9} md={2.9} sm={2.9} xs={2.9}>
                    Players
                  </Grid>
                </Grid>
              </Grid>

              {convertedData.map((item: any, index: any) => (
                <Grid
                  container
                  key={`${item.start}-${item.end}-${index}`}
                  className="dataWrapper"
                >
                  <Grid item xl={1.4} lg={1.4} md={1.4} sm={1.4} xs={1.4}>
                    {index + 1}
                  </Grid>
                  <Grid item xl={2.9} lg={2.9} md={2.9} sm={2.9} xs={2.9}>
                    {item.session}
                  </Grid>
                  <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                    {item.createdLocalTime}
                  </Grid>
                  <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                    {item.finishedLocalTime}
                  </Grid>
                  <Grid item xl={2.9} lg={2.9} md={2.9} sm={2.9} xs={2.9}>
                    {item.players
                      ? item.players.map((player: any, index: number) =>
                          index + 1 === item.players.length
                            ? player.name
                            : player.name + ", "
                        )
                      : "No Player"}
                  </Grid>
                </Grid>
              ))}
            </Grid>
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

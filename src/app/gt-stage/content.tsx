"use client";

import { useState } from "react";
import Link from "next/link";
import {
  getPlayerSessionsForPeriod,
  getTotalPlayerSessionsTimeInSecForPeriod,
} from "../../actions/analytics-stage";
import CustomDatePicker from "../../components/DatePicker";
import { Grid } from "@mui/material";
import { convertSecondsToHMS } from "../../utils/timeConverter";
import { convertEpochToLocalTime } from "../../utils/epochToLocalTimeConverter";

export default function StageContent() {
  const [analyticsPSP, setAnalyticsPSP] = useState<any>();
  const [analyticsTPSTSP, setAnalyticsTPSTSP] = useState<any>();
  const [playerNamePSP, setPlayerNamePSP] = useState("");
  const [startTimePSP, setStartTimePSP] = useState("");
  const [endTimePSP, setEndTimePSP] = useState("");
  const [isExecutedPSP, setIsExecutedPSP] = useState(false);
  const [isExecutedTPSTSP, setIsExecutedTPSTSP] = useState(false);

  const [times, setTimes] = useState([]);
  const [timeString, setTimeString] = useState<any>("");

  const handleStartTimePSP_TPSTSP = (time: any) => {
    setStartTimePSP(time);
  };
  const handleEndTimePSP_TPSTSP = (time: any) => {
    setEndTimePSP(time);
  };

  const handleConvert = (timeInSeconds: number) => {
    const result = convertSecondsToHMS(timeInSeconds);
    setTimeString(result);
  };

  const handleSubmitPSP = async (e: any) => {
    e.preventDefault();

    setAnalyticsPSP(null);
    setAnalyticsTPSTSP(null);
    setTimeString("");

    if (playerNamePSP && startTimePSP && endTimePSP) {
      const playerSessionsData = await getPlayerSessionsForPeriod(
        playerNamePSP,
        Number(startTimePSP),
        Number(endTimePSP)
      );

      if (
        !playerSessionsData ||
        playerSessionsData.error ||
        playerSessionsData.sessions == null
      ) {
        setAnalyticsPSP(playerSessionsData?.error);
        setTimes([]);
      } else {
        const convertedTimes = playerSessionsData?.sessions?.map(
          (item: any) => ({
            ...item,
            startLocalTime: convertEpochToLocalTime(item.start),
            endLocalTime: convertEpochToLocalTime(item.end),
          })
        );
        setTimes(convertedTimes);

        setAnalyticsPSP(playerSessionsData);
        setIsExecutedPSP(true);
      }

      const totalTimeData = await getTotalPlayerSessionsTimeInSecForPeriod(
        playerNamePSP,
        Number(startTimePSP),
        Number(endTimePSP)
      );

      if (!totalTimeData || totalTimeData.error) {
        setAnalyticsTPSTSP(totalTimeData?.error);
      } else {
        setAnalyticsTPSTSP(totalTimeData);

        if (totalTimeData.time && totalTimeData.time > 0) {
          handleConvert(totalTimeData.time);
          setIsExecutedTPSTSP(true);
        } else setIsExecutedTPSTSP(false);
      }
    }
  };

  //   let [analyticsStatus, setAnalyticsStatus] = useState<any>();
  //   let [isExecutedStatus, setIsExecutedStatus] = useState(false);

  //   const handleSubmitStatus = (e: any) => {
  //     e.preventDefault();

  //     getStatusParameters().then((data) => {
  //       if (!data || data.error) return setAnalyticsStatus(data?.error);

  //       setAnalyticsStatus(data);
  //       setIsExecutedStatus(true);
  //     });
  //   };

  return (
    <div className="wrapper">
      <h1>GT Stage</h1>

      {/* Player Sessions for Period */}
      <div>
        <form onSubmit={handleSubmitPSP}>
          <table cellSpacing={10}>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="playernamePSP">
                    Player Name<span>*</span>:
                  </label>
                </td>
                <td colSpan={2}>
                  <input
                    type="text"
                    id="playernamePSP"
                    onChange={(e: any) => setPlayerNamePSP(e.target.value)}
                    required
                    placeholder="Player Name"
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="starttimePSP">
                    Start Time<span>*</span>:
                  </label>
                </td>
                <CustomDatePicker
                  onEpochTimeChange={handleStartTimePSP_TPSTSP}
                  id="starttimePSP"
                  required={true}
                />
              </tr>
              <tr>
                <td>
                  <label htmlFor="endtimePSP">
                    End Time<span>*</span>:
                  </label>
                </td>
                <CustomDatePicker
                  onEpochTimeChange={handleEndTimePSP_TPSTSP}
                  id="endtimePSP"
                  required={true}
                />
              </tr>
            </tbody>
          </table>

          <button type="submit" className="executeBtn">
            Execute
          </button>
        </form>

        {isExecutedTPSTSP && playerNamePSP && startTimePSP && endTimePSP && (
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
              Player Time for the Selected Sessions:
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <p className="time-info">{timeString}</p>
            </Grid>
          </Grid>
        )}

        {isExecutedPSP &&
        playerNamePSP &&
        startTimePSP &&
        endTimePSP &&
        times.length > 0 &&
        analyticsPSP?.sessions !== null ? (
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
        )}
      </div>

      {/* Check Status */}
      {/* <div>
        <h2>Check Status</h2>
        <button onClick={handleSubmitStatus}>Execute Status</button>

        {isExecutedStatus ? (
        //   <div className="status-container">
        //     <p className="status-info">
        //       Players Online: {analyticsStatus?.players_online}
        //     </p>
        //     <p className="status-info">
        //       Servers Online: {analyticsStatus?.servers_online}
        //     </p>
        //   </div>

        <Grid container>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            Player Time for the Selected Sessions:
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <p className="time-info">Time: {analyticsTPSTSP?.time}</p>
          </Grid>
        </Grid>
        ) : (
          <h3 className="status-message">{analyticsStatus?.toUpperCase()}</h3>
        )}
      </div> */}

      <div className="backBtnWrapper">
        <Link href={"/"}>
          <button className="backBtn">Back</button>
        </Link>
      </div>
    </div>
  );
}

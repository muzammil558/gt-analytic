"use client";

import { useState } from "react";
import { Grid } from "@mui/material";

import {
  getNumberOfUniquePlayers,
  getPlayersMetricsPerDay,
  getPlayersRetentionDayN,
} from "@/actions/analytics-dev";
import {
  convertSecondsToHMS,
  convertSecondsToHours,
} from "@/utils/timeConverter";
import CustomDatePicker from "@/components/DatePicker";
import Chart from "@/components/Chart";

export default function MetricContent() {
  const [analyticsPlayersMetric, setAnalyticsPlayersAverageMetrics] =
    useState<any>();
  const [analyticsPlayerRetention, setAnalyticsPlayersRetention] =
    useState<any>();
  const [analyticsNumOfUniquePlayers, setAnalyticsNumOfUniquePlayers] =
    useState<any>();
  const [startTimeMetric, setStartTimeMetric] = useState("");
  const [endTimeMetric, setEndTimeMetric] = useState("");
  const [dayRetention, setDayRetention] = useState("");
  const [avg, setAvg] = useState("");
  const [median, setMedian] = useState("");
  const [averageTime, setAverageTime] = useState<any>();
  const [medianTime, setMedianTime] = useState<any>();
  const [averageConvertedTime, setAverageConvertedTime] = useState<any>();
  const [medianConvertedTime, setMedianConvertedTime] = useState<any>();
  const [retention, setRetention] = useState(null);
  const [numOfUniquePlayers, setNumOfUniquePlayers] = useState(null);
  const [isExecutedAverage, setIsExecutedAverage] = useState(false);
  const [isExecutedRetention, setIsExecutedRetention] = useState(false);
  const [isExecutedUnique, setIsExecutedUnique] = useState(false);

  const handleStartTimeMetric = (time: any) => {
    setStartTimeMetric(time);
  };
  const handleEndTimeMetric = (time: any) => {
    setEndTimeMetric(time);
  };

  const handleConvert = (timeInSeconds: number) => {
    const result = convertSecondsToHMS(timeInSeconds);
    return result;
  };

  const handleSubmitMetric = async (e: any) => {
    e.preventDefault();

    setAnalyticsPlayersAverageMetrics(null);
    setAnalyticsPlayersRetention(null);
    setAnalyticsNumOfUniquePlayers(null);

    if (startTimeMetric && endTimeMetric && dayRetention) {
      const playerMetricsPerDay = await getPlayersMetricsPerDay(
        Number(startTimeMetric),
        Number(endTimeMetric)
      );

      if (!playerMetricsPerDay || playerMetricsPerDay.error) {
        setAnalyticsPlayersAverageMetrics(playerMetricsPerDay?.error);
      } else {
        setAnalyticsPlayersAverageMetrics(playerMetricsPerDay);

        if (
          playerMetricsPerDay.avg &&
          playerMetricsPerDay.median &&
          playerMetricsPerDay.avg_time &&
          playerMetricsPerDay.median_time
        ) {
          setAvg(playerMetricsPerDay.avg);
          setMedian(playerMetricsPerDay.median);
          setAverageConvertedTime(handleConvert(playerMetricsPerDay.avg_time));
          setMedianConvertedTime(
            handleConvert(playerMetricsPerDay.median_time)
          );
          setAverageTime(convertSecondsToHours(playerMetricsPerDay.avg_time));
          setMedianTime(convertSecondsToHours(playerMetricsPerDay.median_time));
          setIsExecutedAverage(true);
        } else setIsExecutedAverage(false);
      }

      const playerRetentionDayData = await getPlayersRetentionDayN(
        Number(startTimeMetric),
        Number(endTimeMetric),
        Number(dayRetention)
      );

      if (
        !playerRetentionDayData ||
        playerRetentionDayData.error ||
        playerRetentionDayData.retention == null
      ) {
        setAnalyticsPlayersRetention(playerRetentionDayData?.error);
        setRetention(null);
      } else {
        setRetention(playerRetentionDayData?.retention);

        setAnalyticsPlayersRetention(playerRetentionDayData);
        setIsExecutedRetention(true);
      }

      const uniquePlayersData = await getNumberOfUniquePlayers(
        Number(startTimeMetric),
        Number(endTimeMetric)
      );

      if (!uniquePlayersData || uniquePlayersData.error) {
        setAnalyticsNumOfUniquePlayers(uniquePlayersData?.error);
      } else {
        setAnalyticsNumOfUniquePlayers(uniquePlayersData);

        if (uniquePlayersData.number && uniquePlayersData.number > -1) {
          setNumOfUniquePlayers(uniquePlayersData.number);
          setIsExecutedUnique(true);
        } else setIsExecutedUnique(false);
      }
    }
  };

  return (
    <>
      {/* Metric */}
      <div>
        <h2>Metric</h2>
        <form onSubmit={handleSubmitMetric}>
          <table cellSpacing={10}>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="startTimeMetric">
                    Start Time<span>*</span>:
                  </label>
                </td>
                <CustomDatePicker
                  onEpochTimeChange={handleStartTimeMetric}
                  id="startTimeMetric"
                  required={true}
                />
              </tr>
              <tr>
                <td>
                  <label htmlFor="endTimeMetric">
                    End Time<span>*</span>:
                  </label>
                </td>
                <CustomDatePicker
                  onEpochTimeChange={handleEndTimeMetric}
                  id="endTimeMetric"
                  required={true}
                />
              </tr>
              <tr>
                <td>
                  <label htmlFor="metricForDay">
                    Day<span>*</span>:
                  </label>
                </td>
                <td colSpan={2}>
                  <input
                    type="number"
                    id="metricForDay"
                    onChange={(e: any) => setDayRetention(e.target.value)}
                    required
                    placeholder="Day in number"
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

        {/* {isExecutedAverage &&
          startTimeMetric &&
          endTimeMetric &&
          avg &&
          median &&
          averageTime &&
          medianTime && (
            <Grid container className="playerSessionsWrapper">
              <Grid item xl={12} lg={12} md={12} sm={12} className="outputHead">
                Player Metrics per day:
              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid container className="tabHead">
                  <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                    Average
                  </Grid>
                  <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                    Median
                  </Grid>
                  <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                    Average Time
                  </Grid>
                  <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                    Median Time
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className="dataWrapper">
                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                  {avg}
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                  {median}
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                  {averageTime}
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                  {medianTime}
                </Grid>
              </Grid>
            </Grid>
          )} */}
        {isExecutedAverage &&
          startTimeMetric &&
          endTimeMetric &&
          avg &&
          median &&
          averageTime &&
          medianTime && (
            <div className="playerSessionsWrapper">
              <div className="outputHead">Player Metrics per day:</div>
              <Chart
                avg={avg}
                median={median}
                averageTime={averageTime}
                medianTime={medianTime}
                averageConvertedTime={averageConvertedTime}
                medianConvertedTime={medianConvertedTime}
              />
            </div>
          )}

        {isExecutedRetention ? (
          dayRetention && startTimeMetric && endTimeMetric && retention ? (
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
                Player Retention for the Day:
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <p className="time-info">{retention}</p>
              </Grid>
            </Grid>
          ) : (
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
                Player Retention for the Day:
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <p className="no-session">No Retention</p>
              </Grid>
            </Grid>
          )
        ) : null}

        {isExecutedUnique &&
          startTimeMetric &&
          endTimeMetric &&
          numOfUniquePlayers && (
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
                Unique Players for Period:
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <p className="time-info">{numOfUniquePlayers}</p>
              </Grid>
            </Grid>
          )}
      </div>
    </>
  );
}

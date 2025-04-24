import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const getConvertedTime = (
  label: string,
  averageConvertedTime: string,
  medianConvertedTime: string
) => {
  if (label === "Average Time") {
    return averageConvertedTime;
  }

  if (label === "Median Time") {
    return medianConvertedTime;
  }
  return "";
};

const CustomTooltip = ({
  active,
  payload,
  label,
  averageConvertedTime,
  medianConvertedTime,
}: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="intro">
          {label}:{" "}
          {(label == "Average" || label == "Median") && payload[0].value}
          {getConvertedTime(label, averageConvertedTime, medianConvertedTime)}
        </p>
      </div>
    );
  }

  return null;
};

const Chart = ({
  avg,
  median,
  averageTime,
  medianTime,
  averageConvertedTime,
  medianConvertedTime,
}: any) => {
  const chartData = [
    { name: "Average", value: avg },
    { name: "Average Time", value: averageTime },
    { name: "Median", value: median },
    { name: "Median Time", value: medianTime },
  ];

  return (
    <BarChart
      width={800}
      height={400}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip
        content={
          <CustomTooltip
            averageConvertedTime={averageConvertedTime}
            medianConvertedTime={medianConvertedTime}
          />
        }
      />
      <Bar dataKey="value" fill="#8884d8" barSize={50} />
    </BarChart>
  );
};

export default Chart;

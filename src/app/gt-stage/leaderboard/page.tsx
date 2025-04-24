/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

import { getStatusParameters } from "../../../actions/analytics-stage";
import Navbar from "@/components/Navbar";
// import PlayersStats from "./players-stats-prev";
import DevLeaderboard from "./leaderboard";
import Footer from "@/components/Footer";

export default function ProdContent() {
  let [analyticsStatus, setAnalyticsStatus] = useState<any>();

  const handleSubmitStatus = (e: any) => {
    e.preventDefault();

    getStatusParameters().then((data) => {
      if (!data || data.error) return setAnalyticsStatus(data?.error);

      setAnalyticsStatus(data);
    });
  };

  return (
    <div className="pageWrapper">
      <Navbar
        analyticsStatus={analyticsStatus}
        handleSubmitStatus={handleSubmitStatus}
      />
      <DevLeaderboard />
      {/* <Footer /> */}
    </div>
  );
}

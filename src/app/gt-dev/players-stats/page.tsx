/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

import { getStatusParameters } from "../../../actions/analytics-dev";
import Navbar from "@/components/Navbar";
// import PlayersStats from "./players-stats-prev";
import PlayersStats from "./players-stats";
import Footer from "@/components/Footer";

export default function DevContent() {
  let [analyticsStatus, setAnalyticsStatus] = useState<any>();

  const handleSubmitStatus = (e: any) => {
    e.preventDefault();

    getStatusParameters().then((data) => {
      if (!data || data.error) return setAnalyticsStatus(data?.error);

      setAnalyticsStatus(data);
    });
  };

  return (
    <>
      {/* <div className="bg">
        <img src="/assets/imgs/plain-bg.png" alt="BG image" />
      </div> */}
      <div className="pageWrapper">
        <Navbar
          analyticsStatus={analyticsStatus}
          handleSubmitStatus={handleSubmitStatus}
        />
        <PlayersStats />
        {/* <Footer /> */}
      </div>
    </>
  );
}

"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayersStats from "./players-stats";
import { getStatusParameters } from "../../../actions/analytics-prod";

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

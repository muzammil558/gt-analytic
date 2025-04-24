/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

import DevContent from "./player";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getStatusParameters } from "../../actions/analytics-dev";

export default function Home() {
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
        <DevContent />
        {/* <Footer /> */}
      </div>
    </>
  );
}

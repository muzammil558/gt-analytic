"use client";

import { useState } from "react";

// import ProdContent from "./content";
import ProdContent from "./player";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getStatusParameters } from "../../actions/analytics-prod";

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
    <div className="pageWrapper">
      <Navbar
        analyticsStatus={analyticsStatus}
        handleSubmitStatus={handleSubmitStatus}
      />
      <ProdContent />
      {/* <Footer /> */}
    </div>
  );
}

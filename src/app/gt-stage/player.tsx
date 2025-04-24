"use client";

import Link from "next/link";

import MetricContent from "./metric";
import GameContent from "./game";

export default function ProdContent() {
  return (
    <div className="wrapper">
      <h1>GT Production</h1>

      <MetricContent />
      <GameContent />

      <div className="backBtnWrapper">
        <Link href={"/"}>
          <button className="backBtn">Back</button>
        </Link>
      </div>
    </div>
  );
}

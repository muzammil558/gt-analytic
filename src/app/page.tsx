/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import EastIcon from "@mui/icons-material/East";

// export default function Home() {
//   return (
//     <div className="homeWrapper">
//       <div className="homeContentWrapper">
//         <img
//           src={"/assets/imgs/gt-logo.png"}
//           alt="logo"
//           className={"nav-logo"}
//         />
//         <h2>Welcome</h2>

//         <p>Select Sub Domain</p>
//         <div className="homeBtnsWrapper">
//           <div className="sameDomBtns">
//             <Link href={"/gt-dev"}>
//               <button>GT Dev</button>
//             </Link>
//             <EastIcon sx={{ margin: "0 10px" }} />
//             <div className="stats_leaderboard">
//               <Link href={"/gt-dev/players-stats"}>
//                 <button className="playersStatsBtn">Players Stats</button>
//               </Link>
//               <Link href={"/gt-dev/leaderboard"}>
//                 <button>Leaderboard</button>
//               </Link>
//             </div>
//           </div>
//           <div className="sameDomBtns">
//             <Link href={"/gt-prod"}>
//               <button>GT Production</button>
//             </Link>
//             <EastIcon sx={{ margin: "0 10px" }} />
//             <div className="stats_leaderboard">
//               <Link href={"/gt-prod/players-stats"}>
//                 <button className="playersStatsBtn">Players Stats</button>
//               </Link>
//               <Link href={"/gt-prod/leaderboard"}>
//                 <button>Leaderboard</button>
//               </Link>
//             </div>
//           </div>
//           <div className="sameDomBtns">
//             <Link href={"/gt-stage"}>
//               <button>GT Stage</button>
//             </Link>
//             <EastIcon sx={{ margin: "0 10px" }} />
//             <div className="stats_leaderboard">
//               <Link href={"/gt-stage/players-stats"}>
//                 <button className="playersStatsBtn">Players Stats</button>
//               </Link>
//               <Link href={"/gt-stage/leaderboard"}>
//                 <button>Leaderboard</button>
//               </Link>
//             </div>
//           </div>
//           {/* <div className="sameDomBtns">
//             <Link href={"/stats-graph"}>
//               <button>All Players Graph</button>
//             </Link>
//           </div>
//           <div className="sameDomBtns">
//             <Link href={"/filter-sessions"}>
//               <button>Players Stats with Filter</button>
//             </Link>
//           </div> */}
//           <div className="extraLinks">
//             <Link href="/stats-graph">All Players Graph</Link>
//             <Link href="/filter-sessions">Players Stats with Filter</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Home() {
  return (
    <div className="background">
      <div className="home-container">
        <div>
          <img className="logo" src="/assets/imgs/gt-logo.png" alt="logo.png" />
        </div>
        <h1>Explore all stats in the game</h1>
        <div className="easy">
          <p className="easy-p">
            Easy access to everything you need to know for the game
          </p>
        </div>
        <div className="Btn-container">
          <div className="btn-box">
            <h3>
              <Link href={"/gt-dev"}>GT Dev</Link>
            </h3>
            <img src="/assets/imgs/LINE.png" alt="line.png" />
            <div className="btn">
              <Link href={"/gt-dev/players-stats"}>
                <button className="p-s">Player Stats</button>
              </Link>
              <Link href={"/gt-dev/leaderboard/"}>
                <button className="l-b">Leaderboard</button>
              </Link>
            </div>
          </div>
          <div className="btn-box">
            <h3>
              <Link href={"/gt-prod"}>GT Production</Link>
            </h3>
            <img src="/assets/imgs/LINE.png" alt="line.png" />
            <div className="btn">
              <Link href={"/gt-prod/players-stats/"}>
                <button className="p-s">Player Stats</button>
              </Link>
              <Link href={"/gt-prod/leaderboard/"}>
                <button className="l-b">Leaderboard</button>
              </Link>
            </div>
          </div>
          <div className="btn-box">
            <h3>GT Stage</h3>
            <img src="/assets/imgs/LINE.png" alt="line.png" />
            <div className="btn">
              <Link href={"/gt-stage/players-stats/"}>
                <button className="p-s">Player Stats</button>
              </Link>
              <Link href={"/gt-stage/leaderboard/"}>
                <button className="l-b">Leaderboard</button>
              </Link>
            </div>
          </div>
          <p className="endText">
            <Link href={"/stats-graph/"}>All Players Graph</Link>•
            <Link href={"/filter-sessions/"}>Players Stats with Filter</Link>
          </p>
        </div>
      </div>

      <img className="img-1" src="/assets/imgs/home-img-1.png" alt="" />

      <img className="img-2" src="/assets/imgs/home-img-2.png" alt="" />
    </div>
  );
}

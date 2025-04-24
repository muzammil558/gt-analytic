/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { getLeaderboard } from "../../../actions/analytics-stage";
import { PlayerData } from "@/utils/playerData";
import Row from "@/components/Leaderboard-TableRow";

export default function StageLeaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<PlayerData[]>([]);
  const [count, setCount] = useState(0);
  const [leaderboardStats, setLeaderboardStats] = useState<"daily" | "weekly">(
    "daily"
  );
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("rank");
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(600));

  useEffect(() => {
    const fetchPlayersData = async () => {
      setLeaderboardData([]);
      setLoading(true);

      const leaderboardListData = await getLeaderboard(
        leaderboardStats,
        0,
        count
      );

      if (leaderboardListData && !leaderboardListData.error) {
        setCount(leaderboardListData.total);
        setLeaderboardData(leaderboardListData);
      }
      setLoading(false);
    };

    fetchPlayersData();

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 12000);

    return () => clearTimeout(loadingTimeout);
  }, [leaderboardStats, count]);

  const handleLeaderboardToggle = (button: "daily" | "weekly") => {
    setLeaderboardStats(button);
  };

  // Handle sorting
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = leaderboardData?.players?.sort((a: any, b: any) => {
    if (orderBy === "name" || orderBy === "id") {
      return order === "asc"
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
    return order === "asc"
      ? (a[orderBy] || 0) - (b[orderBy] || 0)
      : (b[orderBy] || 0) - (a[orderBy] || 0);
  });

  return (
    <div className="leaderboard-container">
      <div className="header">
        <div className="header-left">
          <Link href={"/"}>
            <button className="back-button">
              <ArrowBackIosIcon sx={{ fontSize: 18 }} />
              {!isMobile && "Back"}
            </button>
          </Link>
          <h1>Production Leaderboard</h1>
        </div>
      </div>
      <div className="tab-navigation">
        <button
          onClick={() => handleLeaderboardToggle("daily")}
          className={`tab-button ${
            leaderboardStats === "daily" ? "active" : "inactive"
          }`}
        >
          Daily Data
        </button>
        <button
          onClick={() => handleLeaderboardToggle("weekly")}
          className={`tab-button ${
            leaderboardStats === "weekly" ? "active" : "inactive"
          }`}
        >
          Weekly Data
        </button>
      </div>

      {leaderboardData?.players?.length > 0 || loading ? (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#011316",
            margin: "25px auto",
            maxHeight: "470px",
            "@media (max-width: 1199.95px)": {
              margin: "18px auto",
            },
            "@media (max-width: 769.95px)": {
              margin: "15px auto",
              maxHeight: "448px",
            },
          }}
        >
          <Table
            aria-label="collapsible table"
            sx={{ backgroundColor: "#011316" }}
          >
            <TableHead sx={{ backgroundColor: "#001316" }}>
              <TableRow>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "rank"}
                    direction={orderBy === "rank" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "rank")}
                  >
                    Rank
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "score"}
                    direction={orderBy === "score" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "score")}
                  >
                    Score
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "id"}
                    direction={orderBy === "id" ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, "id")}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    sx={{ padding: "150px 0" }}
                    colSpan={20}
                    align="center"
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((row: any) => <Row key={row.id} row={row} />)
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#011316",
              margin: "25px auto",
              maxHeight: "470px",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "@media (max-width: 1199.95px)": {
                margin: "18px auto",
              },
              "@media (max-width: 769.95px)": {
                margin: "15px auto",
                maxHeight: "448px",
              },
            }}
          >
            <Table
              aria-label="collapsible table"
              sx={{ backgroundColor: "#011316" }}
            >
              <TableHead sx={{ backgroundColor: "#001316" }}>
                <TableRow>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === "rank"}
                      direction={orderBy === "rank" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "rank")}
                    >
                      Rank
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "name")}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === "score"}
                      direction={orderBy === "score" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "score")}
                    >
                      Score
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === "id"}
                      direction={orderBy === "id" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "id")}
                    >
                      ID
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>

          <div className="notFoundWrapper">
            <img src={"/assets/imgs/not-found.png"} alt="Not Found" />
          </div>
        </>
      )}

      {/* <div className="backBtnWrapper">
        <Link href={"/"}>
          <button className="backBtn">Home</button>
        </Link>
      </div> */}
    </div>
  );
}

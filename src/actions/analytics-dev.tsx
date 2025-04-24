"use server";

// import { redirect } from "next/navigation";

/**
 * Player
 */
export async function getPlayerSessionsForPeriod(
  playerName: string | undefined,
  startTime: number | undefined,
  endTime: number | undefined
) {
  try {
    let response = await fetch(
      `https://gt-dev.psychedelicgames.xyz/analytics/api/v1/player/${playerName}/sessions/${startTime}/${endTime}`
      // "https://gt-dev.psychedelicgames.xyz/analytics/api/v1/player/Oshan/sessions/1719288000/1719404548"
      // "https://jsonplaceholder.typicode.com/users"
    );
    let data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err);
    // redirect("/");
  }
}

export async function getPlayersListWithStats(
  size: number | undefined,
  page: number | undefined
) {
  try {
    let response = await fetch(
      `https://gt-dev.psychedelicgames.xyz/analytics/api/v1/player/list/${size}/${page}`
    );
    let data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err);
    // redirect("/");
  }
}

export async function getTotalPlayerSessionsTimeInSecForPeriod(
  playerName: string | undefined,
  startTime: number | undefined,
  endTime: number | undefined
) {
  try {
    let response = await fetch(
      `https://gt-dev.psychedelicgames.xyz/analytics/api/v1/player/${playerName}/time/${startTime}/${endTime}`
    );
    let data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err);
    // redirect("/");
  }
}

export async function getPlayersReferralCode_Numbers(
  size: number | undefined,
  page: number | undefined
) {
  try {
    let response = await fetch(
      `https://gt-dev.psychedelicgames.xyz/analytics/api/v1/player/referrals/${size}/${page}`
    );
    let data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err);
    // redirect("/");
  }
}

export async function downloadEmailsList(
  size: number | undefined,
  page: number | undefined
) {
  try {
    let response = await fetch(
      `https://gt-dev.psychedelicgames.xyz/analytics/api/v1/player/emails/download`
    );
    let data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err);
    // redirect("/");
  }
}

/**
 * Game
 */
export async function getGameSessions(
  startTime: number | undefined,
  endTime: number | undefined,
  size: number | undefined,
  page: number | undefined
) {
  try {
    let response = await fetch(
      `https://gt-dev.psychedelicgames.xyz/analytics/api/v1/game/sessions/${startTime}/${endTime}/${size}/${page}`
    );
    let data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err);
    // redirect("/");
  }
}

/**
 * Metric
 */
export async function getPlayersMetricsPerDay(
  startTime: number | undefined,
  endTime: number | undefined
) {
  try {
    let response = await fetch(
      `https://gt-dev.psychedelicgames.xyz/analytics/api/v1/metric/average/${startTime}/${endTime}`
    );
    let data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err);
    // redirect("/");
  }
}

export async function getPlayersRetentionDayN(
  startTime: number | undefined,
  endTime: number | undefined,
  day: number | undefined
) {
  try {
    let response = await fetch(
      `https://gt-dev.psychedelicgames.xyz/analytics/api/v1/metric/retention/${startTime}/${endTime}/${day}`
    );
    let data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err);
    // redirect("/");
  }
}

export async function getNumberOfUniquePlayers(
  startTime: number | undefined,
  endTime: number | undefined
) {
  try {
    let response = await fetch(
      `https://gt-dev.psychedelicgames.xyz/analytics/api/v1/metric/unique/${startTime}/${endTime}`
    );
    let data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err);
    // redirect("/");
  }
}

/**
 * Leaderboard
 */
export async function getLeaderboard(
  leaderboard: string | undefined,
  first: number | undefined,
  last: number | undefined
) {
  try {
    let response = await fetch(
      `https://gt-dev.psychedelicgames.xyz/analytics/api/v1/leaderboard/${leaderboard}/${first}/${last}`
    );
    let data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err);
    // redirect("/");
  }
}

/**
 * Status
 */
export async function getStatusParameters() {
  try {
    let response = await fetch(
      "https://gt-dev.psychedelicgames.xyz/analytics/api/v1/status"
    );
    let data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err);
    // redirect("/");
  }
}

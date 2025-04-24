export const convertEpochToLocalTime = (epochTime: number) => {
  const date = new Date(epochTime * 1000);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const calculateTimePlayed = (startEpoch: number, endEpoch: number) => {
  // Convert epoch time (in seconds) to milliseconds
  const start = new Date(startEpoch * 1000);
  const end = new Date(endEpoch * 1000);

  // Get the difference in milliseconds
  const differenceInMs: any = end - start;

  // Convert milliseconds to hours, minutes, and seconds
  const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
  const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);

  // Return the formatted string
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else if (seconds > 0) {
    return `${seconds}s`;
  }
};

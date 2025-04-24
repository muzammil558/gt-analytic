export const convertISO8601ToLocalTime = (timestamp: number): string => {
  const date = new Date(timestamp);

  // Format options
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
};

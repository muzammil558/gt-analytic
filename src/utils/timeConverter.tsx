export const convertSecondsToHMS = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = secs.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const convertSecondsToHours = (seconds: number) => {
  const hours = seconds / 3600;

  return hours.toFixed(2);
};

export const convertSecondsToMDHMS = (seconds: number) => {
  const months = Math.floor(seconds / (30 * 24 * 3600));
  const days = Math.floor((seconds % (30 * 24 * 3600)) / (24 * 3600));
  const hours = Math.floor((seconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  // const formattedMonths = months.toString().padStart(2, "0");
  // const formattedDays = days.toString().padStart(2, "0");
  // const formattedHours = hours.toString().padStart(2, "0");
  // const formattedMinutes = minutes.toString().padStart(2, "0");
  // const formattedSeconds = secs.toString().padStart(2, "0");
  const formattedMonths = months.toString();
  const formattedDays = days.toString();
  const formattedHours = hours.toString();
  const formattedMinutes = minutes.toString();
  const formattedSeconds = secs.toString();

  if (months > 0) {
    return `${formattedMonths}M, ${formattedDays}d, ${formattedHours}h ${formattedMinutes}m`;
  } else if (days > 0) {
    return `${formattedDays}d, ${formattedHours}h ${formattedMinutes}m`;
  } else if (hours > 0) {
    return `${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
  } else if (minutes > 0) {
    return `${formattedMinutes}m ${formattedSeconds}s`;
  } else if (secs > 0) {
    return `${formattedSeconds}s`;
  }
};

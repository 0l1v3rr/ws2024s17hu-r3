export const timeFromSeconds = (seconds: number) => {
  const totalMin = Math.floor(seconds / 60);

  const secs = seconds % 60;
  const hours = Math.floor(totalMin / 60);
  const minutes = totalMin % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export const hasRaceStarted = (currentDate: Date, plannedStartingTime: Date) => {
  return plannedStartingTime.getTime() < currentDate.getTime();
};

export const dayDifference = (startDate: Date, finishDate: Date) => {
  const diff = finishDate.getTime() - startDate.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
};

export const subtractDates = (startDate: Date, finishDate: Date) => {
  return new Date(finishDate.valueOf() - startDate.valueOf());
};

export const formatTime = (date: Date, showSeconds: boolean = false) => {
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}${showSeconds ? `:${date.getSeconds().toString().padStart(2, "0")}` : ""}`;
};

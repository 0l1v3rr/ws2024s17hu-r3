export const convertTimeToSec = (time: string): number => {
  const [min, sec] = time.split(":");
  return Number(min) * 60 + Number(sec);
};

export const calculateMinuteDifference = (
  startDate: Date,
  finishDate: Date
) => {
  const diff = Math.abs(finishDate.getTime() - startDate.getTime());
  return Math.round(diff / (1000 * 60));
};

export const withTimezoneOffset = (date: Date) => {
  const newDate = new Date(date.valueOf());
  newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());

  return newDate.toISOString().substring(0, 16);
};

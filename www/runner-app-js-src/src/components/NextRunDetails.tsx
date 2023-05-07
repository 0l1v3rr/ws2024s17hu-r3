import { NextRun } from "../types";
import { formatTime, subtractDates } from "../utils";

type Props = {
  nextRun: NextRun | null;
  date: Date;
  status: "current" | "next";
  dayDiff: number;
};

const NextRunDetails = ({ nextRun, status, dayDiff, date }: Props) => {
  return (
    <div>
      <h6 className="font-bold text-text-primary leading-none">
        {nextRun === null ? (
          "No more running 🏃"
        ) : (
          <>
            Your {status} {nextRun.stage.distance} km run 🏃
          </>
        )}
      </h6>

      <span className="text-blue-secondary text-sm">
        {nextRun === null ? (
          "-"
        ) : (
          <>
            {dayDiff < 1 ? "" : `${dayDiff} days & `}{" "}
            {formatTime(subtractDates(date, new Date(nextRun.plannedStartTime)), true)} UNTIL
            HANDOVER
          </>
        )}
      </span>
    </div>
  );
};

export default NextRunDetails;

import { ReactNode } from "react";
import { Runner } from "../types";
import { dateWithTimezoneDiff, formatTime } from "../utils";

type Props = {
  title: string;
  runner: Runner | null | undefined;
  date: string;
  children: ReactNode;
  runnerAlign: "left" | "right";
};

const StageDetails = ({
  children,
  title,
  runner,
  date,
  runnerAlign,
}: Props) => {
  return (
    <div className="bg-white-primary rounded-xl px-4 py-3 flex flex-col gap-4">
      <h6 className="font-bold text-text-card-title text-lg">{title}</h6>

      <div
        className={`flex justify-between items-center ${
          runnerAlign === "right" ? "flex-row-reverse" : ""
        }`}
      >
        <div className="flex items-center gap-3 border leading-none px-4 py-2 rounded-full border-blue-primary text-blue-primary w-fit">
          <i className={`far fa-user ${!runner ? "mr-28" : ""}`} />
          {runner ? (
            <>
              {runner.firstName} {runner.lastName}
            </>
          ) : (
            ""
          )}
        </div>

        <div className="font-extrabold text-4xl">
          {date === "--:--" ? date : formatTime(dateWithTimezoneDiff(date))}
        </div>
      </div>

      {children}
    </div>
  );
};

export default StageDetails;

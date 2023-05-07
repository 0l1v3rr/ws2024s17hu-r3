import { CurrentRunner } from "../types";
import { timeFromSeconds } from "../utils";

type Props = {
  currentRunner: CurrentRunner | null;
  raceStarted: boolean;
};

const CurrentRunnerBox = ({ currentRunner, raceStarted }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h6 className="font-bold">Current runner</h6>

      <div className="w-full bg-gradient-to-r from-pink to-purple text-white px-6 py-4 rounded-xl flex flex-col gap-5">
        <div className="flex gap-4 items-center">
          <i className="far fa-user text-xl"></i>
          <span className="font-semibold text-xl whitespace-nowrap">
            {raceStarted ? (
              currentRunner ? (
                <>
                  {currentRunner.runner.firstName} {currentRunner.runner.lastName}
                </>
              ) : (
                "The team has finished the race"
              )
            ) : (
              "The team has not yet started"
            )}
          </span>
        </div>

        <div className="flex gap-5 items-center">
          <i className="fa fa-map-marker-alt text-xl"></i>
          <div className="flex flex-col text-sm">
            <span className={!currentRunner || !raceStarted ? "pr-32" : ""}>
              {currentRunner && raceStarted ? currentRunner.stage.startingLocation : "-"}
            </span>
            <span className={!currentRunner || !raceStarted ? "pr-32" : ""}>
              {currentRunner && raceStarted ? currentRunner.stage.arrivalLocation : "-"}
            </span>
          </div>
          <div className="border-l border-white pl-2 text-sm">
            {currentRunner ? currentRunner.stage.distance : "-"} km
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <i className="far fa-clock text-xl"></i>
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-xl">
              {raceStarted && currentRunner
                ? timeFromSeconds(Math.abs(currentRunner.scheduleDifference))
                : ""}
            </span>
            <span>
              {raceStarted && currentRunner
                ? currentRunner.scheduleDifference > 0
                  ? "Ahead of schedule"
                  : "Behind schedule"
                : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentRunnerBox;

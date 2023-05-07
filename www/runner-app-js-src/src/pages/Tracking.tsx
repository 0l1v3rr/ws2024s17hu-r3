import { Runner } from "../types";
import Welcome from "../components/Welcome";
import { useCurrentRunner } from "../hooks/useCurrentRunner";
import CurrentRunnerBox from "../components/CurrentRunnerBox";
import { useCurrentDate } from "../hooks/useCurrentDate";
import { useState } from "react";
import { dayDifference, hasRaceStarted } from "../utils";
import Loading from "./Loading";
import { useNextRun } from "../hooks/useNextRun";
import NextRunDetails from "../components/NextRunDetails";
import StageDetails from "../components/StageDetails";
import Button from "../components/Button";
import axios from "axios";

type Props = {
  runner: Runner;
  accessCode: string;
  plannedStartingTime: Date;
};

const Tracking = ({ runner, accessCode, plannedStartingTime }: Props) => {
  const date = useCurrentDate();
  const [currentRunner, pollCurrentRunner] = useCurrentRunner(accessCode);
  const [nextRun, pollNextRun] = useNextRun(accessCode, runner.id);

  const daysToGo = dayDifference(date, plannedStartingTime);
  const [raceStarted, setRaceStarted] = useState<boolean>(
    hasRaceStarted(plannedStartingTime, date)
  );

  if (currentRunner === undefined || nextRun === undefined) return <Loading />;

  const handoverStart = async () => {
    if (!currentRunner) return;
    setRaceStarted(true);

    await axios.post(
      "handover/start",
      { runnerId: runner.id, stageId: currentRunner.stage.id },
      { headers: { Authorization: `Bearer ${accessCode}` } }
    );
    await Promise.all([pollCurrentRunner(), pollNextRun()]);
  };

  const handoverFinish = async () => {
    if (!currentRunner) return;

    await axios.post(
      "handover/finish",
      { runnerId: runner.id, stageId: currentRunner.stage.id },
      { headers: { Authorization: `Bearer ${accessCode}` } }
    );
    await Promise.all([pollCurrentRunner(), pollNextRun()]);
  };

  return (
    <>
      <Welcome name={runner.firstName} subtitle="Have a good running!" />
      <CurrentRunnerBox currentRunner={currentRunner} raceStarted={raceStarted} />

      <NextRunDetails
        nextRun={nextRun}
        date={date}
        status={currentRunner?.runner.id === runner.id ? "current" : "next"}
        dayDiff={daysToGo}
      />

      <StageDetails
        title={nextRun ? nextRun.stage.startingLocation : "-"}
        date={nextRun ? nextRun.plannedStartTime : "--:--"}
        runner={nextRun?.previousRunner}
        runnerAlign="left"
      >
        <Button
          disabled={!(nextRun?.canStart && !raceStarted)}
          visible={daysToGo < 1}
          onClick={handoverStart}
        >
          {nextRun?.previousRunner === null ? "Start Race now" : "Handover now"}
        </Button>
      </StageDetails>

      <StageDetails
        title={nextRun ? nextRun.stage.arrivalLocation : "-"}
        date={nextRun ? nextRun.plannedFinishTime : "--:--"}
        runner={nextRun?.nextRunner}
        runnerAlign="right"
      >
        <Button
          disabled={currentRunner?.runner.id !== runner.id}
          visible={daysToGo < 1}
          onClick={handoverFinish}
        >
          Handover now
        </Button>
      </StageDetails>
    </>
  );
};

export default Tracking;

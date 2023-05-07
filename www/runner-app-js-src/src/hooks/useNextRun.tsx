import { useState, useCallback, useEffect } from "react";
import { MayBeFinished, NextRun } from "../types";
import axios from "axios";

export const useNextRun = (accessCode: string, runnerId: number) => {
  const [nextRun, setNextRun] = useState<NextRun | null>();

  const pollNextRun = useCallback(() => {
    axios
      .get<MayBeFinished<NextRun>>(`nextRun?runnerId=${runnerId}`, {
        headers: { Authorization: `Bearer ${accessCode}` },
      })
      .then((res) => {
        const { data } = res;
        if ("finished" in data) {
          setNextRun(null);
          return;
        }

        setNextRun(data);
      });
  }, [accessCode, runnerId]);

  useEffect(() => {
    pollNextRun();
    const interval = setInterval(() => pollNextRun(), 10 * 1000);

    return () => clearInterval(interval);
  }, [pollNextRun]);

  return [nextRun, pollNextRun] as const;
};

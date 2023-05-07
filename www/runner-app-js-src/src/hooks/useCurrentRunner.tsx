import { useState, useCallback, useEffect } from "react";
import { CurrentRunner, MayBeFinished } from "../types";
import axios from "axios";

export const useCurrentRunner = (accessCode: string) => {
  const [currentRunner, setCurrentRunner] = useState<CurrentRunner | null>();

  const pollCurrentRunner = useCallback(() => {
    axios
      .get<MayBeFinished<CurrentRunner>>("currentRunner", {
        headers: { Authorization: `Bearer ${accessCode}` },
      })
      .then((res) => {
        const { data } = res;
        if ("finished" in data) {
          setCurrentRunner(null);
          return;
        }

        setCurrentRunner(data);
      });
  }, [accessCode]);

  useEffect(() => {
    pollCurrentRunner();
    const interval = setInterval(() => pollCurrentRunner(), 10 * 1000);

    return () => clearInterval(interval);
  }, [pollCurrentRunner]);

  return [currentRunner, pollCurrentRunner] as const;
};

import { ReactNode, createContext, useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Team } from "../types";
import axios from "axios";
import { calculateMinuteDifference, convertTimeToSec } from "../utils";

export interface AdminContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  teams: Team[];
  plannedStartingTime: Date;
  setPlannedStartingTime: (date: Date) => void;
  interval: number;
  setIntervalValue: (interval: number) => void;
  updateTeam: (newTeam: Team) => void;
  saveTeam: (team: Team) => Promise<void>;
  deleteTeam: (teamId: number) => Promise<void>;
  updateStartingTimes: () => void;
  unsaved: boolean;
  moveTeam: (teamId: number, direction: "up" | "down") => void;
  saveStartingTimes: () => Promise<void>;
  reorderByAveragePace: () => void;
  createTeam: (name: string, contactEmail: string) => Promise<void>;
  firstTeam: (id: number) => boolean;
  lastTeam: (id: number) => boolean;
  snackbarText: string | null;
  clearSnackbar: () => void;
}

export const AdminContext = createContext<AdminContextType>({} as AdminContextType);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [unsaved, setUnsaved] = useState(false);
  const [snackbarText, setSnackbarText] = useState<null | string>(null);

  // team race
  const [interval, setIntervalValue] = useState(5);
  const [plannedStartingTime, setPlannedStartingTime] = useState(new Date());

  useEffect(() => {
    if (token === null) return;

    axios.get<Team[]>("teams", { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      const { data } = res;

      setTeams(
        data.sort((a, z) => {
          return (
            new Date(a.plannedStartingTime).getTime() - new Date(z.plannedStartingTime).getTime()
          );
        })
      );

      // If the result set doesn't contain the necessary amount of teams we need in order to calculate the following fields,
      // the defaults are used. (which have been set as the default value of the state)
      if (data.length > 0) {
        setPlannedStartingTime(new Date(res.data[0].plannedStartingTime));
      }

      if (data.length > 1) {
        setIntervalValue(
          calculateMinuteDifference(
            new Date(res.data[0].plannedStartingTime),
            new Date(res.data[1].plannedStartingTime)
          )
        );
      }
    });
  }, [token]);

  const updateTeam = useCallback((newTeam: Team) => {
    setTeams((prev) => {
      const idx = prev.findIndex((x) => x.id === newTeam.id);
      if (idx === -1) return prev;

      const newObj: Team[] = structuredClone(prev);
      newObj[idx] = newTeam;

      return newObj;
    });
  }, []);

  const saveTeam = useCallback(
    async (team: Team) => {
      await axios.put(
        `teams/${team.id}`,
        { name: team.name, contactEmail: team.contactEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSnackbarText("The team has been saved!");
    },
    [token]
  );

  const deleteTeam = useCallback(
    async (teamId: number): Promise<void> => {
      await axios.delete(`teams/${teamId}`, { headers: { Authorization: `Bearer ${token}` } });
      setTeams((prev) => prev.filter((x) => x.id !== teamId));
      setSnackbarText("The team has been deleted!");
    },
    [token]
  );

  const updateStartingTimes = useCallback(() => {
    setTeams((prev) => {
      const newObj: Team[] = structuredClone(prev);
      const startingTime = new Date(plannedStartingTime.valueOf());

      for (let i = 0; i < newObj.length; i++) {
        newObj[i].plannedStartingTime = startingTime.toISOString();
        startingTime.setMinutes(startingTime.getMinutes() + interval);
      }

      return newObj;
    });

    setUnsaved(true);
  }, [plannedStartingTime, interval]);

  const moveTeam = useCallback((teamId: number, direction: "up" | "down") => {
    setTeams((prev) => {
      const idx = prev.findIndex((x) => x.id === teamId);
      if (idx === -1) return prev;

      if (direction === "up" && idx === 0) return prev;
      if (direction === "down" && idx === prev.length - 1) return prev;

      const newObj: Team[] = structuredClone(prev);
      const directionInNumber = direction === "up" ? -1 : 1;

      // we need the plannedStartingTimes
      const firstPst = newObj[idx].plannedStartingTime;
      const secondPst = newObj[idx + directionInNumber].plannedStartingTime;

      // swap
      const temp = { ...newObj[idx + directionInNumber] };
      newObj[idx + directionInNumber] = { ...newObj[idx] };
      newObj[idx] = temp;

      // give the plannedStartingTimes back
      newObj[idx].plannedStartingTime = firstPst;
      newObj[idx + directionInNumber].plannedStartingTime = secondPst;

      return newObj;
    });

    setUnsaved(true);
  }, []);

  const reorderByAveragePace = useCallback(() => {
    setTeams((prev) =>
      (structuredClone(prev) as Team[]).sort(
        (a, z) => convertTimeToSec(z.averagePace) - convertTimeToSec(a.averagePace)
      )
    );

    updateStartingTimes();
  }, [updateStartingTimes]);

  const saveStartingTimes = useCallback(async (): Promise<void> => {
    for (const team of teams) {
      await axios.put(
        `teams/${team.id}`,
        { plannedStartingTime: team.plannedStartingTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    setUnsaved(false);
    setSnackbarText("The starting times have been saved!");
  }, [teams, token]);

  const createTeam = useCallback(
    async (name: string, contactEmail: string): Promise<void> => {
      const lastTeam = teams.at(-1);
      const startingTime = !lastTeam ? plannedStartingTime : new Date(lastTeam.plannedStartingTime);
      if (lastTeam) startingTime.setMinutes(startingTime.getMinutes() + interval);

      const res = await axios.post<Team>(
        "teams",
        {
          name,
          contactEmail,
          plannedStartingTime: startingTime,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTeams((prev) => [...prev, res.data]);
      setSnackbarText("The team has been created!");
    },
    [interval, plannedStartingTime, teams, token]
  );

  const getTeamIndex = useCallback((id: number) => teams.findIndex((x) => x.id === id), [teams]);

  const firstTeam = (id: number) => getTeamIndex(id) === 0;
  const lastTeam = (id: number) => getTeamIndex(id) === teams.length - 1;

  return (
    <AdminContext.Provider
      value={{
        token,
        teams,
        plannedStartingTime,
        interval,
        unsaved,
        snackbarText,
        setToken,
        setPlannedStartingTime,
        setIntervalValue,
        updateTeam,
        saveTeam,
        deleteTeam,
        updateStartingTimes,
        moveTeam,
        saveStartingTimes,
        reorderByAveragePace,
        createTeam,
        firstTeam,
        lastTeam,
        clearSnackbar: () => setSnackbarText(null),
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

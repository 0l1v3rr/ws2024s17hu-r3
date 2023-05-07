export interface MyTeam {
  id: number;
  name: string;
  contactEmail: string;
  plannedStartingTime: string;
  runners: Runner[];
}

export interface Runner {
  id: number;
  firstName: string;
  lastName: string;
  pace: string;
  teamId: number;
}

export interface CurrentRunner {
  runner: Runner;
  stage: Stage;
  scheduleDifference: number;
}

export interface NextRun {
  stage: Stage;
  previousRunner: Runner | null;
  nextRunner: Runner | null;
  canStart: boolean;
  plannedStartTime: string;
  plannedFinishTime: string;
}

interface Stage {
  id: number;
  startingLocation: string;
  arrivalLocation: string;
  distance: string;
  name: string;
}

export type MayBeFinished<T> = { finished: true } | T;

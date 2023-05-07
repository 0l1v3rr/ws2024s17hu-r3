export interface LoginResponse {
  token: string;
}

export interface Team {
  id: number;
  name: string;
  contactEmail: string;
  plannedStartingTime: string;
  startingTime: null | string;
  accessCode: string;
  createdAt: string;
  updatedAt: string;
  averagePace: string;
}

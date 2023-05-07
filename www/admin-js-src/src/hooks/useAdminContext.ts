import { useContext } from "react";
import { AdminContext, AdminContextType } from "../context/AdminProvider";

export const useAdminContext = (): AdminContextType => {
  return useContext(AdminContext) as AdminContextType;
};

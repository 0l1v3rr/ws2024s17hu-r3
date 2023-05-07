import { Box, Typography, Button, TextField } from "@mui/material";
import { useAdminContext } from "../hooks/useAdminContext";
import { useNavigate } from "react-router-dom";

const TeamRace = () => {
  const navigate = useNavigate();
  const {
    plannedStartingTime,
    setPlannedStartingTime,
    interval,
    setIntervalValue,
    setToken,
    updateStartingTimes,
  } = useAdminContext();

  return (
    <Box sx={{ width: "100%", gap: "1rem", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5">Team Race</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
          startIcon={<i className="fas fa-sign-out-alt" />}
          onClick={() => {
            setToken(null);
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "24rem",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Starting Time"
          label="Starting Time"
          sx={{ width: "100%" }}
          size="small"
          type="datetime-local"
          value={plannedStartingTime.toISOString().substring(0, 16)}
          onChange={(e) => setPlannedStartingTime(new Date(e.target.value))}
        />

        <TextField
          variant="outlined"
          placeholder="Interval"
          label="Interval"
          sx={{ width: "100%" }}
          size="small"
          type="number"
          value={interval}
          onChange={(e) => setIntervalValue(Number(e.target.value))}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ width: "fit-content", ml: "auto", textTransform: "none" }}
          onClick={updateStartingTimes}
        >
          Update Starting Times
        </Button>
      </Box>
    </Box>
  );
};

export default TeamRace;

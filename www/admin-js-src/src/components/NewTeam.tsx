import { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { useAdminContext } from "../hooks/useAdminContext";

const NewTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");

  const { createTeam } = useAdminContext();

  return (
    <Box sx={{ gap: ".5rem", display: "flex", p: ".5rem", borderTop: "1px solid #e0e0e0" }}>
      <TextField
        required
        variant="outlined"
        placeholder="Team name"
        label="Team name"
        sx={{ width: "100%" }}
        size="small"
        inputProps={{
          style: { fontSize: ".85rem" },
        }}
        InputLabelProps={{
          style: { fontSize: ".85rem" },
        }}
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />

      <TextField
        required
        variant="outlined"
        placeholder="Contact e-mail"
        label="Contact e-mail"
        sx={{ width: "100%" }}
        size="small"
        type="email"
        inputProps={{
          style: { fontSize: ".85rem" },
        }}
        InputLabelProps={{
          style: { fontSize: ".85rem" },
        }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Box sx={{ width: "140px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <IconButton
          size="small"
          disabled={teamName.trim().length < 1 || email.trim().length < 1}
          onClick={() => createTeam(teamName, email)}
        >
          <i className="fa fa-plus-circle" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NewTeam;

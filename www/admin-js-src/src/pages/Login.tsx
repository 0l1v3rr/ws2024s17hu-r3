import { Box, Container, Typography, TextField, Button, Alert } from "@mui/material";
import { useState, useCallback } from "react";
import axios from "axios";
import { LoginResponse } from "../types";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../hooks/useAdminContext";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setToken } = useAdminContext();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      axios
        .post<LoginResponse>("login", { username, password })
        .then((res) => {
          setToken(res.data.token);
          navigate("/");
        })
        .catch((err) => setError(err.response.data.error));
    },
    [username, password, navigate, setToken]
  );

  return (
    <Container
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          width: "24rem",
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Login
        </Typography>

        {error !== null && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}

        <TextField
          variant="outlined"
          placeholder="Username"
          label="Username"
          sx={{ width: "100%" }}
          size="small"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          variant="outlined"
          placeholder="Password"
          label="Password"
          type="password"
          sx={{ width: "100%" }}
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" color="primary" sx={{ width: "fit-content" }} type="submit">
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;

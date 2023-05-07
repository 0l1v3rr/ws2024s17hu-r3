import { Container, Divider, Snackbar, Alert } from "@mui/material";
import TeamRace from "../components/TeamRace";
import Teams from "../components/Teams";
import { useAdminContext } from "../hooks/useAdminContext";

const Index = () => {
  const { snackbarText, clearSnackbar } = useAdminContext();

  return (
    <Container
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        p: "1rem",
      }}
    >
      <TeamRace />
      <Divider sx={{ height: "1px", bgcolor: "#e0e0e0", width: "100%" }} />
      <Teams />

      <Snackbar open={snackbarText !== null} autoHideDuration={2500} onClose={clearSnackbar}>
        <Alert
          onClose={clearSnackbar}
          severity="success"
          sx={{ minWidth: "10rem", border: "1px solid #418944" }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Index;

import { Box, Typography, IconButton, Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridCellEditStopReasons,
} from "@mui/x-data-grid";
import { useAdminContext } from "../hooks/useAdminContext";
import { Team } from "../types";
import { useState } from "react";
import AreYouSure from "./AreYouSure";
import NewTeam from "./NewTeam";

const Teams = () => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const {
    teams,
    updateTeam,
    saveTeam,
    unsaved,
    moveTeam,
    saveStartingTimes,
    reorderByAveragePace,
    firstTeam,
    lastTeam,
  } = useAdminContext();

  const columns: GridColDef[] = [
    {
      field: "order",
      headerName: "Order",
      flex: 0.5,
      sortable: false,
      type: "actions",
      align: "center",
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => moveTeam(params.row.id, "down")}
            disabled={lastTeam(params.row.id)}
          >
            <i className="fa fa-arrow-down text-sm" />
          </IconButton>

          <IconButton
            size="small"
            onClick={() => moveTeam(params.row.id, "up")}
            disabled={firstTeam(params.row.id)}
          >
            <i className="fa fa-arrow-up text-sm" />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Team name",
      flex: 1,
      editable: true,
      sortable: false,
      minWidth: 80,
    },
    {
      field: "contactEmail",
      headerName: "Contact e-mail",
      minWidth: 150,
      flex: 1.2,
      editable: true,
      sortable: false,
    },
    {
      field: "accessCode",
      headerName: "Access code",
      minWidth: 60,
      flex: 1,
      sortable: false,
    },
    {
      field: "averagePace",
      headerName: "Average Pace",
      minWidth: 60,
      flex: 0.7,
      sortable: false,
    },
    {
      field: "plannedStartingTime",
      headerName: "Starting Time",
      minWidth: 200,
      flex: 1.3,
      sortable: false,
      renderCell: ({ row }) =>
        new Date(row.plannedStartingTime).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 60,
      flex: 0.5,
      sortable: false,
      type: "actions",
      align: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: ".5rem" }}>
          <IconButton size="small" onClick={() => saveTeam(params.row as Team)}>
            <i className="far fa-save text-sm" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => setDeleteId(params.row.id)}
          >
            <i className="far fa-trash-alt text-sm" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        gap: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Teams</Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
        <DataGrid
          onCellEditStop={(params) => {
            if (params.reason === GridCellEditStopReasons.enterKeyDown) {
              updateTeam(params.row as Team);
            }
          }}
          rows={teams}
          columns={columns}
          disableRowSelectionOnClick
          disableColumnMenu
          slots={{
            footer: () => (unsaved ? null : <NewTeam />),
          }}
        />
      </Box>

      <AreYouSure
        isOpen={deleteId !== null}
        close={() => setDeleteId(null)}
        deleteId={deleteId}
      />

      <Box sx={{ gap: "1rem", display: "flex" }}>
        <Button
          sx={{ textTransform: "none" }}
          startIcon={<i className="fa fa-tasks" />}
          variant="contained"
          onClick={reorderByAveragePace}
        >
          Reorder by Average Pace
        </Button>

        <Button
          sx={{ textTransform: "none" }}
          startIcon={<i className="far fa-save" />}
          variant="contained"
          disabled={!unsaved}
          onClick={saveStartingTimes}
        >
          Save Starting Times
        </Button>
      </Box>
    </Box>
  );
};

export default Teams;

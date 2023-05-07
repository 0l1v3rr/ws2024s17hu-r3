import { Dialog, Typography, Box, Button } from "@mui/material";
import { useAdminContext } from "../hooks/useAdminContext";

type Props = {
  isOpen: boolean;
  close: () => void;
  deleteId: number | null;
};

const AreYouSure = ({ isOpen, close, deleteId }: Props) => {
  const { deleteTeam } = useAdminContext();

  return (
    <Dialog open={isOpen}>
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          width: "30rem",
          p: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography variant="h5">Are you sure?</Typography>
        <Typography>
          If you click on the delete button, your team and all runners belonging to your team will
          be deleted.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button size="small" variant="text" sx={{ textTransform: "none" }} onClick={close}>
            Cancel
          </Button>

          <Button
            size="small"
            variant="contained"
            color="error"
            sx={{ textTransform: "none" }}
            onClick={() => {
              if (deleteId === null) return;
              deleteTeam(deleteId);
              close();
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AreYouSure;

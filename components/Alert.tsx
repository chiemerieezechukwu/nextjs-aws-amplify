import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAlertContext } from "~/contexts/AlertProvider";
import { AlertSeverity } from "~/types/alert";

export default function PopUpAlert() {
  const { alertData, setAlertData } = useAlertContext();
  const { open, message, severity } = alertData;

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertData({ ...alertData, open: false, severity: AlertSeverity.ERROR });
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}

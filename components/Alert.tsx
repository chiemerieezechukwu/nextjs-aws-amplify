import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { AlertSeverity } from "../types/alert";

interface IPopUpAlertProps {
  openAlert: boolean;
  message: string | null;
  setOpenAlert: (open: boolean) => void;
  severity?: AlertSeverity;
  setSeverity?: (severity: AlertSeverity) => void;
}

export default function PopUpAlert(props: IPopUpAlertProps) {
  const { openAlert, message, setOpenAlert, severity, setSeverity } = props;

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
    if (setSeverity) setSeverity("error");
  };

  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity || "error"}>
        {message}
      </Alert>
    </Snackbar>
  );
}

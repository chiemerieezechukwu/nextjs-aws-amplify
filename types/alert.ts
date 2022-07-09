export interface IAlert {
  open: boolean;
  message: string | null;
  severity: AlertSeverity;
}

export interface IAlertContext {
  alertData: IAlert;
  setAlertData: (alertData: IAlert) => void;
}

export enum AlertSeverity {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

import { useState, createContext, useContext } from "react";
import { AlertSeverity, IAlert, IAlertContext } from "../types/alert";

interface IAlertProviderProps {
  children: React.ReactNode;
}

const AlertContext = createContext({} as IAlertContext);
export const useAlertContext = () => useContext(AlertContext);

export const AlertProvider = ({ children }: IAlertProviderProps) => {
  const defaultAlert = {
    open: false,
    message: null,
    severity: AlertSeverity.ERROR,
  };
  const [alertData, setAlertData] = useState<IAlert>(defaultAlert);

  return (
    <AlertContext.Provider value={{ alertData, setAlertData }}>
      {children}
    </AlertContext.Provider>
  );
};

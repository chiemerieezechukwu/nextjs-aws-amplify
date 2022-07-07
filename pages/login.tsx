import { useState } from "react";
import PopUpAlert from "../components/Alert";
import ConfirmSignUpForm from "../components/ConfirmSignUpForm";
import LoginForm from "../components/LoginForm";
import { AlertSeverity } from "../types/alert";
import { AuthState, IUserData } from "../types/auth";

export default function Login() {
  const [userData, setUserData] = useState({} as IUserData);
  const [signUpStage, setSignUpStage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState<AlertSeverity>("error");


  return (
    <>
      <main
        style={{
          display: "flex",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {signUpStage === AuthState.CONFIRM_SIGN_UP ? (
          <ConfirmSignUpForm
            userData={userData}
            setSignUpStage={setSignUpStage}
            setErrorMessage={setErrorMessage}
            setOpenAlert={setOpenAlert}
          />
        ) : (
          <LoginForm
            setSignUpStage={setSignUpStage}
            setUserData={setUserData}
            setErrorMessage={setErrorMessage}
            setOpenAlert={setOpenAlert}
            setSeverity={setSeverity}
          />
        )}

        <PopUpAlert
          openAlert={openAlert}
          message={errorMessage}
          setOpenAlert={setOpenAlert}
          severity={severity}
          setSeverity={setSeverity}
        />
      </main>
    </>
  );
}

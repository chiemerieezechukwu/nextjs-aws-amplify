import { useState } from "react";
import { AuthState, IUserData } from "../types/auth";
import ConfirmSignUpForm from "../components/ConfirmSignUpForm";
import SignUpForm from "../components/SignUpForm";
import PopUpAlert from "../components/Alert";

export default function SignUp() {
  const [signUpStage, setSignUpStage] = useState<string | null>(null);
  const [userData, setUserData] = useState({} as IUserData);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openAlert, setOpenAlert] = useState(false);

  const renderForms = () => {
    switch (signUpStage) {
      case AuthState.CONFIRM_SIGN_UP:
        return (
          <ConfirmSignUpForm
            userData={userData}
            setSignUpStage={setSignUpStage}
          />
        );

      default:
        return (
          <SignUpForm
            setUserData={setUserData}
            setSignUpStage={setSignUpStage}
            setErrorMessage={setErrorMessage}
            setOpenAlert={setOpenAlert}
          />
        );
    }
  };

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
        <PopUpAlert
          openAlert={openAlert}
          message={errorMessage}
          setOpenAlert={setOpenAlert}
          severity="error"
        />

        {renderForms()}
      </main>
    </>
  );
}

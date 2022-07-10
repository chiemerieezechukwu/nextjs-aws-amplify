import { useState } from "react";
import api from "~/lib/axios";
import { TournamentResource } from "~/lib/axios/resources";
import Alert from "~/components/Alert";
import ConfirmSignUpForm from "~/components/ConfirmSignUpForm";
import LoginForm from "~/components/LoginForm";
import { AuthState, IUserData } from "~/types/auth";

export default function Login() {
  const [userData, setUserData] = useState({} as IUserData);
  const [signUpStage, setSignUpStage] = useState<string | null>(null);

  return (
    <>
      <main
        style={{
          display: "flex",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {signUpStage === AuthState.CONFIRM_SIGN_UP ? (
          <ConfirmSignUpForm
            userData={userData}
            setSignUpStage={setSignUpStage}
          />
        ) : (
          <LoginForm
            setSignUpStage={setSignUpStage}
            setUserData={setUserData}
          />
        )}

        <Alert />
      </main>
    </>
  );
}

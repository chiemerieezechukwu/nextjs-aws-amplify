import { useState } from "react";
import { AuthState, IUserData } from "~/types/auth";
import ConfirmSignUpForm from "~/components/ConfirmSignUpForm";
import SignUpForm from "~/components/SignUpForm";
import Alert from "~/components/Alert";

export default function SignUp() {
  const [signUpStage, setSignUpStage] = useState<string | null>(null);
  const [userData, setUserData] = useState({} as IUserData);

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
        {(() => {
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
                />
              );
          }
        })()}

        <Alert />
      </main>
    </>
  );
}

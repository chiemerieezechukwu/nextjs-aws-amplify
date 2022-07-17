import { useState } from "react";
import { AuthState, IUserData } from "~/types";
import { AuthForm, Alert } from "~/components";
import { Layout } from "~/layouts";

export default function SignUp() {
  const [signUpStage, setSignUpStage] = useState<string | null>(null);
  const [userData, setUserData] = useState({} as IUserData);

  return (
    <Layout.Default>
      {(() => {
        switch (signUpStage) {
          case AuthState.CONFIRM_SIGN_UP:
            return (
              <AuthForm.ConfirmSignUp
                userData={userData}
                setSignUpStage={setSignUpStage}
              />
            );

          default:
            return (
              <AuthForm.SignUp
                setUserData={setUserData}
                setSignUpStage={setSignUpStage}
              />
            );
        }
      })()}

      <Alert />
    </Layout.Default>
  );
}

import { useState } from "react";
import { Alert, AuthForm } from "~/components";
import { AuthState, IUserData } from "~/types";
import { Layout } from "~/layouts";

export default function Login() {
  const [userData, setUserData] = useState({} as IUserData);
  const [signUpStage, setSignUpStage] = useState<string | null>(null);

  return (
    <Layout.Default>
      {signUpStage === AuthState.CONFIRM_SIGN_UP ? (
        <AuthForm.ConfirmSignUpForm
          userData={userData}
          setSignUpStage={setSignUpStage}
        />
      ) : (
        <AuthForm.LoginForm
          setSignUpStage={setSignUpStage}
          setUserData={setUserData}
        />
      )}

      <Alert />
    </Layout.Default>
  );
}

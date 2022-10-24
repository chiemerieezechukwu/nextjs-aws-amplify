import { useState } from "react";
import api_client from "~/lib/axios";
import { TournamentResource } from "~/lib/axios/resources";
import { Alert, AuthForm } from "~/components";
import { AuthState, IUserData } from "~/types";
import { Layout } from "~//layouts";

export default function Login() {
  const [userData, setUserData] = useState({} as IUserData);
  const [signUpStage, setSignUpStage] = useState<string | null>(null);

  (async () => {
    const res = await api_client.get(TournamentResource.TOURNAMENTS);
    console.log(res.data);
  })();

  return (
    <Layout.Default>
      {signUpStage === AuthState.CONFIRM_SIGN_UP ? (
        <AuthForm.ConfirmSignUp
          userData={userData}
          setSignUpStage={setSignUpStage}
        />
      ) : (
        <AuthForm.Login
          setSignUpStage={setSignUpStage}
          setUserData={setUserData}
        />
      )}

      <Alert />
    </Layout.Default>
  );
}

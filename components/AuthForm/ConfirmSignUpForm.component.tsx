import { Button, Input, Form } from "~/components";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { AuthState } from "~/types";
import { AlertSeverity } from "~/types";
import { useAlertContext } from "~/contexts";

interface IConfirmSignUpFormInput {
  authCode: string;
}

interface IConfirmSignUpFormProps {
  userData: { email: string };
  setSignUpStage: (stage: AuthState) => void;
}

export function ConfirmSignUpForm(props: IConfirmSignUpFormProps) {
  const {
    userData: { email },
    setSignUpStage,
  } = props;

  const { setAlertData } = useAlertContext();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IConfirmSignUpFormInput>();

  const onSignUpConfirmSubmit = handleSubmit(async (data) => {
    const { authCode } = data;

    try {
      await Auth.confirmSignUp(email, authCode);
      router.push("/login");

      setAlertData({
        open: true,
        message: "Sign up complete",
        severity: AlertSeverity.SUCCESS,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        switch (error.name) {
          case "CodeMismatchException":
          case "ExpiredCodeException":
            setSignUpStage(AuthState.CONFIRM_SIGN_UP);

            setAlertData({
              open: true,
              message: "Invalid confirmation code",
              severity: AlertSeverity.ERROR,
            });
            break;

          case "LimitExceededException":
            setSignUpStage(AuthState.CONFIRM_SIGN_UP);

            setAlertData({
              open: true,
              message: "Too many attempts. Please try again later",
              severity: AlertSeverity.ERROR,
            });
            break;

          default:
            setSignUpStage(AuthState.CONFIRM_SIGN_UP);

            setAlertData({
              open: true,
              message: error.message,
              severity: AlertSeverity.ERROR,
            });
            break;
        }
      }
    }
  });

  return (
    <>
      <h2>Confirm Your Account</h2>

      <Form onSubmit={onSignUpConfirmSubmit}>
        <Input
          disabled={true}
          id="email"
          label="Email"
          type="email"
          value={email}
        />

        <Input
          id="authCode"
          label="Verification Code"
          type="text"
          error={errors.authCode ? true : false}
          helperText={errors.authCode && errors.authCode.message}
          register={{
            ...register("authCode", {
              required: {
                value: true,
                message: "Verification Code is required",
              },
            }),
          }}
        />

        <Button type="submit" className="mt-2" >Confirm</Button>
      </Form>
    </>
  );
}

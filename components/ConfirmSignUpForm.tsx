import Button from "./Button";
import Input from "./Input";
import Form from "./Form";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { AuthState } from "../types/auth";

interface IConfirmSignUpFormInput {
  authCode: string;
}

interface IConfirmSignUpFormProps {
  userData: { email: string };
  setSignUpStage: (stage: AuthState) => void;
  setErrorMessage: (message: string | null) => void;
  setOpenAlert: (open: boolean) => void;
}

export default function ConfirmSignUpForm(props: IConfirmSignUpFormProps) {
  const {
    userData: { email },
    setSignUpStage,
    setErrorMessage,
    setOpenAlert,
  } = props;

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
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        switch (error.name) {
          case "ExpiredCodeException":
            setSignUpStage(AuthState.CONFIRM_SIGN_UP);
            setErrorMessage("Invalid confirmation code");
            setOpenAlert(true);
            break;

          case "CodeMismatchException":
            setSignUpStage(AuthState.CONFIRM_SIGN_UP);
            setErrorMessage("Invalid confirmation code");
            setOpenAlert(true);

          default:
            break;
        }
        setSignUpStage(AuthState.CONFIRM_SIGN_UP);
      }
    }
  });

  return (
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

      <Button type="submit">Confirm</Button>
    </Form>
  );
}

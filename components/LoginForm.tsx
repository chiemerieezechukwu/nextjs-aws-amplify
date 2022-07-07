import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AlertSeverity } from "../types/alert";
import { AuthState, IUserData } from "../types/auth";
import Button from "./Button";
import Form from "./Form";
import Input from "./Input";

interface ILoginFormInput {
  email: string;
  password: string;
}

interface ILoginFormProps {
  setSignUpStage: (stage: AuthState) => void;
  setUserData: (userData: IUserData) => void;
  setErrorMessage: (message: string | null) => void;
  setOpenAlert: (open: boolean) => void;
  setSeverity?: (severity: AlertSeverity) => void;
}

export default function LoginForm(props: ILoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  const {
    setSignUpStage,
    setUserData,
    setErrorMessage,
    setOpenAlert,
    setSeverity,
  } = props;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const { email, password } = data;
    let user;
    try {
      user = await Auth.signIn(email, password);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        switch (error.name) {
          case "UserNotConfirmedException":
            setUserData({ email });
            setSignUpStage(AuthState.CONFIRM_SIGN_UP);

            setErrorMessage("Please confirm your email address");
            if (setSeverity) setSeverity("warning");
            setOpenAlert(true);
            break;

          case "NotAuthorizedException":
            setErrorMessage("Invalid email or password");
            setOpenAlert(true);
            break;

          default:
            throw error;
        }
      }
    }

    console.log(user);
  });

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          id="email"
          label="Email"
          type="email"
          error={errors.email ? true : false}
          helperText={errors.email && errors.email.message}
          register={{
            ...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }),
          }}
        />

        <Input
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          register={{
            ...register("password", {
              required: { value: true, message: "Password is required" },
            }),
          }}
        />

        <Button type="submit">Login</Button>
      </Form>
    </>
  );
}

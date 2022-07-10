import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAlertContext } from "~/contexts/AlertProvider";
import { AlertSeverity } from "~/types/alert";
import { AuthState, IUserData } from "~/types/auth";
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
}

export default function LoginForm(props: ILoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();
  const { setSignUpStage, setUserData } = props;
  const { setAlertData } = useAlertContext();

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

            setAlertData({
              open: true,
              message: "Please confirm your email address",
              severity: AlertSeverity.WARNING,
            });
            break;

          case "NotAuthorizedException":
            setSignUpStage(AuthState.LOGIN);

            setAlertData({
              open: true,
              message: "Invalid email or password",
              severity: AlertSeverity.ERROR,
            });
            break;

          default:
            setSignUpStage(AuthState.LOGIN);

            setAlertData({
              open: true,
              message: error.message,
              severity: AlertSeverity.ERROR,
            });
            break;
        }
      }
    }

    console.log(user);
  });

  return (
    <>
      <div>Login</div>

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

import Button from "./Button";
import Input from "./Input";
import Form from "./Form";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { AuthState, IUserData } from "../types/auth";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useState } from "react";

interface ISignUpFormInput {
  email: string;
  preferred_username: string;
  password: string;
}

interface ISignUpFormProps {
  setUserData: (userData: IUserData) => void;
  setSignUpStage: (stage: AuthState) => void;
  setErrorMessage: (message: string | null) => void;
  setOpenAlert: (open: boolean) => void;
}

export default function SignUpForm(props: ISignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { setUserData, setSignUpStage, setErrorMessage, setOpenAlert } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormInput>();

  const onSignUpSubmit = handleSubmit(async (data) => {
    const { email, preferred_username, password } = data;
    const username = email;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          preferred_username,
        },
      });
      setUserData({ email });
      setSignUpStage(AuthState.CONFIRM_SIGN_UP);
    } catch (error) {
      if (error instanceof Error) {
        switch (error.name) {
          case "UsernameExistsException":
            setErrorMessage("Email address is already in use");
            setOpenAlert(true);
            break;

          // A lambda function is used to check the uniqueness of the username
          case "UserLambdaValidationException":
            setErrorMessage("Username is already in use");
            setOpenAlert(true);
            break;

          default:
            setErrorMessage(error.message);
            setOpenAlert(true);
            break;
        }
      }

      setSignUpStage(AuthState.SIGN_UP);
      console.error(error);
    }
  });

  const matchRegex = (regexString: RegExp, value: string) => {
    const regex = new RegExp(regexString);
    return regex.test(value);
  };

  return (
    <Form onSubmit={onSignUpSubmit} noValidate>
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
        id="username"
        label="Username"
        type="text"
        error={errors.preferred_username ? true : false}
        helperText={
          errors.preferred_username && errors.preferred_username.message
        }
        register={{
          ...register("preferred_username", {
            required: { value: true, message: "Username is required" },
          }),
        }}
      />

      <Input
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        error={errors.password ? true : false}
        helperText={errors.password && errors.password.message}
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
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: {
              hasLowerCase: (value) =>
                matchRegex(/(?=.*[a-z])/, value) ||
                "Password must contain at least one lowercase letter",
              hasUpperCase: (value) =>
                matchRegex(/(?=.*[A-Z])/, value) ||
                "Password must contain at least one uppercase letter",
              hasNumber: (value) =>
                matchRegex(/(?=.*[0-9])/, value) ||
                "Password must contain at least one number",
              hasSpecialChar: (value) =>
                matchRegex(/(?=.*[!@#$%^&*])/, value) ||
                "Password must contain at least one special character",
            },
          }),
        }}
      />

      <Button type="submit">Sign Up</Button>
    </Form>
  );
}

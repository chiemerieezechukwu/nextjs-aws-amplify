import tw from "twin.macro";
import styled from "@emotion/styled";
import { DetailedHTMLProps, FormHTMLAttributes } from "react";

type FormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

const Form = styled.form(tw`
  w-full max-w-sm h-fit
`);

export function FormComponent({ children, ...rest }: FormProps) {
  return <Form {...rest}>{children}</Form>;
}

import TextField from "@mui/material/TextField";

interface IInputProps {
  label: string;
  id: string;
  type: string;
  disabled?: boolean;
  value?: string;
  error?: boolean;
  helperText?: string;
  register?: object;
  InputProps?: object;
}

export function InputComponent(props: IInputProps) {
  const { register, ...restOfProps } = props;

  return (
    <TextField
      fullWidth
      variant="filled"
      margin="dense"
      size="small"
      {...restOfProps}
      {...register}
    />
  );
}

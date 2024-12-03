import { TextField, type TextFieldProps } from '@mui/material';

export type InputProps = TextFieldProps;

export function Input(props: InputProps) {
  return <TextField {...props} />;
}
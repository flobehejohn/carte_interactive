import { Select as MuiSelect, type SelectProps as MuiSelectProps } from '@mui/material';

export type SelectProps = MuiSelectProps;

export function Select(props: SelectProps) {
  return <MuiSelect {...props} />;
}
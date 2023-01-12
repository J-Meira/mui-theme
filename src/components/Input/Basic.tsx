import {
  Grid,
  GridProps,
  TextField,
  TextFieldProps,
} from '@mui/material';

type BasicProps = GridProps & TextFieldProps;

export const Basic = ({
  helperText,
  xs,
  sm,
  md,
  lg,
  error,
  variant,
  ...params
}: BasicProps) => (
  <Grid item xs={xs} sm={sm} md={md} lg={lg}>
    <TextField
      variant={variant}
      margin='normal'
      fullWidth
      size='small'
      error={error}
      helperText={error ? helperText : undefined}
      {...params}
    />
  </Grid>
);

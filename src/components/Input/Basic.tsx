import {
  Grid,
  TextField,
} from '@mui/material';
import { InputProps } from '.';

export const Basic = ({
  grid,
  helperText,
  variant,
  ...rest
}: InputProps) => (
  <Grid item {...grid}>
    <TextField
      {...rest}
      variant={variant}
      margin='normal'
      fullWidth
      size='small'
      error={!!helperText}
      helperText={helperText}
    />
  </Grid>
);


import {
  Grid,
  TextField,
} from '@mui/material';
import { InputProps } from '.';

export const Basic = ({
  grid,
  helperText,
  variant,
  ...params
}: InputProps) => (
  <Grid item {...grid}>
    <TextField
      {...params}
      variant={variant}
      margin='normal'
      fullWidth
      size='small'
      error={!!helperText}
      helperText={helperText}
    />
  </Grid>
);


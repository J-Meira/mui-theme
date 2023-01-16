import {
  InputAdornment,
  TextField,
  Grid,
} from '@mui/material';
import { InputProps } from '.';

export const Currency = ({
  helperText,
  variant,
  grid,
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
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              R$
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );


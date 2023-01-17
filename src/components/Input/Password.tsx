import { IconButton, InputAdornment, Grid, TextField } from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { InputProps } from '.';
import { useState } from 'react';

export const Password = ({
  helperText,
  variant,
  grid,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Grid item {...grid}>
      <TextField
        {...rest}
        variant={variant}
        margin='normal'
        fullWidth
        size='small'
        error={!!helperText}
        helperText={helperText}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='input button action'
                onClick={() => setShowPassword(!showPassword)}
                edge='end'
                tabIndex={-1}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

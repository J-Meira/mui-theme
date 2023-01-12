import { useState } from 'react';

import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormHelperText,
  FormControl,
  OutlinedInputProps,
  Grid,
  GridProps,
  TextFieldProps,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

type PasswordProps = OutlinedInputProps & GridProps & TextFieldProps;

export const Password = ({
  label,
  helperText,
  error,
  required,
  name,
  variant,
  xs,
  sm,
  md,
  lg,
  ...params
}: PasswordProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <FormControl
        variant={variant}
        margin='normal'
        fullWidth
        error={error}
        required={required}
        size='small'
      >
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          endAdornment={
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
          }
          label={label}
          name={name}
          {...params}
        />
        {(helperText && error) && (
          <FormHelperText>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}

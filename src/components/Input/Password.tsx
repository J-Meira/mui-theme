import React, { useState } from 'react';

import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormHelperText,
  FormControl,
  OutlinedInputProps,
} from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';
import { TextFieldProps } from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type PasswordProps = OutlinedInputProps & GridProps & TextFieldProps;

const Password = ({
  label, helperText, error, required, name, variant,
  xs, sm, md, lg, ...params
}: PasswordProps) => {
  const [showPassword, setshowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

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
                onClick={handleClickShowPassword}
                edge='end'
                tabIndex={-1}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
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
export default Password;

import { useState, useEffect } from 'react';
import { useField } from '@unform/core';

import { IconButton, InputAdornment, Grid, TextField } from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { UFInputProps } from '.';

export const UFPassword = ({
  helperText,
  name,
  variant,
  grid,
  ...rest
}: UFInputProps) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);
  const [value, setValue] = useState(defaultValue || '');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <Grid item {...grid}>
      <TextField
        {...rest}
        variant={variant}
        margin='normal'
        fullWidth
        size='small'
        error={!!error || !!helperText}
        helperText={error || helperText}
        defaultValue={defaultValue}
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          rest.onChange?.(e);
        }}
        onKeyDown={(e) => {
          error && clearError();
          rest.onKeyDown?.(e);
        }}
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

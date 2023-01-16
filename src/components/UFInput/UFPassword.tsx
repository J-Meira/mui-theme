import {
  useState,
  useEffect,
} from 'react';
import { useField } from '@unform/core';

import {
  IconButton,
  InputAdornment,
  Grid,
  TextField,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { UFInputProps } from '.';

export const UFPassword = ({
  label,
  helperText,
  required,
  name,
  variant,
  grid,
  ...params
}: UFInputProps) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
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
        {...params}
        variant={variant}
        margin='normal'
        fullWidth
        size='small'
        error={!!error || !!helperText}
        helperText={error || helperText}
        defaultValue={defaultValue}
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          params.onChange?.(e);
        }}
        onKeyDown={(e) => {
          error && clearError();
          params.onKeyDown?.(e);
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
                {showPassword ?
                  <VisibilityIcon /> :
                  <VisibilityOffIcon />
                }
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
}

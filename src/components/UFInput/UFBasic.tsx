import {
  useState,
  useEffect,
} from 'react';
import { useField } from '@unform/core';

import {
  Grid,
  TextField,
} from '@mui/material';
import { UFInputProps } from '.';

export const UFBasic = ({
  grid,
  helperText,
  name,
  variant,
  ...params
}: UFInputProps) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  const [value, setValue] = useState(defaultValue || '');

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
      />
    </Grid>
  );
}

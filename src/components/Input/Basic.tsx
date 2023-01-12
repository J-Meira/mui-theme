import {
  useState,
  useEffect,
} from 'react';
import { useField } from '@unform/core';

import {
  Grid,
  GridProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { InputProps } from '.';

type BasicProps = InputProps & GridProps & TextFieldProps;

export const Basic = ({
  xs,
  sm,
  md,
  lg,
  helperText,
  name,
  variant,
  ...params
}: BasicProps) => {
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
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <TextField
        {...params}
        variant={variant}
        margin='normal'
        fullWidth
        size='small'
        error={!!error || !!helperText}
        helperText={error || helperText}
        value={value || ''}
        onChange={e => { setValue(e.target.value); params.onChange?.(e); }}
        onKeyDown={(e) => { error && clearError(); params.onKeyDown?.(e); }}
      />
    </Grid>
  );
}

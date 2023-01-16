import {
  useState,
  useEffect,
} from 'react';
import { useField } from '@unform/core';

import {
  InputAdornment,
  TextField,
  Grid,
} from '@mui/material';
import { UFInputProps } from '.';

export const UFCurrency = ({
  helperText,
  required,
  name,
  variant,
  grid,
  ...params
}: UFInputProps) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  const [value, setValue] = useState(defaultValue || '0,00');

  const mask = (value: string) => {
    value = value
      .replace(/\D/g, '')
      .replace(/^(0+)(\d)/g, '$2');
    let valueReturn = null;
    switch (value.length) {
      case 1:
        valueReturn = `0,0${value}`
        break;
      case 2:
        valueReturn = `0,${value}`
        break;
      default:
        let int = value.slice(0, -2);
        int = int.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        valueReturn = `${int},${value.slice(-2)}`;
        break;
    }
    return valueReturn;
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(mask(newValue)),
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
          setValue(mask(e.target.value));
          params.onChange?.(e);
        }}
        onKeyDown={(e) => {
          error && clearError();
          params.onKeyDown?.(e);
        }}
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
}

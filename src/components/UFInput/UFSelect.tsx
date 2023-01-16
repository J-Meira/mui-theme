import {
  useState,
  useEffect,
} from 'react';
import { useField } from '@unform/core';

import {
  MenuItem,
  Grid,
  TextField,
} from '@mui/material';
import { UFInputProps } from '.';

export interface UFSelectOptionsProps {
  value: number,
  label: string
}

export interface UFSelectProps {
  list?: UFSelectOptionsProps[],
  defaultOption?: string
}

type UFSelectPropsExt = UFSelectProps & UFInputProps;

export const UFSelect = ({
  name,
  list,
  defaultOption,
  helperText,
  grid,
  variant,
  ...params
}: UFSelectPropsExt) => {
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
        onChange={e => { setValue(e.target.value); params.onChange?.(e); }}
        onKeyDown={(e) => { error && clearError(); params.onKeyDown?.(e); }}
        select
      >
        {defaultOption && (
          <MenuItem value={-1}>{defaultOption}</MenuItem>
        )}
        {list &&
          list.map((op) => (
            <MenuItem
              key={`${op.value}-${op.label}`}
              value={op.value}
            >
              {op.label}
            </MenuItem>
          ))}
      </TextField>
    </Grid>
  );
}

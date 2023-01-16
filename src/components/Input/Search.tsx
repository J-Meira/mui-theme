import { useState } from 'react';
import {
  Autocomplete,
  Grid,
  TextField,
} from '@mui/material';
import { InputProps } from '.';

export const isString = (item: any): item is string => {
  return typeof item === "string";
};

export type AutoCompleteFieldProps<T> = {
  selectValue?: keyof T;
  options?: T[];
  creatable?: boolean,
};

type SearchProps<T> = AutoCompleteFieldProps<T> & InputProps;

export const Search = <T extends {}>(
  {
    selectValue,
    options,
    id,
    label,
    creatable,
    helperText,
    onBlur,
    variant,
    value,
    required,
    autoFocus,
    disabled,
    grid
  }: SearchProps<T>,
): React.ReactElement => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Grid item {...grid}>
      <Autocomplete
        freeSolo={creatable}
        handleHomeEndKeys={creatable}
        selectOnFocus
        options={options || []}
        fullWidth
        size='small'
        id={id}
        value={value}
        inputValue={inputValue}
        disabled={disabled}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option: any) =>
          isString(option[selectValue]) ? option[selectValue] : ""
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            required={required}
            autoFocus={autoFocus}
            margin='normal'
            variant={variant}
            onBlur={onBlur}
            error={!!helperText}
            helperText={helperText}
          />
        )}
      />
    </Grid>
  );
}

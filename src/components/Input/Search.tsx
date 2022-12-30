import React, { useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Grid, { GridProps } from '@mui/material/Grid';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export const isString = (item: any): item is string => {
  return typeof item === "string";
};

export type AutoCompleteFieldProps<T> = {
  selectValue?: keyof T;
  options?: T[];
  creatable?: boolean
};

type SearchProps<T> = AutoCompleteFieldProps<T> & GridProps & TextFieldProps;

const Search = <T extends {}>(
  { selectValue, options, id, label, creatable, helperText, onBlur, variant,
    value, error, required, autoFocus, disabled, xs, sm, md, lg
  }: SearchProps<T>,
): React.ReactElement => {

  const [inputValue, setInputValue] = useState('');

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
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
            error={error}
            helperText={error ? helperText : undefined}
          />
        )}
      />
    </Grid>
  );
}

export default Search;

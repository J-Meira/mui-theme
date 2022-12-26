import * as React from 'react';

import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormHelperText,
  FormControl,
  OutlinedInputProps,
  InputAdornmentTypeMap,
  IconButtonTypeMap,
} from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';
import { TextFieldProps } from '@mui/material/TextField';
import { ExtendButtonBase, ButtonBaseTypeMap } from '@mui/material/ButtonBase';



type IconPropsEx = OutlinedInputProps & GridProps & TextFieldProps;

const Icon = ({ label, helperText, error, required, name, xs, sm, md, lg, ...params }: IconPropsEx) => {

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <FormControl variant='outlined' margin='normal' fullWidth error={error} required={required}
        size='small' >
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
          type='text'
          endAdornment={
            <InputAdornment position='end'>
              {/* <IconButton
                aria-label='input button action'
                //onClick={action}
                //onMouseDown={handleMouseDownPassword}
                edge='end'
                tabindex="-1"
              >
                {children}
              </IconButton> */}
            </InputAdornment>
          }
          label={label}
          name={name}
          {...params}
        />
        {(helperText && error) && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}
export default Icon;

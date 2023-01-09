import * as React from 'react';
import {
  FormHelperText,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CheckboxProps,
} from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';

export interface CheckBoxGridedProps extends CheckboxProps {
  label?: string,
  helperText?: string,
  error?: boolean,
}

type CheckBoxGridedExProps = GridProps & CheckBoxGridedProps;

const CheckBoxGrided = ({
  label, helperText, error, required, name,
  xs, sm, md, lg, value, ...params
}: CheckBoxGridedExProps) => (
  <Grid item xs={xs} sm={sm} md={md} lg={lg}>
    <FormControl
      //variant={variant}
      margin='normal'
      //fullWidth
      error={error}
      required={required}
      //size='small'
      component='fieldset'
      variant='standard'
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox {...params} />
          }
          label={label}
        />
      </FormGroup>
      {(helperText && error) && (
        <FormHelperText>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  </Grid>
);

export default CheckBoxGrided;

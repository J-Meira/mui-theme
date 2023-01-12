import {
  FormHelperText,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CheckboxProps,
  Grid,
  GridProps,
} from '@mui/material';

export interface CheckBoxGridedProps extends CheckboxProps {
  label?: string,
  helperText?: string,
  error?: boolean,
}

type CheckBoxGridedExProps = GridProps & CheckBoxGridedProps;

export const CheckBoxGrided = ({
  label,
  helperText,
  error,
  required,
  name,
  xs,
  sm,
  md,
  lg,
  value,
  ...params
}: CheckBoxGridedExProps) => (
  <Grid item xs={xs} sm={sm} md={md} lg={lg}>
    <FormControl
      margin='normal'
      error={error}
      required={required}
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

import { FormHelperText, FormControl, FormGroup, FormControlLabel, Checkbox, CheckboxProps, Grid } from '@mui/material'
import { InputProps } from '.'

export interface CheckBoxGridedProps extends CheckboxProps {
  label?: string
  helperText?: string
}

type CheckBoxGridedExProps = InputProps & CheckBoxGridedProps

export const CheckBoxGrided = ({ label, helperText, grid, required, ...rest }: CheckBoxGridedExProps) => {
  return (
    <Grid item {...grid}>
      <FormControl margin='normal' error={!!helperText} required={required} component='fieldset' variant='standard'>
        <FormGroup>
          <FormControlLabel control={<Checkbox {...rest} />} label={label} />
        </FormGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Grid>
  )
}

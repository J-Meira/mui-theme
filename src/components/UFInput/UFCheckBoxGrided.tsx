import { useState, useEffect } from 'react'
import { useField } from '@unform/core'

import { FormHelperText, FormControl, FormGroup, FormControlLabel, Checkbox, CheckboxProps, Grid } from '@mui/material'
import { UFInputProps } from '.'

export interface UFCheckBoxGridedProps extends CheckboxProps {
  label?: string
  helperText?: string
}

type UFCheckBoxGridedExProps = UFInputProps & UFCheckBoxGridedProps

export const UFCheckBoxGrided = ({ label, helperText, required, name, grid, ...rest }: UFCheckBoxGridedExProps) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name)
  const [value, setValue] = useState(defaultValue || false)

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    })
  }, [registerField, fieldName, value])

  return (
    <Grid item {...grid}>
      <FormControl
        margin='normal'
        error={!!error || !!helperText}
        required={required}
        component='fieldset'
        variant='standard'
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                {...rest}
                defaultChecked={defaultValue}
                checked={value || false}
                onChange={(e, checked) => {
                  setValue(checked)
                  rest.onChange?.(e, checked)
                  error && clearError()
                }}
              />
            }
            label={label}
          />
        </FormGroup>
        {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
      </FormControl>
    </Grid>
  )
}

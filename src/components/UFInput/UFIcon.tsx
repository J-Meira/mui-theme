import { useState, useEffect } from 'react'
import { useField } from '@unform/core'

import { IconButton, InputAdornment, Grid, TextField } from '@mui/material'
import { UFInputProps } from '.'

const Adornment = ({ icon, action, start }: UFIconProps) => (
  <InputAdornment position={start ? 'start' : 'end'}>
    <IconButton aria-label='input button action' onClick={action} edge={start ? false : 'end'} tabIndex={-1}>
      {icon}
    </IconButton>
  </InputAdornment>
)

export interface UFIconProps {
  icon?: React.ReactNode
  action?: (params: any) => any
  start?: boolean
}

type UFIconPropsEx = UFInputProps & UFIconProps

const defaultProps: UFIconPropsEx = {
  grid: {
    xs: 12,
    sm: 12,
    md: 6,
    lg: 8,
  },
  start: false,
  name: '',
  variant: 'outlined',
}

//ToDo fix label start position on start icon type

export const UFIcon = ({ helperText, name, action, variant, icon, start, grid, ...rest }: UFIconPropsEx) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name)
  const [value, setValue] = useState(defaultValue || '')

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    })
  }, [registerField, fieldName, value])

  return (
    <Grid item {...grid}>
      <TextField
        {...rest}
        variant={variant}
        margin='normal'
        fullWidth
        size='small'
        error={!!error || !!helperText}
        helperText={error || helperText}
        defaultValue={defaultValue}
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          rest.onChange?.(e)
        }}
        onKeyDown={(e) => {
          error && clearError()
          rest.onKeyDown?.(e)
        }}
        InputProps={{
          startAdornment: start && <Adornment icon={icon} action={action} start={start} />,
          endAdornment: !start && <Adornment icon={icon} action={action} start={start} />,
        }}
      />
    </Grid>
  )
}

UFIcon.defaultProps = defaultProps

import { useEffect, useMemo, useState } from 'react'
import { useField } from '@unform/core'
import { Autocomplete, Grid, TextField } from '@mui/material'
import { UFInputProps } from '.'

export const isString = (item: any): item is string => {
  return typeof item === 'string'
}

type UFAutoCompleteOptionsProps = {
  id: number
  label: string
}

export interface UFAutoCompleteFieldProps {
  options?: UFAutoCompleteOptionsProps[]
  creatable?: boolean
}

type UFSearchProps = UFAutoCompleteFieldProps & UFInputProps

export const UFSearch = ({
  options,
  label,
  creatable,
  helperText,
  onBlur,
  name,
  variant,
  required,
  autoFocus,
  disabled,
  grid,
}: UFSearchProps): React.ReactElement => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name)
  const [inputValue, setInputValue] = useState('')
  const [selected, setSelected] = useState<UFAutoCompleteOptionsProps | undefined>(defaultValue)

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selected) return null

    const selectedOption = options?.find((op) => op.id === selected.id)
    if (!selectedOption) return null

    return selectedOption
  }, [selected, options])

  const handle = (newValue: any) => {
    if (newValue) {
      setSelected(newValue)
      setInputValue('')
      clearError()
    }
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selected,
      setValue: (_, newSelected) => setSelected(newSelected),
    })
  }, [registerField, fieldName, selected])

  return (
    <Grid item {...grid}>
      <Autocomplete
        freeSolo={creatable}
        handleHomeEndKeys={creatable}
        selectOnFocus
        options={options || []}
        fullWidth
        size='small'
        value={autoCompleteSelectedOption}
        onChange={(_, newValue) => handle(newValue)}
        getOptionLabel={(option: any) => (isString(option.label) ? option.label : '')}
        disabled={disabled}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue)
        }}
        inputValue={inputValue}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            required={required}
            autoFocus={autoFocus}
            margin='normal'
            variant={variant}
            onBlur={onBlur}
            error={!!error || !!helperText}
            helperText={error || helperText}
          />
        )}
      />
    </Grid>
  )
}

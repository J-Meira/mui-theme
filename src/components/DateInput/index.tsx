import {
  useState,
  useEffect,
} from 'react';

import {
  DatePicker,
  DateTimePicker,
} from '@mui/x-date-pickers';
import {
  TextField,
  TextFieldProps,
  Grid,
  GridProps,
} from '@mui/material';
import { useField } from '@unform/core';

export type DateTimeInputProps = TextFieldProps & {
  time?: boolean,
  name: string,
  grid: GridProps,
  maxDate?: any,
  minDate?: any,
  showTodayButton?: boolean,
  disableFuture?: boolean,
  disablePast?: boolean,
};

const defaultProps: DateTimeInputProps = {
  grid: {
    xs: 12,
    sm: 12,
    md: 6,
    lg: 8,
  },
  name: '',
  variant: 'outlined',
}

const RenderInput = ({
  ...rest
}: TextFieldProps) => (
  <TextField
    margin='normal'
    fullWidth
    size='small'
    {...rest}
  />
)

export const DateTimeInput = ({
  time,
  grid,
  helperText,
  disabled,
  name,
  label,
  maxDate,
  minDate,
  showTodayButton,
  disableFuture,
  disablePast,
  required,
  ...rest
}: DateTimeInputProps) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (e, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <Grid item {...grid}>
      {time?(
        <DateTimePicker
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => {
          setOpen(false);
          rest.onBlur?.(value);
        }}
        inputFormat='DD/MM/YYYY HH:mm'
        label={label}
        value={value || ''}
        onChange={(newValue) => {
          setValue(newValue);
          rest.onChange?.(newValue);
        }}
        maxDate={maxDate}
        minDate={minDate}
        disableFuture={disableFuture}
        disablePast={disablePast}
        showDaysOutsideCurrentMonth
        mask='__/__/____ __:__'
        disabled={disabled}
        componentsProps={{
          actionBar: {
            actions: showTodayButton ? ['today'] : []
          }
        }}
        renderInput={(innerParams) =>
          <RenderInput
            {...innerParams}
            required={required}
            onClick={() => setOpen(true)}
            error={!!error || !!helperText}
            helperText={error || helperText}
            onKeyDown={(e) => {
              error && clearError();
              rest.onKeyDown?.(e);
            }}
            {...rest}
          />
        }
      />
      ):(
<DatePicker
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => {
          setOpen(false);
          rest.onBlur?.(value);
        }}
        inputFormat='DD/MM/YYYY'
        label={label}
        value={value || ''}
        onChange={(newValue) => {
          setValue(newValue);
          rest.onChange?.(newValue);
        }}
        maxDate={maxDate}
        minDate={minDate}
        disableFuture={disableFuture}
        disablePast={disablePast}
        showDaysOutsideCurrentMonth
        mask='__/__/____'
        disabled={disabled}
        componentsProps={{
          actionBar: {
            actions: showTodayButton ? ['today'] : []
          }
        }}
        renderInput={(innerParams) =>
          <RenderInput
            {...innerParams}
            required={required}
            onClick={() => setOpen(true)}
            error={!!error || !!helperText}
            helperText={error || helperText}
            onKeyDown={(e) => {
              error && clearError();
              rest.onKeyDown?.(e);
            }}
            {...rest}
          />
        }
      />
      )}

    </Grid>
  );
}

DateTimeInput.defaultProps = defaultProps;

import { useState } from 'react';
import { Field, FieldProps } from 'formik';

import { Dayjs } from 'dayjs';

import { TextFieldProps } from '@mui/material';
import {
  DatePicker as MuiDatePicker,
  DateTimePicker as MuiDateTimePicker,
} from '@mui/x-date-pickers';
import type { PickersTextFieldProps } from '@mui/x-date-pickers/PickersTextField';
import { GridSizeProps } from './defaultGrid';
import { InputGrid } from './InputGrid';
import { useSyncedState } from '../../hooks/useSyncedState';

export type DatePickerProps = Omit<TextFieldProps, 'value' | 'onChange'> & {
  className?: string;
  disableFuture?: boolean;
  disablePast?: boolean;
  grid?: GridSizeProps;
  localControl?: boolean;
  amPm?: boolean;
  maxDate?: Dayjs;
  minDate?: Dayjs;
  name: string;
  noGrid?: boolean;
  readOnly?: boolean;
  showTodayButton?: boolean;
  time?: boolean;
  value?: Dayjs | null;
  onChange?: (newValue: Dayjs | null) => void;
};

type RenderProps = Omit<
  DatePickerProps,
  'localControl' | 'onChange' | 'value'
> & {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
};

const RenderDatePicker = ({
  className,
  disabled,
  disableFuture,
  disablePast,
  grid,
  helperText,
  label,
  amPm = false,
  maxDate,
  minDate,
  name,
  noGrid,
  onBlur,
  onChange,
  readOnly,
  required,
  showTodayButton,
  time,
  variant = 'outlined',
  value,
  ...rest
}: RenderProps) => {
  const [open, setOpen] = useState(false);
  const [innerValue, setInnerValue] = useSyncedState(value);

  const inputProps: TextFieldProps = {
    margin: 'normal',
    fullWidth: true,
    size: 'small',
    required,
    label,
    disabled,
    variant,
    name,
    error: !!helperText,
    helperText,
    onBlur,
    ...rest,
  };

  const pickerProps = {
    maxDate,
    minDate,
    disableFuture,
    disablePast,
    readOnly,
    showDaysOutsideCurrentMonth: true,
    disabled,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    onChange: (newValue: Dayjs | null) => {
      onChange(newValue);
      setInnerValue(newValue);
    },
    open,
    value: innerValue,
    slotProps: {
      textField: inputProps as PickersTextFieldProps,
      actionBar: () => ({
        actions: showTodayButton ? (['today'] as const) : [],
      }),
    },
  };

  return (
    <InputGrid className={className} grid={grid} noGrid={noGrid}>
      {time ? (
        <MuiDateTimePicker
          {...pickerProps}
          ampm={amPm}
          format='DD/MM/YYYY HH:mm'
        />
      ) : (
        <MuiDatePicker {...pickerProps} format='DD/MM/YYYY' />
      )}
    </InputGrid>
  );
};

export const DatePicker = ({
  helperText,
  localControl = false,
  name = '',
  onBlur,
  onChange,
  value = null,
  ...rest
}: DatePickerProps) => {
  if (localControl) {
    return (
      <RenderDatePicker
        {...rest}
        onBlur={onBlur}
        name={name}
        helperText={helperText}
        onChange={(newValue) => onChange?.(newValue)}
        value={value}
      />
    );
  }

  return (
    <Field name={name}>
      {({ field, meta, form }: FieldProps) => {
        const { touched, error } = meta;
        return (
          <RenderDatePicker
            {...rest}
            {...field}
            name={name}
            helperText={touched && error}
            onChange={(newValue) => {
              field.onChange({ target: { name, value: newValue } });
              onChange?.(newValue);
            }}
            onBlur={(e) => {
              field.onBlur({ target: { name } });
              form.setFieldTouched(name, true);
              onBlur?.(e);
            }}
          />
        );
      }}
    </Field>
  );
};

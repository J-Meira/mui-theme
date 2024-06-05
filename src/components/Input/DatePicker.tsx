import { useEffect, useState } from 'react';
import { Field, FieldProps } from 'formik';

import { Dayjs } from 'dayjs';

import { TextFieldProps, Grid, GridProps } from '@mui/material';
import {
  DatePicker as MuiDatePicker,
  DateTimePicker as MuiDateTimePicker,
} from '@mui/x-date-pickers';
import { defaultGrid } from './defaultGrid';

export type DatePickerProps = Omit<TextFieldProps, 'value' | 'onChange'> & {
  className?: string;
  disableFuture?: boolean;
  disablePast?: boolean;
  grid?: GridProps;
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
  grid = defaultGrid,
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
  const [innerValue, setInnerValue] = useState<Dayjs | null>(null);

  const getGrid = (g: GridProps) => {
    return {
      ...defaultGrid,
      ...g,
    };
  };

  const inputProps: TextFieldProps = {
    margin: 'normal',
    fullWidth: true,
    size: 'small',
    required: required,
    label: label,
    disabled: disabled,
    variant: variant,
    name: name,
    error: !!helperText,
    helperText: helperText,
    onClick: () => setOpen(true),
    onBlur: onBlur,
    ...rest,
  };

  const dateProps = {
    maxDate: maxDate,
    minDate: minDate,
    disableFuture: disableFuture,
    disablePast: disablePast,
    readOnly: readOnly,
    showDaysOutsideCurrentMonth: true,
    disabled: disabled,
  };

  useEffect(() => {
    if (innerValue != value) setInnerValue(value);

    // eslint-disable-next-line
  }, [value]);

  const render = (() => {
    return time ? (
      <MuiDateTimePicker
        {...dateProps}
        ampm={amPm}
        format='DD/MM/YYYY HH:mm'
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onChange={(newValue) => {
          onChange?.(newValue);
          setInnerValue(newValue);
        }}
        open={open}
        value={innerValue}
        slotProps={{
          textField: inputProps,
          actionBar: () => ({
            actions: showTodayButton ? ['today'] : [],
          }),
        }}
      />
    ) : (
      <MuiDatePicker
        {...dateProps}
        format='DD/MM/YYYY'
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onChange={(newValue) => {
          onChange?.(newValue);
          setInnerValue(newValue);
        }}
        open={open}
        value={innerValue}
        slotProps={{
          textField: inputProps,
          actionBar: () => ({
            actions: showTodayButton ? ['today'] : [],
          }),
        }}
      />
    );
  })();

  return noGrid ? (
    render
  ) : (
    <Grid item className={className} {...getGrid(grid)}>
      {render}
    </Grid>
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
  return localControl ? (
    <RenderDatePicker
      {...rest}
      onBlur={onBlur}
      name={name}
      helperText={helperText}
      onChange={(newValue) => onChange?.(newValue)}
      value={value}
    />
  ) : (
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
            {...rest}
          />
        );
      }}
    </Field>
  );
};

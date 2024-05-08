import { useEffect, useState } from 'react';
import { Field, FieldProps } from 'formik';

import { Dayjs } from 'dayjs';

import { TextFieldProps, Grid, GridProps } from '@mui/material';
import {
  DatePicker as MuiDatePicker,
  DateTimePicker as MuiDateTimePicker,
} from '@mui/x-date-pickers';

export type DatePickerProps = Omit<TextFieldProps, 'value' | 'onChange'> & {
  className?: string;
  disableFuture?: boolean;
  disablePast?: boolean;
  grid: GridProps;
  localControl: boolean;
  maxDate?: Dayjs;
  minDate?: Dayjs;
  name: string;
  noGrid?: boolean;
  readOnly?: boolean;
  showTodayButton?: boolean;
  time?: boolean;
  value: Dayjs | null;
  onChange?: (newValue: Dayjs | null) => void;
};

const defaultProps: DatePickerProps = {
  grid: {
    xs: 12,
    sm: 12,
    md: 6,
    lg: 8,
  },
  localControl: false,
  name: '',
  variant: 'outlined',
  value: null,
};

export const DatePicker = ({
  className,
  disabled,
  disableFuture,
  disablePast,
  grid,
  helperText,
  localControl,
  label,
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
  ...rest
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Dayjs | null>(null);

  const getGrid = (g: GridProps) => {
    return {
      ...defaultProps.grid,
      ...g,
    };
  };

  const renderProps = (
    field?: FieldProps['field'],
    meta?: FieldProps['meta'],
  ) => {
    const textProps: TextFieldProps = {
      margin: 'normal',
      fullWidth: true,
      size: 'small',
      required: required,
      label: label,
      disabled: disabled,
      ...rest,
    };

    if (field && meta) {
      const { touched, error } = meta;
      return {
        ...field,
        error: touched && !!error,
        helperText: touched && error,
        ...textProps,
      };
    } else {
      return {
        error: !!helperText,
        helperText: helperText,
        ...textProps,
      };
    }
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
    if (value != rest.value) setValue(rest.value);

    // eslint-disable-next-line
  }, [rest.value]);

  const render = (() => {
    return localControl ? (
      time ? (
        <MuiDateTimePicker
          {...dateProps}
          format='DD/MM/YYYY HH:mm'
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={(newValue) => {
            onChange?.(newValue);
            setValue(newValue);
          }}
          open={open}
          value={value}
          slotProps={{
            textField: {
              onClick: () => setOpen(true),
              onBlur: onBlur,
              ...renderProps(),
            },
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
            setValue(newValue);
          }}
          open={open}
          value={value}
          slotProps={{
            textField: {
              onClick: () => setOpen(true),
              onBlur: onBlur,
              ...renderProps(),
            },
            actionBar: () => ({
              actions: showTodayButton ? ['today'] : [],
            }),
          }}
        />
      )
    ) : (
      <Field name={name}>
        {({ field, meta, form }: FieldProps) => {
          return time ? (
            <MuiDateTimePicker
              {...dateProps}
              format='DD/MM/YYYY HH:mm'
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              onChange={(newValue) => {
                field.onChange({ target: { name, value: newValue } });
                onChange?.(newValue);
              }}
              open={open}
              value={field.value}
              slotProps={{
                textField: {
                  ...renderProps(field, meta),
                  onClick: () => setOpen(true),
                  onBlur: (e) => {
                    field.onBlur({ target: { name } });
                    form.setFieldTouched(name, true);
                    onBlur?.(e);
                  },
                },
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
                field.onChange({ target: { name, value: newValue } });
                onChange?.(newValue);
              }}
              open={open}
              value={field.value}
              slotProps={{
                textField: {
                  ...renderProps(field, meta),
                  onClick: () => setOpen(true),
                  onBlur: (e) => {
                    field.onBlur({ target: { name } });
                    form.setFieldTouched(name, true);
                    onBlur?.(e);
                  },
                },
                actionBar: () => ({
                  actions: showTodayButton ? ['today'] : [],
                }),
              }}
            />
          );
        }}
      </Field>
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

DatePicker.defaultProps = defaultProps;

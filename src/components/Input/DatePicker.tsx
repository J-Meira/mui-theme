import { useEffect, useState } from 'react';
import { Field, FieldProps } from 'formik';

import { TextField, TextFieldProps, Grid, GridProps } from '@mui/material';
import {
  DatePicker as MuiDatePicker,
  DateTimePicker as MuiDateTimePicker,
} from '@mui/x-date-pickers';

export type DatePickerProps = TextFieldProps & {
  className?: string;
  disableFuture?: boolean;
  disablePast?: boolean;
  grid: GridProps;
  isNoFormik: boolean;
  maxDate?: any;
  minDate?: any;
  name: string;
  noGrid?: boolean;
  readOnly?: boolean;
  showTodayButton?: boolean;
  time?: boolean;
};

const defaultProps: DatePickerProps = {
  grid: {
    xs: 12,
    sm: 12,
    md: 6,
    lg: 8,
  },
  isNoFormik: false,
  name: '',
  variant: 'outlined',
};

const TextInput = ({ ...rest }: TextFieldProps) => (
  <TextField margin='normal' fullWidth size='small' {...rest} />
);

export const DatePicker = ({
  className,
  disabled,
  disableFuture,
  disablePast,
  grid,
  helperText,
  isNoFormik,
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
  const [value, setValue] = useState<any>(null);

  const getGrid = (g: GridProps) => {
    return {
      ...defaultProps.grid,
      ...g,
    };
  };

  const renderProps = (
    field: FieldProps['field'],
    meta: FieldProps['meta'],
  ) => {
    const { touched, error } = meta;
    return {
      ...field,
      ...rest,
      required: required,
      error: touched && !!error,
      helperText: touched && error,
    };
  };

  const renderNFProps = () => {
    return {
      ...rest,
      required: required,
      error: !!helperText,
      helperText: helperText,
      label: label,
      maxDate: maxDate,
      minDate: minDate,
      disableFuture: disableFuture,
      disablePast: disablePast,
      readOnly: readOnly,
      showDaysOutsideCurrentMonth: true,
      disabled: disabled,
    };
  };

  useEffect(() => {
    if (value != rest.value) setValue(rest.value);

    // eslint-disable-next-line
  }, [rest.value]);

  const render = (() => {
    return isNoFormik ? (
      time ? (
        <MuiDateTimePicker
          inputFormat='DD/MM/YYYY HH:mm'
          mask='__/__/____ __:__'
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={(newValue) => {
            onChange?.(newValue);
            setValue(newValue);
          }}
          open={open}
          value={value}
          componentsProps={{
            actionBar: {
              actions: showTodayButton ? ['today'] : [],
            },
          }}
          renderInput={(innerParams) => (
            <TextInput
              {...innerParams}
              onClick={() => setOpen(true)}
              onBlur={onBlur}
              {...renderNFProps()}
            />
          )}
        />
      ) : (
        <MuiDatePicker
          inputFormat='DD/MM/YYYY'
          mask='__/__/____'
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={(newValue) => {
            onChange?.(newValue);
            setValue(newValue);
          }}
          open={open}
          value={value}
          componentsProps={{
            actionBar: {
              actions: showTodayButton ? ['today'] : [],
            },
          }}
          renderInput={(innerParams) => (
            <TextInput
              {...innerParams}
              onClick={() => setOpen(true)}
              onBlur={onBlur}
              {...renderNFProps()}
            />
          )}
        />
      )
    ) : (
      <Field name={name}>
        {({ field, meta, form }: FieldProps) => {
          return time ? (
            <MuiDateTimePicker
              inputFormat='DD/MM/YYYY HH:mm'
              mask='__/__/____ __:__'
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              onChange={(newValue) => {
                field.onChange({ target: { name, value: newValue } });
                onChange?.(newValue);
              }}
              open={open}
              value={field.value}
              componentsProps={{
                actionBar: {
                  actions: showTodayButton ? ['today'] : [],
                },
              }}
              renderInput={(innerParams) => (
                <TextInput
                  {...innerParams}
                  {...renderProps(field, meta)}
                  onClick={() => setOpen(true)}
                  onBlur={(e) => {
                    field.onBlur({ target: { name } });
                    form.setFieldTouched(name, true);
                    onBlur?.(e);
                  }}
                />
              )}
            />
          ) : (
            <MuiDatePicker
              inputFormat='DD/MM/YYYY'
              mask='__/__/____'
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              onChange={(newValue) => {
                field.onChange({ target: { name, value: newValue } });
                onChange?.(newValue);
              }}
              open={open}
              value={field.value}
              componentsProps={{
                actionBar: {
                  actions: showTodayButton ? ['today'] : [],
                },
              }}
              renderInput={(innerParams) => (
                <TextInput
                  {...innerParams}
                  {...renderProps(field, meta)}
                  onClick={() => setOpen(true)}
                  onBlur={(e) => {
                    field.onBlur({ target: { name } });
                    form.setFieldTouched(name, true);
                    onBlur?.(e);
                  }}
                />
              )}
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

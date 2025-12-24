import { Field, FieldProps } from 'formik';
import { MenuItem, TextField } from '@mui/material';
import { memo, useMemo } from 'react';
import { InputProps, SelectProps } from '.';

type SelectPropsEx = Omit<
  InputProps,
  'className' | 'grid' | 'noGrid' | 'model' | 'rowDirection'
> &
  SelectProps;

const SelectComponent = ({
  defaultOption,
  helperText,
  inputRef,
  localControl,
  name,
  noNativeOptions,
  options,
  onBlur,
  onChange,
  readOnly,
  slotProps,
  variant = 'outlined',
  ...rest
}: SelectPropsEx) => {
  const renderOptions = useMemo(() => {
    const items = [];

    if (defaultOption) {
      items.push(
        noNativeOptions ? (
          <MenuItem key='default-option' value={-1}>
            {defaultOption}
          </MenuItem>
        ) : (
          <option key='default-option' value={-1}>
            {defaultOption}
          </option>
        ),
      );
    }

    if (options) {
      options.forEach((op) => {
        items.push(
          noNativeOptions ? (
            <MenuItem key={`${op.value}-${op.label}`} value={op.value}>
              {op.label}
            </MenuItem>
          ) : (
            <option key={`${op.value}-${op.label}`} value={op.value}>
              {op.label}
            </option>
          ),
        );
      });
    }

    return items;
  }, [defaultOption, noNativeOptions, options]);

  const slotPropsConfig = useMemo(
    () => ({
      ...slotProps,
      input: { readOnly, ref: inputRef, ...slotProps?.input },
      select: !noNativeOptions ? { native: true } : undefined,
    }),
    [noNativeOptions, readOnly, inputRef, slotProps],
  );

  if (localControl) {
    return (
      <TextField
        {...rest}
        error={!!helperText}
        helperText={helperText}
        id={name}
        name={name}
        fullWidth
        slotProps={slotPropsConfig}
        margin='normal'
        onBlur={onBlur}
        onChange={onChange}
        select
        size='small'
        variant={variant}
      >
        {renderOptions}
      </TextField>
    );
  }

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        const { touched, error } = meta;

        return (
          <TextField
            {...rest}
            {...field}
            error={touched && !!error}
            helperText={touched && error}
            id={name}
            name={name}
            fullWidth
            slotProps={slotPropsConfig}
            margin='normal'
            onBlur={(e) => {
              field.onBlur(e);
              onBlur?.(e);
            }}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e);
            }}
            select
            size='small'
            variant={variant}
          >
            {renderOptions}
          </TextField>
        );
      }}
    </Field>
  );
};

export const Select = memo(SelectComponent);

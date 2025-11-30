import { Field, FieldProps } from 'formik';
import { MenuItem, TextField } from '@mui/material';
import { memo, useCallback, useMemo } from 'react';
import { InputProps, SelectProps } from '.';

type SelectPropsEx = Omit<
  InputProps,
  'className' | 'grid' | 'noGrid' | 'model' | 'rowDirection'
> &
  SelectProps;

const SelectComponent = ({
  defaultOption,
  helperText,
  localControl,
  name,
  noNativeOptions,
  options,
  onBlur,
  onChange,
  readOnly,
  variant = 'outlined',
  ...rest
}: SelectPropsEx) => {
  const renderOptions = useCallback(() => {
    const defaultOptionElement =
      defaultOption &&
      (noNativeOptions ? (
        <MenuItem value={-1}>{defaultOption}</MenuItem>
      ) : (
        <option value={-1}>{defaultOption}</option>
      ));

    const optionElements = options?.map((op) =>
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

    return (
      <>
        {defaultOptionElement}
        {optionElements}
      </>
    );
  }, [defaultOption, noNativeOptions, options]);

  const slotPropsConfig = useMemo(
    () => ({
      input: { readOnly },
      select: !noNativeOptions ? { native: true } : undefined,
    }),
    [noNativeOptions, readOnly],
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
        {renderOptions()}
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
            {renderOptions()}
          </TextField>
        );
      }}
    </Field>
  );
};

export const Select = memo(SelectComponent);

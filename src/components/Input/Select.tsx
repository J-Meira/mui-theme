import { Field, FieldProps } from 'formik';
import { MenuItem, TextField } from '@mui/material';
import { InputProps, SelectProps } from '.';

type SelectPropsEx = Omit<
  InputProps,
  'className' | 'grid' | 'noGrid' | 'model' | 'rowDirection'
> &
  SelectProps;

export const Select = ({
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
  const Option = noNativeOptions ? MenuItem : 'option';

  const renderOptions = [
    defaultOption && (
      <Option key='default-option' value={-1}>
        {defaultOption}
      </Option>
    ),
    ...(options ?? []).map((op) => (
      <Option key={`${op.value}-${op.label}`} value={op.value}>
        {op.label}
      </Option>
    )),
  ];

  const slotPropsConfig = {
    ...slotProps,
    input: { readOnly, ref: inputRef, ...slotProps?.input },
    select: !noNativeOptions ? { native: true } : undefined,
  };

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

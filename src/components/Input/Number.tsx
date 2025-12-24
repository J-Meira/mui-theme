import { Field, FieldProps } from 'formik';
import { TextField } from '@mui/material';
import { InputProps, NumberProps } from '.';

type NumberEx = Omit<InputProps, 'className' | 'grid' | 'noGrid' | 'model'> &
  NumberProps;

export const Number = ({
  decimal,
  helperText,
  inputRef,
  localControl,
  name,
  onBlur,
  onChange,
  readOnly,
  slotProps,
  variant = 'outlined',
  ...rest
}: NumberEx) => {
  const mask = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const rawValue = e.target.value;
    const valueReturn = decimal
      ? (() => {
          const cleaned = String(rawValue).replace(/[^-0-9.]/g, '');
          const decimalCount = cleaned.split('.').length - 1;
          return decimalCount > 1 ? cleaned.replace(/\.+$/, '') : cleaned;
        })()
      : String(rawValue).replace(/[^-0-9]/g, '');

    const finalValue =
      valueReturn.indexOf('-') > 0 ? valueReturn.replace('-', '') : valueReturn;

    e.target.value = finalValue;

    return e;
  };

  return localControl ? (
    <TextField
      {...rest}
      error={!!helperText}
      helperText={helperText}
      id={name}
      name={name}
      fullWidth
      slotProps={{
        ...slotProps,
        input: {
          readOnly,
          ref: inputRef,
          ...slotProps?.input,
        },
      }}
      margin='normal'
      onBlur={onBlur}
      onChange={(e) => {
        onChange?.(mask(e));
      }}
      size='small'
      type='number'
      variant={variant}
      value={rest.value !== null ? rest.value : ''}
    />
  ) : (
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
            slotProps={{
              ...slotProps,
              input: {
                readOnly,
                ref: inputRef,
                ...slotProps?.input,
              },
            }}
            margin='normal'
            onBlur={(e) => {
              field.onBlur(e);
              onBlur?.(e);
            }}
            onChange={(e) => {
              field.onChange(mask(e));
              onChange?.(mask(e));
            }}
            size='small'
            type='number'
            variant={variant}
            value={field.value !== null ? field.value : ''}
          />
        );
      }}
    </Field>
  );
};

import { Field, FieldProps } from 'formik';
import { InputAdornment, TextField } from '@mui/material';
import { CurrencyProps, InputProps } from '.';
import { formatCurrency } from './formatCurrency';

type CurrencyPropsEx = Omit<
  InputProps,
  'className' | 'grid' | 'noGrid' | 'model'
> &
  CurrencyProps;

export const Currency = ({
  helperText,
  hideSymbol,
  inputRef,
  localControl,
  name,
  onBlur,
  onChange,
  readOnly,
  slotProps,
  symbol = '$',
  variant = 'outlined',
  ...rest
}: CurrencyPropsEx) => {
  const mask = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.value = formatCurrency(e.target.value);
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
          startAdornment: !hideSymbol ? (
            <InputAdornment position='start'>{symbol}</InputAdornment>
          ) : undefined,
          ...slotProps?.input,
        },
      }}
      margin='normal'
      onBlur={onBlur}
      onChange={(e) => {
        const masked = mask(e);
        onChange?.(masked);
      }}
      variant={variant}
      size='small'
      type='number'
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
                startAdornment: !hideSymbol ? (
                  <InputAdornment position='start'>{symbol}</InputAdornment>
                ) : undefined,
                ...slotProps?.input,
              },
            }}
            margin='normal'
            onBlur={(e) => {
              field.onBlur(e);
              onBlur?.(e);
            }}
            onChange={(e) => {
              const masked = mask(e);
              field.onChange(masked);
              onChange?.(masked);
            }}
            variant={variant}
            size='small'
            type='number'
          />
        );
      }}
    </Field>
  );
};

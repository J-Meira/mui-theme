import { Field, FieldProps } from 'formik';
import { InputAdornment, TextField } from '@mui/material';
import { CurrencyProps, InputProps } from '.';

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
    const value = e.target.value.replace(/\D/g, '').replace(/^(0+)(\d)/g, '$2');
    const valueReturn = (() => {
      switch (value.length) {
        case 1:
          return `0.0${value}`;
        case 2:
          return `0.${value}`;
        default: {
          const intPart = value.slice(0, -2);
          const formattedInt = intPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1');
          return `${formattedInt}.${value.slice(-2)}`;
        }
      }
    })();
    e.target.value = valueReturn;

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
      onChange={onChange}
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
              field.onChange(mask(e));
              onChange?.(mask(e));
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

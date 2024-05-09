import { Field, FieldProps } from 'formik';
import { InputAdornment, TextField } from '@mui/material';
import { CurrencyProps, InputProps } from '..';

type CurrencyPropsEx = Omit<
  InputProps,
  'className' | 'grid' | 'noGrid' | 'model'
> &
  CurrencyProps;

export const Currency = ({
  helperText,
  hideSymbol,
  localControl,
  name,
  onBlur,
  onChange,
  readOnly,
  symbol = '$',
  variant = 'outlined',
  ...rest
}: CurrencyPropsEx) => {
  const mask = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value.replace(/\D/g, '').replace(/^(0+)(\d)/g, '$2');
    let valueReturn = null;
    let int = '';

    switch (value.length) {
      case 1:
        valueReturn = `0.0${value}`;
        break;
      case 2:
        valueReturn = `0.${value}`;
        break;
      default:
        int = value.slice(0, -2);
        int = int.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1');
        valueReturn = `${int}.${value.slice(-2)}`;
        break;
    }
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
      InputProps={{
        readOnly,
        startAdornment: !hideSymbol ? (
          <InputAdornment position='start'>{symbol}</InputAdornment>
        ) : undefined,
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
            InputProps={{
              readOnly,
              startAdornment: !hideSymbol ? (
                <InputAdornment position='start'>{symbol}</InputAdornment>
              ) : undefined,
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

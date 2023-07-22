import { Field, FieldProps } from 'formik';
import { TextField } from '@mui/material';
import { InputProps, NumberProps } from '.';

type NumberEx = Omit<InputProps, 'className' | 'grid' | 'noGrid' | 'model'> &
  NumberProps;

export const Number = ({
  decimal,
  helperText,
  isNoFormik,
  name,
  onBlur,
  onChange,
  readOnly,
  variant,
  ...rest
}: NumberEx) => {
  const mask = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let valueReturn = e.target.value;

    if (decimal) {
      valueReturn = String(valueReturn).replace(/[^-0-9.]/g, '');
      const decimalCount = valueReturn.split('.').length - 1;

      if (decimalCount > 1) {
        valueReturn = valueReturn.replace(/\.+$/, '');
      }
    } else {
      valueReturn = String(valueReturn).replace(/[^-0-9]/g, '');
    }

    if (valueReturn.indexOf('-') > 0) {
      valueReturn = valueReturn.replace('-', '');
    }

    e.target.value = valueReturn;

    return e;
  };

  return isNoFormik ? (
    <TextField
      {...rest}
      error={!!helperText}
      helperText={helperText}
      id={name}
      name={name}
      fullWidth
      InputProps={{
        readOnly,
      }}
      margin='normal'
      onBlur={onBlur}
      onChange={(e) => {
        onChange?.(mask(e));
      }}
      size='small'
      type='number'
      variant={variant}
      value={rest.value || ''}
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
            value={field.value || ''}
          />
        );
      }}
    </Field>
  );
};

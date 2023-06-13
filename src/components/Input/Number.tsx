import { Field, FieldProps } from 'formik';
import { TextField } from '@mui/material';
import { InputProps } from '.';

export const Number = ({
  helperText,
  isNoFormik,
  name,
  onBlur,
  onChange,
  readOnly,
  variant,
  ...rest
}: Omit<InputProps, 'className' | 'grid' | 'noGrid' | 'model'>) => {
  const mask = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.value = String(e.target.value).replace(/\D/g, '');

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

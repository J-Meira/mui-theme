import { Field, FieldProps } from 'formik';
import { TextField } from '@mui/material';
import { InputProps } from '.';

export const Basic = ({
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
}: Omit<InputProps, 'className' | 'grid' | 'noGrid' | 'model'>) =>
  localControl ? (
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
      onChange={onChange}
      size='small'
      variant={variant}
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
              field.onChange(e);
              onChange?.(e);
            }}
            size='small'
            variant={variant}
          />
        );
      }}
    </Field>
  );

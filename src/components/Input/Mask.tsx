import { useCallback, useEffect, useState } from 'react';
import { Field, FieldProps } from 'formik';
import { TextField } from '@mui/material';
import { InputProps, MaskProps } from '.';
import { toMask } from './toMask';

type MaskPropsEx = Omit<InputProps, 'className' | 'grid' | 'noGrid' | 'model'> &
  MaskProps;

export const Mask = ({
  custom,
  helperText,
  localControl,
  slotProps,
  maskModel,
  name,
  onBlur,
  onChange,
  readOnly,
  variant = 'outlined',
  ...rest
}: MaskPropsEx) => {
  const [value, setValue] = useState<any>('');

  const mask = useCallback(
    (value: string) => {
      value = value && value.length > 0 ? value : '';
      if (custom) {
        return custom(value);
      }
      switch (maskModel) {
        case 'cpf':
          return toMask.cpf(value);
        case 'cnpj':
          return toMask.cnpj(value);
        case 'document':
          return toMask.document(value);
        case 'number':
          return value.replace(/\D/g, '');
        case 'phone':
          return toMask.phone(value);
        case 'plate':
          return toMask.plate(value);
        case 'postalCode':
          return toMask.postalCode(value);
        case 'upper':
          return toMask.upper(value);
        default:
          return value;
      }
    },
    [custom, maskModel],
  );

  useEffect(() => {
    if (value != rest.value) setValue(rest.value);

    // eslint-disable-next-line
  }, [rest.value]);

  return localControl ? (
    <TextField
      {...rest}
      error={!!helperText}
      helperText={helperText}
      id={name}
      name={name}
      fullWidth
      slotProps={
        slotProps
          ? slotProps
          : {
              input: { readOnly },
            }
      }
      margin='normal'
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
        onChange?.(e);
      }}
      size='small'
      value={mask(value)}
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
            slotProps={
              slotProps
                ? slotProps
                : {
                    input: { readOnly },
                  }
            }
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
            value={mask(field.value)}
            variant={variant}
          />
        );
      }}
    </Field>
  );
};

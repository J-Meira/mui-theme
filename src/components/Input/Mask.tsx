import { useCallback, useEffect, useState } from 'react';
import { Field, FieldProps } from 'formik';
import { TextField } from '@mui/material';
import { InputProps, MaskProps } from '.';

type MaskPropsEx = Omit<InputProps, 'className' | 'grid' | 'noGrid' | 'model'> &
  MaskProps;

export const Mask = ({
  custom,
  helperText,
  localControl,
  InputProps,
  maskModel,
  name,
  onBlur,
  onChange,
  readOnly,
  variant,
  ...rest
}: MaskPropsEx) => {
  const [value, setValue] = useState<any>('');

  const mask = useCallback(
    (value: string) => {
      value = value && value.length > 0 ? value : '';
      if (custom) {
        return custom(value);
      } else {
        switch (maskModel) {
          case 'cpf':
            return maskCPF(value);
          case 'cnpj':
            return maskCNPJ(value);
          case 'document':
            return maskDocument(value);
          case 'number':
            return value.replace(/\D/g, '');
          case 'phone':
            return maskPhone(value);
          case 'plate':
            return maskPlate(value);
          case 'postalCode':
            return maskPostalCode(value);
          default:
            return value;
        }
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
      InputProps={InputProps ? InputProps : { readOnly }}
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
            InputProps={InputProps ? InputProps : { readOnly }}
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

export const maskDocument = (value: string) => {
  const valueTest = value.replace(/\D/g, '');
  if (!valueTest || valueTest.length <= 11) {
    return maskCPF(value);
  } else {
    return maskCNPJ(value);
  }
};

export const maskCPF = (value: string) => {
  value = value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
  return value;
};

export const maskCNPJ = (value: string) => {
  value = value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
  return value;
};

export const maskPostalCode = (value: string) => {
  value = value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
  return value;
};

export const maskPhone = (value: string) => {
  value = value.replace(/\D/g, '');
  if (value.length < 11) {
    value = value
      .replace(/(\d{0})(\d)/, '$1($2')
      .replace(/(\d{2})(\d)/, '$1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})(\d+?$)/, '$1');
  } else {
    value = value
      .replace(/(\d{0})(\d)/, '$1($2')
      .replace(/(\d{2})(\d)/, '$1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(\d{4})(\d+?$)/, '$1');
  }
  return value;
};

export const maskPlate = (value: string) => {
  value = value
    .toUpperCase()
    .replace(/[^A-Za-z0-9]+/g, '')
    .replace(/([\d\w]{3})([\d\w])/, '$1-$2')
    .replace(/([\d\w]{4})([\d\w])/, '$1-$2')
    .slice(0, 8);
  return value.toUpperCase();
};

export const maskCurrency = (value: string) => {
  let valueReturn = '';
  if (value && value.length > 0) {
    value = value.replace(/\D/g, '').replace(/^(0+)(\d)/g, '$2');
    let int = '';
    switch (value.length) {
      case 1:
        valueReturn = `0,0${value}`;
        break;
      case 2:
        valueReturn = `0,${value}`;
        break;
      default:
        int = value.slice(0, -2);
        int = int.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        valueReturn = `${int},${value.slice(-2)}`;
        break;
    }
  }

  return valueReturn;
};

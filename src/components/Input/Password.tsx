import { useState } from 'react';
import { Field, FieldProps } from 'formik';
import { TextField } from '@mui/material';
import {
  MdVisibility as VisibilityIcon,
  MdVisibilityOff as VisibilityOffIcon,
} from 'react-icons/md';
import { InputProps, PasswordProps } from '.';
import { InputAd } from './InputAd';

type PasswordPropsEx = Omit<
  InputProps,
  'className' | 'grid' | 'noGrid' | 'model'
> &
  PasswordProps;

export const Password = ({
  helperText,
  hideTitle,
  localControl,
  name,
  onBlur,
  onChange,
  variant = 'outlined',
  showTitle,
  ...rest
}: PasswordPropsEx) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const adornment = (
    <InputAd
      action={() => setShowPassword(!showPassword)}
      actionTitle={showPassword ? hideTitle : showTitle}
      icon={showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
    />
  );

  return localControl ? (
    <TextField
      {...rest}
      error={!!helperText}
      helperText={helperText}
      id={name}
      name={name}
      fullWidth
      InputProps={{
        endAdornment: adornment,
      }}
      margin='normal'
      onBlur={onBlur}
      onChange={onChange}
      type={showPassword ? 'text' : 'password'}
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
            InputProps={{
              endAdornment: adornment,
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
            type={showPassword ? 'text' : 'password'}
            size='small'
            variant={variant}
          />
        );
      }}
    </Field>
  );
};

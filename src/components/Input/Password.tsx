import { useState } from 'react';
import { Field, FieldProps } from 'formik';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { InputProps } from '.';

export interface PasswordProps {
  showTitle?: string;
  hideTitle?: string;
}

type PasswordPropsEx = Omit<
  InputProps,
  'className' | 'grid' | 'noGrid' | 'model'
> &
  PasswordProps;

export const Password = ({
  helperText,
  hideTitle,
  isNoFormik,
  name,
  onBlur,
  onChange,
  variant,
  showTitle,
  ...rest
}: PasswordPropsEx) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return isNoFormik ? (
    <TextField
      {...rest}
      error={!!helperText}
      helperText={helperText}
      id={name}
      name={name}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='input action show/hide password'
              onClick={() => setShowPassword(!showPassword)}
              edge='end'
              tabIndex={-1}
              title={showPassword ? hideTitle : showTitle}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
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
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='input action show/hide password'
                    onClick={() => setShowPassword(!showPassword)}
                    edge='end'
                    tabIndex={-1}
                    title={showPassword ? hideTitle : showTitle}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
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

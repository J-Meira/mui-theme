import { Field, FieldProps } from 'formik';
import { TextField } from '@mui/material';
import { InputAd } from '../InputAd';
import { IconProps, InputProps } from '..';

type IconPropsEx = Omit<InputProps, 'className' | 'grid' | 'noGrid' | 'model'> &
  IconProps;

//ToDo fix label start position on start icon type

export const Icon = ({
  action,
  actionTitle,
  helperText,
  icon,
  localControl,
  name,
  onBlur,
  onChange,
  readOnly,
  start,
  variant,
  ...rest
}: IconPropsEx) => {
  const adornment = (
    <InputAd
      action={action}
      actionTitle={actionTitle}
      icon={icon}
      start={start}
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
        readOnly,
        endAdornment: !start && adornment,
        startAdornment: start && adornment,
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
            InputProps={{
              readOnly,
              endAdornment: !start && adornment,
              startAdornment: start && adornment,
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
};

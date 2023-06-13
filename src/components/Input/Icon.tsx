import { Field, FieldProps } from 'formik';
import {
  IconButton,
  InputAdornment as MuiInputAdornment,
  TextField,
} from '@mui/material';
import { InputProps } from '.';

export interface IconProps {
  action?: (params?: any) => void;
  actionTitle?: string;
  icon?: React.ReactNode;
  start?: boolean;
}

type IconPropsEx = Omit<InputProps, 'className' | 'grid' | 'noGrid' | 'model'> &
  IconProps;

export const InputAdornment = ({
  action,
  actionTitle,
  icon,
  start,
}: IconProps) => (
  <MuiInputAdornment position={start ? 'start' : 'end'}>
    <IconButton
      aria-label={`input action ${actionTitle || ''}`}
      onClick={action}
      edge={start ? false : 'end'}
      tabIndex={-1}
      title={actionTitle}
    >
      {icon}
    </IconButton>
  </MuiInputAdornment>
);

//ToDo fix label start position on start icon type

export const Icon = ({
  action,
  actionTitle,
  helperText,
  icon,
  isNoFormik,
  name,
  onBlur,
  onChange,
  readOnly,
  start,
  variant,
  ...rest
}: IconPropsEx) => {
  const adornment = (
    <InputAdornment
      action={action}
      actionTitle={actionTitle}
      icon={icon}
      start={start}
    />
  );

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

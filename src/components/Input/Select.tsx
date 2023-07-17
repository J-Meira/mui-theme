import { Field, FieldProps } from 'formik';
import { MenuItem, TextField } from '@mui/material';
import { InputProps, SelectProps } from '.';

type SelectPropsEx = Omit<
  InputProps,
  'className' | 'grid' | 'noGrid' | 'model' | 'rowDirection'
> &
  SelectProps;

export const Select = ({
  defaultOption,
  helperText,
  isNoFormik,
  name,
  NoNativeOptions,
  options,
  onBlur,
  onChange,
  readOnly,
  variant,
  ...rest
}: SelectPropsEx) =>
  isNoFormik ? (
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
      onChange={onChange}
      select
      SelectProps={!NoNativeOptions ? { native: true } : undefined}
      size='small'
      variant={variant}
    >
      {defaultOption &&
        (NoNativeOptions ? (
          <MenuItem value={-1}>{defaultOption}</MenuItem>
        ) : (
          <option value={-1}>{defaultOption}</option>
        ))}
      {options &&
        options.map((op) =>
          NoNativeOptions ? (
            <MenuItem key={`${op.value}-${op.label}`} value={op.value}>
              {op.label}
            </MenuItem>
          ) : (
            <option key={`${op.value}-${op.label}`} value={op.value}>
              {op.label}
            </option>
          ),
        )}
    </TextField>
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
              field.onChange(e);
              onChange?.(e);
            }}
            select
            SelectProps={!NoNativeOptions ? { native: true } : undefined}
            size='small'
            variant={variant}
          >
            {defaultOption &&
              (NoNativeOptions ? (
                <MenuItem value={-1}>{defaultOption}</MenuItem>
              ) : (
                <option value={-1}>{defaultOption}</option>
              ))}
            {options &&
              options.map((op) =>
                NoNativeOptions ? (
                  <MenuItem key={`${op.value}-${op.label}`} value={op.value}>
                    {op.label}
                  </MenuItem>
                ) : (
                  <option key={`${op.value}-${op.label}`} value={op.value}>
                    {op.label}
                  </option>
                ),
              )}
          </TextField>
        );
      }}
    </Field>
  );

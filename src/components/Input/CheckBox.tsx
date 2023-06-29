import { Field, FieldProps } from 'formik';
import {
  FormHelperText,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { CheckBoxProps, InputProps } from '.';

type CheckBoxExProps = Omit<
  InputProps,
  'className' | 'grid' | 'noGrid' | 'model'
> &
  CheckBoxProps;

const CheckBoxRender = ({
  helperText,
  label,
  name,
  required,
  ...rest
}: Omit<CheckBoxExProps, 'isNoFormik'>) => (
  <FormControl
    component='fieldset'
    error={!!helperText}
    margin='normal'
    required={required}
    variant='standard'
  >
    <FormGroup>
      <FormControlLabel
        control={<Checkbox {...rest} id={name} name={name} />}
        label={label}
      />
    </FormGroup>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

export const CheckBox = ({
  helperText,
  isNoFormik,
  name,
  onChange,
  ...rest
}: CheckBoxExProps) =>
  isNoFormik ? (
    <CheckBoxRender
      {...rest}
      helperText={helperText}
      id={name}
      name={name}
      onChange={onChange}
    />
  ) : (
    <Field name={name} type='checkbox'>
      {({ field, meta }: FieldProps) => {
        const { touched, error } = meta;
        return (
          <CheckBoxRender
            {...rest}
            {...field}
            helperText={touched && error ? error : undefined}
            name={name}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e);
            }}
            size='small'
          />
        );
      }}
    </Field>
  );

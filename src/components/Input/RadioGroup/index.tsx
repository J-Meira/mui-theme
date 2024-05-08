import { Field, FieldProps } from 'formik';
import {
  FormHelperText,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  Radio,
} from '@mui/material';
import { InputProps, RadioGroupInputProps } from '..';

type RadioGroupExProps = Omit<
  InputProps,
  'className' | 'grid' | 'noGrid' | 'model'
> &
  RadioGroupInputProps;

const RadioGroupRender = ({
  helperText,
  label,
  name,
  onChange,
  options,
  required,
  rowDirection,
  value,
}: Omit<RadioGroupExProps, `localControl`>): React.ReactElement => (
  <FormControl
    component='fieldset'
    error={!!helperText}
    margin='normal'
    required={required}
    variant='standard'
  >
    {label && <FormLabel>{label}</FormLabel>}
    <MuiRadioGroup
      onChange={onChange}
      defaultValue={value}
      value={value}
      name={name}
      row={rowDirection}
    >
      {options &&
        options.map((op) => (
          <FormControlLabel
            key={`${op.value}-${op.label}`}
            control={<Radio name={name} />}
            label={op.label}
            value={op.value}
          />
        ))}
    </MuiRadioGroup>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

export const RadioGroup = ({
  localControl,
  helperText,
  onChange,
  name,
  ...rest
}: RadioGroupExProps) =>
  localControl ? (
    <RadioGroupRender
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
          <RadioGroupRender
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

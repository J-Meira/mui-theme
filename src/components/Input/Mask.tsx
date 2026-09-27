import { Field, FieldProps } from 'formik';
import { TextField } from '@mui/material';
import { InputProps, MaskProps } from '.';
import { toMask } from './toMask';
import { useSyncedState } from '../../hooks/useSyncedState';

type MaskPropsEx = Omit<InputProps, 'className' | 'grid' | 'noGrid' | 'model'> &
  MaskProps;

const MASKS: Record<
  NonNullable<MaskProps['maskModel']>,
  (value: string) => string
> = {
  cpf: toMask.cpf,
  cnpj: toMask.cnpj,
  document: toMask.document,
  number: (value) => value.replace(/\D/g, ''),
  phone: toMask.phone,
  plate: toMask.plate,
  postalCode: toMask.postalCode,
  upper: toMask.upper,
};

export const Mask = ({
  custom,
  helperText,
  inputRef,
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
  const [value, setValue] = useSyncedState<unknown>(rest.value);

  const mask = (raw: unknown) => {
    const text = typeof raw === 'string' && raw.length > 0 ? raw : '';
    if (custom) return custom(text);
    if (!maskModel) return text;
    return MASKS[maskModel](text);
  };

  const inputSlotProps = {
    ...slotProps,
    input: {
      readOnly,
      ref: inputRef,
      ...slotProps?.input,
    },
  };

  if (localControl) {
    return (
      <TextField
        {...rest}
        error={!!helperText}
        helperText={helperText}
        id={name}
        name={name}
        fullWidth
        slotProps={inputSlotProps}
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
    );
  }

  return (
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
            slotProps={inputSlotProps}
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

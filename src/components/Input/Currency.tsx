import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormHelperText,
  FormControl,
  OutlinedInputProps,
  Grid,
  GridProps,
  TextFieldProps,
} from '@mui/material';

type CurrencyProps = OutlinedInputProps & GridProps & TextFieldProps;

export const Currency = ({
  label,
  helperText,
  error,
  required,
  name,
  variant,
  xs,
  sm,
  md,
  lg,
  ...params
}: CurrencyProps) => (
  <Grid item xs={xs} sm={sm} md={md} lg={lg}>
    <FormControl
      variant={variant}
      margin='normal'
      fullWidth
      error={error}
      required={required}
      size='small'
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        type='text'
        startAdornment={
          <InputAdornment position='start'>R$</InputAdornment>
        }
        label={label}
        name={name}
        {...params}
      />
      {(helperText && error) && (
        <FormHelperText>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  </Grid>
);

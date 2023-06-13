import { TextField } from '@mui/material';
import { InputProps } from '.';

export const Basic = ({
  helperText,
  name,
  readOnly,
  variant,
  ...rest
}: Omit<
  InputProps,
  'className' | 'grid' | 'isNoFormik' | 'noGrid' | 'model'
>) => (
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
    size='small'
    variant={variant}
  />
);

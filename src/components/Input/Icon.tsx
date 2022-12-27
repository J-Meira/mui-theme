import * as React from 'react';

import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormHelperText,
  FormControl,
  OutlinedInputProps,
} from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';
import { TextFieldProps } from '@mui/material/TextField';

export interface IconProps {
  icon?: React.ReactNode,
  action?: (params: any) => any,
  start?: boolean;
}

const defaultProps: IconProps = {
  start: false
}

const Adornment = ({ icon, action, start }: IconProps) => (
  <InputAdornment position={start ? 'start' : 'end'}>
    <IconButton
      aria-label='input button action'
      onClick={action}
      edge={start ? false : 'end'}
      tabIndex={-1}
    >
      {icon}
    </IconButton>
  </InputAdornment>
);

type IconPropsEx = OutlinedInputProps & GridProps & TextFieldProps & IconProps;

const Icon = ({
  label, helperText, error, required, name, action,
  variant, icon, start, xs, sm, md, lg, ...params
}: IconPropsEx) => (
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
        startAdornment={start && <Adornment icon={icon} action={action} start={start} />}
        endAdornment={!start && <Adornment icon={icon} action={action} start={start} />}
        label={label}
        name={name}
        {...params}
      />
      {(helperText && error) && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  </Grid>
);

Icon.defaultProps = defaultProps;

export default Icon;

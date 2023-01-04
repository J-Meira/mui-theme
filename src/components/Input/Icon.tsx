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

export interface IconProps {
  icon?: React.ReactNode,
  action?: (params: any) => any,
  start?: boolean;
}

type IconPropsEx = OutlinedInputProps & GridProps & TextFieldProps & IconProps;

const defaultProps: IconPropsEx = {
  start: false
}

//ToDo fix label start position on start icon type

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
        startAdornment={start && (
          <Adornment icon={icon} action={action} start={start} />
        )}
        endAdornment={!start && (
          <Adornment icon={icon} action={action} start={start} />
        )}
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

Icon.defaultProps = defaultProps;

export default Icon;

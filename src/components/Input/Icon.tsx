import {
  IconButton,
  InputAdornment,
  Grid,
  TextField,
} from '@mui/material';
import { InputProps } from '.';

const Adornment = ({
  icon,
  action,
  start,
}: IconProps) => (
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

type IconPropsEx = InputProps & IconProps;

const defaultProps: IconPropsEx = {
  grid: {
    xs: 12,
    sm: 12,
    md: 6,
    lg: 8,
  },
  start: false,
  variant: 'outlined',
}

//ToDo fix label start position on start icon type

export const Icon = ({
  helperText,
  action,
  variant,
  icon,
  start,
  grid,
  ...rest
}: IconPropsEx) => {

  return (
    <Grid item {...grid}>
      <TextField
        {...rest}
        variant={variant}
        margin='normal'
        fullWidth
        size='small'
        error={!!helperText}
        helperText={helperText}
        InputProps={{
          startAdornment: start && (
            <Adornment icon={icon} action={action} start={start} />
          ),
          endAdornment: !start && (
            <Adornment icon={icon} action={action} start={start} />
          ),
        }}
      />
    </Grid>
  );
}
Icon.defaultProps = defaultProps;

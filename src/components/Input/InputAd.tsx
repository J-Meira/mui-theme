import {
  IconButton,
  InputAdornment as MuiInputAdornment,
  Typography,
} from '@mui/material';
import { IconProps } from '.';

export const InputAd = ({
  action,
  actionTitle,
  icon,
  label,
  start,
}: IconProps) => (
  <MuiInputAdornment position={start ? 'start' : 'end'}>
    {label && <Typography variant='caption'>{label}</Typography>}
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

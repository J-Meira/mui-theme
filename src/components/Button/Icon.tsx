import { IconButton, IconButtonProps } from '@mui/material';

export const Icon = ({
  children,
  size = 'small',
  ...rest
}: IconButtonProps) => (
  <IconButton size={size} {...rest}>
    {children}
  </IconButton>
);

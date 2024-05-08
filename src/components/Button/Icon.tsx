import { IconButton, IconButtonProps } from '@mui/material';
import { defaultIconProps } from './defaultIconProps';

export const Icon = ({ children, ...rest }: IconButtonProps) => (
  <IconButton {...rest}>{children}</IconButton>
);

Icon.defaultProps = defaultIconProps;

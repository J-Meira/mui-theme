import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import { Basic } from './Basic';
import { Icon } from './Icon';

export interface ButtonProps extends MuiButtonProps {
  model?: 'custom' | 'icon';
}

export const Button = ({
  model,
  children,
  fullWidth = true,
  variant = 'contained',
  ...rest
}: ButtonProps) => {
  switch (model) {
    case 'icon':
      return <Icon {...rest}>{children}</Icon>;
    default:
      return (
        <Basic fullWidth={fullWidth} variant={variant} {...rest}>
          {children}
        </Basic>
      );
  }
};

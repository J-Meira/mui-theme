import { ReactNode } from 'react';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import { Basic } from './Basic';
import { Icon } from './Icon';
import { Responsive } from './Responsive';

export interface ButtonProps extends MuiButtonProps {
  model?: 'custom' | 'icon' | 'responsive';
  contained?: boolean;
}
export interface ResponsiveButtonProps {
  icon?: ReactNode;
}
type ButtonPropsExt = ButtonProps & ResponsiveButtonProps;

export const Button = ({
  children,
  contained = false,
  icon,
  model,
  variant = 'contained',
  ...rest
}: ButtonPropsExt) => {
  switch (model) {
    case 'icon':
      return <Icon {...rest}>{children}</Icon>;
    case 'responsive':
      return (
        <Responsive
          fullWidth={!contained}
          icon={icon}
          variant={variant}
          {...rest}
        >
          {children}
        </Responsive>
      );
    default:
      return (
        <Basic fullWidth={!contained} variant={variant} {...rest}>
          {children}
        </Basic>
      );
  }
};

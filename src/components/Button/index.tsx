import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import { Basic } from './Basic';
import { Icon } from './Icon';
import { defaultProps } from './defaultProps';

export interface ButtonProps extends MuiButtonProps {
  model?: 'custom' | 'icon';
}

export const Button = ({
  model,
  children,
  fullWidth,
  ...rest
}: ButtonProps) => {
  switch (model) {
    case 'icon':
      return <Icon {...rest}>{children}</Icon>;
    default:
      return (
        <Basic fullWidth={fullWidth} {...rest}>
          {children}
        </Basic>
      );
  }
};

Button.defaultProps = defaultProps;


import { ButtonProps as MuiButtonProps  } from '@mui/material/Button';

import Basic from './Basic';
import Custom, { ColorsButtonProps } from './Custom';
import Icon from './Icon';

interface ButtonProps extends MuiButtonProps {
  model?: 'custom' | 'icon',
  colors?: ColorsButtonProps,
};

const defaultProps: ButtonProps = {
  fullWidth: true,
  variant:'contained',
}

const Button = ({ model, children, colors, ...params }: ButtonProps) => {
  switch (model) {
    case 'custom':
      return (
        <Custom {...params}>
          {children}
        </Custom>
      );
    case 'icon':
      return (
        <Icon {...params}>
          {children}
        </Icon>
      );
    default:
      return (
        <Basic {...params}>
          {children}
        </Basic>
      );
  }
}

Button.defaultProps = defaultProps;

export default Button;

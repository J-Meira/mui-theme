import Basic from "./Basic";
import { ButtonProps } from '@mui/material/Button';
import Custom, { ColorsButtonProps } from "./Custom";

interface ButtonPropsExt extends ButtonProps {
  model?: string,
  colors?: ColorsButtonProps,
};

const defaultProps: ButtonPropsExt = {
  fullWidth: true,
  variant:'contained',
}

const Button = ({ model, children, colors, ...params }: ButtonPropsExt) => {
  switch (model) {
    case 'custom':
      return (
        <Custom {...params}>
          {children}
        </Custom>
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

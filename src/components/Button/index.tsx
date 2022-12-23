import Basic from "./Basic";
import { ButtonProps } from '@mui/material/Button';
import Custom, { ColorsButtonProps } from "./Custom";

interface ButtonPropsExt extends ButtonProps  {
  model?: string,
  colors: ColorsButtonProps
};

const defaultProps: ButtonPropsExt={
  colors: {
    text: '#000',
    background: '#9c9fa8',
    backgroundHover: '#6e7179',
  }
}

const Button = ({ model, children, colors, ...params }:ButtonPropsExt) => {
  switch (model) {
    case 'custom':
      return (
        <Custom
          colors={colors}
          {...params}
        >
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

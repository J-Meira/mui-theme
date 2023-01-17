import { ButtonProps as MuiButtonProps } from '@mui/material/Button'

import { Basic } from './Basic'
import { Custom, CustomColorsProps } from './Custom'
import { Icon } from './Icon'

interface ButtonProps extends MuiButtonProps {
  model?: 'custom' | 'icon'
  colors?: CustomColorsProps
}

const defaultProps: ButtonProps = {
  fullWidth: true,
  variant: 'contained',
}

export const Button = ({ model, children, colors, fullWidth, ...rest }: ButtonProps) => {
  switch (model) {
    case 'custom':
      return (
        <Custom colors={colors} fullWidth={fullWidth} {...rest}>
          {children}
        </Custom>
      )
    case 'icon':
      return <Icon {...rest}>{children}</Icon>
    default:
      return (
        <Basic fullWidth={fullWidth} {...rest}>
          {children}
        </Basic>
      )
  }
}

Button.defaultProps = defaultProps

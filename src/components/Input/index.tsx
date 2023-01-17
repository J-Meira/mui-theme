import { GridProps, TextFieldProps, OutlinedInputProps } from '@mui/material'
import { Basic } from './Basic'
import { Currency } from './Currency'
import { Icon, IconProps } from './Icon'
import { Password } from './Password'
import { Select, SelectProps } from './Select'
import { CheckBoxGrided, CheckBoxGridedProps } from './CheckBoxGrided'

export type InputProps = TextFieldProps & {
  model?: string
  grid: GridProps
}

type InputPropsExt = InputProps & OutlinedInputProps & IconProps & SelectProps & CheckBoxGridedProps

export const defaultInputProps: InputProps = {
  grid: {
    xs: 12,
    sm: 12,
    md: 6,
    lg: 8,
  },
  variant: 'outlined',
}

export const Input = ({ model, ...rest }: InputPropsExt) => {
  switch (model) {
    case 'select':
      return <Select {...rest} />
    case 'password':
      return <Password {...rest} />
    case 'icon':
      return <Icon {...rest} />
    case 'currency':
      return <Currency {...rest} />
    case 'checkBoxG':
      return <CheckBoxGrided {...rest} />
    default:
      return <Basic {...rest} />
  }
}

Input.defaultProps = defaultInputProps

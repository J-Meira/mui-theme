import { GridProps, TextFieldProps, OutlinedInputProps } from '@mui/material'
import { UFBasic } from './UFBasic'
import { UFCurrency } from './UFCurrency'
import { UFIcon, UFIconProps } from './UFIcon'
import { UFSearch, UFAutoCompleteFieldProps } from './UFSearch'
import { UFPassword } from './UFPassword'
import { UFSelect, UFSelectProps } from './UFSelect'
import { UFCheckBoxGrided, UFCheckBoxGridedProps } from './UFCheckBoxGrided'

export type UFInputProps = TextFieldProps & {
  model?: string
  name: string
  grid: GridProps
}

type UFInputPropsExt = UFInputProps &
  OutlinedInputProps &
  UFAutoCompleteFieldProps &
  UFIconProps &
  UFSelectProps &
  UFCheckBoxGridedProps

export const defaultUFInputProps: UFInputProps = {
  grid: {
    xs: 12,
    sm: 12,
    md: 6,
    lg: 8,
  },
  name: '',
  variant: 'outlined',
}

export const UFInput = ({ model, ...rest }: UFInputPropsExt) => {
  switch (model) {
    case 'select':
      return <UFSelect {...rest} />
    case 'password':
      return <UFPassword {...rest} />
    case 'icon':
      return <UFIcon {...rest} />
    case 'currency':
      return <UFCurrency {...rest} />
    case 'search':
      return <UFSearch {...rest} />
    case 'checkBoxG':
      return <UFCheckBoxGrided {...rest} />
    default:
      return <UFBasic {...rest} />
  }
}

UFInput.defaultProps = defaultUFInputProps

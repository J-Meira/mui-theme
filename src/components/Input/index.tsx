
import { GridProps } from '@mui/material/Grid';
import { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import Basic from './Basic';
import Currency from './Currency';
import Icon, { IconProps } from './Icon';
import Search, { AutoCompleteFieldProps } from './Search';
import Password from './Password';
import Select, { SelectProps } from './Select';

export const defaultInputProps: GridProps & TextFieldProps = {
  xs: 12,
  sm: 12,
  md: 6,
  lg: 8,
  variant: 'outlined',
}

interface InputProps {
  model?: string
}

type InputPropsExt<T> =
  InputProps &
  OutlinedInputProps &
  GridProps &
  TextFieldProps &
  AutoCompleteFieldProps<T> &
  IconProps &
  SelectProps;

const Input = <T extends {}>({ model, ...params }: InputPropsExt<T>) => {
  switch (model) {
    case 'select':
      return (
        <Select {...params} />
      );
    case 'password':
      return (
        <Password {...params} />
      );
    case 'icon':
      return (
        <Icon {...params} />
      );
    case 'currency':
      return (
        <Currency {...params} />
      );
    // case 'dateTime':
    //   return (
    //     <DateTime {...params} />
    //   );
    case 'search':
      return (
        <Search {...params} />
      );
    default:
      return (
        <Basic {...params} />
      );
  }
}

Input.defaultProps = defaultInputProps;

export default Input;

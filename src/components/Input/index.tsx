
import { GridProps } from '@mui/material/Grid';
import { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import Basic from './Basic';
import Currency from './Currency';

export const defaultInputProps: GridProps = {
  xs: 12,
  sm: 12,
  md: 6,
  lg: 8,
}

interface InputProps{
  model?: string
}

type InputPropsExt = InputProps & OutlinedInputProps & GridProps & TextFieldProps;

const Input = ({ model, ...params}: InputPropsExt) => {
  switch (model) {
    // case 'select':
    //   return (
    //     <Select {...params} />
    //   );
    // case 'password':
    //   return (
    //     <Password {...params} />
    //   );
    // case 'icon':
    //   return (
    //     <Icon {...params} />
    //   );
    case 'currency':
      return (
        <Currency {...params} />
      );
    // case 'dateTime':
    //   return (
    //     <DateTime {...params} />
    //   );
    // case 'search':
    //   return (
    //     <Search {...params} />
    //   );
    default:
      return (
        <Basic {...params} />
      );
  }
}

Input.defaultProps = defaultInputProps;

export default Input;

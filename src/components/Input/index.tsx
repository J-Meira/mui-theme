
import {
  GridProps,
  TextFieldProps,
  OutlinedInputProps,
} from '@mui/material';
import { Basic } from './Basic';
import { Currency } from './Currency';
import { Icon, IconProps } from './Icon';
import { Search, AutoCompleteFieldProps } from './Search';
import { Password } from './Password';
import { Select, SelectProps } from './Select';
import { CheckBoxGrided, CheckBoxGridedProps } from './CheckBoxGrided';

export const defaultInputProps: GridProps & TextFieldProps = {
  xs: 12,
  sm: 12,
  md: 6,
  lg: 8,
  variant: 'outlined',
}

export interface InputProps {
  model?: string,
  name: string,
}

type InputPropsExt<T> =
  InputProps &
  OutlinedInputProps &
  GridProps &
  TextFieldProps &
  AutoCompleteFieldProps<T> &
  IconProps &
  SelectProps &
  CheckBoxGridedProps;

export const Input = <T extends {}>({
  model,
  ...params
}: InputPropsExt<T>) => {
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
    case 'search':
      return (
        <Search {...params} />
      );
    case 'checkBoxG':
      return (
        <CheckBoxGrided {...params} />
      );
    default:
      return (
        <Basic {...params} />
      );
  }
}

Input.defaultProps = defaultInputProps;

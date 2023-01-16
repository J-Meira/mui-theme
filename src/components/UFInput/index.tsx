
import {
  GridProps,
  TextFieldProps,
  OutlinedInputProps,
} from '@mui/material';
import { UFBasic } from './UFBasic';
import { UFCurrency } from './UFCurrency';
import { UFIcon, UFIconProps } from './UFIcon';
import { UFSearch, UFAutoCompleteFieldProps } from './UFSearch';
import { UFPassword } from './UFPassword';
import { UFSelect, UFSelectProps } from './UFSelect';
import { UFCheckBoxGrided, UFCheckBoxGridedProps } from './UFCheckBoxGrided';

export type UFInputProps = TextFieldProps & {
  model?: string,
  name: string,
  grid: GridProps,
}

type UFInputPropsExt =
  UFInputProps &
  OutlinedInputProps &
  UFAutoCompleteFieldProps &
  UFIconProps &
  UFSelectProps &
  UFCheckBoxGridedProps;

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

export const UFInput = ({
  model,
  ...params
}: UFInputPropsExt) => {
  switch (model) {
    case 'select':
      return (
        <UFSelect {...params} />
      );
    case 'password':
      return (
        <UFPassword {...params} />
      );
    case 'icon':
      return (
        <UFIcon {...params} />
      );
    case 'currency':
      return (
        <UFCurrency {...params} />
      );
    case 'search':
      return (
        <UFSearch {...params} />
      );
    case 'checkBoxG':
      return (
        <UFCheckBoxGrided {...params} />
      );
    default:
      return (
        <UFBasic {...params} />
      );
  }
}

UFInput.defaultProps = defaultUFInputProps;

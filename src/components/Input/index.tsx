import {
  Grid,
  GridProps,
  OutlinedInputProps,
  TextFieldProps,
} from '@mui/material';

import { Basic } from './Basic';
import { CheckBox, CheckBoxProps } from './CheckBox';
import { Currency, CurrencyProps } from './Currency';
import { Icon, IconProps } from './Icon';
import { Mask, MaskProps } from './Mask';
import { Number } from './Number';
import { Password, PasswordProps } from './Password';
import { Search, SearchProps } from './Search';
import { SearchRequest, SearchRequestProps } from './SearchRequest';
import { Select, SelectOptionsProps, SelectProps } from './Select';
import { RadioGroup, RadioGroupProps } from './RadioGroup';

export type InputProps = TextFieldProps & {
  className?: string;
  grid: GridProps;
  isNoFormik: boolean;
  name: string;
  noGrid?: boolean;
  model?:
    | 'checkBox'
    | 'currency'
    | 'icon'
    | 'mask'
    | 'number'
    | 'password'
    | 'radioGroup'
    | 'search'
    | 'searchRequest'
    | 'select';
  options?: SelectOptionsProps[];
  readOnly?: boolean;
};

type InputPropsExt = InputProps &
  CheckBoxProps &
  CurrencyProps &
  IconProps &
  MaskProps &
  PasswordProps &
  OutlinedInputProps &
  RadioGroupProps &
  SearchProps &
  SearchRequestProps &
  SelectProps;

export const defaultInputProps: InputProps = {
  grid: {
    xs: 12,
    sm: 12,
    md: 6,
    lg: 8,
  },
  isNoFormik: false,
  name: '',
  variant: 'outlined',
};

export const Input = ({
  action,
  actionTitle,
  start,
  custom,
  maskModel,
  icon,
  className,
  grid,
  hidePrefix,
  model,
  noGrid,
  showTitle,
  hideTitle,
  rowDirection,
  options,
  creatable,
  creatableLabel,
  searchChange,
  defaultOption,
  ...rest
}: InputPropsExt) => {
  const getGrid = (g: GridProps) => {
    return {
      ...defaultInputProps.grid,
      ...g,
    };
  };

  const render = (() => {
    switch (model) {
      case 'checkBox':
        return <CheckBox {...rest} />;
      case 'currency':
        return <Currency hidePrefix={hidePrefix} {...rest} />;
      case 'icon':
        return (
          <Icon
            action={action}
            actionTitle={actionTitle}
            icon={icon}
            start={start}
            {...rest}
          />
        );
      case 'mask':
        return <Mask custom={custom} maskModel={maskModel} {...rest} />;
      case 'number':
        return <Number {...rest} />;
      case 'password':
        return (
          <Password hideTitle={hideTitle} showTitle={showTitle} {...rest} />
        );
      case 'radioGroup':
        return (
          <RadioGroup rowDirection={rowDirection} options={options} {...rest} />
        );
      case 'search':
        return (
          <Search
            creatable={creatable}
            creatableLabel={creatableLabel}
            searchChange={searchChange}
            options={options}
            {...rest}
          />
        );
      case 'searchRequest':
        return (
          <SearchRequest
            creatable={creatable}
            creatableLabel={creatableLabel}
            searchChange={searchChange}
            icon={icon}
            {...rest}
          />
        );
      case 'select':
        return (
          <Select defaultOption={defaultOption} options={options} {...rest} />
        );
      default:
        return <Basic {...rest} />;
    }
  })();

  return noGrid ? (
    render
  ) : (
    <Grid item className={className} {...getGrid(grid)}>
      {render}
    </Grid>
  );
};

Input.defaultProps = defaultInputProps;

export * from './CheckBox';
export * from './DarkSwitch';
export * from './DatePicker';
export * from './FileUpload';
export * from './Icon';
export * from './Mask';
export * from './RadioGroup';
export * from './Search';
export * from './SearchRequest';
export * from './Select';

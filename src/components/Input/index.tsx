import {
  CheckboxProps,
  Grid,
  GridProps,
  OutlinedInputProps,
  TextFieldProps,
} from '@mui/material';

import { Basic } from './Basic';
import { CheckBox } from './CheckBox';
import { Currency } from './Currency';
import { Icon } from './Icon';
import { Mask } from './Mask';
import { Number } from './Number';
import { Password } from './Password';
import { Search } from './Search';
import { SearchRequest } from './SearchRequest';
import { Select } from './Select';
import { RadioGroup } from './RadioGroup';

export interface SelectOptionsProps {
  label: string;
  obj?: any;
  value: number;
}

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

export interface CheckBoxProps extends CheckboxProps {
  label?: string;
  helperText?: string;
}

export interface CurrencyProps {
  hidePrefix?: boolean;
}

export interface IconProps {
  action?: (params?: any) => void;
  actionTitle?: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  start?: boolean;
}

export interface MaskProps {
  custom?: (value: string) => string;
  maskModel?:
    | 'cpf'
    | 'cnpj'
    | 'document'
    | 'number'
    | 'phone'
    | 'plate'
    | 'postalCode';
}

export interface NumberProps {
  decimal?: boolean;
}

export interface PasswordProps {
  showTitle?: string;
  hideTitle?: string;
}

export interface RadioGroupInputProps {
  rowDirection?: boolean;
  label?: string;
}

export interface SearchProps {
  creatable?: boolean;
  creatableLabel?: string;
  readOnly?: boolean;
  searchChange?: (newValue: number) => void;
}

export interface SearchRequestProps {
  creatable?: boolean;
  creatableLabel?: string;
  icon?: React.ReactNode;
  iconAction?: (params?: any) => void;
  iconActionTitle?: string;
  initialSelected?: number;
  getList?: (param?: string, id?: number) => Promise<SelectOptionsProps[]>;
  readOnly?: boolean;
  searchChange?: (newValue: number) => void;
  setCreatableValue?: (value: string) => void;
}
export interface SelectProps {
  defaultOption?: string;
  NoNativeOptions?: boolean;
}

type InputPropsExt = InputProps &
  CheckBoxProps &
  CurrencyProps &
  IconProps &
  MaskProps &
  NumberProps &
  PasswordProps &
  OutlinedInputProps &
  RadioGroupInputProps &
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
  className,
  creatable,
  creatableLabel,
  custom,
  decimal,
  defaultOption,
  icon,
  grid,
  hidePrefix,
  hideTitle,
  maskModel,
  model,
  NoNativeOptions,
  noGrid,
  options,
  rowDirection,
  showTitle,
  searchChange,
  start,
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
        return <Number decimal={decimal} {...rest} />;
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
          <Select
            defaultOption={defaultOption}
            NoNativeOptions={NoNativeOptions}
            options={options}
            {...rest}
          />
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

export * from './DarkSwitch';
export * from './DatePicker';
export * from './FileUpload';
export * from './InputAd';
export * from './Mask';

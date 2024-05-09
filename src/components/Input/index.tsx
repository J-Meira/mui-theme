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
import { ReactNode } from 'react';
import { defaultGrid } from './defaultGrid';

export interface SelectOptionsProps {
  label: string;
  obj?: any;
  value: number;
}

export type InputProps = TextFieldProps & {
  className?: string;
  grid: GridProps;
  localControl: boolean;
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
  label?: ReactNode;
  helperText?: string;
}

export interface CurrencyProps {
  hideSymbol?: boolean;
  symbol?: string;
}

export interface IconProps {
  action?: (params?: any) => void;
  actionTitle?: string;
  icon?: ReactNode;
  label?: ReactNode;
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
  label?: ReactNode;
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
  icon?: ReactNode;
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
  grid = defaultGrid,
  hideSymbol,
  hideTitle,
  name = '',
  localControl = false,
  maskModel,
  model,
  NoNativeOptions,
  noGrid,
  options,
  rowDirection,
  showTitle,
  searchChange,
  start,
  symbol,
  ...rest
}: InputPropsExt) => {
  const getGrid = (g: GridProps) => {
    return {
      ...defaultGrid,
      ...g,
    };
  };

  const render = (() => {
    switch (model) {
      case 'checkBox':
        return <CheckBox name={name} localControl={localControl} {...rest} />;
      case 'currency':
        return (
          <Currency
            name={name}
            localControl={localControl}
            hideSymbol={hideSymbol}
            symbol={symbol}
            {...rest}
          />
        );
      case 'icon':
        return (
          <Icon
            name={name}
            localControl={localControl}
            action={action}
            actionTitle={actionTitle}
            icon={icon}
            start={start}
            {...rest}
          />
        );
      case 'mask':
        return (
          <Mask
            name={name}
            localControl={localControl}
            custom={custom}
            maskModel={maskModel}
            {...rest}
          />
        );
      case 'number':
        return (
          <Number
            name={name}
            localControl={localControl}
            decimal={decimal}
            {...rest}
          />
        );
      case 'password':
        return (
          <Password
            name={name}
            localControl={localControl}
            hideTitle={hideTitle}
            showTitle={showTitle}
            {...rest}
          />
        );
      case 'radioGroup':
        return (
          <RadioGroup
            name={name}
            localControl={localControl}
            rowDirection={rowDirection}
            options={options}
            {...rest}
          />
        );
      case 'search':
        return (
          <Search
            name={name}
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
            name={name}
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
            name={name}
            localControl={localControl}
            defaultOption={defaultOption}
            NoNativeOptions={NoNativeOptions}
            options={options}
            {...rest}
          />
        );
      default:
        return <Basic name={name} localControl={localControl} {...rest} />;
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

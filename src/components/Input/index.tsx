import { ReactNode } from 'react';
import {
  CheckboxProps,
  Grid2,
  OutlinedInputProps,
  TextFieldProps,
} from '@mui/material';

import { defaultGrid, GridSizeProps } from './defaultGrid';

import { Basic } from './Basic';
import { CheckBox } from './CheckBox';
import { Currency } from './Currency';
import { Icon } from './Icon';
import { Mask } from './Mask';
import { Number } from './Number';
import { Password } from './Password';
import { RadioGroup } from './RadioGroup';
import { Search } from './Search';
import { SearchRequest } from './SearchRequest';
import { Select } from './Select';

export interface SelectOptionsProps {
  label: string;
  obj?: any;
  value: number;
}

export type InputProps = TextFieldProps & {
  className?: string;
  grid?: GridSizeProps;
  localControl?: boolean;
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
    | 'upper'
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
  const render = (() => {
    switch (model) {
      case 'checkBox':
        return <CheckBox localControl={localControl} {...rest} />;
      case 'currency':
        return (
          <Currency
            localControl={localControl}
            hideSymbol={hideSymbol}
            symbol={symbol}
            {...rest}
          />
        );
      case 'icon':
        return (
          <Icon
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
            localControl={localControl}
            custom={custom}
            maskModel={maskModel}
            {...rest}
          />
        );
      case 'number':
        return (
          <Number localControl={localControl} decimal={decimal} {...rest} />
        );
      case 'password':
        return (
          <Password
            localControl={localControl}
            hideTitle={hideTitle}
            showTitle={showTitle}
            {...rest}
          />
        );
      case 'radioGroup':
        return (
          <RadioGroup
            localControl={localControl}
            rowDirection={rowDirection}
            options={options}
            {...rest}
          />
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
            localControl={localControl}
            defaultOption={defaultOption}
            NoNativeOptions={NoNativeOptions}
            options={options}
            {...rest}
          />
        );
      default:
        return <Basic localControl={localControl} {...rest} />;
    }
  })();

  return noGrid ? (
    render
  ) : (
    <Grid2
      className={className}
      size={{ ...(defaultGrid as object), ...(grid as object) }}
    >
      {render}
    </Grid2>
  );
};

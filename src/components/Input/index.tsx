import { ReactNode, memo, useMemo } from 'react';
import {
  CheckboxProps,
  Grid,
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
  noNativeOptions?: boolean;
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

const INPUT_COMPONENTS = {
  checkBox: CheckBox,
  currency: Currency,
  icon: Icon,
  mask: Mask,
  number: Number,
  password: Password,
  radioGroup: RadioGroup,
  search: Search,
  searchRequest: SearchRequest,
  select: Select,
} as const;

const InputComponent = ({
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
  noNativeOptions,
  noGrid,
  options,
  rowDirection,
  showTitle,
  searchChange,
  start,
  symbol,
  ...rest
}: InputPropsExt) => {
  const gridSize = useMemo(
    () => ({
      ...defaultGrid,
      ...grid,
    }),
    [grid],
  );

  const renderInput = useMemo(() => {
    if (!model) {
      return <Basic localControl={localControl} {...rest} />;
    }

    const Component = INPUT_COMPONENTS[model];
    if (!Component) {
      return <Basic localControl={localControl} {...rest} />;
    }

    const componentProps = {
      localControl,
      ...rest,
      ...(model === 'checkBox' && {}),
      ...(model === 'currency' && { hideSymbol, symbol }),
      ...(model === 'icon' && { action, actionTitle, icon, start }),
      ...(model === 'mask' && { custom, maskModel }),
      ...(model === 'number' && { decimal }),
      ...(model === 'password' && { hideTitle, showTitle }),
      ...(model === 'radioGroup' && { rowDirection, options }),
      ...(model === 'search' && {
        creatable,
        creatableLabel,
        searchChange,
        options,
      }),
      ...(model === 'searchRequest' && {
        creatable,
        creatableLabel,
        searchChange,
        icon,
      }),
      ...(model === 'select' && { defaultOption, noNativeOptions, options }),
    };

    return <Component {...componentProps} />;
  }, [
    model,
    localControl,
    rest,
    hideSymbol,
    symbol,
    action,
    actionTitle,
    icon,
    start,
    custom,
    maskModel,
    decimal,
    hideTitle,
    showTitle,
    rowDirection,
    options,
    creatable,
    creatableLabel,
    searchChange,
    defaultOption,
    noNativeOptions,
  ]);

  if (noGrid) {
    return renderInput;
  }

  return (
    <Grid className={className} {...gridSize}>
      {renderInput}
    </Grid>
  );
};

export const Input = memo(InputComponent);

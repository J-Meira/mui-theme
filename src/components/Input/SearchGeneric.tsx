import {
  ReactNode,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useField } from 'formik';
import { AutocompleteInputChangeReason, TextFieldProps } from '@mui/material';
import { GridSizeProps } from './defaultGrid';
import { InputGrid } from './InputGrid';
import { SearchAutocomplete } from './SearchAutocomplete';
import { useDebounce } from '../../hooks/useDebounce';

export interface SearchGenericProps<T extends object, K extends keyof T> {
  icon?: ReactNode;
  iconAction?: () => void;
  iconActionTitle?: string;
  getList: (param?: string, id?: T[K]) => Promise<T[]>;
  readOnly?: boolean;
  onSelected?: (newValue: T | null) => void;
  setCreatableValue?: (value: T | null) => void;
  creatable?: boolean;
  initialCreatable?: (value: string) => T;
  defaultSelected: T[K];
  initialSelected?: T[K];
  idKey: K;
  searchKey: keyof T;
  name: string;
  autoFocus?: TextFieldProps['autoFocus'];
  disabled?: TextFieldProps['disabled'];
  label?: TextFieldProps['label'];
  required?: TextFieldProps['required'];
  variant?: TextFieldProps['variant'];
  grid?: GridSizeProps;
  className?: string;
  noGrid?: boolean;
}

export const SearchGeneric = <T extends object, K extends keyof T>({
  autoFocus,
  creatable = false,
  initialCreatable,
  disabled,
  getList,
  icon,
  idKey,
  searchKey,
  iconAction,
  iconActionTitle,
  defaultSelected,
  initialSelected,
  label,
  name,
  readOnly,
  required,
  onSelected,
  setCreatableValue,
  variant = 'outlined',
  grid,
  className,
  noGrid,
}: SearchGenericProps<T, K>) => {
  const [field, meta, helper] = useField<T[K]>(name);
  const { touched, error } = meta;
  const { debounce } = useDebounce(300, false);
  const [loading, startTransition] = useTransition();

  const [options, setOptions] = useState<T[]>([]);
  const [createdOption, setCreatedOption] = useState<T | null>(null);

  const selectedItem =
    options.find((op) => op[idKey] === field.value) ??
    (createdOption && createdOption[idKey] === field.value
      ? createdOption
      : null);

  const notifiedRef = useRef<{ value: T[K]; found: boolean } | null>(null);

  useEffect(() => {
    const found = selectedItem !== null;
    const previous = notifiedRef.current;
    if (previous && previous.value === field.value && previous.found === found)
      return;
    notifiedRef.current = { value: field.value, found };
    onSelected?.(selectedItem);
  }, [field.value, selectedItem, onSelected]);

  const runRequest = (
    request: () => Promise<T[]>,
    onLoaded?: (result: T[]) => void,
  ) => {
    startTransition(async () => {
      await request().then((result) => {
        startTransition(() => setOptions(result));
        onLoaded?.(result);
      });
    });
  };

  const searchIfNeeded = (typed: string) => {
    const untouched =
      typed === '' &&
      options.length === 0 &&
      (!initialSelected || initialSelected === defaultSelected);
    const searching =
      typed !== '' &&
      (selectedItem === null || typed !== selectedItem[searchKey]);
    if (untouched || searching) runRequest(() => getList(typed));
  };

  const handleInputChange = (
    typed: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    if (reason !== 'input' && reason !== 'clear') return;
    debounce(() => searchIfNeeded(typed));
  };

  const loadOnMount = useEffectEvent(() => {
    debounce(() => searchIfNeeded(''));
  });

  useEffect(() => {
    loadOnMount();
  }, []);

  const loadInitial = useEffectEvent((id: T[K]) => {
    runRequest(
      () => getList(undefined, id),
      (result) => {
        if (result.some((op) => op[idKey] === id)) helper.setValue(id);
      },
    );
  });

  const resetCreatable = useEffectEvent(() => {
    setCreatableValue?.(null);
  });

  useEffect(() => {
    if (initialSelected && initialSelected !== defaultSelected) {
      loadInitial(initialSelected);
      return;
    }
    resetCreatable();
  }, [initialSelected, defaultSelected]);

  const handleChange = (newValue: T | null) => {
    setCreatedOption(newValue);
    const value = newValue ? newValue[idKey] : defaultSelected;
    if (newValue && value === 0 && creatable && initialCreatable) {
      setCreatableValue?.(newValue);
    }
    if (!newValue || value !== 0) setCreatableValue?.(null);
    helper.setValue(value);
  };

  const optionLabel = (option: T) => {
    const text = option[searchKey];
    return typeof text === 'string' ? text : '';
  };

  return (
    <InputGrid className={className} grid={grid} noGrid={noGrid}>
      <SearchAutocomplete<T>
        autoFocus={autoFocus}
        clearOnBlur
        creatable={creatable}
        createOption={initialCreatable}
        disabled={disabled}
        error={touched && !!error}
        helperText={touched && error}
        icon={icon}
        iconAction={iconAction}
        iconActionTitle={iconActionTitle}
        label={label}
        loading={loading}
        name={name}
        onBlur={() => helper.setTouched(true)}
        onChange={handleChange}
        onInputChange={handleInputChange}
        optionLabel={optionLabel}
        options={options}
        readOnly={readOnly}
        required={required}
        selectOnFocus
        selectedItem={selectedItem}
        variant={variant}
      />
    </InputGrid>
  );
};

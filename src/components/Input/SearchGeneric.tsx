import { ReactNode, useEffect, useState, useCallback } from 'react';
import { useField, useFormikContext } from 'formik';
import {
  Autocomplete,
  CircularProgress,
  IconButton,
  TextField,
  createFilterOptions,
  TextFieldProps,
  Grid,
} from '@mui/material';
import { defaultGrid, GridSizeProps, useDebounce } from '../..';

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
  grid = defaultGrid,
  className,
  noGrid,
}: SearchGenericProps<T, K>) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta, helper] = useField(name);
  const { touched, error } = meta;
  const { debounce } = useDebounce(300, false);

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<T[]>([]);
  const [selected, setSelected] = useState<T[K]>(defaultSelected);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const filter = createFilterOptions<T>();

  const isString = (item: any): item is string => {
    return typeof item === 'string';
  };

  const handle = (e: any, newValue: T, reason: string) => {
    e.target.name = name;
    const value = newValue ? newValue[idKey] : defaultSelected;

    if (newValue) {
      setSelected(value);
      onSelected?.(newValue);
      setSelectedItem(newValue);
      if (value === 0 && setCreatableValue && creatable && initialCreatable) {
        setCreatableValue(newValue);
      }
      if (value !== 0 && setCreatableValue) {
        setCreatableValue(null);
      }
    }

    if (!newValue || reason === 'clear') {
      setSelected(defaultSelected);
      onSelected?.(null);
      setSelectedItem(null);
      setCreatableValue?.(null);
      helper.setTouched(true);
    }

    setFieldValue(name, value, true);
  };

  const initialGetList = useCallback(
    (id: T[K]) => {
      setLoading(true);
      getList(undefined, id).then((result) => {
        setLoading(false);
        setOptions(result);
        const selectedOption = result?.find(
          (op) => op[idKey] === initialSelected,
        );
        if (selectedOption) {
          field.onChange({ target: { name, value: initialSelected } });
          setSelected(defaultSelected);
          onSelected?.(selectedOption);
          setSelectedItem(selectedOption);
        }
      });
    },
    [getList, idKey, initialSelected, field, name, defaultSelected, onSelected],
  );

  useEffect(() => {
    debounce(() => {
      if (
        (inputValue === '' &&
          options.length === 0 &&
          (!initialSelected || initialSelected === defaultSelected)) ||
        (inputValue !== '' && selectedItem === null) ||
        (inputValue !== '' &&
          selectedItem &&
          inputValue !== selectedItem[searchKey])
      ) {
        setLoading(true);
        getList(inputValue).then((result) => {
          setLoading(false);
          setOptions(result);
        });
      }
    });

    // eslint-disable-next-line
  }, [inputValue]);

  useEffect(() => {
    if (initialSelected && initialSelected !== defaultSelected) {
      initialGetList(initialSelected);
      return;
    }

    setSelected(defaultSelected);
    onSelected?.(null);
    setSelectedItem(null);
    setCreatableValue?.(null);

    // eslint-disable-next-line
  }, [initialSelected, initialGetList]);

  useEffect(() => {
    const fV = field.value;
    if (fV !== selected) {
      const selectedOption = options?.find((op) => op[idKey] === fV);

      if (selectedOption) {
        setSelected(fV);
        onSelected?.(selectedOption);
        setSelectedItem(selectedOption);
        return;
      }

      setSelected(defaultSelected);
      onSelected?.(null);
      setSelectedItem(null);
    }

    // eslint-disable-next-line
  }, [field.value]);

  const render = (() => (
    <Autocomplete
      id={name}
      autoHighlight
      blurOnSelect
      clearOnBlur
      disabled={disabled}
      disablePortal
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        const isExisting = options.some(
          (option) => inputValue === option[searchKey],
        );
        if (inputValue !== '' && !isExisting && creatable && initialCreatable) {
          filtered.push(initialCreatable(inputValue));
        }

        return filtered;
      }}
      freeSolo={creatable}
      fullWidth
      getOptionLabel={(option: any) =>
        isString(option[searchKey]) ? option[searchKey] : ''
      }
      handleHomeEndKeys={creatable}
      loading={loading}
      onChange={(e, newValue, r) => handle(e, newValue as T, r)}
      onInputChange={(_, newInputValue) => {
        setInputValue?.(newInputValue);
      }}
      options={options}
      popupIcon={loading ? <CircularProgress size={28} /> : undefined}
      readOnly={readOnly}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          autoFocus={autoFocus}
          error={touched && !!error}
          helperText={touched && error}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: iconAction ? (
                <>
                  <div
                    className={`search-input-endAdornment${
                      selectedItem ? '' : ' unSelect'
                    }`}
                  >
                    <IconButton
                      aria-label={`input action ${iconActionTitle || ''}`}
                      onClick={iconAction}
                      edge={false}
                      tabIndex={-1}
                      title={iconActionTitle}
                    >
                      {icon}
                    </IconButton>
                  </div>
                  {params.InputProps.endAdornment}
                </>
              ) : (
                params.InputProps.endAdornment
              ),
            },
          }}
          label={label}
          margin='normal'
          required={required}
          variant={variant}
        />
      )}
      selectOnFocus
      size='small'
      value={selectedItem}
    />
  ))();

  return noGrid ? (
    render
  ) : (
    <Grid
      className={className}
      size={{ ...(defaultGrid as object), ...(grid as object) }}
    >
      {render}
    </Grid>
  );
};

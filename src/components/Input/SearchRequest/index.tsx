import { useEffect, useState } from 'react';
import { useField } from 'formik';
import {
  Autocomplete,
  CircularProgress,
  IconButton,
  TextField,
  createFilterOptions,
} from '@mui/material';
import { InputProps, SearchRequestProps, SelectOptionsProps } from '..';
import { useDebounce } from '../../../hooks';

const filter = createFilterOptions<SelectOptionsProps>();

const isString = (item: any): item is string => {
  return typeof item === 'string';
};

export type SearchRequestExProps = Omit<
  InputProps,
  'className' | 'localControl' | 'noGrid' | 'model' | 'rowDirection'
> &
  SearchRequestProps;

export const SearchRequest = ({
  autoFocus,
  creatable,
  creatableLabel,
  disabled,
  getList,
  icon,
  iconAction,
  iconActionTitle,
  initialSelected,
  label,
  name,
  readOnly,
  required,
  searchChange,
  setCreatableValue,
  variant = 'outlined',
}: Omit<SearchRequestExProps, 'grid'>): React.ReactElement => {
  const [field, meta, helper] = useField(name);
  const { touched, error } = meta;
  const { debounce } = useDebounce();

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number>(-1);
  const [options, setOptions] = useState<SelectOptionsProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<SelectOptionsProps | null>(
    null,
  );

  const handle = (e: any, newValue: any, reason: string) => {
    e.target.name = name;
    e.target.value = -1;
    if (newValue) {
      const { value } = newValue;
      e.target.value = value;
      setSelected(value);
      searchChange?.(value);
      setSelectedItem(newValue);
      if (value === 0 && setCreatableValue && creatable) {
        setCreatableValue(inputValue);
      } else if (setCreatableValue) {
        setCreatableValue('');
      }
    } else if (!newValue || reason === 'clear') {
      setSelected(-1);
      searchChange?.(-1);
      setSelectedItem(null);
      setCreatableValue?.('');
    }
    field.onChange(e);
  };

  useEffect(() => {
    debounce(() => {
      if (
        (inputValue === '' && options.length === 0) ||
        (inputValue !== '' && selectedItem === null) ||
        (inputValue !== '' && selectedItem && inputValue !== selectedItem.label)
      ) {
        if (getList) {
          setLoading(true);
          getList(inputValue).then((result) => {
            setLoading(false);
            setOptions(result);
          });
        }
      }
    });

    // eslint-disable-next-line
  }, [inputValue]);

  useEffect(() => {
    if (initialSelected && initialSelected > 0 && getList) {
      setLoading(true);
      getList(undefined, initialSelected).then((result) => {
        setLoading(false);
        setOptions(result);
        const selectedOption = result?.find(
          (op) => op.value === initialSelected,
        );
        if (selectedOption) {
          field.onChange({ target: { name, value: initialSelected } });
          setSelected(initialSelected);
          searchChange?.(initialSelected);
          setSelectedItem(selectedOption);
        }
      });
    }
    // eslint-disable-next-line
  }, [initialSelected]);

  useEffect(() => {
    if (field.value !== selected) {
      const fV = field.value;
      const selectedOption: SelectOptionsProps | undefined = options?.find(
        (op) => op.value === fV,
      );
      if (selectedOption) {
        setSelected(fV);
        searchChange?.(fV);
        setSelectedItem(selectedOption);
      } else {
        setSelected(-1);
        searchChange?.(-1);
        setSelectedItem(null);
      }
    }

    // eslint-disable-next-line
  }, [field.value]);

  return (
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
          (option) => inputValue === option.label,
        );
        if (inputValue !== '' && !isExisting && creatable) {
          filtered.push({
            value: 0,
            label: `${creatableLabel || 'New'}: ${inputValue}`,
          });
        }

        return filtered;
      }}
      freeSolo={creatable}
      fullWidth
      getOptionLabel={(option: any) =>
        isString(option.label) ? option.label : ''
      }
      handleHomeEndKeys={creatable}
      loading={loading}
      onChange={(e, newValue, r) => handle(e, newValue, r)}
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
          InputProps={{
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
          }}
          label={label}
          margin='normal'
          onBlur={(e) => {
            e.target.name = name;
            field.onBlur(e);
            helper.setTouched(true);
          }}
          required={required}
          variant={variant}
        />
      )}
      selectOnFocus
      size='small'
      value={selectedItem}
    />
  );
};

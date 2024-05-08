import { useEffect, useState } from 'react';
import { useField } from 'formik';
import { Autocomplete, TextField, createFilterOptions } from '@mui/material';
import { InputProps, SearchProps, SelectOptionsProps } from '.';

const filter = createFilterOptions<SelectOptionsProps>();

const isString = (item: any): item is string => {
  return typeof item === 'string';
};

type SearchExProps = Omit<
  InputProps,
  'className' | 'grid' | 'localControl' | 'noGrid' | 'model'
> &
  SearchProps;

export const Search = ({
  autoFocus,
  creatable,
  creatableLabel,
  disabled,
  label,
  name,
  options,
  readOnly,
  required,
  searchChange,
  variant,
}: SearchExProps): React.ReactElement => {
  const [field, meta, helper] = useField(name);
  const { touched, error } = meta;

  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState<number>(-1);
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
      searchChange?.(Number(value));
      setSelectedItem(newValue);
    } else if (!newValue || reason === 'clear') {
      setSelected(-1);
      searchChange?.(-1);
      setSelectedItem(null);
    }
    field.onChange(e);
  };

  useEffect(() => {
    if (field.value !== selected) {
      const fV = field.value;
      const selectedOption = options?.find((op) => op.value === fV);
      if (selectedOption) {
        setSelected(fV);
        searchChange?.(fV);
        setSelectedItem(selectedOption);
      }
    }

    // eslint-disable-next-line
  }, [field.value]);

  return (
    <Autocomplete
      id={name}
      autoHighlight
      blurOnSelect
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
      inputValue={inputValue}
      options={options || []}
      onChange={(e, newValue, r) => handle(e, newValue, r)}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      readOnly={readOnly}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          autoFocus={autoFocus}
          error={touched && !!error}
          helperText={touched && error}
          required={required}
          label={label}
          margin='normal'
          onBlur={(e) => {
            e.target.name = name;
            field.onBlur(e);
            helper.setTouched(true);
          }}
          variant={variant}
        />
      )}
      size='small'
      value={selectedItem}
    />
  );
};

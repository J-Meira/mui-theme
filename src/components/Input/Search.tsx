import { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { InputProps, SearchProps, SelectOptionsProps } from '.';
import { SearchAutocomplete } from './SearchAutocomplete';

const NO_SELECTION = -1;

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
  variant = 'outlined',
}: SearchExProps): React.ReactElement => {
  const [field, meta, helper] = useField<number>(name);
  const { touched, error } = meta;

  const [inputValue, setInputValue] = useState('');
  const [createdOption, setCreatedOption] = useState<SelectOptionsProps | null>(
    null,
  );

  const list = options ?? [];
  const selectedItem =
    list.find((op) => op.value === field.value) ??
    (createdOption?.value === field.value ? createdOption : null);

  const notifiedRef = useRef<{ value: number; found: boolean }>({
    value: NO_SELECTION,
    found: false,
  });

  useEffect(() => {
    const found = selectedItem !== null;
    const previous = notifiedRef.current;
    if (previous.value === field.value && previous.found === found) return;
    if (!found && !previous.found) return;
    notifiedRef.current = { value: field.value, found };
    searchChange?.(found ? Number(field.value) : NO_SELECTION);
  }, [field.value, selectedItem, searchChange]);

  const handleChange = (newValue: SelectOptionsProps | null) => {
    setCreatedOption(newValue);
    helper.setValue(newValue ? newValue.value : NO_SELECTION);
  };

  return (
    <SearchAutocomplete<SelectOptionsProps>
      autoFocus={autoFocus}
      creatable={creatable}
      createOption={(typed) => ({
        value: 0,
        label: `${creatableLabel || 'New'}: ${typed}`,
      })}
      disabled={disabled}
      error={touched && !!error}
      helperText={touched && error}
      inputValue={inputValue}
      label={label}
      name={name}
      onBlur={() => helper.setTouched(true)}
      onChange={handleChange}
      onInputChange={(typed) => setInputValue(typed)}
      optionLabel={(option) => option.label}
      options={list}
      readOnly={readOnly}
      required={required}
      selectedItem={selectedItem}
      variant={variant}
    />
  );
};

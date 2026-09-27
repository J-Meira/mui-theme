import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useField } from 'formik';
import { AutocompleteInputChangeReason } from '@mui/material';
import { InputProps, SearchRequestProps, SelectOptionsProps } from '.';
import { SearchAutocomplete } from './SearchAutocomplete';
import { useDebounce } from '../../hooks/useDebounce';

const NO_SELECTION = -1;

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
  const [field, meta, helper] = useField<number>(name);
  const { touched, error } = meta;
  const { debounce } = useDebounce();
  const [loading, startTransition] = useTransition();

  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<SelectOptionsProps[]>([]);
  const [createdOption, setCreatedOption] = useState<SelectOptionsProps | null>(
    null,
  );

  const selectedItem =
    options.find((op) => op.value === field.value) ??
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
    searchChange?.(found ? field.value : NO_SELECTION);
  }, [field.value, selectedItem, searchChange]);

  const runRequest = (
    request: () => Promise<SelectOptionsProps[]>,
    onLoaded?: (result: SelectOptionsProps[]) => void,
  ) => {
    startTransition(async () => {
      await request().then((result) => {
        startTransition(() => setOptions(result));
        onLoaded?.(result);
      });
    });
  };

  const searchIfNeeded = (typed: string) => {
    if (!getList) return;
    const untouched = typed === '' && options.length === 0;
    const searching =
      typed !== '' && (selectedItem === null || typed !== selectedItem.label);
    if (untouched || searching) runRequest(() => getList(typed));
  };

  const handleInputChange = (
    typed: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    setInputValue(typed);
    if (reason !== 'input' && reason !== 'clear') return;
    debounce(() => searchIfNeeded(typed));
  };

  const loadOnMount = useEffectEvent(() => {
    debounce(() => searchIfNeeded(''));
  });

  useEffect(() => {
    loadOnMount();
  }, []);

  const loadInitial = useEffectEvent((id: number) => {
    if (!getList) return;
    runRequest(
      () => getList(undefined, id),
      (result) => {
        if (result.some((op) => op.value === id)) helper.setValue(id);
      },
    );
  });

  useEffect(() => {
    if (initialSelected && initialSelected > 0) loadInitial(initialSelected);
  }, [initialSelected]);

  const handleChange = (newValue: SelectOptionsProps | null) => {
    setCreatedOption(newValue);
    const value = newValue ? newValue.value : NO_SELECTION;
    if (newValue && value === 0 && creatable) setCreatableValue?.(inputValue);
    if (!newValue || value !== 0) setCreatableValue?.('');
    helper.setValue(value);
  };

  return (
    <SearchAutocomplete<SelectOptionsProps>
      autoFocus={autoFocus}
      clearOnBlur
      creatable={creatable}
      createOption={(typed) => ({
        value: 0,
        label: `${creatableLabel || 'New'}: ${typed}`,
      })}
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
      optionLabel={(option) => option.label}
      options={options}
      readOnly={readOnly}
      required={required}
      selectOnFocus
      selectedItem={selectedItem}
      variant={variant}
    />
  );
};

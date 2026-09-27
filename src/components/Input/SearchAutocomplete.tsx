import { ReactNode } from 'react';
import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  CircularProgress,
  IconButton,
  TextField,
  TextFieldProps,
  createFilterOptions,
} from '@mui/material';

const filter = createFilterOptions<any>();

export interface SearchAutocompleteProps<T> {
  autoFocus?: boolean;
  clearOnBlur?: boolean;
  creatable?: boolean;
  createOption?: (inputValue: string) => T;
  disabled?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  icon?: ReactNode;
  iconAction?: () => void;
  iconActionTitle?: string;
  inputValue?: string;
  label?: ReactNode;
  loading?: boolean;
  name: string;
  onBlur: () => void;
  onChange: (newValue: T | null, reason: AutocompleteChangeReason) => void;
  onInputChange: (value: string, reason: AutocompleteInputChangeReason) => void;
  optionLabel: (option: T) => string;
  options: T[];
  readOnly?: boolean;
  required?: boolean;
  selectOnFocus?: boolean;
  selectedItem: T | null;
  variant?: TextFieldProps['variant'];
}

export const SearchAutocomplete = <T,>({
  autoFocus,
  clearOnBlur,
  creatable,
  createOption,
  disabled,
  error,
  helperText,
  icon,
  iconAction,
  iconActionTitle,
  inputValue,
  label,
  loading,
  name,
  onBlur,
  onChange,
  onInputChange,
  optionLabel,
  options,
  readOnly,
  required,
  selectOnFocus,
  selectedItem,
  variant = 'outlined',
}: SearchAutocompleteProps<T>) => {
  const labelOf = (option: T | string) =>
    typeof option === 'string' ? option : optionLabel(option);

  const toOption = (value: T | string | null): T | null => {
    if (value === null) return null;
    if (typeof value !== 'string') return value;
    return createOption ? createOption(value) : null;
  };

  return (
    <Autocomplete<T, false, false, boolean>
      id={name}
      autoHighlight
      blurOnSelect
      clearOnBlur={clearOnBlur}
      disabled={disabled}
      disablePortal
      filterOptions={(candidates, params) => {
        const filtered = filter(candidates, params) as T[];
        const typed = params.inputValue;
        const exists = candidates.some(
          (candidate) => typed === optionLabel(candidate),
        );
        if (typed !== '' && !exists && creatable && createOption) {
          filtered.push(createOption(typed));
        }
        return filtered;
      }}
      freeSolo={creatable}
      fullWidth
      getOptionLabel={labelOf}
      handleHomeEndKeys={creatable}
      inputValue={inputValue}
      loading={loading}
      onChange={(_, newValue, reason) => onChange(toOption(newValue), reason)}
      onInputChange={(_, newInputValue, reason) =>
        onInputChange(newInputValue, reason)
      }
      options={options}
      popupIcon={loading ? <CircularProgress size={28} /> : undefined}
      readOnly={readOnly}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          autoFocus={autoFocus}
          error={error}
          helperText={helperText}
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps.input,
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
                  {params.slotProps.input.endAdornment}
                </>
              ) : (
                params.slotProps.input.endAdornment
              ),
            },
          }}
          label={label}
          margin='normal'
          onBlur={onBlur}
          required={required}
          variant={variant}
        />
      )}
      selectOnFocus={selectOnFocus}
      size='small'
      value={selectedItem}
    />
  );
};

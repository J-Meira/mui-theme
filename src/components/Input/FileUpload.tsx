import { Fragment, useRef, useState } from 'react';

import {
  MdFileUpload as FileUploadIcon,
  MdClear as ClearIcon,
} from 'react-icons/md';
import { TextField } from '@mui/material';
import { InputProps } from '.';
import { InputAd } from './InputAd';
import { InputGrid } from './InputGrid';
import { getFileSize } from './getFileSize';

export interface FileUploadProps extends Omit<
  InputProps,
  | 'value'
  | 'onChange'
  | 'select'
  | 'type'
  | 'multiline'
  | 'defaultValue'
  | 'localControl'
  | 'model'
> {
  value?: File | null;
  hideSizeText?: boolean;
  onChange?: (value: File | null) => void;
  accept?: HTMLInputElement['accept'];
  deleteLabel?: string;
}

export const FileUpload = ({
  accept,
  className,
  grid,
  noGrid,
  hideSizeText,
  helperText,
  name = '',
  readOnly,
  variant = 'outlined',
  onChange,
  value,
  label,
  placeholder,
  deleteLabel = 'Delete file',
}: FileUploadProps) => {
  const [inputKey, setInputKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [innerValue, setInnerValue] = useState<File | null>(value ?? null);
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    if (value) setInnerValue(value);
  }

  const fileName = innerValue?.name ?? '';
  const fileSize = innerValue ? getFileSize(innerValue.size) : '';

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((event.target as Element).id === name) inputRef.current?.click();
  };

  const handleDelete = () => {
    setInputKey((prevKey) => prevKey + 1);
    onChange?.(null);
    setInnerValue(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file === null) return handleDelete();

    setInnerValue(file);
    onChange?.(file);
  };

  return (
    <InputGrid className={className} grid={grid} noGrid={noGrid}>
      <Fragment>
        <TextField
          error={!!helperText}
          helperText={helperText}
          id={name}
          label={label}
          placeholder={placeholder}
          name={name}
          fullWidth
          slotProps={{
            input: {
              readOnly: true,
              endAdornment: innerValue && (
                <InputAd
                  label={!hideSizeText && fileSize}
                  icon={<ClearIcon />}
                  action={!readOnly ? handleDelete : undefined}
                  actionTitle={deleteLabel}
                  start={false}
                />
              ),
              startAdornment: (
                <InputAd icon={<FileUploadIcon />} start={true} />
              ),
            },
          }}
          margin='normal'
          onChange={undefined}
          size='small'
          value={fileName}
          variant={variant}
          onClick={!readOnly ? handleClick : undefined}
        />
        <input
          key={inputKey}
          type='file'
          ref={inputRef}
          onChange={handleChange}
          style={{ display: 'none' }}
          accept={accept}
        />
      </Fragment>
    </InputGrid>
  );
};

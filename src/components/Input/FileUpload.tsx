import { Fragment, useEffect, useRef, useState } from 'react';

import {
  FileUpload as FileUploadIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { Grid, GridProps, TextField } from '@mui/material';
import { InputAd, InputProps } from '.';

export interface FileUploadProps
  extends Omit<
    InputProps,
    | 'value'
    | 'onChange'
    | 'select'
    | 'type'
    | 'multiline'
    | 'defaultValue'
    | 'isNoFormik'
    | 'model'
  > {
  value?: File | null;
  hideSizeText?: boolean;
  onChange?: (value: File | null) => void;
  accept?: HTMLInputElement['accept'];
  deleteLabel?: string;
}

const defaultProps: FileUploadProps = {
  grid: {
    xs: 12,
    sm: 12,
    md: 6,
    lg: 8,
  },
  name: '',
  variant: 'outlined',
  deleteLabel: 'Delete file',
};

export const getFileSize = (size: number): string => {
  if (size < 1024) return `${size} B`;
  size = size / 1024;
  if (size < 1024) return `${Math.ceil(size)} KB`;
  size = size / 1024;
  if (size < 1024) return `${size.toFixed(2)} MB`;
  size = size / 1024;
  return `${size.toFixed(2)} GB`;
};

export const FileUpload = ({
  accept,
  className,
  grid,
  noGrid,
  hideSizeText,
  helperText,
  name,
  readOnly,
  variant,
  onChange,
  value,
  label,
  placeholder,
  deleteLabel,
}: FileUploadProps) => {
  const [inputKey, setInputKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [innerValue, setInnerValue] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');

  const getGrid = (g: GridProps) => {
    return {
      ...defaultProps.grid,
      ...g,
    };
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((event.target as Element).id == name) inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file === null) {
      handleDelete();
    } else {
      setInnerValue(file);
      onChange?.(file);
      setFileName(file.name);
      setFileSize(getFileSize(file.size));
    }
  };

  const handleDelete = () => {
    setInputKey((prevKey) => prevKey + 1);
    onChange?.(null);
    setInnerValue(null);
    setFileName('');
    setFileSize('');
  };

  const render = (() => (
    <Fragment>
      <TextField
        error={!!helperText}
        helperText={helperText}
        id={name}
        label={label}
        placeholder={placeholder}
        name={name}
        fullWidth
        InputProps={{
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
          startAdornment: <InputAd icon={<FileUploadIcon />} start={true} />,
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
  ))();

  useEffect(() => {
    if (value && value !== innerValue) {
      setInnerValue(value);
      setFileName(value.name);
      setFileSize(getFileSize(value.size));
    }

    // eslint-disable-next-line
  }, [value]);

  return noGrid ? (
    render
  ) : (
    <Grid item className={className} {...getGrid(grid)}>
      {render}
    </Grid>
  );
};

import {
  MenuItem,
  Grid,
  TextField,
} from '@mui/material';
import { InputProps } from '.';

export interface SelectOptionsProps {
  value: number,
  label: string
}

export interface SelectProps {
  list?: SelectOptionsProps[],
  defaultOption?: string
}

type SelectPropsExt = SelectProps & InputProps;

export const Select = ({
  list,
  defaultOption,
  helperText,
  grid,
  variant,
  ...params
}: SelectPropsExt) => {

  return (
    <Grid item {...grid}>
      <TextField
        {...params}
        variant={variant}
        margin='normal'
        fullWidth
        size='small'
        error={!!helperText}
        helperText={helperText}
        select
      >
        {defaultOption && (
          <MenuItem value={-1}>{defaultOption}</MenuItem>
        )}
        {list &&
          list.map((op) => (
            <MenuItem
              key={`${op.value}-${op.label}`}
              value={op.value}
            >
              {op.label}
            </MenuItem>
          ))}
      </TextField>
    </Grid>
  );
}

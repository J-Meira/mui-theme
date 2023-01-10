import { MenuItem } from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export interface SelectOptionsProps {
  value: number,
  label: string
}

export interface SelectProps {
  list?: SelectOptionsProps[],
  defaultValue?: string
}

type SelectPropsExt = SelectProps & GridProps & TextFieldProps;

const Select = ({
  list, defaultValue, helperText,
  xs, sm, md, lg, error, variant, ...params
}: SelectPropsExt) => (
  <Grid item xs={xs} sm={sm} md={md} lg={lg}>
    <TextField
      variant={variant}
      margin='normal'
      fullWidth
      size='small'
      error={error}
      helperText={error ? helperText : undefined}
      select
      //SelectProps={{ native: true }}
      {...params}
    >
      {defaultValue && (
        <MenuItem value={-1}>{defaultValue}</MenuItem>
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


export default Select;

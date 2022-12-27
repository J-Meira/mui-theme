import Grid, { GridProps } from '@mui/material/Grid';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export interface SelectOptionsProps {
  value: number,
  label: string
}

export interface SelectProps {
  list?: SelectOptionsProps[],
  defaultValue?: boolean
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
      SelectProps={{ native: true }}
      {...params}
    >
      {defaultValue && (
        <option value={-1} >{defaultValue}</option>
      )}
      {list &&
        list.map((op) => (
          <option key={`${op.value}-${op.label}`} value={op.value}>{op.label}</option>
        ))}
    </TextField>
  </Grid>
);


export default Select;

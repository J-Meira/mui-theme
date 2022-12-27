import Grid, { GridProps } from '@mui/material/Grid';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type BasicProps = GridProps & TextFieldProps;

const Basic = ({ helperText, xs, sm, md, lg, error, variant, ...params }: BasicProps) => (
  <Grid item xs={xs} sm={sm} md={md} lg={lg}>
    <TextField
      variant={variant}
      margin='normal'
      fullWidth
      size='small'
      error={error}
      helperText={error ? helperText : undefined}
      {...params}
    />
  </Grid>
);


export default Basic;

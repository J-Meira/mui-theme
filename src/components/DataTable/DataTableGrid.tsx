import { Grid, GridProps } from '@mui/material';

export const DataTableGrid = ({ children, className }: GridProps) => (
  <Grid container className={`data-table ${className ? className : ''}`}>
    <Grid item md={12}>
      {children}
    </Grid>
  </Grid>
);

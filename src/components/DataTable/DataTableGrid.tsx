import { Grid, GridProps } from '@mui/material';
import * as React from 'react';

export const DataTableGrid = ({ children, className }: GridProps) => (
  <Grid
    container
    className={`data-table ${className ? className : ''}`}
  >
    <Grid item md={12}>
      {children}
    </Grid>
  </Grid>
);

export default DataTableGrid;

import { Grid } from '@mui/material';
import { DataTableGridProps } from '.';

export const DataTableGrid = ({
  children,
  className,
  noChildrenGrid,
}: DataTableGridProps) => (
  <Grid container className={`data-table ${className ? className : ''}`}>
    {noChildrenGrid ? children : <Grid size={{ xs: 12 }}>{children}</Grid>}
  </Grid>
);

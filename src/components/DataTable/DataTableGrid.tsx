import { Grid2 } from '@mui/material';
import { DataTableGridProps } from '.';

export const DataTableGrid = ({
  children,
  className,
  noChildrenGrid,
}: DataTableGridProps) => (
  <Grid2 container className={`data-table ${className ? className : ''}`}>
    {noChildrenGrid ? children : <Grid2 size={12}>{children}</Grid2>}
  </Grid2>
);

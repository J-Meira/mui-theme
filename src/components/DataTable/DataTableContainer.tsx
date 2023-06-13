import { Table, TableContainer } from '@mui/material';
import { DataTableContainerProps } from '.';

export const DataTableContainer = ({
  children,
  tabHeight,
  title,
}: DataTableContainerProps) => (
  <TableContainer
    sx={tabHeight ? { maxHeight: tabHeight, minHeight: tabHeight } : undefined}
  >
    <Table
      stickyHeader={tabHeight ? true : false}
      aria-labelledby={`table-${title}`}
      size='small'
      aria-label={`table-${title}`}
    >
      {children}
    </Table>
  </TableContainer>
);

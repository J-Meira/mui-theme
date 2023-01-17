import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';

import { DataTableHeaderProps } from '.';

export const DataTableHeader = ({
  columns,
  isSelectable,
  numSelected,
  rowCount,
  onRequestSort,
  onSelectAllClick,
  order,
  orderBy,
}: DataTableHeaderProps) => (
  <TableHead>
    <TableRow>
      {isSelectable && (
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all rows' }}
          />
        </TableCell>
      )}
      {columns.map((col) => (
        <TableCell
          key={col.key}
          align={col.align}
          padding={col.disablePadding ? 'none' : 'normal'}
          sortDirection={orderBy === col.key ? order : false}
        >
          {col.isSortable ? (
            <TableSortLabel
              active={orderBy === col.key}
              direction={orderBy === col.key ? order : 'asc'}
              onClick={() => onRequestSort(col.key)}
            >
              {col.label}
            </TableSortLabel>
          ) : (
            col.label
          )}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

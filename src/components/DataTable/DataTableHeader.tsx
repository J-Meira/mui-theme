import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';

import { DataTableHeaderProps } from '.';

export const DataTableHeader = <T extends object>({
  columns,
  isSelectable,
  numSelected,
  rowCount,
  onRequestSort,
  onSelectAllClick,
  order,
  orderBy,
}: DataTableHeaderProps<T>) => (
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
      {columns.map((col, index) =>
        col.key === 'actions' && !col.render ? null : (
          <TableCell
            key={`t-header-${col.key.toString()}${index}`}
            align={col.align}
            padding={col.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === col.key ? order : false}
            style={
              col.minWidth || col.maxWidth || col.width
                ? {
                    maxWidth: col.maxWidth,
                    minWidth: col.minWidth,
                    width: col.width,
                  }
                : undefined
            }
          >
            {col.isSortable && col.key !== 'actions' ? (
              <TableSortLabel
                active={orderBy === col.key}
                direction={orderBy === col.key ? order : 'asc'}
                onClick={() => onRequestSort(col.key as keyof T)}
              >
                {col.label}
              </TableSortLabel>
            ) : (
              col.label
            )}
          </TableCell>
        ),
      )}
    </TableRow>
  </TableHead>
);

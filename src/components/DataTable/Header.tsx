import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import * as React from 'react';

export interface DataTableColumnsProps {
  key: string,
  isNumeric?: boolean,
  isBoolean?: boolean,
  isCoin?: boolean,
  disablePadding?: boolean,
  label?: string,
  limit?: number,
  isSortable?: boolean,
}

type Order = 'asc' | 'desc';

export interface DataTableHeaderProps {
  columns: DataTableColumnsProps[],
  actions?: boolean,
  isSelectable?: boolean,
  numSelected: number;
  onRequestSort: (key: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  actionsLabel: string
}

const Header = ({
  columns,
  actions,
  isSelectable,
  numSelected,
  rowCount,
  onRequestSort,
  onSelectAllClick,
  order,
  orderBy,
  actionsLabel,

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
          align={col.isBoolean ? 'center' : col.isNumeric ? 'right' : 'left'}
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
          ) :
            (
              col.label
            )}
        </TableCell>
      ))}
      {actions && (
        <TableCell align='center' padding='none'>
          {actionsLabel}
        </TableCell>
      )}
    </TableRow>
  </TableHead>
);

export default Header;

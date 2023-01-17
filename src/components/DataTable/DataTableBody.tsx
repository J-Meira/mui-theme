import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';

import { DataTableBodyProps, DataTableColumnsProps } from '.';

export const DataTableBody = ({
  title,
  columns,
  rows,
  onSelectRow,
  isSelected,
  isSelectable,
  isSelectableAnywhere,
}: DataTableBodyProps) => (
  <TableBody>
    {rows &&
      rows.map((row, index) => {
        const isItemSelected = isSelected(row);
        const labelId = `data-table-${title}-row-${index}`;
        return (
          <TableRow
            hover
            onClick={isSelectableAnywhere ? () => onSelectRow(row) : undefined}
            role='checkbox'
            className='selectable-row'
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={labelId}
            selected={isItemSelected}
          >
            {isSelectable && (
              <TableCell padding='checkbox'>
                <Checkbox
                  checked={isItemSelected}
                  onChange={() => onSelectRow(row)}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </TableCell>
            )}
            {columns &&
              columns.map((col: DataTableColumnsProps) => {
                const key = col.key;
                if (col.limit) {
                  return (
                    <TableCell
                      key={index + key}
                      align={col.align}
                      padding={col.disablePadding ? 'none' : 'normal'}
                    >
                      {row[key].length > col.limit
                        ? row[key].slice(0, col.limit) + '...'
                        : row[key]}
                    </TableCell>
                  );
                } else if (col.render) {
                  return (
                    <TableCell
                      key={index + key}
                      align={col.align}
                      padding={col.disablePadding ? 'none' : 'normal'}
                    >
                      {col.render(row)}
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell
                      key={index + key}
                      align={col.align}
                      padding={col.disablePadding ? 'none' : 'normal'}
                    >
                      {row[key]}
                    </TableCell>
                  );
                }
              })}
          </TableRow>
        );
      })}
  </TableBody>
);

import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';

import { DataTableBodyProps, DataTableColumnsProps } from '.';

export const DataTableBody = ({
  columns,
  isSelectable,
  isSelectableAnywhere,
  isSelectableAnywhereElse,
  isSelected,
  onSelectRow,
  rows,
  title,
  uniqueCol,
}: DataTableBodyProps) => (
  <TableBody>
    {uniqueCol && (
      <TableRow hover tabIndex={-1}>
        <TableCell
          align='center'
          padding='normal'
          colSpan={columns.length + (isSelectable ? 1 : 0)}
        >
          {uniqueCol()}
        </TableCell>
      </TableRow>
    )}
    {rows &&
      rows.map((row, index) => {
        const isItemSelected = isSelected(row);
        const labelId = `data-table-${title}-row-${index}`;
        return (
          <TableRow
            hover
            onClick={
              isSelectable && isSelectableAnywhere
                ? () => onSelectRow(row)
                : undefined
            }
            role={isSelectable && isSelectableAnywhere ? 'checkbox' : undefined}
            className={
              isSelectable && isSelectableAnywhere
                ? 'data-table-selectable'
                : undefined
            }
            aria-checked={
              isSelectable && isSelectableAnywhere ? isItemSelected : undefined
            }
            tabIndex={-1}
            key={labelId}
            selected={
              isSelectable && isSelectableAnywhere ? isItemSelected : undefined
            }
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
                      className={
                        isSelectable && isSelectableAnywhereElse
                          ? 'data-table-selectable'
                          : undefined
                      }
                      onClick={
                        isSelectable && isSelectableAnywhereElse
                          ? () => onSelectRow(row)
                          : undefined
                      }
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
                      className={
                        col.isSelectable &&
                        isSelectable &&
                        isSelectableAnywhereElse
                          ? 'data-table-selectable'
                          : undefined
                      }
                      onClick={
                        col.isSelectable &&
                        isSelectable &&
                        isSelectableAnywhereElse
                          ? () => onSelectRow(row)
                          : undefined
                      }
                    >
                      {col.render(row, index)}
                    </TableCell>
                  );
                } else if (col.objectKey) {
                  return (
                    <TableCell
                      key={index + key}
                      align={col.align}
                      padding={col.disablePadding ? 'none' : 'normal'}
                      className={
                        isSelectable && isSelectableAnywhereElse
                          ? 'data-table-selectable'
                          : undefined
                      }
                      onClick={
                        isSelectable && isSelectableAnywhereElse
                          ? () => onSelectRow(row)
                          : undefined
                      }
                    >
                      {row[key][col.objectKey]}
                    </TableCell>
                  );
                } else if (col.enumObject) {
                  return (
                    <TableCell
                      key={index + key}
                      align={col.align}
                      padding={col.disablePadding ? 'none' : 'normal'}
                      className={
                        isSelectable && isSelectableAnywhereElse
                          ? 'data-table-selectable'
                          : undefined
                      }
                      onClick={
                        isSelectable && isSelectableAnywhereElse
                          ? () => onSelectRow(row)
                          : undefined
                      }
                    >
                      {col.enumObject[row[key]]}
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell
                      key={index + key}
                      align={col.align}
                      padding={col.disablePadding ? 'none' : 'normal'}
                      className={
                        isSelectable && isSelectableAnywhereElse
                          ? 'data-table-selectable'
                          : undefined
                      }
                      onClick={
                        isSelectable && isSelectableAnywhereElse
                          ? () => onSelectRow(row)
                          : undefined
                      }
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

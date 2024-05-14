import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';

import { DataTableBodyProps } from '.';

export const DataTableBody = <T extends object>({
  columns,
  customClickAction,
  isSelectable,
  isSelectableAnywhere,
  isSelectableAnywhereElse,
  isSelected,
  onSelectRow,
  rows,
  title,
  statusProp,
  uniqueCol,
}: DataTableBodyProps<T>) => {
  const getClassName = (className?: string, row?: T): string | undefined => {
    const rowClass =
      row && statusProp && row[statusProp]
        ? 'data-table-row-line-through '
        : '';
    return (
      rowClass +
      (customClickAction || (isSelectable && isSelectableAnywhereElse)
        ? `data-table-selectable${className ? ' ' + className : ''}`
        : className)
    );
  };

  const compressedString = (value: string, limit: number) =>
    value.length > limit ? value.slice(0, limit) + '...' : value;

  return (
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
              role={
                isSelectable && isSelectableAnywhere ? 'checkbox' : undefined
              }
              className={getClassName(undefined, row)}
              aria-checked={
                isSelectable && isSelectableAnywhere
                  ? isItemSelected
                  : undefined
              }
              tabIndex={-1}
              key={labelId}
              selected={
                isSelectable && isSelectableAnywhere
                  ? isItemSelected
                  : undefined
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
                columns.map((col) => {
                  const key = col.key;
                  if (key === 'actions' || col.render) {
                    if (!col.render) return;
                    col.className =
                      key === 'actions' && !col.className
                        ? 'data-table-col-actions'
                        : col.className;
                    return (
                      <TableCell
                        key={index + key.toString()}
                        align={col.align}
                        padding={col.disablePadding ? 'none' : 'normal'}
                        className={
                          col.isSelectable &&
                          isSelectable &&
                          isSelectableAnywhereElse
                            ? `data-table-selectable${
                                col.className ? ' ' + col.className : ''
                              }`
                            : col.className
                        }
                        onClick={
                          col.isSelectable && customClickAction
                            ? () => customClickAction(row)
                            : col.isSelectable &&
                                isSelectable &&
                                isSelectableAnywhereElse
                              ? () => onSelectRow(row)
                              : undefined
                        }
                      >
                        {col.render(row, index)}
                      </TableCell>
                    );
                  } else if (col.limit) {
                    return (
                      <TableCell
                        key={index + key.toString()}
                        align={col.align}
                        padding={col.disablePadding ? 'none' : 'normal'}
                        className={getClassName(col.className)}
                        onClick={
                          customClickAction
                            ? () => customClickAction(row)
                            : isSelectable && isSelectableAnywhereElse
                              ? () => onSelectRow(row)
                              : undefined
                        }
                      >
                        {compressedString(row[key] as string, col.limit)}
                      </TableCell>
                    );
                    //                   } else if (col.objectKey) {
                    // return (
                    //   <TableCell
                    //     key={index + key.toString()}
                    //     align={col.align}
                    //     padding={col.disablePadding ? 'none' : 'normal'}
                    //     className={getClassName(col.className)}
                    //     onClick={
                    //       customClickAction
                    //         ? () => customClickAction(row)
                    //         : isSelectable && isSelectableAnywhereElse
                    //           ? () => onSelectRow(row)
                    //           : undefined
                    //     }
                    //   >
                    //     {row[key][col.objectKey]}
                    //   </TableCell>
                    // );
                  } else if (col.enumObject) {
                    return (
                      <TableCell
                        key={index + key.toString()}
                        align={col.align}
                        padding={col.disablePadding ? 'none' : 'normal'}
                        className={getClassName(col.className)}
                        onClick={
                          customClickAction
                            ? () => customClickAction(row)
                            : isSelectable && isSelectableAnywhereElse
                              ? () => onSelectRow(row)
                              : undefined
                        }
                      >
                        {col.enumObject[row[key] as number]}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        key={index + key.toString()}
                        align={col.align}
                        padding={col.disablePadding ? 'none' : 'normal'}
                        className={getClassName(col.className)}
                        onClick={
                          customClickAction
                            ? () => customClickAction(row)
                            : isSelectable && isSelectableAnywhereElse
                              ? () => onSelectRow(row)
                              : undefined
                        }
                      >
                        {row[key] as string}
                      </TableCell>
                    );
                  }
                })}
            </TableRow>
          );
        })}
    </TableBody>
  );
};

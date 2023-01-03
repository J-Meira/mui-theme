import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { DataTableBodyProps, DataTableColumnsProps } from '.';

const DataTableBody =
  ({
    title,
    columns,
    rows,
    selectRow,
    isSelected,
    isSelectable,
    isSelectableAnywhere,
  }: DataTableBodyProps) => (
    <TableBody>
      {rows && rows.map((row, index) => {
        const isItemSelected = isSelected(row);
        const labelId = `data-table-${title}-row-${index}`;
        return (
          <TableRow
            hover
            onClick={isSelectableAnywhere ? () => selectRow(row) : undefined}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={labelId}
            selected={isItemSelected}
          >
            {isSelectable && (
              <TableCell padding='checkbox'>
                <Checkbox
                  checked={isItemSelected}
                  onChange={() => selectRow(row)}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </TableCell>
            )}
            {columns && columns.map((col: DataTableColumnsProps) => {
              const key = col.key;
              if (col.limit) {
                return (
                  <TableCell
                    key={index + key}
                    align={col.align}
                    padding={col.disablePadding ? 'none' : 'normal'}
                  >
                    {row[key].length > col.limit ?
                      row[key].slice(0, col.limit) + '...' :
                      row[key]
                    }
                  </TableCell>
                )
              }
              else {
                return (
                  <TableCell
                    key={index + key}
                    align={col.align}
                    padding={col.disablePadding ? 'none' : 'normal'}
                  >
                    {row[key]}
                  </TableCell>
                )
              }
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );

export default DataTableBody;

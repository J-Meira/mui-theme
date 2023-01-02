import * as React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  Checkbox,
  IconButton,
  Tooltip
} from '@mui/material';
import { DataTableHeaderProps } from './Header';

type DataTableProps = {
  title: string,
  // rows,
  // editAction,
  // viewAction,
  // deleteAction,
  // deleteSelection,
  // checkAction,
  // selectAction,
  // printAction,
  // noSelect,
  // allRows,
  // defaultOrderBy,
  // editCondition,
  // disabled,
  // initialSelected = []
} & DataTableHeaderProps;

const DataTable = ({
  columns,
  title,
}:DataTableProps) => {
  return (
    <TableContainer>
      <Table
        aria-labelledby={`table-${title}`}
        size='small'
      >

      </Table>
    </TableContainer>
  );
}

export default DataTable;

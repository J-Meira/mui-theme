import { Table, TableContainer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataTableActionsProps, DataTableBodyProps, DataTableColumnsProps, DataTableHeaderProps } from './components/DataTable';
import DataTableHeader from './components/DataTable/DataTableHeader';

interface DataTableProps {
  title: string,
  header?: boolean,
  defaultOrderBy: string,
}

type DataTableExampleProps = DataTableActionsProps & DataTableBodyProps & DataTableHeaderProps & DataTableProps;

const DataTableExample = ({
  title,
  header,
  columns,
  isSelectable,
  defaultOrderBy,
}: DataTableExampleProps) => {

  const [order, setOrder] = useState<string>('asc');
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);
  return (
    <div className='data-table'>
      {header && (
        <DataTableHeader
          columns={columns}
          isSelectable={isSelectable}
          order={order}
          orderBy={orderBy}
        />
      )}
      <TableContainer>
        <Table
          aria-labelledby={`table-${title}`}
          size='small'
          aria-label='enhanced table'
        >

        </Table>
      </TableContainer>
    </div>
  );
}

export default DataTableExample;

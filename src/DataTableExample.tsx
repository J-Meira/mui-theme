import { Grid, Table, TableContainer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  DataTableActionsProps,
  DataTableBodyProps,
  DataTableColumnsProps,
  DataTableHeaderProps,
  Order,
  DataTableActions,
  DataTableGrid,
  DataTableHeader,
  DataTableFiltersProps,
} from './components/DataTable';

interface DataTableProps<FT> {
  title: string,
  actions?: boolean,
  addAction?: DataTableActionsProps<FT>['addAction'],
  filters?: DataTableFiltersProps<FT>['render'],
  initialFilters?: FT,



  defaultOrderBy: string,
}

// type DataTableExampleProps = DataTableActionsProps & DataTableBodyProps & DataTableHeaderProps & DataTableProps;

const DataTableExample = <FT extends {}>({
  title,
  actions,
  addAction,
  filters,
  initialFilters,

  // columns,
  // isSelectable,
  defaultOrderBy,

  // rows,
}: DataTableProps<FT>) => {

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);
  const [search, setSearch] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  const [filtersValues, setFiltersValues] = useState<FT | undefined>(initialFilters);


  const clearFilters = () => {
    setSearch('');
    setActive(true);
    setFiltersValues(initialFilters);
  }

  const applyAction = () => {
    alert('applied');
  }

  const exportAction = () => {
    alert('exported');
  }

  return (
    <DataTableGrid>
      {actions && (
        <DataTableActions
          addAction={addAction}
          addLabel='+ Adicionar'
          search={search}
          setSearch={(e) => setSearch(e.target.value)}
          searchLabel='Pesquisar'
          //filters={filters}
          showActive={true}
          activeValue={active}
          setActiveValue={setActive}
          activeLabel='Listar inativos'
          exportAction={exportAction}
        />
      )}
      <TableContainer>
        <Table
          aria-labelledby={`table-${title}`}
          size='small'
          aria-label='enhanced table'
        >
          {/* <DataTableHeader
            columns={columns}
            isSelectable={isSelectable}
            order={order}
            orderBy={orderBy}
            rowCount={rows.length | 0}
          /> */}
        </Table>
      </TableContainer>
    </DataTableGrid>
  );
}

export default DataTableExample;

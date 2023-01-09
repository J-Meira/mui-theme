import {  Table, TableContainer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  DataTableActionsProps,
  DataTableColumnsProps,
  Order,
  DataTableActions,
  DataTableGrid,
  DataTableHeader,
  DataTableBody,
  DataTablePagination,
  DataTableFooter,
} from './components/DataTable';
import DataTableSelected from './components/DataTable/DataTableSelected';
import { useDebounce } from './hooks';

interface DataTableProps<FT> {
  title: string,
  actions?: boolean,
  isNotPaginable?: boolean,
  onAdd?: DataTableActionsProps<FT>['onAdd'],
  filters?: DataTableActionsProps<FT>['filters'],
  initialFilters?: FT,
  columns: DataTableColumnsProps[],
  isSelectable?: boolean,
  rows: any[],
  rowCont: number,


  defaultOrderBy: string,
}

const DataTableExample = <FT extends {}>({
  title,
  actions,
  isNotPaginable,
  onAdd,
  filters,
  initialFilters,
  columns,
  isSelectable,
  rows,
  defaultOrderBy,
  rowCont,


}: DataTableProps<FT>) => {
  const { debounce } = useDebounce();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);
  const [search, setSearch] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const [filtersValues, setFiltersValues] = useState<FT | undefined>(initialFilters);
  const [selected, setSelected] = useState<any[]>([]);
  const [pages, setPages] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const clearFilters = () => {
    setSearch('');
    setActive(false);
    setFiltersValues(initialFilters);
  }

  const onApplyFilters = () => {
    alert('applied');
  }

  const onExport = () => {
    alert('exported');
  }

  const onRequestSort = (key: string) => {
    const isAsc = orderBy === key && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(key);
  }

  const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newSelecteds: any[];
    if (event.target.checked) {
      newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const onSelectRow = (row: any,) => {
    const selectedIndex = selected.indexOf(row.id);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    console.log(row);
  }

  const isSelected = (row: any) => selected.indexOf(row.id) !== -1;

  const onDelete = () => {
    console.log(selected);
  }

  const arrangePages = () => {
    const totalPages = Math.ceil(rowCont / rowsPerPage);
    let pagesTemp = [];
    for (let i = 0; i < totalPages; i++) {
      pagesTemp.push(i + 1);
    }
    setPages(pagesTemp);
  }

  useEffect(() => {
    arrangePages();

    // eslint-disable-next-line
  }, [rowCont]);

  useEffect(() => {
    debounce(() => {
      console.log(search);
    });

// eslint-disable-next-line
  }, [search]);

  return (
    <DataTableGrid>
      {actions && (
        <DataTableActions
          onAdd={onAdd}
          addLabel='+ Adicionar'
          search={search}
          setSearch={(e) => setSearch(e.target.value)}
          searchLabel='Pesquisar'
          filters={filters}
          filtersValues={filtersValues}
          setFiltersValues={setFiltersValues}
          filtersLabel={'Filtros'}
          onApplyFilters={onApplyFilters}
          applyFiltersLabel={'Filtrar'}
          onClearFilters={clearFilters}
          clearFiltersLabel={'Limpar'}
          showActive={true}
          activeValue={active}
          setActiveValue={setActive}
          activeLabel='Listar inativos'
          onExport={onExport}
        />
      )}
      {(!isNotPaginable && pages.length > 1) && (
        <DataTablePagination
          pages={pages}
          currentPage={currentPage}
          setPage={setCurrentPage}
          lastPage={pages.length}
        />
      )}
      <TableContainer>
        <Table
          aria-labelledby={`table-${title}`}
          size='small'
          aria-label='enhanced table'
        >
          <DataTableHeader
            columns={columns}
            isSelectable={isSelectable}
            order={order}
            orderBy={orderBy}
            rowCount={rows.length}
            numSelected={selected.length}
            onRequestSort={onRequestSort}
            onSelectAllClick={onSelectAllClick}
          />
          <DataTableBody
            title={title}
            rows={rows}
            columns={columns}
            isSelectable={isSelectable}
            onSelectRow={onSelectRow}
            isSelected={isSelected}
            isSelectableAnywhere={true}
          />
        </Table>
      </TableContainer>
      {(isSelectable && selected.length > 0) && (
        <DataTableSelected
          rowCont={selected.length}
          rowContLabel='Registros Selecionados'
          onDelete={onDelete}
          deleteLabel='Excluir'
        />
      )}
      {(!isNotPaginable && pages.length > 1) && (
        <DataTablePagination
          pages={pages}
          currentPage={currentPage}
          setPage={setCurrentPage}
          lastPage={pages.length}
        />
      )}
      {!isNotPaginable&&(
        <DataTableFooter
          currentPage={currentPage}
          currentSize={rows.length}
          lastPage={pages.length}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalOfRows={rowCont}
        />
      )}
    </DataTableGrid>
  );
}

export default DataTableExample;

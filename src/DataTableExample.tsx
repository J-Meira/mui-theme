import { Table, TableContainer } from '@mui/material';
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
  isNotPaginated?: boolean,
  onAdd?: DataTableActionsProps<FT>['onAdd'],
  filters?: DataTableActionsProps<FT>['filters'],
  initialFilters?: FT,
  columns: DataTableColumnsProps[],
  isSelectable?: boolean,
  rows: any[],
  totalOfRows: number,
  defaultOrderBy: string,
  onGetRows: (params: any) => void,
  onDeleteRows?: (params: any) => void,
  onExport?: (params: any) => void,
}

const initialParams = {
  page: 1,
  rowsPerPage: 10,
}

const DataTableExample = <FT extends {}>({
  title,
  actions,
  isNotPaginated,
  onAdd,
  filters,
  initialFilters,
  columns,
  isSelectable,
  rows,
  defaultOrderBy,
  totalOfRows,
  onGetRows,
  onDeleteRows,
  onExport,
}: DataTableProps<FT>) => {
  const { debounce } = useDebounce(500, false);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);
  const [search, setSearch] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const [filtersValues, setFiltersValues] = useState<FT | undefined>(initialFilters);
  const [selected, setSelected] = useState<number[]>([]);
  const [pages, setPages] = useState<number[]>([1]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [params, setParams] = useState<any>({
    ...initialParams,
    orderBy: `${defaultOrderBy} asc`,
  });

  const clearFilters = () => {
    setFiltersValues(initialFilters);
    onGetRows({
      search: search,
      ...params,
      ...initialFilters,
      onlyActives: !active,
    });
  }

  const onApplyFilters = () => {
    onGetRows({
      search: search,
      ...params,
      ...filtersValues,
      onlyActives: !active,
    });
  }

  const onRequestSort = (key: string) => {
    const isAsc = orderBy === key && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(key);
    setParams({
      ...params,
      orderBy: `${key} ${newOrder}`,
    })
  }

  const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newSelected: any[];
    if (event.target.checked) {
      newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
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
  }

  const isSelected = (row: any) => selected.indexOf(row.id) !== -1;

  const onDelete = () => {
    if(selected.length >0 && onDeleteRows){
      onDeleteRows(selected);
    }
  }

  const arrangePages = () => {
    const totalPages = Math.ceil(totalOfRows / rowsPerPage);
    let pagesTemp = [];
    for (let i = 0; i < totalPages; i++) {
      pagesTemp.push(i + 1);
    }
    setPages(pagesTemp);
  }

  const onHandlePage = (page:number) =>{
    setCurrentPage(page);
    setParams({
      ...params,
      page: page
    })
  }

  const onHandleRows = (rows:number) =>{
    setRowsPerPage(rows);
    setParams({
      ...params,
      rowsPerPage: rows
    })
  }

  const onHandleActive = (value:boolean) =>{
    setActive(value);
    onGetRows({
      search: search,
      ...params,
      ...filtersValues,
      onlyActives: !value,
    });
  }

  useEffect(() => {
    arrangePages();

    // eslint-disable-next-line
  }, [totalOfRows, rowsPerPage]);

  useEffect(() => {
    debounce(() => {
      onGetRows({
        search: search,
        ...params,
        ...filtersValues,
        onlyActives: !active,
      });
    });

    // eslint-disable-next-line
  }, [search, params]);

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
          setActiveValue={onHandleActive}
          activeLabel='Listar inativos'
          onExport={onExport ? () => onExport({
            search: search,
            orderBy: `${orderBy} ${order}`,
            ...filtersValues
          }): undefined}
        />
      )}
      {(!isNotPaginated && pages.length > 1) && (
        <DataTablePagination
          pages={pages}
          currentPage={currentPage}
          setPage={onHandlePage}
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
      {(isSelectable && selected.length > 0 && onDelete) && (
        <DataTableSelected
          totalOfRows={selected.length}
          totalOfRowsLabel='Registros Selecionados'
          onDelete={onDelete}
          deleteLabel='Excluir'
        />
      )}
      {(!isNotPaginated && pages.length > 1) && (
        <DataTablePagination
          pages={pages}
          currentPage={currentPage}
          setPage={onHandlePage}
          lastPage={pages.length}
        />
      )}
      {!isNotPaginated && (
        <DataTableFooter
          currentPage={currentPage}
          currentSize={rows.length}
          lastPage={pages.length}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={onHandleRows}
          totalOfRows={totalOfRows}
        />
      )}
    </DataTableGrid>
  );
}

export default DataTableExample;

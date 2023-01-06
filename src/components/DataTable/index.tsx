export type Order = 'asc' | 'desc';

export interface DataTableFiltersProps<FT>{
  render: (
    filtersValues: FT,
    setFilters: (value: any) => void
  ) => React.ReactNode,
  values: FT,
  setValues: (values: FT) => void,
  label: string,
  applyAction: () => void,
  applyLabel: string,
  clearAction: () => void,
  clearLabel: string,
}

export interface DataTableActionsProps<FT> {
  addAction?: (params: any) => void,
  addLabel: string,
  search: string,
  setSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
  searchLabel: string,
  filters?: DataTableFiltersProps<FT>,
  showActive: boolean,
  activeValue: boolean,
  activeLabel: string,
  setActiveValue: (value: boolean) => void,
  exportAction: () => void,
}

export interface DataTableColumnsProps {
  key: string,
  disablePadding?: boolean,
  label?: string,
  limit?: number,
  isSortable?: boolean,
  align?: "center" | "inherit" | "justify" | "left" | "right",
}

export interface DataTableHeaderProps {
  columns: DataTableColumnsProps[],
  isSelectable?: boolean,
  numSelected: number;
  onRequestSort: (key: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface DataTableBodyProps {
  title: string,
  rows: any[],
  columns: DataTableColumnsProps[],
  selectRow: (row: any) => void,
  isSelected: (row: any) => boolean,
  isSelectable?: boolean,
  isSelectableAnywhere?: boolean,
}

export interface PageButtonProps {
  onClick: (page: any) => void,
  children: React.ReactNode,
  active?: boolean,
  disabled?: boolean
}

export interface DataTablePaginationProps {
  pages: number[],
  currentPage: number,
  setPage: (page: number) => void,
  lastPage: number,
}

export interface DataTableFooterProps {
  currentPage: number,
  currentSize: number,
  lastPage: number,
  rowsPerPage: number,
  setRowsPerPage: (value: number) => void,
  totalOfRows: number,
}

export * from './DataTableActions';
export * from './DataTableBody';
export * from './DataTableFooter';
export * from './DataTableGrid';
export * from './DataTableHeader';
export * from './DataTablePagination';

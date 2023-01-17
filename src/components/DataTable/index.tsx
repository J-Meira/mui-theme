export type Order = 'asc' | 'desc';

export interface DataTableActionsProps {
  onAdd?: (params: any) => void;
  addLabel: string;
  search: string;
  setSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchLabel: string;
  filters?: () => React.ReactNode;
  filtersLabel?: string;
  onApplyFilters?: () => void;
  applyFiltersLabel?: string;
  onClearFilters?: () => void;
  clearFiltersLabel?: string;
  showActive: boolean;
  activeValue: boolean;
  activeLabel: string;
  setActiveValue: (value: boolean) => void;
  onExport?: () => void;
}

export interface DataTableColumnsProps {
  key: string;
  disablePadding?: boolean;
  label?: string;
  limit?: number;
  isSortable?: boolean;
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  render?: (row: any) => React.ReactNode;
}

export interface DataTableHeaderProps {
  columns: DataTableColumnsProps[];
  isSelectable?: boolean;
  numSelected: number;
  onRequestSort: (key: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface DataTableBodyProps {
  title: string;
  rows: any[];
  columns: DataTableColumnsProps[];
  onSelectRow: (row: any) => void;
  isSelected: (row: any) => boolean;
  isSelectable?: boolean;
  isSelectableAnywhere?: boolean;
}

export interface DataTableSelectedProps {
  totalOfRows: number;
  totalOfRowsLabel: string;
  onDelete: () => void;
  deleteLabel: string;
}

export interface PageButtonProps {
  onClick: (page: any) => void;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

export interface DataTablePaginationProps {
  pages: number[];
  currentPage: number;
  setPage: (page: number) => void;
  lastPage: number;
}

export interface DataTableRowsPerPageOptionsProps {
  value: number;
  label: string;
}

export interface DataTableFooterProps {
  currentSize: number;
  list?: DataTableRowsPerPageOptionsProps[];
  rowsPerPage: number;
  setRowsPerPage: (value: number) => void;
  rowsPerPageLabel: string;
  rowsPerPageDetails: (rows: number, totalOfRows: number) => string;
  totalOfRows: number;
}

export * from './DataTableActions';
export * from './DataTableBody';
export * from './DataTableFooter';
export * from './DataTableGrid';
export * from './DataTableHeader';
export * from './DataTablePagination';
export * from './DataTableSelected';

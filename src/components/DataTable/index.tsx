import { GridProps } from '@mui/material';
import { ChangeEvent, ReactNode } from 'react';

export type Order = 'asc' | 'desc';

export interface DataTableActionsProps {
  onAdd?: () => void;
  addLabel: string;
  searchValue: string;
  setSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  searchLabel: string;
  filters?: (onApplyFilters?: () => void) => ReactNode;
  filtersLabel?: string;
  filterOpened?: boolean;
  onApplyFilters?: () => void;
  applyFiltersLabel?: string;
  onClearFilters?: () => void;
  clearFiltersLabel?: string;
  showActive?: boolean;
  hideSearch?: boolean;
  activeValue?: boolean;
  activeLabel?: string;
  setActiveValue?: (value: boolean) => void;
  onExport?: () => void;
}

export interface EnumObjectProps {
  [key: number]: string;
}

export interface ObjectEnumProps {
  [key: string]: number;
}

export interface DataTableColumnsProps<T extends object> {
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  className?: string;
  disablePadding?: boolean;
  enumObject?: EnumObjectProps;
  isSelectable?: boolean;
  isSortable?: boolean;
  key: keyof T | 'actions';
  label?: string;
  limit?: number;
  maxWidth?: number;
  minWidth?: number;
  objectKey?: string;
  render?: (row: T, index?: number) => ReactNode;
  width?: number;
}

export interface DataTableGridProps extends GridProps {
  noChildrenGrid?: boolean;
}

export interface DataTableHeaderProps<T extends object> {
  columns: DataTableColumnsProps<T>[];
  isSelectable?: boolean;
  numSelected: number;
  onRequestSort: (key: keyof T) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: keyof T;
  rowCount: number;
}

export interface DataTableContainerProps {
  children: ReactNode;
  maxHeight?: number;
  minHeight?: number;
  tabHeight?: number;
  title: string;
}

export interface DataTableBodyProps<T extends object> {
  columns: DataTableColumnsProps<T>[];
  customClickAction?: (row: T) => void;
  isSelectable?: boolean;
  isSelectableAnywhere?: boolean;
  isSelectableAnywhereElse?: boolean;
  isSelected: (row: T) => boolean;
  onSelectRow: (row: T) => void;
  rows: T[];
  title: string;
  statusProp?: keyof T;
  uniqueCol?: ReactNode;
}

export interface DataTableSelectedProps<T extends object> {
  totalOfRows: number;
  totalOfRowsLabel: string;
  onDelete?: () => void;
  deleteLabel?: string;
  selected: T[keyof T][];
  selectedCustomAction?: (selected: T[keyof T][]) => ReactNode;
}

export interface PageButtonProps {
  onClick: (page: any) => void;
  children: ReactNode;
  className?: string;
  active?: boolean;
  disabled?: boolean;
}

export interface PagesProps {
  pageNumber: number;
}

export interface DataTablePaginationProps {
  title: string;
  pages: PagesProps[];
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

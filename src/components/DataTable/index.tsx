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

export interface DataTableColumnsProps {
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  className?: string;
  disablePadding?: boolean;
  enumObject?: EnumObjectProps;
  isSelectable?: boolean;
  isSortable?: boolean;
  key: string;
  label?: string;
  limit?: number;
  maxWidth?: number;
  minWidth?: number;
  objectKey?: string;
  render?: (row: any, index?: number) => ReactNode;
  width?: number;
}

export interface DataTableGridProps extends GridProps {
  noChildrenGrid?: boolean;
}

export interface DataTableHeaderProps {
  columns: DataTableColumnsProps[];
  isSelectable?: boolean;
  numSelected: number;
  onRequestSort: (key: string) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface DataTableContainerProps {
  children: ReactNode;
  tabHeight?: number;
  title: string;
}

export interface DataTableBodyProps {
  columns: DataTableColumnsProps[];
  customClickAction?: (row: any) => void;
  isSelectable?: boolean;
  isSelectableAnywhere?: boolean;
  isSelectableAnywhereElse?: boolean;
  isSelected: (row: any) => boolean;
  onSelectRow: (row: any) => void;
  rows: any[];
  title: string;
  uniqueCol?: () => ReactNode;
}

export interface DataTableSelectedProps {
  totalOfRows: number;
  totalOfRowsLabel: string;
  onDelete?: () => void;
  deleteLabel?: string;
  selected: number[] | string[];
  selectedCustomAction?: (selected: number[] | string[]) => ReactNode;
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

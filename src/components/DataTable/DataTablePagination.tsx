import * as React from 'react';

import { Button } from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';

import { DataTablePaginationProps, PageButtonProps } from ".";

const PageButton = ({
  onClick,
  children,
  active,
  disabled,
}: PageButtonProps) => {
  return (
    <Button
      variant={active ? undefined : 'outlined'}
      disabled={disabled}
      color='primary'
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

const DataTablePagination = ({
  pages,
  currentPage,
  setPage,
  lastPage,
}: DataTablePaginationProps) => {

  const options = pages.filter(
    (item) => item <= currentPage + 5 && item >= currentPage - 5
  );

  return (
    <div className='pagination-container'>
      <PageButton
        onClick={() => setPage(1)}
        disabled={currentPage === 1}
      >
        <KeyboardDoubleArrowLeft />
      </PageButton>
      <PageButton
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <KeyboardArrowLeft />
      </PageButton>
      <PageButton
        onClick={() => setPage(1)}
        disabled={currentPage === 1}
      >
        <KeyboardArrowRight />
      </PageButton>
      {options && options.map((item) => (
        <PageButton
          key={`page_item_${item}`}
          onClick={() => setPage(item)}
          active={item === currentPage}
        >
          <KeyboardArrowRight />
        </PageButton>
      ))}
      <PageButton
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        <KeyboardDoubleArrowRight />
      </PageButton>
      <PageButton
        onClick={() => setPage(1)}
        disabled={currentPage === lastPage}
      >
        <KeyboardDoubleArrowRight />
      </PageButton>
    </div>
  );
}

export default DataTablePagination;

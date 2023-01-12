import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';

import {
  DataTablePaginationProps,
  PageButtonProps,
} from '.';
import { Button } from '..';

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
      fullWidth={false}
      color='primary'
      onClick={onClick}
      size='small'
    >
      {children}
    </Button>
  );
}

export const DataTablePagination = ({
  pages,
  currentPage,
  setPage,
  lastPage,
}: DataTablePaginationProps) => {

  const options = pages.filter(
    (item) => item <= currentPage + 5 && item >= currentPage - 5
  );

  return (
    <div className='data-table-pagination'>
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
      {options && options.map((item) => (
        <PageButton
          key={`page_item_${item}`}
          onClick={() => setPage(item)}
          active={item === currentPage}
        >
          {item}
        </PageButton>
      ))}
      <PageButton
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        <KeyboardArrowRight />
      </PageButton>
      <PageButton
        onClick={() => setPage(lastPage)}
        disabled={currentPage === lastPage}
      >
        <KeyboardDoubleArrowRight />
      </PageButton>
    </div>
  );
}

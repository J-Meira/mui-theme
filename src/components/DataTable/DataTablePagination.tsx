import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';

import { DataTablePaginationProps, PageButtonProps } from '.';
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
};

export const DataTablePagination = ({
  title,
  pages,
  currentPage,
  setPage,
  lastPage,
}: DataTablePaginationProps) => {
  const options = pages.filter(
    (item) =>
      item.pageNumber <= currentPage + (currentPage === 1 ? 5 : 2) && item.pageNumber >= currentPage - (currentPage === lastPage ? 5 : 2),
  );

  return (
    <div className='data-table-pagination'>
      <PageButton onClick={() => setPage(1)} disabled={currentPage === 1}>
        <KeyboardDoubleArrowLeft />
      </PageButton>
      <PageButton
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <KeyboardArrowLeft />
      </PageButton>
      {options &&
        options.map((item, index) => (
          <PageButton
            key={`${title}_page_item_${index}`}
            onClick={() => setPage(item.pageNumber)}
            active={item.pageNumber === currentPage}
          >
            {item.pageNumber}
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
};

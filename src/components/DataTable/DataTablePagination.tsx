import {
  MdKeyboardArrowLeft as ArrowLeftIcon,
  MdKeyboardArrowRight as ArrowRightIcon,
  MdKeyboardDoubleArrowLeft as DoubleArrowLeftIcon,
  MdKeyboardDoubleArrowRight as DoubleArrowRightIcon,
} from 'react-icons/md';

import { DataTablePaginationProps, PageButtonProps } from '.';
import { Button } from '..';

const PageButton = ({
  active,
  disabled,
  children,
  className,
  onClick,
}: PageButtonProps) => {
  return (
    <Button
      className={className}
      color='primary'
      disabled={disabled}
      contained
      onClick={onClick}
      size='small'
      variant={active ? undefined : 'outlined'}
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
      item.pageNumber <= currentPage + (currentPage === 1 ? 5 : 2) &&
      item.pageNumber >= currentPage - (currentPage === lastPage ? 5 : 2),
  );

  return (
    <div className='data-table-pagination'>
      <PageButton onClick={() => setPage(1)} disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </PageButton>
      <PageButton
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon />
      </PageButton>
      {options &&
        options.map((item, index) => (
          <PageButton
            key={`${title}_page_item_${index}`}
            onClick={() => setPage(item.pageNumber)}
            active={item.pageNumber === currentPage}
            className={item.pageNumber !== currentPage ? 'btn-hide-mobile' : ''}
          >
            {item.pageNumber}
          </PageButton>
        ))}
      <PageButton
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        <ArrowRightIcon />
      </PageButton>
      <PageButton
        onClick={() => setPage(lastPage)}
        disabled={currentPage === lastPage}
      >
        <DoubleArrowRightIcon />
      </PageButton>
    </div>
  );
};

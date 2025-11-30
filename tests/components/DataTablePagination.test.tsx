import { render, screen, fireEvent } from '@testing-library/react';
import { DataTablePagination } from '../../src/components/DataTable/DataTablePagination';
import { PagesProps } from '../../src/components/DataTable';

describe('DataTablePagination', () => {
  const mockSetPage = jest.fn();

  const createPages = (total: number): PagesProps[] => {
    const pages: PagesProps[] = [];
    for (let i = 1; i <= total; i++) {
      pages.push({ pageNumber: i });
    }
    return pages;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render pagination buttons', () => {
    const pages = createPages(10);

    render(
      <DataTablePagination
        title='test-table'
        pages={pages}
        currentPage={1}
        setPage={mockSetPage}
        lastPage={10}
      />,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should disable first and previous buttons on first page', () => {
    const pages = createPages(10);

    render(
      <DataTablePagination
        title='test-table'
        pages={pages}
        currentPage={1}
        setPage={mockSetPage}
        lastPage={10}
      />,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it('should disable last and next buttons on last page', () => {
    const pages = createPages(10);

    render(
      <DataTablePagination
        title='test-table'
        pages={pages}
        currentPage={10}
        setPage={mockSetPage}
        lastPage={10}
      />,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[buttons.length - 1]).toBeDisabled();
    expect(buttons[buttons.length - 2]).toBeDisabled();
  });

  it('should call setPage with 1 when first page button is clicked', () => {
    const pages = createPages(10);

    render(
      <DataTablePagination
        title='test-table'
        pages={pages}
        currentPage={5}
        setPage={mockSetPage}
        lastPage={10}
      />,
    );

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  it('should call setPage with last page when last page button is clicked', () => {
    const pages = createPages(10);

    render(
      <DataTablePagination
        title='test-table'
        pages={pages}
        currentPage={5}
        setPage={mockSetPage}
        lastPage={10}
      />,
    );

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[buttons.length - 1]);

    expect(mockSetPage).toHaveBeenCalledWith(10);
  });

  it('should call setPage with previous page when previous button is clicked', () => {
    const pages = createPages(10);

    render(
      <DataTablePagination
        title='test-table'
        pages={pages}
        currentPage={5}
        setPage={mockSetPage}
        lastPage={10}
      />,
    );

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(mockSetPage).toHaveBeenCalledWith(4);
  });

  it('should call setPage with next page when next button is clicked', () => {
    const pages = createPages(10);

    render(
      <DataTablePagination
        title='test-table'
        pages={pages}
        currentPage={5}
        setPage={mockSetPage}
        lastPage={10}
      />,
    );

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[buttons.length - 2]);

    expect(mockSetPage).toHaveBeenCalledWith(6);
  });

  it('should highlight current page button', () => {
    const pages = createPages(10);

    render(
      <DataTablePagination
        title='test-table'
        pages={pages}
        currentPage={5}
        setPage={mockSetPage}
        lastPage={10}
      />,
    );

    const currentPageButton = screen.getByRole('button', { name: '5' });
    expect(currentPageButton).not.toHaveClass('MuiButton-outlined');
  });

  it('should render limited page numbers around current page', () => {
    const pages = createPages(20);

    render(
      <DataTablePagination
        title='test-table'
        pages={pages}
        currentPage={10}
        setPage={mockSetPage}
        lastPage={20}
      />,
    );

    expect(screen.getByRole('button', { name: '8' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '9' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '11' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '12' })).toBeInTheDocument();
  });

  it('should show more pages when on first page', () => {
    const pages = createPages(20);

    render(
      <DataTablePagination
        title='test-table'
        pages={pages}
        currentPage={1}
        setPage={mockSetPage}
        lastPage={20}
      />,
    );

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument();
  });

  it('should show more pages when on last page', () => {
    const pages = createPages(20);

    render(
      <DataTablePagination
        title='test-table'
        pages={pages}
        currentPage={20}
        setPage={mockSetPage}
        lastPage={20}
      />,
    );

    expect(screen.getByRole('button', { name: '15' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '16' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '17' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '18' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '19' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '20' })).toBeInTheDocument();
  });

  it('should call setPage with correct page number when page button is clicked', () => {
    const pages = createPages(10);

    render(
      <DataTablePagination
        title='test-table'
        pages={pages}
        currentPage={1}
        setPage={mockSetPage}
        lastPage={10}
      />,
    );

    const page3Button = screen.getByRole('button', { name: '3' });
    fireEvent.click(page3Button);

    expect(mockSetPage).toHaveBeenCalledWith(3);
  });
});

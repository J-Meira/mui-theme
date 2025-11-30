import { render, screen, fireEvent } from '@testing-library/react';
import { DataTableFooter } from '../../src/components/DataTable/DataTableFooter';

describe('DataTableFooter', () => {
  const mockSetRowsPerPage = jest.fn();
  const mockRowsPerPageDetails = jest.fn(
    (rows: number, total: number) => `${rows} of ${total}`,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with default props', () => {
    render(
      <DataTableFooter
        currentSize={10}
        rowsPerPage={10}
        setRowsPerPage={mockSetRowsPerPage}
        rowsPerPageLabel='Rows per page:'
        rowsPerPageDetails={mockRowsPerPageDetails}
        totalOfRows={100}
      />,
    );

    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
    expect(screen.getByText('10 of 100')).toBeInTheDocument();
  });

  it('should render select with current rowsPerPage value', () => {
    render(
      <DataTableFooter
        currentSize={15}
        rowsPerPage={15}
        setRowsPerPage={mockSetRowsPerPage}
        rowsPerPageLabel='Rows per page:'
        rowsPerPageDetails={mockRowsPerPageDetails}
        totalOfRows={100}
      />,
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByText('15 of 100')).toBeInTheDocument();
  });

  it('should call setRowsPerPage when selection changes', () => {
    render(
      <DataTableFooter
        currentSize={10}
        rowsPerPage={10}
        setRowsPerPage={mockSetRowsPerPage}
        rowsPerPageLabel='Rows per page:'
        rowsPerPageDetails={mockRowsPerPageDetails}
        totalOfRows={100}
      />,
    );

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const option20 = screen.getByRole('option', { name: '20' });
    fireEvent.click(option20);

    expect(mockSetRowsPerPage).toHaveBeenCalledWith(20);
  });

  it('should render custom list of options when provided', () => {
    const customList = [
      { value: 3, label: '3' },
      { value: 6, label: '6' },
      { value: 9, label: '9' },
    ];

    render(
      <DataTableFooter
        currentSize={3}
        list={customList}
        rowsPerPage={3}
        setRowsPerPage={mockSetRowsPerPage}
        rowsPerPageLabel='Rows per page:'
        rowsPerPageDetails={mockRowsPerPageDetails}
        totalOfRows={50}
      />,
    );

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    expect(screen.getByRole('option', { name: '3' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '6' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '9' })).toBeInTheDocument();
  });

  it('should display correct details using rowsPerPageDetails function', () => {
    const customDetails = jest.fn(
      (rows: number, total: number) =>
        `Showing ${rows} out of ${total} records`,
    );

    render(
      <DataTableFooter
        currentSize={25}
        rowsPerPage={25}
        setRowsPerPage={mockSetRowsPerPage}
        rowsPerPageLabel='Items:'
        rowsPerPageDetails={customDetails}
        totalOfRows={200}
      />,
    );

    expect(
      screen.getByText('Showing 25 out of 200 records'),
    ).toBeInTheDocument();
    expect(customDetails).toHaveBeenCalledWith(25, 200);
  });

  it('should render all default options (5-50)', () => {
    render(
      <DataTableFooter
        currentSize={10}
        rowsPerPage={10}
        setRowsPerPage={mockSetRowsPerPage}
        rowsPerPageLabel='Rows:'
        rowsPerPageDetails={mockRowsPerPageDetails}
        totalOfRows={100}
      />,
    );

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const expectedValues = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
    expectedValues.forEach((value) => {
      expect(
        screen.getByRole('option', { name: String(value) }),
      ).toBeInTheDocument();
    });
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { Table } from '@mui/material';
import { DataTableBody } from '../../src/components/DataTable/DataTableBody';
import { DataTableColumnsProps } from '../../src/components/DataTable';

interface TestRow {
  id: number;
  name: string;
  status: boolean;
  description: string;
}

describe('DataTableBody', () => {
  const mockOnSelectRow = jest.fn();
  const mockCustomClickAction = jest.fn();
  const mockIsSelected = jest.fn((row: TestRow) => row.id === 1);

  const columns: DataTableColumnsProps<TestRow>[] = [
    {
      key: 'id',
      label: 'ID',
      align: 'left',
      isSortable: true,
    },
    {
      key: 'name',
      label: 'Name',
      align: 'left',
      isSortable: true,
    },
    {
      key: 'description',
      label: 'Description',
      align: 'left',
    },
  ];

  const rows: TestRow[] = [
    { id: 1, name: 'Test 1', status: false, description: 'Description 1' },
    { id: 2, name: 'Test 2', status: true, description: 'Description 2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render rows correctly', () => {
    render(
      <Table>
        <DataTableBody
          columns={columns}
          rows={rows}
          isSelected={mockIsSelected}
          onSelectRow={mockOnSelectRow}
          title='test-table'
        />
      </Table>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
  });

  it('should render checkboxes when isSelectable is true', () => {
    render(
      <Table>
        <DataTableBody
          columns={columns}
          rows={rows}
          isSelectable
          isSelected={mockIsSelected}
          onSelectRow={mockOnSelectRow}
          title='test-table'
        />
      </Table>,
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);

    fireEvent.click(checkboxes[0]);
    expect(mockOnSelectRow).toHaveBeenCalledWith(rows[0]);
  });

  it('should apply line-through class when statusProp is true', () => {
    render(
      <Table>
        <DataTableBody
          columns={columns}
          rows={rows}
          isSelected={mockIsSelected}
          onSelectRow={mockOnSelectRow}
          statusProp='status'
          title='test-table'
        />
      </Table>,
    );

    const rowElements = screen.getAllByRole('row');
    expect(rowElements[1]).toHaveClass('data-table-row-line-through');
  });

  it('should render custom column with render function', () => {
    const customColumns: DataTableColumnsProps<TestRow>[] = [
      ...columns,
      {
        key: 'actions',
        label: 'Actions',
        render: (row: TestRow) => <button>Action {row.id}</button>,
      },
    ];

    render(
      <Table>
        <DataTableBody
          columns={customColumns}
          rows={rows}
          isSelected={mockIsSelected}
          onSelectRow={mockOnSelectRow}
          title='test-table'
        />
      </Table>,
    );

    expect(screen.getByText('Action 1')).toBeInTheDocument();
    expect(screen.getByText('Action 2')).toBeInTheDocument();
  });

  it('should compress string when limit is provided', () => {
    const columnsWithLimit: DataTableColumnsProps<TestRow>[] = [
      {
        key: 'description',
        label: 'Description',
        align: 'left',
        limit: 10,
      },
    ];

    const longRows: TestRow[] = [
      {
        id: 1,
        name: 'Test',
        status: false,
        description: 'This is a very long description',
      },
    ];

    render(
      <Table>
        <DataTableBody
          columns={columnsWithLimit}
          rows={longRows}
          isSelected={mockIsSelected}
          onSelectRow={mockOnSelectRow}
          title='test-table'
        />
      </Table>,
    );

    expect(screen.getByText('This is a ...')).toBeInTheDocument();
  });

  it('should render enum value when enumObject is provided', () => {
    const enumColumns: DataTableColumnsProps<TestRow>[] = [
      {
        key: 'id',
        label: 'Status',
        align: 'left',
        enumObject: { 1: 'Active', 2: 'Inactive' },
      },
    ];

    render(
      <Table>
        <DataTableBody
          columns={enumColumns}
          rows={rows}
          isSelected={mockIsSelected}
          onSelectRow={mockOnSelectRow}
          title='test-table'
        />
      </Table>,
    );

    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('should call onSelectRow when row is clicked and isSelectableAnywhere is true', () => {
    render(
      <Table>
        <DataTableBody
          columns={columns}
          rows={rows}
          isSelectable
          isSelectableAnywhere
          isSelected={mockIsSelected}
          onSelectRow={mockOnSelectRow}
          title='test-table'
        />
      </Table>,
    );

    const rowElements = screen.getAllByRole('checkbox', { name: '' });
    fireEvent.click(rowElements[0]);

    expect(mockOnSelectRow).toHaveBeenCalledWith(rows[0]);
  });

  it('should call customClickAction when provided', () => {
    render(
      <Table>
        <DataTableBody
          columns={columns}
          rows={rows}
          customClickAction={mockCustomClickAction}
          isSelected={mockIsSelected}
          onSelectRow={mockOnSelectRow}
          title='test-table'
        />
      </Table>,
    );

    const firstCell = screen.getByText('1');
    fireEvent.click(firstCell);

    expect(mockCustomClickAction).toHaveBeenCalledWith(rows[0]);
  });

  it('should render uniqueCol when provided', () => {
    render(
      <Table>
        <DataTableBody
          columns={columns}
          rows={rows}
          uniqueCol='No data available'
          isSelected={mockIsSelected}
          onSelectRow={mockOnSelectRow}
          title='test-table'
        />
      </Table>,
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should handle column with isSelectable flag', () => {
    const selectableColumns: DataTableColumnsProps<TestRow>[] = [
      {
        key: 'name',
        label: 'Name',
        align: 'left',
        isSelectable: true,
      },
    ];

    render(
      <Table>
        <DataTableBody
          columns={selectableColumns}
          rows={rows}
          isSelectable
          isSelectableAnywhereElse
          isSelected={mockIsSelected}
          onSelectRow={mockOnSelectRow}
          title='test-table'
        />
      </Table>,
    );

    const nameCell = screen.getByText('Test 1');
    fireEvent.click(nameCell);

    expect(mockOnSelectRow).toHaveBeenCalledWith(rows[0]);
  });
});

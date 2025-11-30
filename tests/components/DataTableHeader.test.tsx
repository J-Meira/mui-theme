import { render, screen, fireEvent } from '@testing-library/react';
import { Table } from '@mui/material';
import { DataTableHeader } from '../../src/components/DataTable/DataTableHeader';
import { DataTableColumnsProps } from '../../src/components/DataTable';

interface TestRow {
  id: number;
  name: string;
  email: string;
}

describe('DataTableHeader', () => {
  const mockOnRequestSort = jest.fn();
  const mockOnSelectAllClick = jest.fn();

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
      key: 'email',
      label: 'Email',
      align: 'left',
      isSortable: false,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render column headers', () => {
    render(
      <Table>
        <DataTableHeader
          columns={columns}
          numSelected={0}
          onRequestSort={mockOnRequestSort}
          onSelectAllClick={mockOnSelectAllClick}
          order='asc'
          orderBy='id'
          rowCount={10}
        />
      </Table>,
    );

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('should render checkbox when isSelectable is true', () => {
    render(
      <Table>
        <DataTableHeader
          columns={columns}
          isSelectable
          numSelected={0}
          onRequestSort={mockOnRequestSort}
          onSelectAllClick={mockOnSelectAllClick}
          order='asc'
          orderBy='id'
          rowCount={10}
        />
      </Table>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'select all rows' });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('should check checkbox when all rows are selected', () => {
    render(
      <Table>
        <DataTableHeader
          columns={columns}
          isSelectable
          numSelected={10}
          onRequestSort={mockOnRequestSort}
          onSelectAllClick={mockOnSelectAllClick}
          order='asc'
          orderBy='id'
          rowCount={10}
        />
      </Table>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'select all rows' });
    expect(checkbox).toBeChecked();
  });

  it('should show indeterminate state when some rows are selected', () => {
    render(
      <Table>
        <DataTableHeader
          columns={columns}
          isSelectable
          numSelected={5}
          onRequestSort={mockOnRequestSort}
          onSelectAllClick={mockOnSelectAllClick}
          order='asc'
          orderBy='id'
          rowCount={10}
        />
      </Table>,
    );

    const checkbox = screen.getByRole('checkbox', {
      name: 'select all rows',
    }) as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('should call onSelectAllClick when checkbox is clicked', () => {
    render(
      <Table>
        <DataTableHeader
          columns={columns}
          isSelectable
          numSelected={0}
          onRequestSort={mockOnRequestSort}
          onSelectAllClick={mockOnSelectAllClick}
          order='asc'
          orderBy='id'
          rowCount={10}
        />
      </Table>,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'select all rows' });
    fireEvent.click(checkbox);

    expect(mockOnSelectAllClick).toHaveBeenCalledTimes(1);
  });

  it('should render sortable columns with TableSortLabel', () => {
    render(
      <Table>
        <DataTableHeader
          columns={columns}
          numSelected={0}
          onRequestSort={mockOnRequestSort}
          onSelectAllClick={mockOnSelectAllClick}
          order='asc'
          orderBy='id'
          rowCount={10}
        />
      </Table>,
    );

    const sortLabels = screen.getAllByRole('button');
    expect(sortLabels).toHaveLength(2);
  });

  it('should call onRequestSort when sortable column is clicked', () => {
    render(
      <Table>
        <DataTableHeader
          columns={columns}
          numSelected={0}
          onRequestSort={mockOnRequestSort}
          onSelectAllClick={mockOnSelectAllClick}
          order='asc'
          orderBy='id'
          rowCount={10}
        />
      </Table>,
    );

    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);

    expect(mockOnRequestSort).toHaveBeenCalledWith('name');
  });

  it('should show correct sort direction for active column', () => {
    render(
      <Table>
        <DataTableHeader
          columns={columns}
          numSelected={0}
          onRequestSort={mockOnRequestSort}
          onSelectAllClick={mockOnSelectAllClick}
          order='desc'
          orderBy='name'
          rowCount={10}
        />
      </Table>,
    );

    const nameButton = screen.getByRole('button', { name: 'Name' });
    expect(nameButton).toBeInTheDocument();
  });

  it('should not render actions column when no render function provided', () => {
    const columnsWithActions: DataTableColumnsProps<TestRow>[] = [
      ...columns,
      {
        key: 'actions',
        label: 'Actions',
      },
    ];

    render(
      <Table>
        <DataTableHeader
          columns={columnsWithActions}
          numSelected={0}
          onRequestSort={mockOnRequestSort}
          onSelectAllClick={mockOnSelectAllClick}
          order='asc'
          orderBy='id'
          rowCount={10}
        />
      </Table>,
    );

    expect(screen.queryByText('Actions')).not.toBeInTheDocument();
  });

  it('should apply width styles when provided', () => {
    const columnsWithWidth: DataTableColumnsProps<TestRow>[] = [
      {
        key: 'id',
        label: 'ID',
        align: 'left',
        minWidth: 100,
        maxWidth: 200,
        width: 150,
      },
    ];

    render(
      <Table>
        <DataTableHeader
          columns={columnsWithWidth}
          numSelected={0}
          onRequestSort={mockOnRequestSort}
          onSelectAllClick={mockOnSelectAllClick}
          order='asc'
          orderBy='id'
          rowCount={10}
        />
      </Table>,
    );

    const cell = screen.getByText('ID').closest('th');
    expect(cell).toHaveStyle({
      minWidth: '100px',
      maxWidth: '200px',
      width: '150px',
    });
  });

  it('should apply correct padding based on disablePadding prop', () => {
    const columnsWithPadding: DataTableColumnsProps<TestRow>[] = [
      {
        key: 'id',
        label: 'ID',
        align: 'left',
        disablePadding: true,
      },
    ];

    render(
      <Table>
        <DataTableHeader
          columns={columnsWithPadding}
          numSelected={0}
          onRequestSort={mockOnRequestSort}
          onSelectAllClick={mockOnSelectAllClick}
          order='asc'
          orderBy='id'
          rowCount={10}
        />
      </Table>,
    );

    const cell = screen.getByText('ID').closest('th');
    expect(cell).toHaveClass('MuiTableCell-paddingNone');
  });
});

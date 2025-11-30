import { render, screen, fireEvent } from '@testing-library/react';
import { DataTableSelected } from '../../src/components/DataTable/DataTableSelected';

interface TestRow {
  id: number;
  name: string;
  email: string;
}

describe('DataTableSelected', () => {
  const mockOnDelete = jest.fn();
  const mockSelectedCustomAction = jest.fn(() => (
    <button>Custom Action</button>
  ));

  const selected: TestRow['id'][] = [1, 2, 3];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render total count of rows', () => {
    render(
      <DataTableSelected<TestRow>
        totalOfRows={3}
        totalOfRowsLabel='items selected'
        selected={selected}
      />,
    );

    expect(screen.getByText('3 items selected')).toBeInTheDocument();
  });

  it('should render delete button when onDelete is provided', () => {
    render(
      <DataTableSelected<TestRow>
        totalOfRows={3}
        totalOfRowsLabel='selected'
        deleteLabel='Delete Selected'
        onDelete={mockOnDelete}
        selected={selected}
      />,
    );

    const deleteButton = screen.getByText('Delete Selected');
    expect(deleteButton).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked', () => {
    render(
      <DataTableSelected<TestRow>
        totalOfRows={3}
        totalOfRowsLabel='selected'
        deleteLabel='Delete'
        onDelete={mockOnDelete}
        selected={selected}
      />,
    );

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('should not render delete button when onDelete is not provided', () => {
    render(
      <DataTableSelected<TestRow>
        totalOfRows={3}
        totalOfRowsLabel='selected'
        deleteLabel='Delete'
        selected={selected}
      />,
    );

    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('should not render delete button when deleteLabel is not provided', () => {
    render(
      <DataTableSelected<TestRow>
        totalOfRows={3}
        totalOfRowsLabel='selected'
        onDelete={mockOnDelete}
        selected={selected}
      />,
    );

    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('should render custom action when selectedCustomAction is provided', () => {
    render(
      <DataTableSelected<TestRow>
        totalOfRows={3}
        totalOfRowsLabel='selected'
        selected={selected}
        selectedCustomAction={mockSelectedCustomAction}
      />,
    );

    expect(screen.getByText('Custom Action')).toBeInTheDocument();
    expect(mockSelectedCustomAction).toHaveBeenCalledWith(selected);
  });

  it('should render both delete button and custom action', () => {
    render(
      <DataTableSelected<TestRow>
        totalOfRows={3}
        totalOfRowsLabel='selected'
        deleteLabel='Delete'
        onDelete={mockOnDelete}
        selected={selected}
        selectedCustomAction={mockSelectedCustomAction}
      />,
    );

    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Custom Action')).toBeInTheDocument();
  });

  it('should display correct format for single item', () => {
    render(
      <DataTableSelected<TestRow>
        totalOfRows={1}
        totalOfRowsLabel='item selected'
        selected={[1]}
      />,
    );

    expect(screen.getByText('1 item selected')).toBeInTheDocument();
  });

  it('should display correct format for multiple items', () => {
    render(
      <DataTableSelected<TestRow>
        totalOfRows={10}
        totalOfRowsLabel='items selected'
        selected={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      />,
    );

    expect(screen.getByText('10 items selected')).toBeInTheDocument();
  });

  it('should display zero items correctly', () => {
    render(
      <DataTableSelected<TestRow>
        totalOfRows={0}
        totalOfRowsLabel='items selected'
        selected={[]}
      />,
    );

    expect(screen.getByText('0 items selected')).toBeInTheDocument();
  });
});

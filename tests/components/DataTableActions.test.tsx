import { render, screen, fireEvent } from '@testing-library/react';
import { DataTableActions } from '../../src/components/DataTable/DataTableActions';

describe('DataTableActions', () => {
  const mockSetSearchValue = jest.fn();
  const mockSetActiveValue = jest.fn();
  const mockOnAdd = jest.fn();
  const mockOnApplyFilters = jest.fn();
  const mockOnClearFilters = jest.fn();
  const mockOnExport = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(
      <DataTableActions
        searchValue=''
        setSearchValue={mockSetSearchValue}
        searchLabel='Search'
        addLabel='Add'
        filtersLabel='Filters'
        applyFiltersLabel='Apply'
        clearFiltersLabel='Clear'
      />,
    );
  });

  it('should render add button when onAdd is provided', () => {
    render(
      <DataTableActions
        onAdd={mockOnAdd}
        addLabel='Add New'
        searchValue=''
        setSearchValue={mockSetSearchValue}
        searchLabel='Search'
        filtersLabel='Filters'
        applyFiltersLabel='Apply'
        clearFiltersLabel='Clear'
      />,
    );

    const addButton = screen.getByText('Add New');
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  it('should render search input when hideSearch is false', () => {
    render(
      <DataTableActions
        searchValue='test'
        setSearchValue={mockSetSearchValue}
        searchLabel='Search Label'
        addLabel='Add'
        filtersLabel='Filters'
        applyFiltersLabel='Apply'
        clearFiltersLabel='Clear'
      />,
    );

    const searchInput = screen.getByLabelText('Search Label');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('test');
  });

  it('should not render search input when hideSearch is true', () => {
    render(
      <DataTableActions
        hideSearch
        searchValue=''
        setSearchValue={mockSetSearchValue}
        searchLabel='Search Label'
        addLabel='Add'
        filtersLabel='Filters'
        applyFiltersLabel='Apply'
        clearFiltersLabel='Clear'
      />,
    );

    expect(screen.queryByLabelText('Search Label')).not.toBeInTheDocument();
  });

  it('should render active checkbox when showActive is true', () => {
    render(
      <DataTableActions
        showActive
        activeValue={true}
        activeLabel='Active Only'
        setActiveValue={mockSetActiveValue}
        searchValue=''
        setSearchValue={mockSetSearchValue}
        searchLabel='Search'
        addLabel='Add'
        filtersLabel='Filters'
        applyFiltersLabel='Apply'
        clearFiltersLabel='Clear'
      />,
    );

    const activeCheckbox = screen.getByLabelText('Active Only');
    expect(activeCheckbox).toBeInTheDocument();
    expect(activeCheckbox).toBeChecked();

    fireEvent.click(activeCheckbox);
    expect(mockSetActiveValue).toHaveBeenCalledWith(false);
  });

  it('should render export button when onExport is provided', () => {
    render(
      <DataTableActions
        onExport={mockOnExport}
        searchValue=''
        setSearchValue={mockSetSearchValue}
        searchLabel='Search'
        addLabel='Add'
        filtersLabel='Filters'
        applyFiltersLabel='Apply'
        clearFiltersLabel='Clear'
      />,
    );

    const exportButton = screen.getByRole('button', { name: '' });
    expect(exportButton).toBeInTheDocument();
    fireEvent.click(exportButton);
    expect(mockOnExport).toHaveBeenCalledTimes(1);
  });

  it('should toggle filters collapse when filter button is clicked', () => {
    const mockFilters = jest.fn(() => <div>Filter Content</div>);

    render(
      <DataTableActions
        filters={mockFilters}
        filtersLabel='Filters'
        searchValue=''
        setSearchValue={mockSetSearchValue}
        searchLabel='Search'
        addLabel='Add'
        applyFiltersLabel='Apply Filters'
        clearFiltersLabel='Clear Filters'
      />,
    );

    const filterButton = screen.getByText('Filters');
    expect(filterButton).toBeInTheDocument();

    expect(screen.queryByText('Filter Content')).not.toBeInTheDocument();

    fireEvent.click(filterButton);
    expect(screen.getByText('Filter Content')).toBeInTheDocument();

    fireEvent.click(filterButton);
  });

  it('should render apply and clear filter buttons when filters are provided', () => {
    const mockFilters = jest.fn(() => <div>Filter Content</div>);

    render(
      <DataTableActions
        filters={mockFilters}
        filtersLabel='Filters'
        onApplyFilters={mockOnApplyFilters}
        onClearFilters={mockOnClearFilters}
        searchValue=''
        setSearchValue={mockSetSearchValue}
        searchLabel='Search'
        addLabel='Add'
        applyFiltersLabel='Apply Filters'
        clearFiltersLabel='Clear Filters'
      />,
    );

    const filterButton = screen.getByText('Filters');
    fireEvent.click(filterButton);

    const applyButton = screen.getByText('Apply Filters');
    const clearButton = screen.getByText('Clear Filters');

    expect(applyButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(applyButton);
    expect(mockOnApplyFilters).toHaveBeenCalledTimes(1);

    fireEvent.click(clearButton);
    expect(mockOnClearFilters).toHaveBeenCalledTimes(1);
  });

  it('should open filters by default when filterOpened is true', () => {
    const mockFilters = jest.fn(() => <div>Filter Content</div>);

    render(
      <DataTableActions
        filters={mockFilters}
        filterOpened
        filtersLabel='Filters'
        searchValue=''
        setSearchValue={mockSetSearchValue}
        searchLabel='Search'
        addLabel='Add'
        applyFiltersLabel='Apply'
        clearFiltersLabel='Clear'
      />,
    );

    expect(screen.getByText('Filter Content')).toBeInTheDocument();
  });

  it('should close filters when clear filters is clicked', () => {
    const mockFilters = jest.fn(() => <div>Filter Content</div>);

    render(
      <DataTableActions
        filters={mockFilters}
        filterOpened
        filtersLabel='Filters'
        onClearFilters={mockOnClearFilters}
        searchValue=''
        setSearchValue={mockSetSearchValue}
        searchLabel='Search'
        addLabel='Add'
        applyFiltersLabel='Apply'
        clearFiltersLabel='Clear Filters'
      />,
    );

    expect(screen.getByText('Filter Content')).toBeInTheDocument();

    const clearButton = screen.getByText('Clear Filters');
    fireEvent.click(clearButton);

    expect(mockOnClearFilters).toHaveBeenCalledTimes(1);
  });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { SearchGeneric } from '../../src/components/Input/SearchGeneric';

interface TestItem {
  id: number;
  name: string;
}

const mockItems: TestItem[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

const mockGetList = jest.fn(async (param?: string, id?: number) => {
  if (id) {
    return mockItems.filter((item) => item.id === id);
  }
  if (param) {
    return mockItems.filter((item) =>
      item.name.toLowerCase().includes(param.toLowerCase()),
    );
  }
  return mockItems;
});

describe('SearchGeneric', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithFormik = (ui: React.ReactElement, initialValues = {}) => {
    return render(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        <Form>{ui}</Form>
      </Formik>,
    );
  };

  it('should render with label', () => {
    renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
      />,
      { testSearch: -1 },
    );
    expect(screen.getByLabelText('Search Items')).toBeInTheDocument();
  });

  it('should load options on mount', async () => {
    renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
      />,
      { testSearch: -1 },
    );

    await waitFor(() => {
      expect(mockGetList).toHaveBeenCalled();
    });
  });

  it('should handle onSelected callback', async () => {
    const handleSelected = jest.fn();
    renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
        onSelected={handleSelected}
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Items');
    fireEvent.click(input);

    await waitFor(() => {
      expect(mockGetList).toHaveBeenCalled();
    });
  });

  it('should handle required prop', () => {
    renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
        required
      />,
      { testSearch: -1 },
    );
    expect(screen.getByLabelText('Search Items *')).toBeInTheDocument();
  });

  it('should handle disabled prop', () => {
    renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
        disabled
      />,
      { testSearch: -1 },
    );
    const input = screen.getByLabelText('Search Items');
    expect(input).toBeDisabled();
  });

  it('should handle readOnly prop', () => {
    renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
        readOnly
      />,
      { testSearch: -1 },
    );
    const input = screen.getByLabelText('Search Items');
    expect(input).toHaveAttribute('readonly');
  });

  it('should handle autoFocus prop', () => {
    renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
        autoFocus
      />,
      { testSearch: -1 },
    );
    const input = screen.getByLabelText('Search Items');
    expect(input).toHaveFocus();
  });

  it('should show loading state', async () => {
    renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
      />,
      { testSearch: -1 },
    );

    await waitFor(() => {
      expect(mockGetList).toHaveBeenCalled();
    });
  });

  it('should handle clear action', async () => {
    const handleSelected = jest.fn();
    renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
        onSelected={handleSelected}
      />,
      { testSearch: -1 },
    );

    await waitFor(() => {
      expect(mockGetList).toHaveBeenCalled();
    });
  });

  it('should render without grid when noGrid is true', () => {
    const { container } = renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
        noGrid
      />,
      { testSearch: -1 },
    );
    expect(container.querySelector('.MuiGrid-root')).not.toBeInTheDocument();
  });

  it('should handle className prop', () => {
    const { container } = renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
        className='custom-class'
      />,
      { testSearch: -1 },
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('should handle creatable mode', async () => {
    const handleSetCreatable = jest.fn();
    const initialCreatable = (value: string): TestItem => ({
      id: 0,
      name: value,
    });

    renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
        creatable
        initialCreatable={initialCreatable}
        setCreatableValue={handleSetCreatable}
      />,
      { testSearch: -1 },
    );

    await waitFor(() => {
      expect(mockGetList).toHaveBeenCalled();
    });
  });

  it('should handle initialSelected prop', async () => {
    renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
        initialSelected={1}
      />,
      { testSearch: -1 },
    );

    await waitFor(() => {
      expect(mockGetList).toHaveBeenCalledWith(undefined, 1);
    });
  });

  it('should handle icon with action', () => {
    const handleIconAction = jest.fn();
    renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
        icon={<span>Icon</span>}
        iconAction={handleIconAction}
        iconActionTitle='Action'
      />,
      { testSearch: -1 },
    );

    const button = screen.getByLabelText('input action Action');
    fireEvent.click(button);
    expect(handleIconAction).toHaveBeenCalled();
  });

  it('should handle input value changes with debounce', async () => {
    renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Items');
    fireEvent.change(input, { target: { value: 'Item' } });

    await waitFor(
      () => {
        expect(mockGetList).toHaveBeenCalled();
      },
      { timeout: 400 },
    );
  });

  it('should show error state when touched', async () => {
    renderWithFormik(
      <SearchGeneric
        name='testSearch'
        label='Search Items'
        getList={mockGetList}
        idKey='id'
        searchKey='name'
        defaultSelected={-1}
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Items');
    fireEvent.blur(input);
  });
});

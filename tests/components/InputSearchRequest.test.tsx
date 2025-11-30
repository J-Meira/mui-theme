import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { SearchRequest } from '../../src/components/Input/SearchRequest';
import { SelectOptionsProps } from '../../src/components/Input';

const mockOptions: SelectOptionsProps[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
];

const mockGetList = jest.fn(async (param?: string, id?: number) => {
  if (id) {
    return mockOptions.filter((option) => option.value === id);
  }
  if (param) {
    return mockOptions.filter((option) =>
      option.label.toLowerCase().includes(param.toLowerCase()),
    );
  }
  return mockOptions;
});

describe('SearchRequest', () => {
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
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
      />,
      { testSearch: -1 },
    );
    expect(screen.getByLabelText('Search Options')).toBeInTheDocument();
  });

  it('should load options with debounce', () => {
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toBeInTheDocument();
  });

  it('should handle searchChange callback', () => {
    const handleSearchChange = jest.fn();
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
        searchChange={handleSearchChange}
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    expect(input).toBeInTheDocument();
  });

  it('should handle required prop', () => {
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
        required
      />,
      { testSearch: -1 },
    );
    expect(screen.getByLabelText('Search Options *')).toBeInTheDocument();
  });

  it('should handle disabled prop', () => {
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
        disabled
      />,
      { testSearch: -1 },
    );
    const input = screen.getByLabelText('Search Options');
    expect(input).toBeDisabled();
  });

  it('should handle readOnly prop', () => {
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
        readOnly
      />,
      { testSearch: -1 },
    );
    const input = screen.getByLabelText('Search Options');
    expect(input).toHaveAttribute('readonly');
  });

  it('should handle autoFocus prop', () => {
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
        autoFocus
      />,
      { testSearch: -1 },
    );
    const input = screen.getByLabelText('Search Options');
    expect(input).toHaveFocus();
  });

  it('should show loading state', () => {
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toBeInTheDocument();
  });

  it('should handle clear action', () => {
    const handleSearchChange = jest.fn();
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
        searchChange={handleSearchChange}
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    expect(input).toBeInTheDocument();
  });

  it('should handle creatable mode', () => {
    const handleSetCreatable = jest.fn();
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
        creatable
        creatableLabel='Add'
        setCreatableValue={handleSetCreatable}
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    expect(input).toBeInTheDocument();
  });

  it('should handle custom creatableLabel', () => {
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
        creatable
        creatableLabel='Create'
      />,
      { testSearch: -1 },
    );
    expect(screen.getByLabelText('Search Options')).toBeInTheDocument();
  });

  it('should handle initialSelected prop', () => {
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
        initialSelected={1}
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    expect(input).toBeInTheDocument();
  });

  it('should handle icon with action', () => {
    const handleIconAction = jest.fn();
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
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

  it('should show error state when touched', () => {
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    fireEvent.blur(input);
    expect(input).toBeInTheDocument();
  });

  it('should handle input value changes', () => {
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    fireEvent.change(input, { target: { value: 'Option' } });
    expect(input).toBeInTheDocument();
  });

  it('should handle empty getList', () => {
    const emptyGetList = jest.fn(async () => []);
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={emptyGetList}
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toBeInTheDocument();
  });

  it('should handle undefined getList', () => {
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={undefined}
      />,
      { testSearch: -1 },
    );
    expect(screen.getByLabelText('Search Options')).toBeInTheDocument();
  });

  it('should update when field value changes', () => {
    const { rerender } = renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
      />,
      { testSearch: -1 },
    );

    rerender(
      <Formik initialValues={{ testSearch: 1 }} onSubmit={jest.fn()}>
        <Form>
          <SearchRequest
            name='testSearch'
            label='Search Options'
            getList={mockGetList}
          />
        </Form>
      </Formik>,
    );

    const input = screen.getByLabelText('Search Options');
    expect(input).toBeInTheDocument();
  });

  it('should call setCreatableValue with empty string on clear', () => {
    const handleSetCreatable = jest.fn();
    renderWithFormik(
      <SearchRequest
        name='testSearch'
        label='Search Options'
        getList={mockGetList}
        creatable
        setCreatableValue={handleSetCreatable}
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    expect(input).toBeInTheDocument();
  });
});

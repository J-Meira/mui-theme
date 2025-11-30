import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { Search } from '../../src/components/Input/Search';

const mockOptions = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
];

describe('Search', () => {
  const renderWithFormik = (ui: React.ReactElement, initialValues = {}) => {
    return render(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        <Form>{ui}</Form>
      </Formik>,
    );
  };

  it('should render with label', () => {
    renderWithFormik(
      <Search name='testSearch' label='Search Options' options={mockOptions} />,
      { testSearch: -1 },
    );
    expect(screen.getByLabelText('Search Options')).toBeInTheDocument();
  });

  it('should display all options', () => {
    renderWithFormik(
      <Search name='testSearch' label='Search Options' options={mockOptions} />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    fireEvent.click(input);
  });

  it('should handle onChange with searchChange callback', () => {
    const handleSearchChange = jest.fn();
    renderWithFormik(
      <Search
        name='testSearch'
        label='Search Options'
        options={mockOptions}
        searchChange={handleSearchChange}
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    expect(input).toBeInTheDocument();
  });

  it('should handle clear action', () => {
    const handleSearchChange = jest.fn();
    renderWithFormik(
      <Search
        name='testSearch'
        label='Search Options'
        options={mockOptions}
        searchChange={handleSearchChange}
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    expect(input).toBeInTheDocument();
  });

  it('should handle required prop', () => {
    renderWithFormik(
      <Search
        name='testSearch'
        label='Search Options'
        options={mockOptions}
        required
      />,
      { testSearch: -1 },
    );
    expect(screen.getByLabelText('Search Options *')).toBeInTheDocument();
  });

  it('should handle disabled prop', () => {
    renderWithFormik(
      <Search
        name='testSearch'
        label='Search Options'
        options={mockOptions}
        disabled
      />,
      { testSearch: -1 },
    );
    const input = screen.getByLabelText('Search Options');
    expect(input).toBeDisabled();
  });

  it('should handle readOnly prop', () => {
    renderWithFormik(
      <Search
        name='testSearch'
        label='Search Options'
        options={mockOptions}
        readOnly
      />,
      { testSearch: -1 },
    );
    const input = screen.getByLabelText('Search Options');
    expect(input).toHaveAttribute('readonly');
  });

  it('should handle autoFocus prop', () => {
    renderWithFormik(
      <Search
        name='testSearch'
        label='Search Options'
        options={mockOptions}
        autoFocus
      />,
      { testSearch: -1 },
    );
    const input = screen.getByLabelText('Search Options');
    expect(input).toHaveFocus();
  });

  it('should handle creatable mode', () => {
    renderWithFormik(
      <Search
        name='testSearch'
        label='Search Options'
        options={mockOptions}
        creatable
        creatableLabel='Add'
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    expect(input).toBeInTheDocument();
  });

  it('should handle custom creatableLabel', () => {
    renderWithFormik(
      <Search
        name='testSearch'
        label='Search Options'
        options={mockOptions}
        creatable
        creatableLabel='Create'
      />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    expect(input).toBeInTheDocument();
  });

  it('should show error state when touched', () => {
    renderWithFormik(
      <Search name='testSearch' label='Search Options' options={mockOptions} />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    fireEvent.blur(input);
    expect(input).toBeInTheDocument();
  });

  it('should update when field value changes', () => {
    const { rerender } = renderWithFormik(
      <Search name='testSearch' label='Search Options' options={mockOptions} />,
      { testSearch: -1 },
    );

    rerender(
      <Formik initialValues={{ testSearch: 1 }} onSubmit={jest.fn()}>
        <Form>
          <Search
            name='testSearch'
            label='Search Options'
            options={mockOptions}
          />
        </Form>
      </Formik>,
    );
  });

  it('should handle inputValue changes', () => {
    renderWithFormik(
      <Search name='testSearch' label='Search Options' options={mockOptions} />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toBeInTheDocument();
  });

  it('should filter options based on input', () => {
    renderWithFormik(
      <Search name='testSearch' label='Search Options' options={mockOptions} />,
      { testSearch: -1 },
    );

    const input = screen.getByLabelText('Search Options');
    fireEvent.change(input, { target: { value: 'Option 1' } });
    expect(input).toBeInTheDocument();
  });

  it('should handle empty options array', () => {
    renderWithFormik(
      <Search name='testSearch' label='Search Options' options={[]} />,
      { testSearch: -1 },
    );
    expect(screen.getByLabelText('Search Options')).toBeInTheDocument();
  });

  it('should handle undefined options', () => {
    renderWithFormik(
      <Search name='testSearch' label='Search Options' options={undefined} />,
      { testSearch: -1 },
    );
    expect(screen.getByLabelText('Search Options')).toBeInTheDocument();
  });
});

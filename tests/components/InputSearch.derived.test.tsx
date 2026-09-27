import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { Search } from '../../src/components/Input/Search';

const mockOptions = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
];

describe('Search derived selection', () => {
  it('should show the option matching the Formik value and update it on selection', async () => {
    const handleSearchChange = vi.fn();
    render(
      <Formik initialValues={{ testSearch: 2 }} onSubmit={vi.fn()}>
        {({ values }) => (
          <Form>
            <Search
              name='testSearch'
              label='Search Options'
              options={mockOptions}
              searchChange={handleSearchChange}
            />
            <div data-testid='formik-value'>{String(values.testSearch)}</div>
          </Form>
        )}
      </Formik>,
    );

    const input = screen.getByLabelText('Search Options');
    expect(input).toHaveValue('Option 2');
    await waitFor(() => expect(handleSearchChange).toHaveBeenCalledWith(2));

    fireEvent.mouseDown(input);
    fireEvent.click(await screen.findByText('Option 3'));

    expect(screen.getByTestId('formik-value')).toHaveTextContent('3');
    expect(input).toHaveValue('Option 3');
    await waitFor(() => expect(handleSearchChange).toHaveBeenLastCalledWith(3));
  });

  it('should not notify searchChange on mount when nothing is selected', async () => {
    const handleSearchChange = vi.fn();
    render(
      <Formik initialValues={{ testSearch: -1 }} onSubmit={vi.fn()}>
        <Form>
          <Search
            name='testSearch'
            label='Search Options'
            options={mockOptions}
            searchChange={handleSearchChange}
          />
        </Form>
      </Formik>,
    );

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(handleSearchChange).not.toHaveBeenCalled();
  });
});

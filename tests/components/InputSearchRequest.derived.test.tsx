import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { SearchRequest } from '../../src/components/Input/SearchRequest';
import { SelectOptionsProps } from '../../src/components/Input';

const mockOptions: SelectOptionsProps[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
];

const mockGetList = jest.fn(async (param?: string, id?: number) => {
  if (id) return mockOptions.filter((option) => option.value === id);
  if (param) {
    return mockOptions.filter((option) =>
      option.label.toLowerCase().includes(param.toLowerCase()),
    );
  }
  return mockOptions;
});

describe('SearchRequest derived selection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load the initialSelected option and store it in Formik', async () => {
    const handleSearchChange = jest.fn();
    render(
      <Formik initialValues={{ testSearch: -1 }} onSubmit={jest.fn()}>
        {({ values }) => (
          <Form>
            <SearchRequest
              name='testSearch'
              label='Search Options'
              getList={mockGetList}
              initialSelected={1}
              searchChange={handleSearchChange}
            />
            <div data-testid='formik-value'>{String(values.testSearch)}</div>
          </Form>
        )}
      </Formik>,
    );

    await waitFor(() => expect(mockGetList).toHaveBeenCalledWith(undefined, 1));
    await waitFor(() =>
      expect(screen.getByTestId('formik-value')).toHaveTextContent('1'),
    );
    await waitFor(() =>
      expect(screen.getByLabelText('Search Options')).toHaveValue('Option 1'),
    );
    await waitFor(() => expect(handleSearchChange).toHaveBeenCalledWith(1));
  });

  it('should fetch when typing and not again when an option is selected', async () => {
    render(
      <Formik initialValues={{ testSearch: -1 }} onSubmit={jest.fn()}>
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
    await waitFor(() => expect(mockGetList).toHaveBeenCalledTimes(1));

    fireEvent.change(input, { target: { value: 'Option 2' } });
    await waitFor(() => expect(mockGetList).toHaveBeenCalledWith('Option 2'), {
      timeout: 1500,
    });
    const calls = mockGetList.mock.calls.length;

    fireEvent.click(await screen.findByText('Option 2'));
    expect(input).toHaveValue('Option 2');
    await new Promise((resolve) => setTimeout(resolve, 700));
    expect(mockGetList).toHaveBeenCalledTimes(calls);
  });
});

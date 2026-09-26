import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { Currency } from '../../src/components/Input/Currency';
import { formatCurrency } from '../../src/components/Input/formatCurrency';

describe('Input Currency', () => {
  const renderWithFormik = (ui: React.ReactElement, initialValues = {}) => {
    return render(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        <Form>{ui}</Form>
      </Formik>,
    );
  };

  it('should render with local control', () => {
    render(<Currency name='price' localControl label='Price' />);
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
  });

  it('should render with Formik control', () => {
    renderWithFormik(<Currency name='price' label='Price' />, { price: '' });
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
  });

  it('should display default currency symbol', () => {
    render(<Currency name='price' localControl label='Price' />);
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('should display custom currency symbol', () => {
    render(<Currency name='price' localControl label='Price' symbol='€' />);
    expect(screen.getByText('€')).toBeInTheDocument();
  });

  it('should hide currency symbol when hideSymbol is true', () => {
    render(<Currency name='price' localControl label='Price' hideSymbol />);
    expect(screen.queryByText('$')).not.toBeInTheDocument();
  });

  it('should format single digit currency', () => {
    const handleChange = jest.fn();
    renderWithFormik(
      <Currency name='price' label='Price' onChange={handleChange} />,
      { price: '' },
    );
    const input = screen.getByLabelText('Price');
    fireEvent.change(input, { target: { value: '5' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should format two digit currency', () => {
    const handleChange = jest.fn();
    renderWithFormik(
      <Currency name='price' label='Price' onChange={handleChange} />,
      { price: '' },
    );
    const input = screen.getByLabelText('Price');
    fireEvent.change(input, { target: { value: '50' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should format three or more digit currency', () => {
    const handleChange = jest.fn();
    renderWithFormik(
      <Currency name='price' label='Price' onChange={handleChange} />,
      { price: '' },
    );
    const input = screen.getByLabelText('Price');
    fireEvent.change(input, { target: { value: '500' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle onChange with local control', () => {
    const handleChange = jest.fn();
    render(
      <Currency
        name='price'
        localControl
        label='Price'
        onChange={handleChange}
      />,
    );
    const input = screen.getByLabelText('Price');
    fireEvent.change(input, { target: { value: '100' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle onBlur with local control', () => {
    const handleBlur = jest.fn();
    render(
      <Currency name='price' localControl label='Price' onBlur={handleBlur} />,
    );
    const input = screen.getByLabelText('Price');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should render as readOnly', () => {
    render(<Currency name='price' localControl label='Price' readOnly />);
    const input = screen.getByLabelText('Price');
    expect(input).toHaveAttribute('readonly');
  });

  it('should render as disabled', () => {
    render(<Currency name='price' localControl label='Price' disabled />);
    const input = screen.getByLabelText('Price');
    expect(input).toBeDisabled();
  });

  it('should display helper text with local control', () => {
    render(
      <Currency
        name='price'
        localControl
        label='Price'
        helperText='Enter amount'
      />,
    );
    expect(screen.getByText('Enter amount')).toBeInTheDocument();
  });

  it('should show error state with helper text', () => {
    render(
      <Currency
        name='price'
        localControl
        label='Price'
        helperText='Invalid price'
      />,
    );
    const input = screen.getByLabelText('Price');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should call both Formik and custom onChange', () => {
    const handleChange = jest.fn();
    renderWithFormik(
      <Currency name='price' label='Price' onChange={handleChange} />,
      { price: '' },
    );
    const input = screen.getByLabelText('Price');
    fireEvent.change(input, { target: { value: '100' } });
    expect(handleChange).toHaveBeenCalled();
  });
});

describe('Input Currency formatting', () => {
  it('should format typed digits as a decimal amount in local control mode', () => {
    render(<Currency name='price' localControl label='Price' />);
    const input = screen.getByLabelText('Price');

    fireEvent.change(input, { target: { value: '5' } });
    expect(input).toHaveValue(0.05);

    fireEvent.change(input, { target: { value: '123456' } });
    expect(input).toHaveValue(1234.56);
  });

  it('should format typed digits as a decimal amount in Formik mode', () => {
    render(
      <Formik initialValues={{ price: '' }} onSubmit={jest.fn()}>
        <Form>
          <Currency name='price' label='Price' />
        </Form>
      </Formik>,
    );
    const input = screen.getByLabelText('Price');

    fireEvent.change(input, { target: { value: '5' } });
    expect(input).toHaveValue(0.05);

    fireEvent.change(input, { target: { value: '0050' } });
    expect(input).toHaveValue(0.5);

    fireEvent.change(input, { target: { value: '123456' } });
    expect(input).toHaveValue(1234.56);
  });

  it('should clear to an empty value instead of a lone separator', () => {
    render(<Currency name='price' localControl label='Price' />);
    const input = screen.getByLabelText('Price');

    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.change(input, { target: { value: '' } });
    expect(input).toHaveValue(null);
  });

  it('should pass the formatted event to the custom onChange in local control mode', () => {
    const handleChange = jest.fn();
    render(
      <Currency
        name='price'
        localControl
        label='Price'
        onChange={handleChange}
      />,
    );
    fireEvent.change(screen.getByLabelText('Price'), {
      target: { value: '199' },
    });
    expect(handleChange.mock.calls[0][0].target.value).toBe('1.99');
  });
});

describe('formatCurrency', () => {
  it.each([
    ['', ''],
    ['5', '0.05'],
    ['50', '0.50'],
    ['500', '5.00'],
    ['0005', '0.05'],
    ['123456', '1234.56'],
    ['1.234,56', '1234.56'],
    ['abc', ''],
  ])('formats %p as %p', (raw, expected) => {
    expect(formatCurrency(raw)).toBe(expected);
  });
});

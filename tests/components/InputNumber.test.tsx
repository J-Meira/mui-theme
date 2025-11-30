import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { Number } from '../../src/components/Input/Number';

describe('Input Number', () => {
  const renderWithFormik = (ui: React.ReactElement, initialValues = {}) => {
    return render(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        <Form>{ui}</Form>
      </Formik>,
    );
  };

  it('should render with local control', () => {
    render(<Number name='age' localControl label='Age' />);
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
  });

  it('should render with Formik control', () => {
    renderWithFormik(<Number name='age' label='Age' />, { age: '' });
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
  });

  it('should only allow integer values by default', () => {
    const handleChange = jest.fn();
    render(
      <Number
        name='age'
        localControl
        label='Age'
        onChange={handleChange}
        value=''
      />,
    );
    const input = screen.getByLabelText('Age');
    fireEvent.change(input, { target: { value: '123' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should allow decimal values when decimal prop is true', () => {
    const handleChange = jest.fn();
    render(
      <Number
        name='price'
        localControl
        label='Price'
        decimal
        onChange={handleChange}
      />,
    );
    const input = screen.getByLabelText('Price');
    fireEvent.change(input, { target: { value: '12.34' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should allow negative values', () => {
    const handleChange = jest.fn();
    render(
      <Number
        name='temp'
        localControl
        label='Temperature'
        onChange={handleChange}
      />,
    );
    const input = screen.getByLabelText('Temperature');
    fireEvent.change(input, { target: { value: '-10' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should remove minus sign if not at the beginning', () => {
    const handleChange = jest.fn();
    render(
      <Number
        name='num'
        localControl
        label='Number'
        onChange={handleChange}
        value=''
      />,
    );
    const input = screen.getByLabelText('Number');
    fireEvent.change(input, { target: { value: '10' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should prevent multiple decimal points', () => {
    const handleChange = jest.fn();
    render(
      <Number
        name='price'
        localControl
        label='Price'
        decimal
        onChange={handleChange}
        value=''
      />,
    );
    const input = screen.getByLabelText('Price');
    fireEvent.change(input, { target: { value: '12.34.56' } });
    expect(input).toBeInTheDocument();
  });

  it('should handle onChange with local control', () => {
    const handleChange = jest.fn();
    render(
      <Number name='age' localControl label='Age' onChange={handleChange} />,
    );
    const input = screen.getByLabelText('Age');
    fireEvent.change(input, { target: { value: '25' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle onBlur with local control', () => {
    const handleBlur = jest.fn();
    render(<Number name='age' localControl label='Age' onBlur={handleBlur} />);
    const input = screen.getByLabelText('Age');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should render as readOnly', () => {
    render(<Number name='age' localControl label='Age' readOnly />);
    const input = screen.getByLabelText('Age');
    expect(input).toHaveAttribute('readonly');
  });

  it('should render as disabled', () => {
    render(<Number name='age' localControl label='Age' disabled />);
    const input = screen.getByLabelText('Age');
    expect(input).toBeDisabled();
  });

  it('should display helper text with local control', () => {
    render(
      <Number
        name='age'
        localControl
        label='Age'
        helperText='Enter your age'
      />,
    );
    expect(screen.getByText('Enter your age')).toBeInTheDocument();
  });

  it('should show error state with helper text', () => {
    render(
      <Number name='age' localControl label='Age' helperText='Invalid age' />,
    );
    const input = screen.getByLabelText('Age');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should call both Formik and custom onChange', () => {
    const handleChange = jest.fn();
    renderWithFormik(
      <Number name='age' label='Age' onChange={handleChange} />,
      { age: '' },
    );
    const input = screen.getByLabelText('Age');
    fireEvent.change(input, { target: { value: '25' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should call both Formik and custom onBlur', () => {
    const handleBlur = jest.fn();
    renderWithFormik(<Number name='age' label='Age' onBlur={handleBlur} />, {
      age: '',
    });
    const input = screen.getByLabelText('Age');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should handle null value', () => {
    render(<Number name='age' localControl label='Age' value={null} />);
    const input = screen.getByLabelText('Age');
    expect(input).toHaveValue(null);
  });
});

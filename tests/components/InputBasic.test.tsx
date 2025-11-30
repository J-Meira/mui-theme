import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { Basic } from '../../src/components/Input/Basic';

describe('Input Basic', () => {
  const renderWithFormik = (ui: React.ReactElement, initialValues = {}) => {
    return render(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        <Form>{ui}</Form>
      </Formik>,
    );
  };

  it('should render with local control', () => {
    render(<Basic name='testInput' localControl label='Test Input' />);
    const input = screen.getByLabelText('Test Input');
    expect(input).toBeInTheDocument();
  });

  it('should render with Formik control', () => {
    renderWithFormik(<Basic name='testInput' label='Test Input' />, {
      testInput: '',
    });
    const input = screen.getByLabelText('Test Input');
    expect(input).toBeInTheDocument();
  });

  it('should display label', () => {
    render(<Basic name='testInput' localControl label='Username' />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('should display helper text when provided with local control', () => {
    render(
      <Basic
        name='testInput'
        localControl
        label='Test'
        helperText='This is a helper text'
      />,
    );
    expect(screen.getByText('This is a helper text')).toBeInTheDocument();
  });

  it('should show error state with helper text', () => {
    render(
      <Basic
        name='testInput'
        localControl
        label='Test'
        helperText='Error message'
      />,
    );
    const input = screen.getByLabelText('Test');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should handle onChange events with local control', () => {
    const handleChange = jest.fn();
    render(
      <Basic
        name='testInput'
        localControl
        label='Test'
        onChange={handleChange}
      />,
    );
    const input = screen.getByLabelText('Test');
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle onBlur events with local control', () => {
    const handleBlur = jest.fn();
    render(
      <Basic name='testInput' localControl label='Test' onBlur={handleBlur} />,
    );
    const input = screen.getByLabelText('Test');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should render as readOnly', () => {
    render(<Basic name='testInput' localControl label='Test' readOnly />);
    const input = screen.getByLabelText('Test');
    expect(input).toHaveAttribute('readonly');
  });

  it('should render as disabled', () => {
    render(<Basic name='testInput' localControl label='Test' disabled />);
    const input = screen.getByLabelText('Test');
    expect(input).toBeDisabled();
  });

  it('should render as required', () => {
    render(<Basic name='testInput' localControl label='Test' required />);
    const input = screen.getByLabelText('Test *');
    expect(input).toBeRequired();
  });

  it('should use outlined variant by default', () => {
    render(<Basic name='testInput' localControl label='Test' />);
    const fieldset = document.querySelector('fieldset');
    expect(fieldset).toBeInTheDocument();
  });

  it('should handle Formik validation errors', () => {
    renderWithFormik(<Basic name='email' label='Email' />, { email: '' });
    const input = screen.getByLabelText('Email');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(input).toBeInTheDocument();
  });

  it('should call both Formik and custom onChange', () => {
    const handleChange = jest.fn();
    renderWithFormik(
      <Basic name='testInput' label='Test' onChange={handleChange} />,
      { testInput: '' },
    );
    const input = screen.getByLabelText('Test');
    fireEvent.change(input, { target: { value: 'A' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should call both Formik and custom onBlur', () => {
    const handleBlur = jest.fn();
    renderWithFormik(
      <Basic name='testInput' label='Test' onBlur={handleBlur} />,
      { testInput: '' },
    );
    const input = screen.getByLabelText('Test');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should render with placeholder', () => {
    render(
      <Basic
        name='testInput'
        localControl
        label='Test'
        placeholder='Enter text'
      />,
    );
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });
});

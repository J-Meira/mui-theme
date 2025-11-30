import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { Password } from '../../src/components/Input/Password';

describe('Input Password', () => {
  const renderWithFormik = (ui: React.ReactElement, initialValues = {}) => {
    return render(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        <Form>{ui}</Form>
      </Formik>,
    );
  };

  it('should render with local control', () => {
    render(<Password name='password' localControl label='Password' />);
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render with Formik control', () => {
    renderWithFormik(<Password name='password' label='Password' />, {
      password: '',
    });
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render as password type by default', () => {
    render(<Password name='password' localControl label='Password' />);
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should toggle password visibility on icon click', () => {
    render(<Password name='password' localControl label='Password' />);
    const input = screen.getByLabelText('Password');
    const toggleButton = screen.getByRole('button');

    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should display visibility icon when password is hidden', () => {
    render(<Password name='password' localControl label='Password' />);
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });

  it('should display visibility off icon when password is shown', () => {
    render(<Password name='password' localControl label='Password' />);
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(toggleButton).toBeInTheDocument();
  });

  it('should handle onChange events with local control', () => {
    const handleChange = jest.fn();
    render(
      <Password
        name='password'
        localControl
        label='Password'
        onChange={handleChange}
      />,
    );
    const input = screen.getByLabelText('Password');
    fireEvent.change(input, { target: { value: 'secret123' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle onBlur events with local control', () => {
    const handleBlur = jest.fn();
    render(
      <Password
        name='password'
        localControl
        label='Password'
        onBlur={handleBlur}
      />,
    );
    const input = screen.getByLabelText('Password');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should display helper text with local control', () => {
    render(
      <Password
        name='password'
        localControl
        label='Password'
        helperText='Enter secure password'
      />,
    );
    expect(screen.getByText('Enter secure password')).toBeInTheDocument();
  });

  it('should show error state with helper text', () => {
    render(
      <Password
        name='password'
        localControl
        label='Password'
        helperText='Password required'
      />,
    );
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should render with custom show title', () => {
    render(
      <Password
        name='password'
        localControl
        label='Password'
        showTitle='Show'
      />,
    );
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveAttribute('aria-label', 'input action Show');
  });

  it('should render with custom hide title', () => {
    render(
      <Password
        name='password'
        localControl
        label='Password'
        hideTitle='Hide'
      />,
    );
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-label', 'input action Hide');
  });

  it('should call both Formik and custom onChange', () => {
    const handleChange = jest.fn();
    renderWithFormik(
      <Password name='password' label='Password' onChange={handleChange} />,
      { password: '' },
    );
    const input = screen.getByLabelText('Password');
    fireEvent.change(input, { target: { value: 'secret' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should call both Formik and custom onBlur', () => {
    const handleBlur = jest.fn();
    renderWithFormik(
      <Password name='password' label='Password' onBlur={handleBlur} />,
      { password: '' },
    );
    const input = screen.getByLabelText('Password');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should render as disabled', () => {
    render(<Password name='password' localControl label='Password' disabled />);
    const input = screen.getByLabelText('Password');
    expect(input).toBeDisabled();
  });

  it('should render as required', () => {
    render(<Password name='password' localControl label='Password' required />);
    const input = screen.getByLabelText('Password *');
    expect(input).toBeRequired();
  });
});

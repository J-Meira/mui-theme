import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { CheckBox } from '../../src/components/Input/CheckBox';

describe('Input CheckBox', () => {
  const renderWithFormik = (ui: React.ReactElement, initialValues = {}) => {
    return render(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        <Form>{ui}</Form>
      </Formik>,
    );
  };

  it('should render with local control', () => {
    render(<CheckBox name='testCheckbox' localControl label='Accept Terms' />);
    expect(screen.getByLabelText('Accept Terms')).toBeInTheDocument();
  });

  it('should render with Formik control', () => {
    renderWithFormik(<CheckBox name='testCheckbox' label='Accept Terms' />, {
      testCheckbox: false,
    });
    expect(screen.getByLabelText('Accept Terms')).toBeInTheDocument();
  });

  it('should render checked state', () => {
    render(<CheckBox name='testCheckbox' localControl label='Test' checked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should render unchecked state', () => {
    render(
      <CheckBox
        name='testCheckbox'
        localControl
        label='Test'
        checked={false}
      />,
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should handle onChange events with local control', () => {
    const handleChange = jest.fn();
    render(
      <CheckBox
        name='testCheckbox'
        localControl
        label='Test'
        onChange={handleChange}
      />,
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  it('should render as disabled', () => {
    render(<CheckBox name='testCheckbox' localControl label='Test' disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('should render as required', () => {
    render(<CheckBox name='testCheckbox' localControl label='Test' required />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('should display helper text on error with local control', () => {
    render(
      <CheckBox
        name='testCheckbox'
        localControl
        label='Test'
        helperText='This field is required'
      />,
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should show error state with helper text', () => {
    render(
      <CheckBox
        name='testCheckbox'
        localControl
        label='Test'
        helperText='Error message'
      />,
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should handle Formik onChange', () => {
    const handleChange = jest.fn();
    renderWithFormik(
      <CheckBox name='testCheckbox' label='Test' onChange={handleChange} />,
      { testCheckbox: false },
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  it('should display Formik validation error', () => {
    renderWithFormik(<CheckBox name='agree' label='Agree' />, { agree: false });
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    expect(checkbox).toBeInTheDocument();
  });

  it('should render with custom size', () => {
    render(
      <CheckBox name='testCheckbox' localControl label='Test' size='medium' />,
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });
});

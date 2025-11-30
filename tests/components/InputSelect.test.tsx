import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { Select } from '../../src/components/Input/Select';

describe('Input Select', () => {
  const options = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' },
  ];

  const renderWithFormik = (ui: React.ReactElement, initialValues = {}) => {
    return render(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        <Form>{ui}</Form>
      </Formik>,
    );
  };

  it('should render with local control', () => {
    render(
      <Select name='status' localControl label='Status' options={options} />,
    );
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
  });

  it('should render with Formik control', () => {
    renderWithFormik(
      <Select name='status' label='Status' options={options} />,
      { status: '' },
    );
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
  });

  it('should render all options with native select', () => {
    render(
      <Select name='status' localControl label='Status' options={options} />,
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('should render default option when provided', () => {
    render(
      <Select
        name='status'
        localControl
        label='Status'
        options={options}
        defaultOption='Select an option'
      />,
    );
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('should handle onChange with local control', () => {
    const handleChange = jest.fn();
    render(
      <Select
        name='status'
        localControl
        label='Status'
        options={options}
        onChange={handleChange}
        value={1}
      />,
    );
    const select = screen.getByLabelText('Status');
    fireEvent.change(select, { target: { value: 2 } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle onBlur with local control', () => {
    const handleBlur = jest.fn();
    render(
      <Select
        name='status'
        localControl
        label='Status'
        options={options}
        onBlur={handleBlur}
        value={1}
      />,
    );
    const select = screen.getByLabelText('Status');
    fireEvent.focus(select);
    fireEvent.blur(select);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should render as readOnly', () => {
    render(
      <Select
        name='status'
        localControl
        label='Status'
        options={options}
        readOnly
        value={1}
      />,
    );
    const select = screen.getByLabelText('Status');
    expect(select).toHaveAttribute('readonly');
  });

  it('should render as disabled', () => {
    render(
      <Select
        name='status'
        localControl
        label='Status'
        options={options}
        disabled
        value={1}
      />,
    );
    const select = screen.getByLabelText('Status');
    expect(select).toBeDisabled();
  });

  it('should display helper text with local control', () => {
    render(
      <Select
        name='status'
        localControl
        label='Status'
        options={options}
        helperText='Choose a status'
        value={1}
      />,
    );
    expect(screen.getByText('Choose a status')).toBeInTheDocument();
  });

  it('should show error state with helper text', () => {
    render(
      <Select
        name='status'
        localControl
        label='Status'
        options={options}
        helperText='Status is required'
        value={1}
      />,
    );
    const select = screen.getByLabelText('Status');
    expect(select).toHaveAttribute('aria-invalid', 'true');
  });

  it('should call both Formik and custom onChange', () => {
    const handleChange = jest.fn();
    renderWithFormik(
      <Select
        name='status'
        label='Status'
        options={options}
        onChange={handleChange}
      />,
      { status: 1 },
    );
    const select = screen.getByLabelText('Status');
    fireEvent.change(select, { target: { value: 2 } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should call both Formik and custom onBlur', () => {
    const handleBlur = jest.fn();
    renderWithFormik(
      <Select
        name='status'
        label='Status'
        options={options}
        onBlur={handleBlur}
      />,
      { status: 1 },
    );
    const select = screen.getByLabelText('Status');
    fireEvent.focus(select);
    fireEvent.blur(select);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should render as required', () => {
    render(
      <Select
        name='status'
        localControl
        label='Status'
        options={options}
        required
        value={1}
      />,
    );
    const select = screen.getByLabelText('Status *');
    expect(select).toBeRequired();
  });
});

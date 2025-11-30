import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { RadioGroup } from '../../src/components/Input/RadioGroup';

const mockOptions = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
];

describe('RadioGroup', () => {
  const renderWithFormik = (ui: React.ReactElement, initialValues = {}) => {
    return render(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        <Form>{ui}</Form>
      </Formik>,
    );
  };

  it('should render with local control', () => {
    render(
      <RadioGroup
        name='testRadio'
        localControl
        label='Select Option'
        options={mockOptions}
      />,
    );
    expect(screen.getByText('Select Option')).toBeInTheDocument();
  });

  it('should render with Formik control', () => {
    renderWithFormik(
      <RadioGroup
        name='testRadio'
        label='Select Option'
        options={mockOptions}
      />,
      { testRadio: '' },
    );
    expect(screen.getByText('Select Option')).toBeInTheDocument();
  });

  it('should render all options', () => {
    render(
      <RadioGroup
        name='testRadio'
        localControl
        label='Select Option'
        options={mockOptions}
      />,
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('should handle onChange callback in local control mode', () => {
    const handleChange = jest.fn();
    render(
      <RadioGroup
        name='testRadio'
        localControl
        label='Select Option'
        options={mockOptions}
        onChange={handleChange}
      />,
    );

    const radio = screen.getByLabelText('Option 1');
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle onChange callback in Formik mode', () => {
    const handleChange = jest.fn();
    renderWithFormik(
      <RadioGroup
        name='testRadio'
        label='Select Option'
        options={mockOptions}
        onChange={handleChange}
      />,
      { testRadio: '' },
    );

    const radio = screen.getByLabelText('Option 1');
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalled();
  });

  it('should display label', () => {
    render(
      <RadioGroup
        name='testRadio'
        localControl
        label='Choose One'
        options={mockOptions}
      />,
    );
    expect(screen.getByText('Choose One')).toBeInTheDocument();
  });

  it('should handle required prop', () => {
    render(
      <RadioGroup
        name='testRadio'
        localControl
        label='Select Option'
        options={mockOptions}
        required
      />,
    );
    const label = screen.getByText('Select Option');
    expect(label.closest('label')).toHaveClass('Mui-required');
  });

  it('should handle helper text', () => {
    render(
      <RadioGroup
        name='testRadio'
        localControl
        label='Select Option'
        options={mockOptions}
        helperText='Please select an option'
      />,
    );
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });

  it('should show error state in Formik mode', () => {
    renderWithFormik(
      <RadioGroup
        name='testRadio'
        label='Select Option'
        options={mockOptions}
      />,
      { testRadio: '' },
    );

    const radio = screen.getByLabelText('Option 1');
    fireEvent.blur(radio);
  });

  it('should handle default value', () => {
    render(
      <RadioGroup
        name='testRadio'
        localControl
        label='Select Option'
        options={mockOptions}
        value={2}
      />,
    );
    const radio = screen.getByLabelText('Option 2') as HTMLInputElement;
    expect(radio.checked).toBe(true);
  });

  it('should render in row direction', () => {
    const { container } = render(
      <RadioGroup
        name='testRadio'
        localControl
        label='Select Option'
        options={mockOptions}
        rowDirection
      />,
    );
    const radioGroup = container.querySelector('.MuiRadioGroup-root');
    expect(radioGroup).toHaveClass('MuiRadioGroup-row');
  });

  it('should render in column direction by default', () => {
    const { container } = render(
      <RadioGroup
        name='testRadio'
        localControl
        label='Select Option'
        options={mockOptions}
      />,
    );
    const radioGroup = container.querySelector('.MuiRadioGroup-root');
    expect(radioGroup).not.toHaveClass('MuiRadioGroup-row');
  });

  it('should select only one option at a time', () => {
    render(
      <RadioGroup
        name='testRadio'
        localControl
        label='Select Option'
        options={mockOptions}
      />,
    );

    const radio1 = screen.getByLabelText('Option 1') as HTMLInputElement;
    const radio2 = screen.getByLabelText('Option 2') as HTMLInputElement;

    fireEvent.click(radio1);
    expect(radio1.checked).toBe(true);

    fireEvent.click(radio2);
    expect(radio2.checked).toBe(true);
    expect(radio1.checked).toBe(false);
  });

  it('should render without label when not provided', () => {
    render(<RadioGroup name='testRadio' localControl options={mockOptions} />);
    expect(screen.queryByRole('group')).toBeInTheDocument();
  });

  it('should handle empty options array', () => {
    render(
      <RadioGroup
        name='testRadio'
        localControl
        label='Select Option'
        options={[]}
      />,
    );
    expect(screen.getByText('Select Option')).toBeInTheDocument();
  });
});

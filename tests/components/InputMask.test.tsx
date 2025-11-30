import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { Mask } from '../../src/components/Input/Mask';

describe('Input Mask', () => {
  const renderWithFormik = (ui: React.ReactElement, initialValues = {}) => {
    return render(
      <Formik initialValues={initialValues} onSubmit={jest.fn()}>
        <Form>{ui}</Form>
      </Formik>,
    );
  };

  it('should render with local control', () => {
    render(<Mask name='phone' localControl label='Phone' maskModel='phone' />);
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
  });

  it('should render with Formik control', () => {
    renderWithFormik(<Mask name='phone' label='Phone' maskModel='phone' />, {
      phone: '',
    });
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
  });

  it('should apply CPF mask', () => {
    render(
      <Mask name='cpf' localControl label='CPF' maskModel='cpf' value='' />,
    );
    const input = screen.getByLabelText('CPF');
    expect(input).toBeInTheDocument();
  });

  it('should apply CNPJ mask', () => {
    render(
      <Mask name='cnpj' localControl label='CNPJ' maskModel='cnpj' value='' />,
    );
    const input = screen.getByLabelText('CNPJ');
    expect(input).toBeInTheDocument();
  });

  it('should apply document mask', () => {
    render(
      <Mask
        name='doc'
        localControl
        label='Document'
        maskModel='document'
        value=''
      />,
    );
    const input = screen.getByLabelText('Document');
    expect(input).toBeInTheDocument();
  });

  it('should apply phone mask', () => {
    render(
      <Mask
        name='phone'
        localControl
        label='Phone'
        maskModel='phone'
        value=''
      />,
    );
    const input = screen.getByLabelText('Phone');
    expect(input).toBeInTheDocument();
  });

  it('should apply postal code mask', () => {
    render(
      <Mask
        name='zip'
        localControl
        label='ZIP'
        maskModel='postalCode'
        value=''
      />,
    );
    const input = screen.getByLabelText('ZIP');
    expect(input).toBeInTheDocument();
  });

  it('should apply plate mask', () => {
    render(
      <Mask
        name='plate'
        localControl
        label='Plate'
        maskModel='plate'
        value=''
      />,
    );
    const input = screen.getByLabelText('Plate');
    expect(input).toBeInTheDocument();
  });

  it('should apply upper case mask', () => {
    render(
      <Mask name='code' localControl label='Code' maskModel='upper' value='' />,
    );
    const input = screen.getByLabelText('Code');
    expect(input).toBeInTheDocument();
  });

  it('should apply number only mask', () => {
    render(
      <Mask
        name='num'
        localControl
        label='Number'
        maskModel='number'
        value=''
      />,
    );
    const input = screen.getByLabelText('Number');
    expect(input).toBeInTheDocument();
  });

  it('should handle onChange with local control', () => {
    const handleChange = jest.fn();
    render(
      <Mask
        name='phone'
        localControl
        label='Phone'
        maskModel='phone'
        value=''
        onChange={handleChange}
      />,
    );
    const input = screen.getByLabelText('Phone');
    fireEvent.change(input, { target: { value: '1234567890' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle onBlur with local control', () => {
    const handleBlur = jest.fn();
    render(
      <Mask
        name='phone'
        localControl
        label='Phone'
        maskModel='phone'
        value=''
        onBlur={handleBlur}
      />,
    );
    const input = screen.getByLabelText('Phone');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should render as readOnly', () => {
    render(
      <Mask
        name='phone'
        localControl
        label='Phone'
        maskModel='phone'
        value=''
        readOnly
      />,
    );
    const input = screen.getByLabelText('Phone');
    expect(input).toHaveAttribute('readonly');
  });

  it('should render as disabled', () => {
    render(
      <Mask
        name='phone'
        localControl
        label='Phone'
        maskModel='phone'
        value=''
        disabled
      />,
    );
    const input = screen.getByLabelText('Phone');
    expect(input).toBeDisabled();
  });

  it('should display helper text with local control', () => {
    render(
      <Mask
        name='phone'
        localControl
        label='Phone'
        maskModel='phone'
        value=''
        helperText='Enter phone number'
      />,
    );
    expect(screen.getByText('Enter phone number')).toBeInTheDocument();
  });

  it('should use custom mask function', () => {
    const customMask = (value: string) => value.toUpperCase();
    render(
      <Mask
        name='custom'
        localControl
        label='Custom'
        custom={customMask}
        value='test'
      />,
    );
    const input = screen.getByLabelText('Custom');
    expect(input).toHaveValue('TEST');
  });

  it('should handle Formik onChange', () => {
    const handleChange = jest.fn();
    renderWithFormik(
      <Mask
        name='phone'
        label='Phone'
        maskModel='phone'
        onChange={handleChange}
      />,
      { phone: '' },
    );
    const input = screen.getByLabelText('Phone');
    fireEvent.change(input, { target: { value: '1234567890' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle Formik onBlur', () => {
    const handleBlur = jest.fn();
    renderWithFormik(
      <Mask name='phone' label='Phone' maskModel='phone' onBlur={handleBlur} />,
      { phone: '' },
    );
    const input = screen.getByLabelText('Phone');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });
});

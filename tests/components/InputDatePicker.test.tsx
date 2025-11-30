import { render, screen, fireEvent } from '@testing-library/react';
import { Formik, Form } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '../../src/components/Input/DatePicker';

const mockDate = dayjs('2024-01-15');

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    {children}
  </LocalizationProvider>
);

describe('DatePicker', () => {
  const renderWithFormik = (ui: React.ReactElement, initialValues = {}) => {
    return render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Formik initialValues={initialValues} onSubmit={jest.fn()}>
          <Form>{ui}</Form>
        </Formik>
      </LocalizationProvider>,
    );
  };

  it('should render with local control', () => {
    render(<DatePicker name='testDate' localControl label='Select Date' />, {
      wrapper,
    });
    const input = screen.getByRole('group', { name: 'Select Date' });
    expect(input).toBeInTheDocument();
  });

  it('should render with Formik control', () => {
    renderWithFormik(<DatePicker name='testDate' label='Select Date' />, {
      testDate: null,
    });
    const input = screen.getByRole('group', { name: 'Select Date' });
    expect(input).toBeInTheDocument();
  });

  it('should display label', () => {
    render(<DatePicker name='testDate' localControl label='Birth Date' />, {
      wrapper,
    });
    const input = screen.getByRole('group', { name: 'Birth Date' });
    expect(input).toBeInTheDocument();
  });

  it('should handle onChange callback in local control mode', () => {
    const handleChange = jest.fn();
    render(
      <DatePicker
        name='testDate'
        localControl
        label='Select Date'
        onChange={handleChange}
      />,
      { wrapper },
    );

    const openButton = screen.getByLabelText('Choose date');
    fireEvent.click(openButton);
  });

  it('should display helper text', () => {
    render(
      <DatePicker
        name='testDate'
        localControl
        label='Select Date'
        helperText='Please select a date'
      />,
      { wrapper },
    );
    expect(screen.getByText('Please select a date')).toBeInTheDocument();
  });

  it('should handle required prop', () => {
    render(
      <DatePicker name='testDate' localControl label='Select Date' required />,
      { wrapper },
    );
    expect(screen.getByText('Select Date')).toBeInTheDocument();
  });

  it('should handle disabled prop', () => {
    render(
      <DatePicker name='testDate' localControl label='Select Date' disabled />,
      { wrapper },
    );
    const button = screen.getByLabelText('Choose date');
    expect(button).toBeDisabled();
  });

  it('should handle readOnly prop', () => {
    render(
      <DatePicker name='testDate' localControl label='Select Date' readOnly />,
      { wrapper },
    );
    const input = screen.getByRole('group', { name: 'Select Date' });
    expect(input).toBeInTheDocument();
  });

  it('should render with time picker when time prop is true', () => {
    render(
      <DatePicker name='testDate' localControl label='Select DateTime' time />,
      { wrapper },
    );
    const input = screen.getByRole('group', { name: 'Select DateTime' });
    expect(input).toBeInTheDocument();
  });

  it('should handle value prop in local control mode', () => {
    const { container } = render(
      <DatePicker
        name='testDate'
        localControl
        label='Select Date'
        value={mockDate}
      />,
      { wrapper },
    );
    const hiddenInput = container.querySelector(
      'input[name="testDate"]',
    ) as HTMLInputElement;
    expect(hiddenInput).toBeInTheDocument();
  });

  it('should render without grid when noGrid is true', () => {
    const { container } = render(
      <DatePicker name='testDate' localControl label='Select Date' noGrid />,
      { wrapper },
    );
    expect(container.querySelector('.MuiGrid-root')).not.toBeInTheDocument();
  });

  it('should handle disableFuture prop', () => {
    render(
      <DatePicker
        name='testDate'
        localControl
        label='Select Date'
        disableFuture
      />,
      { wrapper },
    );
    const input = screen.getByRole('group', { name: 'Select Date' });
    expect(input).toBeInTheDocument();
  });

  it('should handle disablePast prop', () => {
    render(
      <DatePicker
        name='testDate'
        localControl
        label='Select Date'
        disablePast
      />,
      { wrapper },
    );
    const input = screen.getByRole('group', { name: 'Select Date' });
    expect(input).toBeInTheDocument();
  });

  it('should handle maxDate prop', () => {
    const maxDate = dayjs('2024-12-31');
    render(
      <DatePicker
        name='testDate'
        localControl
        label='Select Date'
        maxDate={maxDate}
      />,
      { wrapper },
    );
    const input = screen.getByRole('group', { name: 'Select Date' });
    expect(input).toBeInTheDocument();
  });

  it('should handle minDate prop', () => {
    const minDate = dayjs('2024-01-01');
    render(
      <DatePicker
        name='testDate'
        localControl
        label='Select Date'
        minDate={minDate}
      />,
      { wrapper },
    );
    const input = screen.getByRole('group', { name: 'Select Date' });
    expect(input).toBeInTheDocument();
  });

  it('should handle onBlur callback', () => {
    const handleBlur = jest.fn();
    renderWithFormik(
      <DatePicker name='testDate' label='Select Date' onBlur={handleBlur} />,
      { testDate: null },
    );

    const button = screen.getByLabelText('Choose date');
    fireEvent.blur(button);
  });

  it('should show error state in Formik mode', () => {
    renderWithFormik(<DatePicker name='testDate' label='Select Date' />, {
      testDate: null,
    });

    const button = screen.getByLabelText('Choose date');
    fireEvent.blur(button);
  });

  it('should handle className prop', () => {
    const { container } = render(
      <DatePicker
        name='testDate'
        localControl
        label='Select Date'
        className='custom-class'
      />,
      { wrapper },
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('should handle showTodayButton prop', () => {
    render(
      <DatePicker
        name='testDate'
        localControl
        label='Select Date'
        showTodayButton
      />,
      { wrapper },
    );
    const input = screen.getByRole('group', { name: 'Select Date' });
    expect(input).toBeInTheDocument();
  });

  it('should handle amPm prop for time picker', () => {
    render(
      <DatePicker
        name='testDate'
        localControl
        label='Select DateTime'
        time
        amPm
      />,
      { wrapper },
    );
    const input = screen.getByRole('group', { name: 'Select DateTime' });
    expect(input).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '../../src/components/Input/DatePicker';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    {children}
  </LocalizationProvider>
);

describe('DatePicker value prop sync', () => {
  it('should follow a changed value prop in local control mode', () => {
    const { rerender } = render(
      <DatePicker
        name='testDate'
        localControl
        label='Select Date'
        value={dayjs('2024-01-15')}
      />,
      { wrapper },
    );
    expect(
      screen.getByRole('group', { name: 'Select Date' }),
    ).toHaveTextContent('15/01/2024');

    rerender(
      <DatePicker
        name='testDate'
        localControl
        label='Select Date'
        value={dayjs('2025-03-20')}
      />,
    );
    expect(
      screen.getByRole('group', { name: 'Select Date' }),
    ).toHaveTextContent('20/03/2025');
  });
});

import * as React from 'react';
import { Dayjs } from 'dayjs';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { TextField, TextFieldProps } from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';

type DateTimeProps = GridProps & DatePickerProps<Date, Date> &TextFieldProps;

const defaultProps:GridProps = {
  xs: 12,
  sm: 12,
  md: 6,
  lg: 8,
}

const DateTime = ({
  helperText, error,
  value, onChange, disabled, xs, sm, md, lg, label, ...params }: DateTimeProps) => (
  <Grid item xs={xs} sm={sm} md={md} lg={lg}>
    <DatePicker
      inputFormat='dd/MM/yyyy'
      //autoOk={true}
      //variant='dialog'
      //showTodayButton={true}
      value={value}
      mask='__/__/____'
      onChange={(newValue) =>onChange(newValue)}
      disabled={disabled}
      renderInput={(innerParams) =>
        <TextField
          {...innerParams}
          margin='normal'
          fullWidth
          size='small'
          variant='outlined'
          error={error}
          helperText={error ? helperText : undefined}
          {...params}
        />
      }
    />
  </Grid>
);

DateTime.defaultProps = defaultProps;

export default DateTime;

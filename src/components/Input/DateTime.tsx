import * as React from 'react';
// import { Dayjs } from 'dayjs';
// import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
// import { TextField } from '@mui/material';
import Grid, { GridProps } from '@mui/material/Grid';
import { TextFieldProps } from '@mui/material/TextField';
// import { DateTimePickerProps } from '@mui/x-date-pickers';

// export interface DateTimeMyProps extends Partial<DatePickerProps> {
//   time?: boolean
// }

type DateTimeProps = GridProps & TextFieldProps;// & DateTimeMyProps;

const DateTime = ({ helperText, error,
  //time,
  value, onChange, disabled, xs, sm, md, lg, ...params }: DateTimeProps) => (
  <Grid item xs={xs} sm={sm} md={md} lg={lg}>
    {/* <DatePicker
      inputFormat={time ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'}
      autoOk={true}
      variant='dialog'
      showTodayButton={true}
      value={value}
      mask={time ? '__/__/____ __:__' : '__/__/____'}
      onChange={onChange}
      disabled={disabled}
      renderInput={(innerParams: TextFieldProps) =>
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
    /> */}
  </Grid>
);


export default DateTime;
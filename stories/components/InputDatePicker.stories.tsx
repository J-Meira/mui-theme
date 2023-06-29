import React from 'react';
import type { Meta } from '@storybook/react';
import { Grid } from '@mui/material';

import { DatePickerInput } from '../../src';

export default {
  title: 'Components/InputDatePicker',
  component: DatePickerInput,
  tags: ['autodocs'],
  args: {
    name: 'date',
    label: 'Date',
    grid: {
      md: 12,
      lg: 12,
    },
  },
} satisfies Meta<typeof DatePickerInput>;

export const Basic = ({ ...args }) => (
  <Grid container spacing={2}>
    <DatePickerInput isNoFormik {...args} />
  </Grid>
);

export const WithTime = ({ ...args }) => (
  <Grid container spacing={2}>
    <DatePickerInput isNoFormik time {...args} />
  </Grid>
);

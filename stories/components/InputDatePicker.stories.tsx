import React from 'react';
import type { Meta } from '@storybook/react';
import { Grid } from '@mui/material';

import { DatePicker } from '../../src';

export default {
  title: 'Components/InputDatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  args: {
    name: 'date',
    label: 'Date',
    grid: {
      md: 12,
      lg: 12,
    },
  },
} satisfies Meta<typeof DatePicker>;

export const Basic = ({ name, ...args }) => (
  <Grid container spacing={2}>
    <DatePicker name={name} localControl {...args} />
  </Grid>
);

export const WithTime = ({ name, ...args }) => (
  <Grid container spacing={2}>
    <DatePicker name={name} localControl time {...args} />
  </Grid>
);

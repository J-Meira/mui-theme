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

export const Basic = ({ ...args }) => (
  <Grid container spacing={2}>
    <DatePicker isNoFormik {...args} />
  </Grid>
);

export const WithTime = ({ ...args }) => (
  <Grid container spacing={2}>
    <DatePicker isNoFormik time {...args} />
  </Grid>
);

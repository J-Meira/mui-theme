import React from 'react';
import { Meta } from '@storybook/react';
import { Grid2 } from '@mui/material';

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
  <Grid2 container spacing={2}>
    <DatePicker {...args} name='basic' localControl />
  </Grid2>
);

export const WithTime = ({ name, ...args }) => (
  <Grid2 container spacing={2}>
    <DatePicker {...args} name='WithTime' localControl time />
  </Grid2>
);

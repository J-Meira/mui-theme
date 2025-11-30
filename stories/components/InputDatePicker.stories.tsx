import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from '@mui/material';

import { DatePicker } from '../../src';

const meta = {
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

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Grid container spacing={2}>
      <DatePicker {...args} name='basic' localControl />
    </Grid>
  ),
};

export const WithTime: Story = {
  render: (args) => (
    <Grid container spacing={2}>
      <DatePicker {...args} name='WithTime' localControl time />
    </Grid>
  ),
};

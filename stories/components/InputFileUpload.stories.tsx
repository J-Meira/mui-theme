import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from '@mui/material';

import { FileUpload } from '../../src';

const meta = {
  title: 'Components/InputFileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  args: {
    name: 'file',
    label: 'File',
    placeholder: 'Select a File',
    deleteLabel: 'Clear',
    accept: 'image/*',
    hideSizeText: false,
    grid: {
      md: 12,
      lg: 12,
    },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: ({ ...args }) => (
    <Grid container spacing={2}>
      <FileUpload {...args} />
    </Grid>
  ),
};

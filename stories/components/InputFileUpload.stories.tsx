import React from 'react';

import type { Meta } from '@storybook/react';
import { Grid } from '@mui/material';

import { FileUpload } from '../../src';

export default {
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

export const Basic = ({ ...args }) => (
  <Grid container spacing={2}>
    <FileUpload name={args.name} grid={args.grid} {...args} />
  </Grid>
);

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Grid2 } from '@mui/material';

import { Button, MultiProvider } from '../../src';

const meta = {
  title: 'Components/MultiProvider',
  component: MultiProvider,
  tags: ['autodocs'],
  argTypes: {
    palette: {
      primary: {
        light: { control: 'color' },
        main: { control: 'color' },
        dark: { control: 'color' },
        contrastText: { control: 'color' },
      },
      secondary: {
        light: { control: 'color' },
        main: { control: 'color' },
        dark: { control: 'color' },
        contrastText: { control: 'color' },
      },
    },
  },
} satisfies Meta<typeof MultiProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    adapterLocalePtBR: true,
    snackAnchorHorizontal: 'right',
    snackAnchorVertical: 'top',
    snackAutoHideDuration: 5000,
    snackMax: 3,
    palette: {
      primary: {
        light: '#ff5f4e',
        main: '#ed1c24',
        dark: '#b20000',
        contrastText: '#fff',
      },
      secondary: {
        light: '#cdd0d9',
        main: '#9c9fa8',
        dark: '#6e7179',
        contrastText: '#000',
      },
    },
    children: (
      <Grid2 container>
        <Grid2 size={12}>
          <Button>Basic</Button>
        </Grid2>
      </Grid2>
    ),
  },
};

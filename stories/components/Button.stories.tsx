import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Edit } from '@mui/icons-material';

import { Button } from '../../src';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    colors: {
      text: { control: 'color' },
      background: { control: 'color' },
      backgroundHover: { control: 'color' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    fullWidth: false,
    children: 'Basic',
  },
};

export const Custom: Story = {
  args: {
    fullWidth: false,
    children: 'Custom',
    model: 'custom',
    colors: {
      text: '#000',
      background: '#9c9fa8',
      backgroundHover: '#6e7179',
    },
  },
};

export const Icom: Story = {
  args: {
    children: <Edit />,
    model: 'icon',
  },
};

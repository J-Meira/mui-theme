import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MdEdit as EditIcon } from 'react-icons/md';

import { Button } from '../../src';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    fullWidth: false,
    children: 'Basic',
  },
};

export const Responsive: Story = {
  args: {
    fullWidth: false,
    children: 'Responsive',
    model: 'responsive',
    icon: <EditIcon />,
  },
};

export const Icom: Story = {
  args: {
    children: <EditIcon />,
    model: 'icon',
  },
};

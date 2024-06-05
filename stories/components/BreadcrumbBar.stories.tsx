import { Meta, StoryObj } from '@storybook/react';

import { BreadcrumbBar } from '../../src';

const meta = {
  title: 'Components/BreadcrumbBar',
  component: BreadcrumbBar,
  tags: ['autodocs'],
} satisfies Meta<typeof BreadcrumbBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    list: [
      {
        label: 'Home',
        link: '/',
      },
      {
        label: 'Registrations',
        link: '/registrations',
      },
      {
        label: 'Users',
      },
    ],
  },
};

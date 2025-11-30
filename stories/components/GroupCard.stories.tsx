import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Input, GroupCard } from '../../src';

const meta = {
  title: 'Components/GroupCard',
  component: GroupCard,
  tags: ['autodocs'],
  args: {
    title: 'Title here',
    collapsed: false,
    noGridSizes: false,
    openStart: false,
    md: 12,
    sm: 12,
    xs: 12,
  },
} satisfies Meta<typeof GroupCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: ({ ...args }) => {
    return (
      <GroupCard {...args}>
        <Input
          localControl
          label='Login'
          name='login'
          grid={{ lg: 12, md: 12 }}
        />
        <Input
          localControl
          label='Password'
          name='password'
          model='password'
          grid={{ lg: 12, md: 12 }}
        />
      </GroupCard>
    );
  },
};

export const Collapsed: Story = {
  render: ({ ...args }) => {
    return (
      <GroupCard {...args} collapsed={true}>
        <Input
          localControl
          label='Login'
          name='login2'
          grid={{ lg: 12, md: 12 }}
        />
        <Input
          localControl
          label='Password'
          name='password2'
          model='password'
          grid={{ lg: 12, md: 12 }}
        />
      </GroupCard>
    );
  },
};

export const CollapsedOpen: Story = {
  render: ({ ...args }) => {
    return (
      <GroupCard {...args} collapsed={true} openStart={true}>
        <Input
          localControl
          label='Login'
          name='login3'
          grid={{ lg: 12, md: 12 }}
        />
        <Input
          localControl
          label='Password'
          name='password3'
          model='password'
          grid={{ lg: 12, md: 12 }}
        />
      </GroupCard>
    );
  },
};

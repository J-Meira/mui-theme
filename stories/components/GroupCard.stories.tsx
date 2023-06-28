import type { Meta } from '@storybook/react';

import { Input, GroupCard } from '../../src';

export default {
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

export const Basic = ({ ...args }) => {
  return (
    <GroupCard {...args}>
      <Input isNoFormik label='Login' name='login' grid={{ lg: 12, md: 12 }} />
      <Input
        isNoFormik
        label='Password'
        name='password'
        model='password'
        grid={{ lg: 12, md: 12 }}
      />
    </GroupCard>
  );
};

export const Collapsed = ({ ...args }) => {
  return (
    <GroupCard {...args} collapsed={true}>
      <Input isNoFormik label='Login' name='login' grid={{ lg: 12, md: 12 }} />
      <Input
        isNoFormik
        label='Password'
        name='password'
        model='password'
        grid={{ lg: 12, md: 12 }}
      />
    </GroupCard>
  );
};

export const CollapsedOpen = ({ ...args }) => {
  return (
    <GroupCard {...args} collapsed={true} openStart={true}>
      <Input isNoFormik label='Login' name='login' grid={{ lg: 12, md: 12 }} />
      <Input
        isNoFormik
        label='Password'
        name='password'
        model='password'
        grid={{ lg: 12, md: 12 }}
      />
    </GroupCard>
  );
};

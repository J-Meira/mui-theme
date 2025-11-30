import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { MdHome as HomeIcon, MdList as ListIcon } from 'react-icons/md';
import { SideBarItem } from '../../src';

const meta = {
  title: 'Components/SideBarItem',
  component: SideBarItem,
  tags: ['autodocs'],
} satisfies Meta<typeof SideBarItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    expanded: true,
    icon: <HomeIcon />,
    label: 'Home',
    selected: false,
  },
};

export const Active: Story = {
  args: {
    expanded: true,
    icon: <HomeIcon />,
    label: 'Home',
    selected: true,
  },
};

export const WithChildren: Story = {
  args: {
    expanded: true,
    icon: <ListIcon />,
    iconColor: (theme) => theme.palette.success.main,
    textColor: (theme) => theme.palette.success.main,
    children: (
      <>
        <SideBarItem
          label='Users'
          selected={false}
          expanded={true}
          onClick={() => console.log('go home')}
        />
        <SideBarItem
          label='To JMCreative.com.br'
          selected={false}
          expanded={true}
          textColor={(theme) => theme.palette.success.main}
        />
      </>
    ),
    label: 'Lists',
    selected: true,
  },
};

export const OpenOnStart: Story = {
  args: {
    expanded: true,
    icon: <ListIcon />,
    initialState: true,
    children: (
      <>
        <SideBarItem
          label='Clients'
          selected={false}
          expanded={true}
          onClick={() => console.log('go home')}
        />
        <SideBarItem
          label='Users'
          selected={false}
          expanded={true}
          onClick={() => console.log('go home')}
        />
      </>
    ),
    label: 'Lists',
    selected: true,
  },
};

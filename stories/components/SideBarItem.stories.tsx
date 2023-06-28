import type { Meta, StoryObj } from '@storybook/react';
import { Home, List } from '@mui/icons-material';

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
    icon: <Home />,
    label: 'Home',
    selected: false,
  },
};

export const Active: Story = {
  args: {
    expanded: true,
    icon: <Home />,
    label: 'Home',
    selected: true,
  },
};

export const WithChildren: Story = {
  args: {
    expanded: true,
    icon: <List />,
    children: (
      <>
        <SideBarItem
          label='Clients'
          selected={false}
          expanded={true}
          action={() => console.log('go home')}
        />
        <SideBarItem
          label='Users'
          selected={false}
          expanded={true}
          action={() => console.log('go home')}
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
    icon: <List />,
    initialState: true,
    children: (
      <>
        <SideBarItem
          label='Clients'
          selected={false}
          expanded={true}
          action={() => console.log('go home')}
        />
        <SideBarItem
          label='Users'
          selected={false}
          expanded={true}
          action={() => console.log('go home')}
        />
      </>
    ),
    label: 'Lists',
    selected: true,
  },
};

import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button, ListMenu, ListMenuItemProps, ListMenuProps } from '../../src';

const meta = {
  title: 'Components/ListMenu',
  component: ListMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof ListMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    menu: {
      open: false,
      anchorEl: null,
      list: [],
    },
    toggle: () => null,
    navigate: (d) => console.log(d),
  },
  render: () => {
    const [userMenu, setUserMenu] = useState<ListMenuProps>({
      open: false,
      anchorEl: null,
      list: [],
    });

    const controlMenu = (event: React.MouseEvent<HTMLElement>) => {
      console.log(event);
      const list: ListMenuItemProps[] = [
        {
          label: 'Users',
          action: () => closeMenu(),
        },
        {
          label: 'SignOut',
          action: () => closeMenu(),
        },
      ];

      setUserMenu({
        open: true,
        list: list,
        anchorEl: event.currentTarget,
      });
    };

    const closeMenu = () => {
      setUserMenu({
        open: false,
        list: [],
        anchorEl: null,
      });
    };

    return (
      <div className='story-book'>
        <Button onClick={(e) => controlMenu(e)}>Open</Button>
        <ListMenu
          menu={userMenu}
          toggle={closeMenu}
          navigate={(destiny) => console.log(destiny)}
        />
      </div>
    );
  },
};

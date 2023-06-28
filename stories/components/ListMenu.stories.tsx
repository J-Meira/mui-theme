import type { Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Button, ListMenu, ListMenuItemProps, ListMenuProps } from '../../src';

export default {
  title: 'Components/ListMenu',
  component: ListMenu,
  tags: ['autodocs'],
  args: {
    menu: {
      open: false,
      anchorEl: null,
      list: [],
    },
  },
} satisfies Meta<typeof ListMenu>;

export const Basic = () => {
  const [userMenu, setUserMenu] = useArgs<ListMenuProps>();

  const controlMenu = (event: React.MouseEvent<HTMLElement>) => {
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
};

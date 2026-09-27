import { useId } from 'react';
import { Menu, MenuItem } from '@mui/material';

export interface ListMenuItemProps {
  label: string;
  destiny?: string;
  action?: (params?: any) => void;
}

export interface ListMenuProps {
  open: boolean;
  anchorEl?: HTMLElement | null;
  list?: ListMenuItemProps[];
  id?: string;
}

export interface ListMenuPropExt {
  menu: ListMenuProps;
  toggle: () => void;
  navigate: (destiny: string) => void;
}

export const ListMenu = ({ menu, toggle, navigate }: ListMenuPropExt) => {
  const generatedId = useId();
  const menuId = menu.id ?? generatedId;

  const menuClick = (item: ListMenuItemProps) => {
    toggle();
    if (item.destiny) navigate(item.destiny);
    if (item.action) item.action();
  };

  return (
    <Menu
      id={menuId}
      anchorEl={menu.anchorEl}
      keepMounted
      open={menu.open}
      onClose={toggle}
    >
      {menu.list &&
        menu.list.map((item) => (
          <MenuItem
            key={`${item.label}-${item.destiny ?? ''}`}
            onClick={() => menuClick(item)}
          >
            {item.label}
          </MenuItem>
        ))}
    </Menu>
  );
};

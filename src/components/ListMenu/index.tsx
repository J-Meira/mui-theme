import {
  Menu,
  MenuItem,
} from '@mui/material';

export interface ListMenuItemProps {
  label: string,
  destiny?: string,
  action?: (params?: any) => any
}

export interface ListMenuProps {
  open: boolean,
  anchorEl?: HTMLElement | null,
  list?: ListMenuItemProps[],
}

interface ListMenuPropExt {
  menu: ListMenuProps,
  toggle: () => any,
  navigate: (destiny?: string) => any
}

export const ListMenu = ({
  menu,
  toggle,
  navigate,
}: ListMenuPropExt) => {

  const menuClick = (item: ListMenuItemProps) => {
    toggle();
    if (item.destiny) navigate(item.destiny);
    if (item.action) item.action();
  }

  return (
    <Menu
      id='simple-menu'
      anchorEl={menu.anchorEl}
      keepMounted
      open={menu.open}
      onClose={toggle}
    >
      {menu.list &&
        menu.list.map((item, index) => (
          <MenuItem
            key={`${index} - ${item.label}`}
            onClick={() => menuClick(item)}
          >
            {item.label}
          </MenuItem>
        ))}
    </Menu>
  );
}

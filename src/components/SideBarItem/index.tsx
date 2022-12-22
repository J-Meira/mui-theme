import { Fragment, useState } from 'react';

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Collapse,
} from '@mui/material';

import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface SideBarItemProps {
  label: string,
  icon?: React.ReactNode,
  selected: boolean,
  action?: (params: any) => any,
  initialState?: boolean,
  secondary?: boolean,
  collapsed?: boolean,
  children?: React.ReactNode,
};

const SideBarItem = ({
  label,
  icon,
  selected,
  action,
  initialState,
  secondary,
  collapsed,
  children,
}: SideBarItemProps) => {
  const [open, setOpen] = useState(initialState);

  return children ? (
    <Fragment>
      <ListItem disablePadding onClick={() => setOpen(!open)}>
        <ListItemButton selected={selected}>
          {icon && (
            <ListItemIcon>
              {icon}
            </ListItemIcon>
          )}
          {!collapsed && (
            <Fragment>
              <ListItemText primary={label} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </Fragment>
          )}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {children}
        </List>
      </Collapse>
    </Fragment>
  ) : (
    <ListItem
    disablePadding
      onClick={action}
      className={secondary ? selected ? 'secondary-selected' : 'secondary' : ''}
    >
      <ListItemButton selected={selected}>
        {icon && (
          <ListItemIcon>
            {icon}
          </ListItemIcon>
        )}
        {!collapsed && (
          <ListItemText primary={label} />
        )}
      </ListItemButton>
    </ListItem>
  );
}

export default SideBarItem;

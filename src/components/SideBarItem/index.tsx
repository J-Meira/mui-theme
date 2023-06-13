import { Fragment, useEffect, useState } from 'react';

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Collapse,
} from '@mui/material';

import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

export interface SideBarItemProps {
  action?: (params?: any) => void;
  children?: React.ReactNode;
  expanded?: boolean;
  icon?: React.ReactNode;
  initialState?: boolean;
  label: string;
  secondary?: boolean;
  selected: boolean;
}

export const SideBarItem = ({
  action,
  children,
  expanded,
  icon,
  initialState,
  label,
  secondary,
  selected,
}: SideBarItemProps) => {
  const [open, setOpen] = useState(initialState);

  useEffect(() => {
    if (!expanded && open) setOpen(false);
  }, [expanded, open]);

  return children ? (
    <Fragment>
      <ListItem disablePadding onClick={() => setOpen(!open)}>
        <ListItemButton selected={selected}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          {expanded && <ListItemText primary={label} />}
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
      className={
        secondary ? (selected ? 'secondary-selected' : 'secondary') : ''
      }
    >
      <ListItemButton selected={selected}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        {expanded && <ListItemText primary={label} />}
      </ListItemButton>
    </ListItem>
  );
};

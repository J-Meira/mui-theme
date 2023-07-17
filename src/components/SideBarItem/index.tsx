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
  sideBarControl?: () => void;
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
  sideBarControl,
}: SideBarItemProps) => {
  const [open, setOpen] = useState(initialState);

  const openMain = () => {
    if (!open && !expanded && sideBarControl) {
      sideBarControl();
    }
    setOpen(!open);
  };

  const labelToIcon = () => {
    const splited = label.split(' ');
    return splited.length > 1
      ? `${splited[0][0]}${splited[1][0]}`
      : `${splited[0][0]}${splited[0][1]}`;
  };

  useEffect(() => {
    if (!expanded && open) setOpen(false);

    // eslint-disable-next-line
  }, [expanded]);

  return children ? (
    <Fragment>
      <ListItem disablePadding onClick={openMain}>
        <ListItemButton selected={selected} title={label}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          {expanded !== false && <ListItemText primary={label} />}
          {!icon && expanded === false && (
            <ListItemText primary={labelToIcon()} />
          )}
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
      <ListItemButton selected={selected} title={label}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        {expanded !== false && <ListItemText primary={label} />}
        {!icon && expanded === false && (
          <ListItemText primary={labelToIcon()} />
        )}
      </ListItemButton>
    </ListItem>
  );
};

import { ReactNode, useEffect, useState } from 'react';

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Collapse,
  ListItemButtonProps,
} from '@mui/material';

import {
  MdExpandLess as ExpandLessIcon,
  MdExpandMore as ExpandMoreIcon,
} from 'react-icons/md';

export interface SideBarItemProps extends ListItemButtonProps {
  destiny?: string;
  expanded?: boolean;
  icon?: ReactNode;
  initialState?: boolean;
  label: string;
  secondary?: boolean;
  sideBarControl?: () => void;
}

export const SideBarItem = ({
  children,
  expanded,
  icon,
  initialState,
  label,
  secondary,
  selected,
  sideBarControl,
  ...rest
}: SideBarItemProps) => {
  const [open, setOpen] = useState(initialState);

  const openMain = () => {
    if (!open && !expanded && sideBarControl) {
      sideBarControl();
    }
    setOpen(!open);
  };

  const labelToIcon = () => {
    const s = label.split(' ');
    return s.length > 1 ? `${s[0][0]}${s[1][0]}` : `${s[0][0]}${s[0][1]}`;
  };

  useEffect(() => {
    if (!expanded && open) setOpen(false);

    // eslint-disable-next-line
  }, [expanded]);

  return children ? (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={openMain}
          title={label}
          selected={selected}
          {...rest}
        >
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
    </>
  ) : (
    <ListItem
      disablePadding
      className={
        secondary ? (selected ? 'secondary-selected' : 'secondary') : ''
      }
    >
      <ListItemButton title={label} selected={selected} {...rest}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        {expanded !== false && <ListItemText primary={label} />}
        {!icon && expanded === false && (
          <ListItemText primary={labelToIcon()} />
        )}
      </ListItemButton>
    </ListItem>
  );
};

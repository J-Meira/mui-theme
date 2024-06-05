import { ReactNode, useEffect, useState } from 'react';

import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
} from '@mui/material';

import {
  MdExpandLess as ExpandLessIcon,
  MdExpandMore as ExpandMoreIcon,
} from 'react-icons/md';

export interface SideBarItemProps {
  children?: ReactNode;
  expanded?: boolean;
  icon?: ReactNode;
  initialState?: boolean;
  label: string;
  secondary?: boolean;
  sideBarControl?: () => void;
  iconColor?: (theme: Theme) => string;
  textColor?: (theme: Theme) => string;
  onClick?: () => void;

  selected?: boolean;
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
  onClick,
  iconColor = () => '#fff',
  textColor = () => '#fff',
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

  const render = (() => (
    <>
      {icon && <ListItemIcon sx={{ color: iconColor }}>{icon}</ListItemIcon>}
      {expanded !== false && (
        <ListItemText sx={{ color: textColor }} primary={label} />
      )}
      {!icon && expanded === false && (
        <ListItemText sx={{ color: textColor }} primary={labelToIcon()} />
      )}
    </>
  ))();

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
          {render}
          <Box sx={{ color: '#fff !important' }}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
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
      <ListItemButton
        onClick={onClick}
        title={label}
        selected={selected}
        {...rest}
      >
        {render}
      </ListItemButton>
    </ListItem>
  );
};

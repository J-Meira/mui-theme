import { Fragment, useState } from 'react';

import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

export interface TreeListItemProps {
  children?: React.ReactNode;
  collapseHorizontal?: boolean;
  hierarchy: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  label: string;
  onSelect: (params?: any) => void;
  selected: boolean;
}

export const TreeListItem = ({
  children,
  collapseHorizontal,
  hierarchy,
  label,
  onSelect,
  selected,
}: TreeListItemProps) => {
  const [open, setOpen] = useState(false);

  const mainSelect = () => {
    onSelect();
  };

  return children ? (
    <Fragment>
      <ListItem className={`tree-item ${hierarchy}`} disablePadding>
        <ListItemButton>
          <ListItemIcon onClick={() => setOpen(!open)}>
            {open ? <RemoveIcon /> : <AddIcon />}
          </ListItemIcon>
          <ListItemIcon>
            <Checkbox
              checked={selected}
              disableRipple
              edge='start'
              inputProps={{ 'aria-labelledby': label }}
              onChange={mainSelect}
              tabIndex={-1}
            />
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      </ListItem>
      <Collapse
        in={open}
        orientation={collapseHorizontal ? 'horizontal' : 'vertical'}
        timeout='auto'
        unmountOnExit
      >
        <List component='div' disablePadding>
          {children}
        </List>
      </Collapse>
    </Fragment>
  ) : (
    <ListItem className={`tree-item ${hierarchy}`} disablePadding>
      <ListItemButton onClick={onSelect}>
        <ListItemIcon>
          <Checkbox
            checked={selected}
            disableRipple
            edge='start'
            inputProps={{ 'aria-labelledby': label }}
            tabIndex={-1}
          />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};

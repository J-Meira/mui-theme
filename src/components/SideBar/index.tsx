
import { useState } from 'react';

import {
  Drawer,
  List,
  Popover,
  Typography,
} from '@mui/material';

interface SideBarProps {
  logo: string,
  icon: string,
  open: boolean,
  version: string,
  versionDate: string,
  navigate: (params: any) => any,
  onMouseHover: (state: boolean) => any,
  children?: React.ReactNode,
};

const SideBar = ({ logo, icon, open, version, versionDate, onMouseHover, navigate, children }: SideBarProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  return (
    <Drawer
      variant='permanent'
      anchor='left'
      open={open}
      className={open ? 'side-bar' : 'side-bar-collapsed'}
      onMouseEnter={() => onMouseHover(true)}
      onMouseLeave={() => onMouseHover(true)}
    >
      <div className='side-bar-header'>
        <img
          src={open ? logo : icon}
          alt='Logo'
          className='logo'
          onClick={navigate}
        />
      </div>
      <div className='side-bar-body'>
        <List>
          {children}
        </List>
      </div>
      {(version && versionDate) && (
        <div className='side-bar-footer'>
          <small
            aria-owns={openPopover ? 'version-date-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            {version}
          </small>
          <Popover
            id="version-date-popover"
            sx={{
              pointerEvents: 'none',
            }}
            open={openPopover}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>{versionDate}</Typography>
          </Popover>
        </div>
      )}
    </Drawer>
  );
}

export default SideBar;


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
  expanded: boolean,
  version: string,
  versionDate: string,
  homeNavigate: (destiny: any) => any,
  onMouseHover: (state: boolean) => any,
  children?: React.ReactNode,
};

const SideBar = ({
  logo,
  icon,
  expanded,
  version,
  versionDate,
  onMouseHover,
  homeNavigate,
  children,
}: SideBarProps) => {
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
      open={expanded}
      className={`side-bar ${!expanded ? 'side-bar-collapsed' : ''}`}
      onMouseEnter={() => onMouseHover(true)}
      onMouseLeave={() => onMouseHover(false)}
    >
      <div className='side-bar-header'>
        <img
          src={expanded ? logo : icon}
          alt='Logo'
          className='logo'
          onClick={homeNavigate}
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
            <Typography>{versionDate}</Typography>
          </Popover>
        </div>
      )}
    </Drawer>
  );
}

export default SideBar;

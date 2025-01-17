import { Fragment, useEffect, useState } from 'react';

import { Drawer, DrawerProps, List, Popover, Typography } from '@mui/material';
import { useWindowDimensions } from '../../hooks';

export interface SideBarProps {
  logo: string;
  icon: string;
  expanded: boolean;
  version?: string;
  versionDate?: string;
  sideBarControl: () => void;
  homeNavigate: (destiny: any) => void;
  onMouseHover?: (state: boolean) => void;
  children?: React.ReactNode;
}

export const SideBar = ({
  logo,
  icon,
  expanded,
  version,
  versionDate,
  sideBarControl,
  onMouseHover,
  homeNavigate,
  children,
}: SideBarProps) => {
  const { width } = useWindowDimensions();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();
  const [type, setType] = useState<DrawerProps['variant']>('permanent');
  const [className, setClassName] = useState('side-bar');

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  useEffect(() => {
    let type: DrawerProps['variant'] = 'permanent';
    let className = 'side-bar';

    if (width < 840) {
      type = 'persistent';
    }

    if (width >= 840) {
      className = `side-bar ${!expanded ? 'side-bar-collapsed' : ''}`;
    }

    setType(type);
    setClassName(className);
  }, [width, expanded]);

  return (
    <Fragment>
      {expanded && type === 'persistent' && (
        <div className='click-listener' onClick={() => sideBarControl()}></div>
      )}
      <Drawer
        variant={type}
        anchor='left'
        open={expanded}
        className={className}
        onMouseEnter={onMouseHover ? () => onMouseHover(true) : undefined}
        onMouseLeave={onMouseHover ? () => onMouseHover(false) : undefined}
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
          <List>{children}</List>
        </div>
        {version && versionDate && (
          <div className='side-bar-footer'>
            <Typography
              component='small'
              aria-owns={openPopover ? 'version-date-popover' : undefined}
              aria-haspopup='true'
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              sx={{ color: '#fff !important;' }}
            >
              {version}
            </Typography>
            <Popover
              id='version-date-popover'
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
    </Fragment>
  );
};

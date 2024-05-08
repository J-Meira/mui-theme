import { AppBar, Toolbar, IconButton } from '@mui/material';
import { MdMenu as MenuIcon } from 'react-icons/md';
export interface HeaderProps {
  sideBarControl?: () => void;
  sideBarExpanded?: boolean;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Header = ({
  sideBarControl,
  sideBarExpanded,
  navigation,
  actions,
}: HeaderProps) => (
  <AppBar position='fixed' className='app-bar'>
    <Toolbar
      className={`tool-bar ${
        sideBarExpanded === undefined
          ? 'tool-bar-full'
          : !sideBarExpanded
          ? 'tool-bar-expanded'
          : ''
      }`}
    >
      {(navigation || sideBarControl) && (
        <div className='navigation-bar'>
          {sideBarControl && (
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={sideBarControl}
            >
              <MenuIcon />
            </IconButton>
          )}
          {navigation}
        </div>
      )}
      {actions && <div className='actions-bar'>{actions}</div>}
    </Toolbar>
  </AppBar>
);

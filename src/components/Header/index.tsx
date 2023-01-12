import {
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  sideBarControl: () => any,
  sideBarExpanded: boolean,
  navigation?: React.ReactNode,
  actions?: React.ReactNode,
};

export const Header = ({
  sideBarControl,
  sideBarExpanded,
  navigation,
  actions,
}: HeaderProps) => (
  <AppBar
    position='fixed'
    className='app-bar'>
    <Toolbar className={`tool-bar ${!sideBarExpanded ? 'tool-bar-expanded' : ''}`}>
      <div className='navigation-bar'>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={sideBarControl}>
          <MenuIcon />
        </IconButton>
        {navigation}
      </div>
      {actions && (
        <div className='actions-bar'>
          {actions}
        </div>
      )}
    </Toolbar>
  </AppBar>
);

import { AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  sideBarControl: () => any,
  navigation?: React.ReactNode,
  actions?: React.ReactNode,
};

const Header = ({ sideBarControl, navigation, actions }: HeaderProps) => (
  <AppBar
    position='fixed'
    className='app-bar'>
    <Toolbar className='tool-bar'>
      <div className='navigation-bar' style={{paddingLeft:'15rem'}}>
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

export default Header;

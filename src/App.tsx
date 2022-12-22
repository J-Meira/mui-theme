import React, { useState } from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';

import logo from './logo.svg';
import icon from './logo-unica.svg';
import SideBarItem from './components/SideBarItem';
import MultiProvider from './components/MultiProvider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import BreadcrumbBar from './components/BreadcrumbBar';
import Button from './components/Button';

const App = () => {
  const [open, setOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="App">
      <MultiProvider
        palette={{
          mode: 'dark',
          primary: {
            light: '#ff5f4e',
            main: '#ed1c24',
            dark: '#b20000',
            contrastText: '#fff',
          },
          secondary: {
            light: '#cdd0d9',
            main: '#9c9fa8',
            dark: '#6e7179',
            contrastText: '#000',
          },
        }}>
        <Header sideBarControl={() => setOpen(!open)} />
        <SideBar
          open={open}
          logo={logo}
          icon={icon}
          version='v1.0.1'
          versionDate='De: 25/03/2022 as 1:50'
          navigate={() => console.log('NAVIGATE TEST')}
          onMouseHover={setOpen}
        >
          <SideBarItem
            label='without icon'
            selected={true}
            action={() => console.log('WITHOU ICON CLICKED')}
            collapsed={collapsed}
          />
          <SideBarItem
            label='with icon'
            icon={<InboxIcon />}
            selected={false}
            action={() => console.log('WITH ICON CLICKED')}
            collapsed={collapsed}
          />
          <SideBarItem
            label='parent closed'
            icon={<InboxIcon />}
            selected={false}
            collapsed={collapsed}
          >
            <SideBarItem
              label='without icon'
              selected={true}
              action={() => console.log('WITHOU ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
          </SideBarItem>
          <SideBarItem
            label='parent open'
            icon={<InboxIcon />}
            selected={true}
            initialState={true}
            collapsed={collapsed}
          >
            <SideBarItem
              label='without icon'
              selected={true}
              action={() => console.log('WITHOU ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              collapsed={collapsed}
              secondary={true}
            />
          </SideBarItem>
        </SideBar>

        <div style={{ padding: '15rem' }}>
          <BreadcrumbBar list={[
            {
              label: 'home',
              link: '/'
            },
            {
              label: 'home',
            },
            {
              label: 'home',
            }
          ]} />
          <Button>
            test
          </Button>
        </div>
      </MultiProvider>
    </div>
  );
}

export default App;

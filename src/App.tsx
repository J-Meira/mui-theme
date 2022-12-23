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
import Grid from '@mui/material/Grid';
import Input from './components/Input';

const App = () => {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(true);

  const sideBarControl = () => {
    setOpen(!open);
    setExpanded(!expanded);
  }

  const sideBarMouseHover = (status: boolean) => {
    if (!open) {
      setExpanded(status);
    }
  }

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
        <Header
          sideBarControl={sideBarControl}
          sideBarExpanded={open}
          navigation={<Button color='secondary'>test</Button>}
          actions={<Button color='secondary'>test</Button>}
        />
        <SideBar
          expanded={expanded}
          logo={logo}
          icon={icon}
          version='v1.0.1'
          versionDate='De: 25/03/2022 as 1:50'
          navigate={() => console.log('NAVIGATE TEST')}
          onMouseHover={sideBarMouseHover}
        >
          <SideBarItem
            label='with icon'
            icon={<InboxIcon />}
            selected={false}
            action={() => console.log('WITH ICON CLICKED')}
            expanded={expanded}
          />
          <SideBarItem
            label='parent closed'
            icon={<InboxIcon />}
            selected={false}
            expanded={expanded}
          >
            <SideBarItem
              label='without icon'
              selected={true}
              action={() => console.log('WITHOU ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
          </SideBarItem>
          <SideBarItem
            label='parent open'
            icon={<InboxIcon />}
            selected={true}
            initialState={true}
            expanded={expanded}
          >
            <SideBarItem
              label='without icon'
              selected={true}
              action={() => console.log('WITHOU ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              expanded={expanded}
              secondary={true}
            />
            <SideBarItem
              label='with icon'
              icon={<InboxIcon />}
              selected={false}
              action={() => console.log('WITH ICON CLICKED')}
              expanded={expanded}
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
          <Grid container>
            <Input
              id='email'
              label='Email'
              type='email'
              name='email'
              autoFocus
              required
            />
            <Input
              id='email'
              label='Email'
              type='email'
              name='email'
              autoFocus
              required
              error={true}
              helperText={'feedBacks.email || feedBacks.form'}
            />
            <Input
              id='subTotal'
              label='Sub Total'
              name='subTotal'
              model='currency'
              value='0,00'
            />
          </Grid>
        </div>
      </MultiProvider>
    </div>
  );
}

export default App;

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
import DialogBox, { DialogProps } from './components/DialogBox';
import PopUp from './components/PopUp';
import ListMenu, { ListMenuItemProps, ListMenuProps } from './components/ListMenu';
import MainContainer from './components/MainContainer';

const topFilms = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 }
];

const msg = `
This HTML file is a template.
If you open it directly in the browser, you will see an empty page.

You can add webfonts, meta tags, or analytics to this file.
The build step will place the bundled scripts into the <body> tag.
`;

const App = () => {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [dialog, setDialog] = useState<DialogProps>({
    open: true,
    cancel: true,
    title: 'dialog test',
    message: msg,
    successLabel: 'Ok'
  });
  const [menu, setMenu] = useState<ListMenuProps>({
    open: false,
    anchorEl: null,
    list: [],
  });
  const [openPopUp, setOpenPopUp] = useState(false);

  const sideBarControl = () => {
    setOpen(!open);
    setExpanded(!expanded);
  }

  const okPopUp = () => {
    setOpenPopUp(false);
    console.log(true);
  }

  const controlMenu = (list: ListMenuItemProps[], event: React.MouseEvent<HTMLElement>) => {
    setMenu({
      open: true,
      list: list,
      anchorEl: event.currentTarget,
    })
  }

  const closeMenu = () => {
    setMenu({
      open: false,
      list: [],
      anchorEl: null,
    })
  }

  const sideBarMouseHover = (status: boolean) => {
    if (!open) {
      setExpanded(status);
    }
  }

  const closeDialog = (status: boolean) => {
    setDialog({
      open: false,
      cancel: true,
      title: '',
      message: '',
      successLabel: 'Ok'
    });
    setOpenPopUp(status);
  }

  return (
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
        navigation={<Button onClick={(e)=>controlMenu([
          {
            label: 'test',
            //destiny: 'test',
            action: ()=> console.log(test)
          },
          {
            label: 'test',
            destiny: 'test',
            //action: ()=> console.log(test)
          },
          {
            label: 'test',
          },
        ],e)} color='secondary'>test</Button>}
        actions={<Button onClick={(e)=>controlMenu([
          {
            label: 'test',
            //destiny: 'test',
            action: ()=> console.log(test)
          },
          {
            label: 'test',
            destiny: 'test',
            //action: ()=> console.log(test)
          },
        ],e)} color='secondary'>test</Button>}
      />
      <SideBar
        expanded={expanded}
        logo={logo}
        icon={icon}
        version='v1.0.1'
        versionDate='De: 25/03/2022 as 1:50'
        homeNavigate={() => console.log('NAVIGATE TEST')}
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
          selected={true}
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
        <MainContainer
        sideBarExpanded={open}>
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
            //autoFocus
            required
          />
          <Input
            id='email2'
            label='Email'
            type='email2'
            name='email2'
            //autoFocus
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
          //autoFocus
          />
          <Input
            id='action'
            label='fazer'
            name='action'
            model='icon'
            action={() => console.log('test')}
            icon={<InboxIcon />}
            //autoFocus
            required
            error={true}
            helperText={'feedBacks.email || feedBacks.form'}

          />
          <Input
            id='action'
            label='fazer'
            name='action'
            model='icon'
            start={true}
            action={() => console.log('test')}
            icon={<InboxIcon />}
          />
          <Input
            id='password'
            label='pass'
            name='password'
            model='password'
            autoFocus
          //required
          //error={true}
          //helperText={'feedBacks.email || feedBacks.form'}

          />
          <Input
            id='select'
            label='select'
            name='select'
            model='select'
            //list={[]}
            list={[
              { value: 0, label: 'aaa' },
              { value: 1, label: 'bbb' },
              { value: 2, label: 'ccc' },
              { value: 3, label: 'ddd' },
              { value: 4, label: 'eee' },
              { value: 5, label: 'fff' },
            ]}
          //required
          //error={true}
          //helperText={'feedBacks.email || feedBacks.form'}

          />
          <Input<{ title: string; year: number }>
            id='Pesquisa'
            label='Pesquisa'
            name='subTotal'
            model='search'
            options={topFilms}
            selectValue='title'
            creatable={true}
            //autoFocus
            required
            error={true}
            helperText={'feedBacks.email || feedBacks.form'}

          />




        </Grid>
        <DialogBox
          dialog={dialog}
          close={closeDialog}
        />
        <PopUp
          open={openPopUp}
          cancel={true}
          name='test'
          title='pop up test'
          successLabel='Ok---'
          cancelLabel='Cancelar----'
          toggle={() => setOpenPopUp(false)}
          action={okPopUp}
        >
          <span>test pop up here</span>
        </PopUp>
        <ListMenu
          menu={menu}
          toggle={closeMenu}
          navigate={(destiny) => console.log(destiny)}
          />
      </MainContainer>
    </MultiProvider>
  );
}

export default App;

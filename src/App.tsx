import { Fragment, useState } from 'react';

import logo from './logo.svg';
import icon from './logo-unica.svg';

import {
  MoveToInbox as InboxIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';

import {
  BreadcrumbBar,
  BrockCard,
  Button,
  DialogBox,
  DialogProps,
  UFInput,
  Header,
  ListMenu,
  ListMenuProps,
  ListMenuItemProps,
  MainContainer,
  MultiProvider,
  PopUp,
  SideBar,
  SideBarItem,
  DateTimeInput,
} from './components';
import DataTableExample from './DataTableExample';
import { useForm } from './hooks';
import { Form } from '@unform/web';
import dayjs from 'dayjs';
// import { dayjs } from 'dayjs';

const topFilms = [
  { label: "The Shawshank Redemption", id: 1 },
  { label: "The Godfather", id: 2 },
  { label: "The Godfather: Part II", id: 3 },
  { label: "The Dark Knight", id: 4 },
  { label: "12 Angry Men", id: 5 },
  { label: "Schindler's List", id: 6 },
  { label: "Pulp Fiction", id: 7 }
];

const topFilms2 = [
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
  const { formRef, formSave } = useForm();
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [dialog, setDialog] = useState<DialogProps>({
    open: false,
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

  const handleSave = (formData: any) => {
    console.log(formData);
  }

  return (
    <MultiProvider
      adapterLocalePtBR={true}
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
        navigation={<Button onClick={(e) => controlMenu([
          {
            label: 'test',
            //destiny: 'test',
            action: () => console.log(test)
          },
          {
            label: 'test',
            destiny: 'test',
            //action: ()=> console.log(test)
          },
          {
            label: 'test',
          },
        ], e)} color='secondary'>test</Button>}
        actions={<Button onClick={(e) => controlMenu([
          {
            label: 'test',
            //destiny: 'test',
            action: () => console.log(test)
          },
          {
            label: 'test',
            destiny: 'test',
            //action: ()=> console.log(test)
          },
        ], e)} color='secondary'>test</Button>}
      />
      <SideBar
        expanded={expanded}
        logo={logo}
        icon={icon}
        version='v1.0.1'
        versionDate='De: 25/03/2022 as 1:50'
        sideBarControl={sideBarControl}
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
        sideBarExpanded={open}
        subHeader={
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
        }
      >

        <DataTableExample<{ id: string; name: string }>
          title='clients'
          defaultOrderBy='id'
          isSelectable={true}
          actions={true}
          totalOfRows={15}
          filters={() => (
            <Fragment>
              < UFInput
                label='Id'
                name='id'
                grid={{ md: 4, lg: 4 }}
              />
              < UFInput
                label='Nome'
                name='name'
                grid={{ md: 8, lg: 8 }}
              />
            </Fragment>
          )}
          initialFilters={
            { id: '', name: '' }
          }
          columns={[
            {
              key: 'id',
              label: '#',
              isSortable: true,
              disablePadding: true,
            },
            {
              key: 'name',
              label: 'Name',
              isSortable: true,
            },
            {
              key: 'age',
              label: 'Age',
              isSortable: true,
            },
            {
              key: 'actions',
              label: 'Ações',
              align: 'center',
              disablePadding: true,
              render: (row) => (
                <Button model='icon' aria-label='Editar' onClick={() => console.log(row)}>
                  <EditIcon />
                </Button>
              )
            }
          ]}
          rows={[
            {
              id: 1,
              name: 'test'
            },
            {
              id: 2,
              name: 'test 2',
              age: 32
            },
            {
              id: 3,
              name: 'test 3'
            },
            {
              id: 4,
              name: 'test'
            },
            {
              id: 5,
              name: 'test 2',
              age: 32
            },

          ]}
          onGetRows={(params) => console.log(params)}
          onDeleteRows={(params) => console.log(params)}
          onExport={(params) => console.log(params)}
        />
        <Form ref={formRef} onSubmit={handleSave}>
          <Button onClick={() => formSave()}>
            test
          </Button>
          <Grid container spacing={2}>
            <UFInput
              label='Pesquisa'
              name='searchTest'
              model='search'

              options={topFilms}
              //creatable={true}
              //autoFocus
              required

            />
            <DateTimeInput
              name='dateTest'
              label='DateTest'
              // minDate={dayjs('01/04/2023')}// MM/DD/YYYY
              // maxDate={dayjs('01/24/2023')}// MM/DD/YYYY
              //disablePast={true}
              //disableFuture={true}
              //showTodayButton={true}
              required={true}
            />
            <DateTimeInput
              name='dateTest2'
              label='DateTest2'
              // minDate={dayjs('01/04/2023')}// MM/DD/YYYY
              // maxDate={dayjs('01/24/2023')}// MM/DD/YYYY
              //disablePast={true}
              //disableFuture={true}
              //showTodayButton={true}
              required={true}
              time={true}
            />
            <UFInput
              label='Email'
              type='email'
              grid={{
                lg: 12
              }}
              name='email'
              autoFocus
              required
            />
            <UFInput
              label='pass'
              name='password'
              model='password'
              autoFocus
            //required
            //error={true}
            //helperText={'feedBacks.email || feedBacks.form'}

            />
            <UFInput
              label='Email 2'
              type='email'
              name='email2'
              required
              error={true}
              helperText={'feedBacks.email || feedBacks.form'}
            />
            <UFInput
              label='select222'
              name='select'
              model='select'
              value={0}
              //list={[]}
              list={[
                { value: 0, label: 'aaa' },
                { value: 1, label: 'bbb' },
                { value: 2, label: 'ccc' },
                { value: 3, label: 'ddd' },
                { value: 4, label: 'eee' },
                { value: 5, label: 'fff' },
              ]}

            />


            <UFInput
              label='Check box here'
              name='check'
              model='checkBoxG'
            />
            <UFInput
              label='fazer222'
              name='action222'
              model='icon'
              action={() => console.log('test')}
              icon={<InboxIcon />}
              start={true}
              //autoFocus
              required
              error={true}
              value={''}
              helperText={'feedBacks.email || feedBacks.form'}

            />
            <UFInput
              label='fazer'
              name='action'
              model='icon'
              action={() => console.log('test')}
              icon={<InboxIcon />}
              //autoFocus
              required
              error={true}
              value={''}
              helperText={'feedBacks.email || feedBacks.form'}

            />
            <UFInput
              label='fazer22'
              name='action22'
              model='icon'
              start={true}
              action={() => console.log('test')}
              icon={<InboxIcon />}
            />
            <UFInput
              label='Sub Total'
              name='subTotal'
              model='currency'
            //autoFocus
            />





            <BrockCard
              title='Card Test'
            >
              <UFInput
                label='name'
                name='name2'
                required
                helperText={'feedBacks.email || feedBacks.form'}
              />
              <UFInput
                label='name4'
                name='name4'
              />

            </BrockCard>
            <BrockCard
              title='Card Test2'
              md={6}
            >
              <UFInput
                label='coin'
                name='coin'
                grid={{
                  md: 12, lg: 12
                }}
              />
            </BrockCard>
            <BrockCard
              title='Card Test3'
              md={6}
            >
              <UFInput
                label='coin2'
                name='coin2'
                grid={{
                  md: 12, lg: 12
                }}
              />
            </BrockCard>

          </Grid>
        </Form>
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

import React from 'react';
import { useArgs, useState } from '@storybook/client-api';
import { MdHome as HomeIcon, MdList as ListIcon } from 'react-icons/md';
import {
  BreadcrumbBar,
  BreadcrumbsListProps,
  DarkSwitch,
  DataTableBody,
  DataTableColumnsProps,
  DataTableContainer,
  DataTableGrid,
  DataTableHeader,
  DataTableSelected,
  EnumObjectProps,
  Header,
  MainContainer,
  Order,
  SideBar,
  SideBarItem,
  maskPhone,
} from '../src';
import { env } from './env';

interface IRows {
  id: number;
  name: string;
  phone?: string;
  level: number;
}

const levelEnum: EnumObjectProps = {
  0: 'Roockie',
  1: 'Casual',
  2: 'Regular',
};

const rows: IRows[] = [
  { id: 1, name: 'Joe Doe Any', phone: '47999999999', level: 0 },
  { id: 2, name: 'Jane Smith', phone: '47988888888', level: 1 },
  { id: 3, name: 'John Johnson', phone: '47977777777', level: 2 },
  { id: 4, name: 'Emily Davis', phone: '47966666666', level: 1 },
  { id: 5, name: 'Michael Brown', phone: '47955555555', level: 2 },
  { id: 6, name: 'Jessica Wilson', level: 1 },
  { id: 7, name: 'Daniel Taylor', phone: '47933333333', level: 2 },
  { id: 8, name: 'Sarah Anderson', phone: '47922222222', level: 1 },
  { id: 9, name: 'Andrew Martinez', level: 2 },
  { id: 10, name: 'Emily Robinson', level: 1 },
  { id: 11, name: 'David Lee', level: 2 },
  { id: 12, name: 'Jennifer Harris', phone: '47888888888', level: 1 },
  { id: 13, name: 'Ryan Clark', phone: '47877777777', level: 2 },
  { id: 14, name: 'Alexa Turner', phone: '47866666666', level: 1 },
  { id: 15, name: 'Daniel Cooper', level: 2 },
];

const breadcrumbLlist: BreadcrumbsListProps[] = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Registrations',
    link: '/registrations',
  },
  {
    label: 'Users',
  },
];

const columns: DataTableColumnsProps[] = [
  {
    key: 'id',
    label: '#',
  },
  {
    key: 'name',
    label: 'Name',
    limit: 10,
    disablePadding: true,
  },
  {
    key: 'phone',
    label: 'Phone',
    disablePadding: true,
    render: (row) => (row.phone ? maskPhone(row.phone) : ''),
  },
  {
    key: 'level',
    label: 'Level',
    enumObject: levelEnum,
  },
];

const date = new Date();
const footer = `© 2008 - ${date.getFullYear()} JM Creative. All Rights Reserved`;

export default {
  title: 'Layout/Basic',
  tags: ['autodocs'],
  args: {
    expanded: true,
    isSelectable: true,
    isSelectableAnywhere: true,
    rows: rows,
    columns: columns,
    title: 'full-example',
  },
};

export const Basic = ({ ...args }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState<Order>('asc');
  const [{ expanded }, updateArgs] = useArgs();
  const [open, setOpen] = useState(true);

  const sideBarControl = () => {
    updateArgs({
      expanded: !expanded,
    });
    setOpen(!open);
  };

  const sideBarMouseHover = (status: boolean) => {
    if (!open) {
      updateArgs({
        expanded: status,
      });
    }
  };

  const onRequestSort = (key: string) => {
    const isAsc = orderBy === key && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(key);
  };

  const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newSelected: any[];
    if (event.target.checked) {
      newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const onSelectRow = (row: any) => {
    const selectedIndex = selected.indexOf(row.id);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (row: any) => selected.indexOf(row.id) !== -1;

  return (
    <div className='story-book-layout'>
      <Header
        sideBarControl={sideBarControl}
        sideBarExpanded={open}
        actions={<DarkSwitch />}
      />
      <SideBar
        expanded={expanded}
        logo='https://assets.jm.app.br/logo.svg'
        icon='https://assets.jm.app.br/icon.svg'
        version={env('STORYBOOK_VERSION') || 'v1.0.0'}
        versionDate={env('STORYBOOK_V_DATE') || '2023-06-01T00:00:00'}
        sideBarControl={sideBarControl}
        homeNavigate={() => console.log('/')}
        onMouseHover={sideBarMouseHover}
      >
        <SideBarItem
          label='Home'
          icon={<HomeIcon />}
          selected={true}
          expanded={expanded}
          action={() => console.log('go home')}
        />
        <SideBarItem
          label='Lists'
          icon={<ListIcon />}
          selected={false}
          expanded={expanded}
          action={() => console.log('go home')}
        />
      </SideBar>
      <MainContainer
        sideBarExpanded={open}
        subHeader={
          <div style={{ padding: '1rem', width: '100%' }}>
            <BreadcrumbBar list={breadcrumbLlist} />
          </div>
        }
        footer={
          <div style={{ padding: '1rem', width: '100%', textAlign: 'center' }}>
            <span>{footer}</span>
          </div>
        }
      >
        <DataTableGrid>
          <DataTableContainer title={args.title}>
            <DataTableHeader
              columns={args.columns}
              order={order}
              orderBy={orderBy}
              isSelectable={args.isSelectable}
              numSelected={selected.length}
              rowCount={args.rows.length}
              onRequestSort={onRequestSort}
              onSelectAllClick={onSelectAllClick}
            />
            <DataTableBody
              title={args.title}
              columns={args.columns}
              rows={args.rows}
              isSelectable={args.isSelectable}
              isSelectableAnywhere={args.isSelectableAnywhere}
              isSelected={isSelected}
              onSelectRow={onSelectRow}
            />
          </DataTableContainer>
          {selected.length > 0 && (
            <DataTableSelected
              totalOfRows={selected.length}
              totalOfRowsLabel='Records Selected'
              deleteLabel='Delete'
              onDelete={() => console.log('delete')}
              selected={selected}
            />
          )}
        </DataTableGrid>
      </MainContainer>
    </div>
  );
};

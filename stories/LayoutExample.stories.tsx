import React, { useEffect, useState } from 'react';

import { StoryObj, Meta } from '@storybook/react-vite';

import { env } from './env';

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
  toMask,
} from '../src';

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

const breadcrumbList: BreadcrumbsListProps[] = [
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

const columns: DataTableColumnsProps<IRows>[] = [
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
    render: (row) => (row.phone ? toMask.phone(row.phone) : ''),
  },
  {
    key: 'level',
    label: 'Level',
    enumObject: levelEnum,
  },
];

const date = new Date();
const footer = `© 2008 - ${date.getFullYear()} JM Creative. All Rights Reserved`;

interface BasicProps {
  expanded: boolean;
  isSelectable: boolean;
  isSelectableAnywhere: boolean;
  title: string;
}

export default {
  title: 'Layout/Basic',
  tags: ['autodocs'],
} satisfies Meta<BasicProps>;

type Story = StoryObj<BasicProps>;

export const Basic: Story = {
  args: {
    expanded: true,
    isSelectable: true,
    isSelectableAnywhere: true,
    title: 'full-example',
  },
  render: (args) => {
    const [selected, setSelected] = useState<IRows['id'][]>([]);
    const [orderBy, setOrderBy] = useState<keyof IRows>('id');
    const [order, setOrder] = useState<Order>('asc');
    const [open, setOpen] = useState(true);
    const [expanded, setExpanded] = useState(true);

    const sideBarControl = () => {
      setOpen(!open);
      setExpanded(!expanded);
    };

    const sideBarMouseHover = (status: boolean) => {
      if (!open) {
        setExpanded(status);
      }
    };

    const onRequestSort = (key: keyof IRows) => {
      const isAsc = orderBy === key && order === 'asc';
      const newOrder = isAsc ? 'desc' : 'asc';
      setOrder(newOrder);
      setOrderBy(key);
    };

    const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };

    const onSelectRow = (row: IRows) => {
      const selectedIndex = selected.indexOf(row.id);
      let newSelected: IRows['id'][] = [];

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

    const isSelected = (row: IRows) => selected.indexOf(row.id) !== -1;

    useEffect(() => {
      setExpanded(args.expanded);

      // eslint-disable-next-line
    }, [args.expanded]);

    return (
      <div className='story-book-layout'>
        <Header
          sideBarControl={sideBarControl}
          sideBarExpanded={expanded}
          actions={<DarkSwitch />}
        />
        <SideBar
          expanded={expanded || open}
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
          />
          <SideBarItem
            label='Lists'
            icon={<ListIcon />}
            selected={false}
            expanded={expanded}
          />
        </SideBar>
        <MainContainer
          sideBarExpanded={expanded}
          subHeader={
            <div style={{ padding: '1rem', width: '100%' }}>
              <BreadcrumbBar list={breadcrumbList} />
            </div>
          }
          footer={
            <div
              style={{ padding: '1rem', width: '100%', textAlign: 'center' }}
            >
              <span>{footer}</span>
            </div>
          }
        >
          <DataTableGrid>
            <DataTableContainer title={args.title}>
              <DataTableHeader<IRows>
                columns={columns}
                order={order}
                orderBy={orderBy}
                isSelectable={args.isSelectable}
                numSelected={selected.length}
                rowCount={rows.length}
                onRequestSort={onRequestSort}
                onSelectAllClick={onSelectAllClick}
              />
              <DataTableBody<IRows>
                title={args.title}
                columns={columns}
                rows={rows}
                isSelectable={args.isSelectable}
                isSelectableAnywhere={args.isSelectableAnywhere}
                isSelected={isSelected}
                onSelectRow={onSelectRow}
              />
            </DataTableContainer>
            {selected.length > 0 && (
              <DataTableSelected<IRows>
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
  },
};

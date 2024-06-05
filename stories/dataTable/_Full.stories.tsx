import React, { useState } from 'react';

import { StoryObj, Meta } from '@storybook/react';

import {
  DataTableBody,
  DataTableColumnsProps,
  DataTableContainer,
  DataTableGrid,
  DataTableHeader,
  DataTableSelected,
  EnumObjectProps,
  Order,
  toMask,
} from '../../src';

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

const columns: DataTableColumnsProps<IRows>[] = [
  {
    key: 'actions',
    label: '#',
  },
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

interface BasicProps {
  isSelectable: boolean;
  isSelectableAnywhere: boolean;
  title: string;
}

export default {
  title: 'DataTable/FullExample',
  tags: ['autodocs'],
} satisfies Meta<BasicProps>;

type Story = StoryObj<BasicProps>;

export const Basic: Story = {
  args: {
    isSelectable: true,
    isSelectableAnywhere: true,
    title: 'full-example',
  },
  render: (args) => {
    const [selected, setSelected] = useState<IRows['id'][]>([]);
    const [orderBy, setOrderBy] = useState<keyof IRows>('id');
    const [order, setOrder] = useState<Order>('asc');

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

    return (
      <div className='story-book'>
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
      </div>
    );
  },
};

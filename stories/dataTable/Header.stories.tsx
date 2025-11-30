import React, { useEffect, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import {
  DataTableContainer,
  DataTableGrid,
  DataTableHeader,
  EnumObjectProps,
  Order,
  toMask,
} from '../../src';

const tableTitle = 'title-here';

const levelEnum: EnumObjectProps = {
  0: 'Roockie',
  1: 'Casual',
  2: 'Regular',
};

interface IRows {
  id: number;
  name: string;
  phone?: string;
  level: number;
}

const meta: Meta<typeof DataTableHeader<IRows>> = {
  title: 'DataTable/Header',
  component: DataTableHeader,
  tags: ['autodocs'],
  args: {
    columns: [
      {
        key: 'id',
        label: '#',
        isSortable: true,
      },
      {
        key: 'name',
        label: 'Name',
        limit: 10,
        disablePadding: true,
        isSortable: true,
      },
      {
        key: 'phone',
        label: 'Phone',
        disablePadding: true,
        isSortable: true,
        render: (row) => (row.phone ? toMask.phone(row.phone) : ''),
      },
      {
        key: 'level',
        label: 'Level',
        isSortable: true,
        enumObject: levelEnum,
      },
    ],
    isSelectable: false,
    numSelected: 0,
    rowCount: 10,
    order: 'asc',
    orderBy: 'id',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: ({ ...args }) => {
    const [selected, setSelected] = useState(0);
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
        setSelected(args.rowCount);
        return;
      }

      setSelected(0);
    };

    useEffect(() => {
      setOrder(args.order);

      // eslint-disable-next-line
    }, [args.order]);

    useEffect(() => {
      setOrderBy(args.orderBy);

      // eslint-disable-next-line
    }, [args.orderBy]);

    return (
      <div className='story-book'>
        <DataTableGrid>
          <DataTableContainer title={tableTitle}>
            <DataTableHeader
              columns={args.columns}
              rowCount={args.rowCount}
              order={order}
              orderBy={orderBy}
              numSelected={selected}
              onRequestSort={onRequestSort}
              onSelectAllClick={onSelectAllClick}
            />
          </DataTableContainer>
        </DataTableGrid>
      </div>
    );
  },
};

export const Selectable: Story = {
  render: ({ ...args }) => {
    const [selected, setSelected] = useState(0);
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
        setSelected(args.rowCount);
        return;
      }

      setSelected(0);
    };

    useEffect(() => {
      setOrder(args.order);

      // eslint-disable-next-line
    }, [args.order]);

    useEffect(() => {
      setOrderBy(args.orderBy);

      // eslint-disable-next-line
    }, [args.orderBy]);

    return (
      <div className='story-book'>
        <DataTableGrid>
          <DataTableContainer title={tableTitle}>
            <DataTableHeader
              columns={args.columns}
              rowCount={args.rowCount}
              order={order}
              orderBy={orderBy}
              numSelected={selected}
              onRequestSort={onRequestSort}
              onSelectAllClick={onSelectAllClick}
              isSelectable
            />
          </DataTableContainer>
        </DataTableGrid>
      </div>
    );
  },
};

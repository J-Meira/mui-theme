import React from 'react';

import type { Meta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';
import {
  DataTableContainer,
  DataTableGrid,
  DataTableHeader,
  EnumObjectProps,
  maskPhone,
} from '../../src';

const levelEnum: EnumObjectProps = {
  0: 'Roockie',
  1: 'Casual',
  2: 'Regular',
};

export default {
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
        render: (row) => (row.phone ? maskPhone(row.phone) : ''),
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
} satisfies Meta<typeof DataTableHeader>;

export const Basic = ({ ...args }) => {
  const [{ orderBy, order, numSelected }, updateArgs] = useArgs();

  const onRequestSort = (key: string) => {
    const isAsc = orderBy === key && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    updateArgs({
      order: newOrder,
      orderBy: key,
      numSelected: numSelected,
    });
  };

  const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      updateArgs({
        order: order,
        orderBy: orderBy,
        numSelected: args.rowCount,
      });
    } else {
      updateArgs({
        order: order,
        orderBy: orderBy,
        numSelected: 0,
      });
    }
  };

  return (
    <div className='story-book'>
      <DataTableGrid>
        <DataTableContainer title={args.title}>
          <DataTableHeader
            {...args}
            columns={args.columns}
            order={args.order}
            orderBy={args.orderBy}
            numSelected={args.numSelected}
            rowCount={args.rowCount}
            onRequestSort={onRequestSort}
            onSelectAllClick={onSelectAllClick}
          />
        </DataTableContainer>
      </DataTableGrid>
    </div>
  );
};

export const Selectable = ({ ...args }) => {
  const [{ orderBy, order, numSelected }, updateArgs] = useArgs();

  const onRequestSort = (key: string) => {
    const isAsc = orderBy === key && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    updateArgs({
      order: newOrder,
      orderBy: key,
      numSelected: numSelected,
    });
  };

  const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      updateArgs({
        order: order,
        orderBy: orderBy,
        numSelected: args.rowCount,
      });
    } else {
      updateArgs({
        order: order,
        orderBy: orderBy,
        numSelected: 0,
      });
    }
  };

  return (
    <div className='story-book'>
      <DataTableGrid>
        <DataTableContainer title={args.title}>
          <DataTableHeader
            {...args}
            columns={args.columns}
            order={args.order}
            orderBy={args.orderBy}
            numSelected={args.numSelected}
            rowCount={args.rowCount}
            onRequestSort={onRequestSort}
            onSelectAllClick={onSelectAllClick}
            isSelectable
          />
        </DataTableContainer>
      </DataTableGrid>
    </div>
  );
};

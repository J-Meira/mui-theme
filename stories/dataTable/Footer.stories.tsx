import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { DataTableFooter, DataTableGrid } from '../../src';

const meta = {
  title: 'DataTable/Footer',
  component: DataTableFooter,
  tags: ['autodocs'],
} satisfies Meta<typeof DataTableFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    currentSize: 10,
    rowsPerPage: 5,
    setRowsPerPage: (v) => console.log(v),
    rowsPerPageLabel: 'Rows per Page:',
    rowsPerPageDetails: (rows, totalOfRows) =>
      `${rows} ${rows > 1 ? 'records' : 'record'} of ${totalOfRows}`,
    totalOfRows: 200,
  },
  render: (args) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);

    return (
      <div className='story-book'>
        <DataTableGrid>
          <DataTableFooter
            {...args}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={(rows: number) => setRowsPerPage(rows)}
          />
        </DataTableGrid>
      </div>
    );
  },
};

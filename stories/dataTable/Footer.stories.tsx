import React from 'react';

import type { Meta } from '@storybook/react';
import { useState } from '@storybook/client-api';
import { DataTableFooter, DataTableGrid } from '../../src';

export default {
  title: 'DataTable/Footer',
  component: DataTableFooter,
  tags: ['autodocs'],
} satisfies Meta<typeof DataTableFooter>;

export const Basic = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <div className='story-book'>
      <DataTableGrid>
        <DataTableFooter
          currentSize={10}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={(rows: number) => setRowsPerPage(rows)}
          rowsPerPageLabel='Rows per Page:'
          rowsPerPageDetails={(rows, totalOfRows) =>
            `${rows} ${rows > 1 ? 'records' : 'record'} of ${totalOfRows}`
          }
          totalOfRows={200}
        />
      </DataTableGrid>
    </div>
  );
};

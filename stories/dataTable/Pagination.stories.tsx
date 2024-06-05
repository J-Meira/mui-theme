import React, { useEffect, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { DataTablePagination, DataTableGrid } from '../../src';

const meta = {
  title: 'DataTable/Pagination',
  component: DataTablePagination,
  tags: ['autodocs'],
  args: {
    title: 'title-here',
    pages: [
      { pageNumber: 1 },
      { pageNumber: 2 },
      { pageNumber: 3 },
      { pageNumber: 4 },
      { pageNumber: 5 },
      { pageNumber: 6 },
      { pageNumber: 7 },
      { pageNumber: 8 },
      { pageNumber: 9 },
      { pageNumber: 10 },
      { pageNumber: 11 },
      { pageNumber: 12 },
      { pageNumber: 13 },
      { pageNumber: 14 },
      { pageNumber: 15 },
      { pageNumber: 16 },
      { pageNumber: 17 },
      { pageNumber: 18 },
      { pageNumber: 19 },
      { pageNumber: 20 },
    ],
    currentPage: 5,
    setPage: (p) => console.log(p),
    lastPage: 20,
  },
} satisfies Meta<typeof DataTablePagination>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(5);

    const setPage = (page: number) => {
      setCurrentPage(page);
    };

    useEffect(() => {
      setCurrentPage(args.currentPage);

      // eslint-disable-next-line
    }, [args.currentPage]);

    return (
      <div className='story-book'>
        <DataTableGrid>
          <DataTablePagination
            title={args.title}
            pages={args.pages}
            currentPage={currentPage}
            lastPage={args.lastPage}
            setPage={setPage}
          />
        </DataTableGrid>
      </div>
    );
  },
};

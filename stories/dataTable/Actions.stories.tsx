import React, { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';

import { Meta, StoryObj } from '@storybook/react';

import { DataTableActions, DataTableGrid, DatePicker } from '../../src';

interface IFilters {
  from: Dayjs | null;
  to: Dayjs | null;
}

const initialFilters: IFilters = {
  from: null,
  to: null,
};

const meta = {
  title: 'DataTable/Actions',
  component: DataTableActions,
  tags: ['autodocs'],
  args: {
    addLabel: '+ Add',
    searchValue: '',
    setSearchValue: (e) => console.log(e),
    searchLabel: 'Search',
    filtersLabel: 'Filters',
    applyFiltersLabel: 'Filter',
    clearFiltersLabel: 'Clear',
    activeLabel: 'Show Inactives',
    activeValue: true,
    showActive: true,
  },
} satisfies Meta<typeof DataTableActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: ({ ...args }) => {
    const [searchValue, setSearchValue] = useState('');
    const [activeValue, setActiveValue] = useState(true);

    useEffect(() => {
      if (args.activeValue !== undefined) setActiveValue(args.activeValue);

      // eslint-disable-next-line
    }, [args.activeValue]);

    useEffect(() => {
      setSearchValue(args.searchValue);

      // eslint-disable-next-line
    }, [args.searchValue]);

    return (
      <div className='story-book'>
        <DataTableGrid>
          <DataTableActions
            {...args}
            searchValue={searchValue}
            activeValue={activeValue}
            onAdd={() => console.log('add')}
            setSearchValue={(e) => setSearchValue(e.target.value)}
            setActiveValue={(v) => setActiveValue(v)}
            onExport={() => console.log('export')}
          />
        </DataTableGrid>
      </div>
    );
  },
};

export const WithFilters: Story = {
  render: ({ ...args }) => {
    const [searchValue, setSearchValue] = useState('');
    const [activeValue, setActiveValue] = useState(true);
    const [filtersValues, updateFilters] = useState<IFilters>(initialFilters);

    useEffect(() => {
      if (args.activeValue !== undefined) setActiveValue(args.activeValue);

      // eslint-disable-next-line
    }, [args.activeValue]);

    useEffect(() => {
      setSearchValue(args.searchValue);

      // eslint-disable-next-line
    }, [args.searchValue]);

    return (
      <div className='story-book'>
        <DataTableGrid>
          <DataTableActions
            {...args}
            filterOpened={true}
            searchValue={searchValue}
            activeValue={activeValue}
            onAdd={() => console.log('add')}
            setSearchValue={(e) => setSearchValue(e.target.value)}
            setActiveValue={(v) => setActiveValue(v)}
            onExport={() => console.log('export')}
            onApplyFilters={() => console.log(filtersValues)}
            onClearFilters={() =>
              updateFilters({
                from: null,
                to: null,
              })
            }
            filters={() => (
              <>
                <DatePicker
                  label='From'
                  name='from'
                  disableFuture
                  localControl
                  value={filtersValues.from}
                  onChange={(e: any) =>
                    updateFilters({
                      from: e,
                      to: filtersValues.to,
                    })
                  }
                  grid={{
                    lg: 3,
                    md: 3,
                  }}
                />
                <DatePicker
                  label='To'
                  name='to'
                  disableFuture
                  localControl
                  value={filtersValues.to}
                  onChange={(e: any) =>
                    updateFilters({
                      from: filtersValues.from,
                      to: e,
                    })
                  }
                  grid={{
                    lg: 3,
                    md: 3,
                  }}
                />
              </>
            )}
          />
        </DataTableGrid>
      </div>
    );
  },
};

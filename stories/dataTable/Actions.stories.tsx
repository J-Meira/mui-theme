import React from 'react';

import type { Meta } from '@storybook/react';
import { useArgs, useState } from '@storybook/client-api';
import { DataTableActions, DataTableGrid, DatePicker } from '../../src';

interface IFilters {
  from: string | null;
  to: string | null;
}

const initialFilters: IFilters = {
  from: null,
  to: null,
};

export default {
  title: 'DataTable/Actions',
  component: DataTableActions,
  tags: ['autodocs'],
  args: {
    search: '',
    activeValue: true,
  },
} satisfies Meta<typeof DataTableActions>;

export const Basic = ({ ...args }) => {
  const [{ search, activeValue }, updateArgs] = useArgs();

  const setSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateArgs({
      search: e.target.value,
      activeValue: activeValue,
    });
  };

  const setActiveValue = () => {
    updateArgs({
      search: search,
      activeValue: !activeValue,
    });
  };

  return (
    <div className='story-book'>
      <DataTableGrid>
        <DataTableActions
          addLabel={'+ Add'}
          searchLabel={'Search'}
          showActive={true}
          activeLabel={'Show only actives'}
          search={args.search}
          activeValue={args.activeValue}
          onAdd={() => console.log('add')}
          setSearch={setSearch}
          setActiveValue={setActiveValue}
          onExport={() => console.log('export')}
        />
      </DataTableGrid>
    </div>
  );
};

export const WithFilters = ({ ...args }) => {
  const [{ search, activeValue }, updateArgs] = useArgs();
  const [filtersValues, updateFilters] = useState<IFilters>(initialFilters);

  const setSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateArgs({
      search: e.target.value,
      activeValue: activeValue,
    });
  };

  const setActiveValue = () => {
    updateArgs({
      search: search,
      activeValue: !activeValue,
    });
  };

  return (
    <div className='story-book'>
      <DataTableGrid>
        <DataTableActions
          {...args}
          addLabel={'+ Add'}
          searchLabel={'Search'}
          filtersLabel={'Filters'}
          filterOpened={true}
          applyFiltersLabel={'Filter'}
          clearFiltersLabel={'Clear'}
          showActive={true}
          activeLabel={'Show only actives'}
          search={args.search}
          activeValue={args.activeValue}
          onAdd={() => console.log('add')}
          setSearch={setSearch}
          setActiveValue={setActiveValue}
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
                isNoFormik
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
                isNoFormik
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
};

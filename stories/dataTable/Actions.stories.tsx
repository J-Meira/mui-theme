import React from 'react';
import type { Meta } from '@storybook/react';
import { useArgs, useState } from '@storybook/client-api';
import { DataTableActions, DataTableGrid, DatePicker } from '../../src';
import { Dayjs } from 'dayjs';

interface IFilters {
  from: Dayjs | null;
  to: Dayjs | null;
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
    searchValue: '',
    activeValue: true,
  },
} satisfies Meta<typeof DataTableActions>;

export const Basic = ({ ...args }) => {
  const [{ searchValue, activeValue }, updateArgs] = useArgs();

  const setSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateArgs({
      searchValue: e.target.value,
      activeValue: activeValue,
    });
  };

  const setActiveValue = () => {
    updateArgs({
      searchValue: searchValue,
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
          searchValue={args.searchValue}
          activeValue={args.activeValue}
          onAdd={() => console.log('add')}
          setSearchValue={setSearchValue}
          setActiveValue={setActiveValue}
          onExport={() => console.log('export')}
        />
      </DataTableGrid>
    </div>
  );
};

export const WithFilters = ({ ...args }) => {
  const [{ searchValue, activeValue }, updateArgs] = useArgs();
  const [filtersValues, updateFilters] = useState<IFilters>(initialFilters);

  const setSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateArgs({
      searchValue: e.target.value,
      activeValue: activeValue,
    });
  };

  const setActiveValue = () => {
    updateArgs({
      searchValue: searchValue,
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
          searchValue={args.searchValue}
          activeValue={args.activeValue}
          onAdd={() => console.log('add')}
          setSearchValue={setSearchValue}
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
};

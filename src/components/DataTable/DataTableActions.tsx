import { useState } from 'react';

import { Collapse, Fab, Grid2 } from '@mui/material';
import {
  MdFilterList as FilterListIcon,
  MdPictureAsPdf as PictureAsPdfIcon,
  MdSearch as SearchIcon,
} from 'react-icons/md';

import { Button, Input } from '..';
import { DataTableActionsProps } from '.';

export const DataTableActions = ({
  onAdd,
  addLabel,
  searchValue,
  setSearchValue,
  searchLabel,
  filters,
  filtersLabel,
  filterOpened,
  onApplyFilters,
  applyFiltersLabel,
  onClearFilters,
  clearFiltersLabel,
  hideSearch,
  showActive,
  activeValue,
  activeLabel,
  setActiveValue,
  onExport,
}: DataTableActionsProps) => {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(!!filterOpened);

  const clearFilters = () => {
    onClearFilters?.();
    setFiltersOpen(false);
  };

  return (
    <Grid2 container className='data-table-actions'>
      <Grid2 size={12}>
        <Grid2 container spacing={3}>
          {(onAdd || filters) && (
            <div
              className={`buttons${
                hideSearch && !showActive ? ' buttons-spc' : ''
              }`}
            >
              {onAdd && (
                <Button contained color='primary' onClick={onAdd}>
                  {addLabel}
                </Button>
              )}
              {filters && (
                <Button
                  contained
                  model='responsive'
                  icon={<FilterListIcon />}
                  variant={!filtersOpen ? 'outlined' : undefined}
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  {filtersLabel}
                </Button>
              )}
            </div>
          )}
          {!hideSearch && (
            <Input
              localControl
              name='data-table-search'
              model='icon'
              label={searchLabel}
              icon={<SearchIcon />}
              onChange={setSearchValue}
              value={searchValue}
              grid={{
                md: 4,
                lg: 3,
              }}
            />
          )}
          {setActiveValue && showActive && (
            <Input
              localControl
              model='checkBox'
              name='activeInput'
              label={activeLabel}
              checked={activeValue}
              grid={{
                md: 4,
                lg: 3,
                sm: 10,
                xs: 10,
              }}
              onChange={() => setActiveValue(!activeValue)}
            />
          )}
          {onExport && (
            <div className='export'>
              <Fab color='primary' onClick={onExport} size='small'>
                <PictureAsPdfIcon />
              </Fab>
            </div>
          )}
        </Grid2>
      </Grid2>
      {filters && (
        <Grid2 size={12} className='filters'>
          <Collapse in={filtersOpen} timeout='auto' unmountOnExit>
            <Grid2 container spacing={2}>
              {filters(onApplyFilters ? onApplyFilters : undefined)}
              <Grid2 size={12} className='filters-actions'>
                <Button contained onClick={clearFilters} color='warning'>
                  {clearFiltersLabel}
                </Button>
                <Button contained onClick={onApplyFilters}>
                  {applyFiltersLabel}
                </Button>
              </Grid2>
            </Grid2>
          </Collapse>
        </Grid2>
      )}
    </Grid2>
  );
};

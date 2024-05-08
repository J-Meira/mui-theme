import { useState } from 'react';

import { Collapse, Fab, Grid } from '@mui/material';
import {
  MdFilterList as FilterListIcon,
  MdPictureAsPdf as PictureAsPdfIcon,
  MdSearch as SearchIcon,
} from 'react-icons/md';

import { Button, Input } from '..';
import { DataTableActionsProps } from '.';

import { useWindowDimensions } from '../../hooks';

export const DataTableActions = ({
  onAdd,
  addLabel,
  search,
  setSearch,
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
  const { width } = useWindowDimensions();
  const [filtersOpen, setFiltersOpen] = useState<boolean>(!!filterOpened);

  const clearFilters = () => {
    onClearFilters?.();
    setFiltersOpen(false);
  };

  return (
    <Grid container className='data-table-actions'>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {(onAdd || filters) && (
            <div
              className={`buttons${
                hideSearch && !showActive ? ' buttons-spc' : ''
              }`}
            >
              {onAdd && (
                <Button color='primary' fullWidth={false} onClick={onAdd}>
                  {addLabel}
                </Button>
              )}
              {filters && (
                <Button
                  fullWidth={false}
                  variant={!filtersOpen ? 'outlined' : undefined}
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <FilterListIcon />
                  {width > 400 ? filtersLabel : ''}
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
              onChange={setSearch}
              value={search}
              grid={{
                md: 4,
                lg: 3,
              }}
            />
          )}
          {showActive && (
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
        </Grid>
      </Grid>
      {filters && (
        <Grid item xs={12} className='filters'>
          <Collapse in={filtersOpen} timeout='auto' unmountOnExit>
            <Grid container spacing={2}>
              {filters(onApplyFilters ? onApplyFilters : undefined)}
              <Grid item xs={12} className='filters-actions'>
                <Button
                  onClick={clearFilters}
                  fullWidth={false}
                  color='warning'
                >
                  {clearFiltersLabel}
                </Button>
                <Button onClick={onApplyFilters} fullWidth={false}>
                  {applyFiltersLabel}
                </Button>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      )}
    </Grid>
  );
};

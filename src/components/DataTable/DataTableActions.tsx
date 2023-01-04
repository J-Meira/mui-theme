import { Collapse, Grid } from '@mui/material';
import React, { useState } from 'react';
import Button from '../Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import Input from '../Input';
import { DataTableActionsProps } from '.';

export const DataTableActions = <FT extends {}>({
  addAction,
  addLabel,
  search,
  setSearch,
  searchLabel,
  filters,
  filtersLabel,
  filtersValues,
  setFilters,
  showActive,
  activeValue,
  setActiveValue,
  activeLabel,
  clearAction,
}: DataTableActionsProps<FT>) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <Grid container className='data-table-actions'>
      <Grid item md={8}>
        <Grid container spacing={3}>
          <div className='buttons'>
            <Button
              color='primary'
              fullWidth={false}
              onClick={addAction}
            >
              {addLabel}
            </Button>
          {(filters && filtersLabel) && (
              <Button
                color='primary'
                fullWidth={false}
                variant='outlined'
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <FilterListIcon />
                {filtersLabel}
              </Button>
          )}
          </div>
          <Input
            model='icon'
            label={searchLabel}
            icon={<SearchIcon />}
            onChange={setSearch}
            value={search}
            //start={true}
            md={4} lg={4}
          />

        </Grid>
      </Grid>
      <Grid item md={4}>
        {/* export area */}
      </Grid>
      {filters && (
        <Grid item md={12}>
          <Collapse in={filtersOpen} timeout='auto' unmountOnExit>

            <Grid container spacing={2}>
              {filters(filtersValues, setFilters)}
            </Grid>

          </Collapse>
        </Grid>
      )}
    </Grid>
  );
}

export default DataTableActions;

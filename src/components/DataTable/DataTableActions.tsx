import { Grid } from '@mui/material';
import React, { useState } from 'react';
import Button from '../Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import Input from '../Input';
import { DataTableActionsProps } from '.';



const DataTableActions = ({
  addAction,
  addLabel,
  search,
  setSearch,
  searchLabel,
  filters,
  filtersLabel,
  activeValue,
  setActiveValue,
  activeLabel,
}: DataTableActionsProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Grid container className='data-table-actions'>
      <Grid item md={8}>
        <Grid container spacing={2}>
          <Grid item md={3}>
            <Button color='primary' onClick={addAction}>
              {addLabel}
            </Button>
          </Grid>
          {(filters && filtersLabel) && (
            <Grid item md={3}>
              <Button color='primary' variant='outlined' onClick={addAction}>
                <FilterListIcon />
                {filtersLabel}
              </Button>
            </Grid>
          )}
          <Input
            model='icon'
            label={searchLabel}
            icon={<SearchIcon />}
            onChange={setSearch}
            value={search}
            start={true}
            md={6} lg={6}
          />

        </Grid>
      </Grid>
      <Grid item md={4}>
        {/* export area */}
      </Grid>
    </Grid>
  );
}

export default DataTableActions;

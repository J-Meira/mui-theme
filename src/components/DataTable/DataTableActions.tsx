import { Collapse, Fab, Grid, } from '@mui/material';
import React, { useState } from 'react';
import Button from '../Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
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
  showActive,
  activeValue,
  activeLabel,
  setActiveValue,
  exportAction,
}: DataTableActionsProps<FT>) => {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const onClear = () =>{
    if(filters) filters.clearAction();
    setFiltersOpen(false);
  }

  return (
    <Grid container className='data-table-actions'>
      <Grid item md={12}>
        <Grid container spacing={3}>
          <div className='buttons'>
            <Button
              color='primary'
              fullWidth={false}
              onClick={addAction}
            >
              {addLabel}
            </Button>
            {filters && (
              <Button
                color='secondary'
                fullWidth={false}
                variant={!filtersOpen ? 'outlined' : undefined}
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <FilterListIcon />
                {filters.label}
              </Button>
            )}
          </div>
          <Input
            model='icon'
            label={searchLabel}
            icon={<SearchIcon />}
            onChange={setSearch}
            value={search}
            md={4} lg={4}
          />
          {exportAction && (
            <div className='export'>
              <Fab
                onClick={exportAction}
                size='small'
              >
                <PictureAsPdfIcon />
              </Fab>
            </div>
          )}
        </Grid>
      </Grid>
      {filters && (
        <Grid item md={12} className='filters'>
          <Collapse in={filtersOpen} timeout='auto' unmountOnExit>
            <Grid container spacing={2}>
              {filters.render(filters.values, filters.setValues)}
              <Grid item md={12}>
                <Button
                  onClick={onClear}
                  >

                  </Button>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      )}
    </Grid>
  );
}

export default DataTableActions;

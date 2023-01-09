import { Collapse, Fab, Grid, } from '@mui/material';
import React, { useState } from 'react';
import Button from '../Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SearchIcon from '@mui/icons-material/Search';
import Input from '../Input';
import { DataTableActionsProps } from '.';
import { useWindowDimensions } from '../../hooks';

export const DataTableActions = <FT extends {}>({
  onAdd,
  addLabel,
  search,
  setSearch,
  searchLabel,
  filters,
  filtersValues,
  setFiltersValues,
  filtersLabel,
  onApplyFilters,
  applyFiltersLabel,
  onClearFilters,
  clearFiltersLabel,
  showActive,
  activeValue,
  activeLabel,
  setActiveValue,
  onExport,
}: DataTableActionsProps<FT>) => {
  const { width } = useWindowDimensions();
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const clearFilters = () => {
    if (onClearFilters) onClearFilters();
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
              onClick={onAdd}
            >
              {addLabel}
            </Button>
            {filters && (
              <Button
                fullWidth={false}
                variant={!filtersOpen ? 'outlined' : undefined}
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <FilterListIcon />
                {width> 400? filtersLabel : ''}
              </Button>
            )}
          </div>
          <Input
            model='icon'
            label={searchLabel}
            icon={<SearchIcon />}
            onChange={setSearch}
            value={search}
            md={4} lg={3}
          />
          {showActive && (
            <Input
              model='checkBoxG'
              label={activeLabel}
              checked={activeValue}
              md={4} lg={4} sm={10} xs={10}
              onChange={() => setActiveValue(!activeValue)}
            />
          )}

          {onExport && (
            <div className='export'>
              <Fab
                onClick={onExport}
                size='small'
              >
                <PictureAsPdfIcon />
              </Fab>
            </div>
          )}
        </Grid>
      </Grid>
      {(filters && filtersValues && setFiltersValues) && (
        <Grid item md={12} className='filters'>
          <Collapse in={filtersOpen} timeout='auto' unmountOnExit>
            <Grid container spacing={2}>
              {filters(filtersValues, setFiltersValues)}
              <Grid item md={12} className='filters-actions'>
                <Button
                  onClick={clearFilters}
                  fullWidth={false}
                  color='warning'
                >
                  {clearFiltersLabel}
                </Button>
                <Button
                  onClick={onApplyFilters}
                  fullWidth={false}
                >
                  {applyFiltersLabel}
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

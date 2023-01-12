import {
  useEffect,
  useState
} from 'react';
import {
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';

import { DataTableFooterProps, DataTableRowsPerPageOptionsProps } from '.';

const defaultList = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
  { value: 30, label: '30' },
  { value: 35, label: '35' },
  { value: 40, label: '40' },
  { value: 45, label: '45' },
  { value: 50, label: '50' },
]

export const DataTableFooter = ({
  currentPage,
  currentSize,
  lastPage,
  list = defaultList,
  rowsPerPage,
  setRowsPerPage,
  rowsPerPageLabel,
  rowsPerPageDetails,
  totalOfRows,
}: DataTableFooterProps) => {
  const [rows, setRows] = useState(0);

  useEffect(() => {
    setRows(
      currentPage === lastPage ?
        currentSize :
        totalOfRows < rowsPerPage ?
          totalOfRows :
          rowsPerPage
    );

    // eslint-disable-next-line
  }, [totalOfRows, rowsPerPage]);

  return (
    <Grid container className='data-table-footer'>
      <span>{rowsPerPageLabel}</span>
      <TextField
        variant='outlined'
        className='rows-input'
        margin='normal'
        size='small'
        select
        value={rowsPerPage}
        onChange={
          (event: React.ChangeEvent<HTMLInputElement>) =>
            setRowsPerPage(Number(event.target.value))
        }
      >
        {list &&
          list.map((op) => (
            <MenuItem
              key={`${op.value}-${op.label}`}
              value={op.value}
            >
              {op.label}
            </MenuItem>
          ))}
      </TextField>
      <span>
        {rowsPerPageDetails(rows, totalOfRows)}
      </span>
    </Grid>
  );
}

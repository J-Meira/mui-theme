import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import { DataTableFooterProps } from '.';
import Input from '../Input';

export const DataTableFooter = ({
  currentPage,
  currentSize,
  lastPage,
  rowsPerPage,
  setRowsPerPage,
  totalOfRows,
}: DataTableFooterProps) => {
  const [rows, setRows] = useState(0);

  const handle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    console.log(value);

    setRowsPerPage(value);
  }

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
        <span>Registros por página:</span>
      <Input
        model='select'
        value={rowsPerPage}
        onChange={handle}
        lg={1}md={1} sm={1} xs={3}
        list={[
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
        ]}
      />
        <span>{`Exibindo ${rows} ${rows > 1 ? 'registros' : 'registro'} de ${totalOfRows}`}</span>

    </Grid>
  );
}

export default DataTableFooter;

import { Delete } from '@mui/icons-material';
import * as React from 'react';
import { DataTableSelectedProps } from '.';
import Button from '../Button';

const DataTableSelected = ({
  rowCont,
  rowContLabel,
  deleteLabel,
  onDelete,
}:DataTableSelectedProps) => {
  return (
    <div className='data-table-selected'>
      {`${rowCont} ${rowContLabel}`}
      <Button
        size='small'
        onClick={onDelete}
        color='warning'
        fullWidth={false}
        >
        <Delete />
        <span>{deleteLabel}</span>
      </Button>
    </div>
  );
}

export default DataTableSelected;

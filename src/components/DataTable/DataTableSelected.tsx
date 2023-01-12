import { Delete } from '@mui/icons-material';

import { Button } from '..';
import { DataTableSelectedProps } from '.';

export const DataTableSelected = ({
  totalOfRows,
  totalOfRowsLabel,
  deleteLabel,
  onDelete,
}: DataTableSelectedProps) => {
  return (
    <div className='data-table-selected'>
      {`${totalOfRows} ${totalOfRowsLabel}`}
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

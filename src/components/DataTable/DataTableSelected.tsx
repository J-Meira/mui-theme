import { Delete } from '@mui/icons-material';
import { Typography } from '@mui/material';

import { Button } from '..';
import { DataTableSelectedProps } from '.';

export const DataTableSelected = ({
  totalOfRows,
  totalOfRowsLabel,
  deleteLabel,
  onDelete,
  selected,
  selectedCustomAction,
}: DataTableSelectedProps) => {
  return (
    <div className='data-table-selected'>
      {`${totalOfRows} ${totalOfRowsLabel}`}
      {onDelete && deleteLabel && (
        <Button
          size='small'
          onClick={onDelete}
          color='warning'
          fullWidth={false}
        >
          <Delete />
          <Typography variant='caption' component='span'>
            {deleteLabel}
          </Typography>
        </Button>
      )}
      {selectedCustomAction && (
        <div className='selected-custom-actions'>
          {selectedCustomAction(selected)}
        </div>
      )}
    </div>
  );
};

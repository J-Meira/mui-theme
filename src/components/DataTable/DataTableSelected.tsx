import { MdDelete as DeleteIcon } from 'react-icons/md';
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
          <DeleteIcon />
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

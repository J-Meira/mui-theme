import { MdDelete as DeleteIcon } from 'react-icons/md';

import { Button } from '..';
import { DataTableSelectedProps } from '.';

export const DataTableSelected = <T extends object>({
  totalOfRows,
  totalOfRowsLabel,
  deleteLabel,
  onDelete,
  selected,
  selectedCustomAction,
}: DataTableSelectedProps<T>) => {
  return (
    <div className='data-table-selected'>
      {`${totalOfRows} ${totalOfRowsLabel}`}
      {onDelete && deleteLabel && (
        <Button
          model='responsive'
          icon={<DeleteIcon />}
          size='small'
          onClick={onDelete}
          color='warning'
          contained
        >
          {deleteLabel}
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

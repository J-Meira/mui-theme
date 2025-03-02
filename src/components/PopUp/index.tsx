import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  DialogTitle,
  Grid2,
  DialogProps,
} from '@mui/material';
import { MdClose as CloseIcon } from 'react-icons/md';

export interface PopUpProps extends DialogProps {
  action?: () => void;
  actionDisabled?: boolean;
  cancel?: boolean;
  cancelLabel?: string;
  className?: string;
  disableBackdropClick?: boolean;
  grided?: boolean;
  name: string;
  successLabel?: string;
  title?: string;
  toggle: () => void;
}

export const PopUp = ({
  action,
  actionDisabled,
  cancel = false,
  cancelLabel = 'Cancel',
  children,
  className,
  disableBackdropClick = false,
  grided = false,
  name,
  open,
  successLabel = 'Ok',
  title,
  toggle,
  ...rest
}: PopUpProps) => {
  const handleClose = (e: object, reason: string) => {
    if (
      disableBackdropClick &&
      e &&
      (reason === 'escapeKeyDown' || reason === 'backdropClick')
    )
      return false;
    return toggle();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={title ?? `pop-up-${name}-title`}
      className={`pop-up ${className ? className : ''}`}
      {...rest}
    >
      {title && (
        <DialogTitle id={`pop-up-${name}-title`}>
          {title}
          <IconButton
            aria-label='close'
            className='pop-up-close'
            onClick={toggle}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent>
        {grided ? (
          <Grid2 container spacing={3}>
            {children}
          </Grid2>
        ) : (
          children
        )}
      </DialogContent>
      {(cancel || action) && (
        <DialogActions>
          {cancel && (
            <Button onClick={toggle} color='error'>
              {cancelLabel}
            </Button>
          )}
          {action && (
            <Button onClick={action} disabled={actionDisabled} color='success'>
              {successLabel}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

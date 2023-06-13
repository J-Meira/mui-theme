import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  DialogTitle,
  Grid,
  DialogProps,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface PopUpProps extends DialogProps {
  action?: () => void;
  cancel?: boolean;
  cancelLabel?: string;
  className?: string;
  disableBackdropClick?: boolean;
  grided: boolean;
  name: string;
  successLabel?: string;
  title?: string;
  toggle: () => void;
}

export const defaultProps: PopUpProps = {
  open: false,
  cancel: false,
  cancelLabel: 'Cancel',
  disableBackdropClick: false,
  grided: false,
  name: '',
  successLabel: 'Ok',
  title: '',
  toggle: () => null,
};

export const PopUp = ({
  action,
  cancel,
  cancelLabel,
  children,
  className,
  disableBackdropClick,
  grided,
  name,
  open,
  successLabel,
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
          <Grid container className='body-main' spacing={3}>
            {children}
          </Grid>
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
            <Button onClick={action} color='success'>
              {successLabel}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

PopUp.defaultProps = defaultProps;

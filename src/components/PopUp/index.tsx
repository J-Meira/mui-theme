import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  DialogTitle,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PopUpProps {
  open: boolean,
  cancel?: boolean,
  name: string,
  title?: string,
  successLabel?: string,
  cancelLabel?: string,
  className?: string,
  children?: React.ReactNode,
  toggle?: (params: any) => any
  action?: (params: any) => any
}

const defaultProps: PopUpProps = {
  open: false,
  cancel: true,
  name: '',
  title: '',
  successLabel: 'Ok',
  cancelLabel: 'Cancelar',
}

export const PopUp = ({
  open,
  cancel,
  name,
  title,
  successLabel,
  cancelLabel,
  className,
  children,
  toggle,
  action,
}: PopUpProps) => (
  <Dialog
    open={open}
    onClose={toggle}
    aria-labelledby={title ?? `pop-up-${name}-title`}
    className={`pop-up ${className ? className : ''}`}
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
      <Grid
        container
        className='body-main'
        spacing={3}
      >
        {children}
      </Grid>
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
  </Dialog >
);

PopUp.defaultProps = defaultProps;

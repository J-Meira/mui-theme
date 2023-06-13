import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export interface DialogReturnProps {
  origin?: string;
  status?: boolean;
}

export interface DialogProps {
  open: boolean;
  cancel?: boolean;
  title: string;
  message: string | React.ReactNode;
  successLabel: string;
  origin: string;
  return: DialogReturnProps;
}

interface DialogBoxProps {
  dialog: DialogProps;
  close: (status: boolean) => void;
}

const defaultProps: DialogBoxProps = {
  dialog: {
    open: false,
    cancel: true,
    title: '',
    message: '',
    origin: '',
    successLabel: 'Ok',
    return: {},
  },
  close: () => null,
};

export const DialogBox = ({ dialog, close }: DialogBoxProps) => (
  <Dialog
    open={dialog.open}
    onClose={() => close(false)}
    aria-labelledby='alert-dialog-title'
    aria-describedby='alert-dialog-description'
  >
    <DialogTitle id='alert-dialog-title'>{dialog.title}</DialogTitle>
    <DialogContent>
      <DialogContentText component='span' id='alert-dialog-description'>
        {dialog.message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {dialog.cancel && (
        <Button onClick={() => close(false)} color='error'>
          Cancelar
        </Button>
      )}
      <Button onClick={() => close(true)} color='success' autoFocus>
        {dialog.successLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

DialogBox.defaultProps = defaultProps;

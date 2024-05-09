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

export interface DialogBoxProps {
  dialog: DialogProps;
  cancelLabel: string;
  close: (status: boolean) => void;
}

const defaultDialog: DialogProps = {
  open: false,
  cancel: true,
  title: '',
  message: '',
  origin: '',
  successLabel: 'Ok',
  return: {},
};

export const DialogBox = ({
  dialog = defaultDialog,
  cancelLabel = 'Cancel',
  close,
}: DialogBoxProps) => (
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
          {cancelLabel}
        </Button>
      )}
      <Button onClick={() => close(true)} color='success' autoFocus>
        {dialog.successLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

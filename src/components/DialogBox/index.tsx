import * as React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export interface DialogProps {
  open: boolean,
  cancel?: boolean,
  title: string,
  message: string,
  successLabel: string
}

interface DialogBoxProps {
  dialog: DialogProps,
  close: (status: boolean) => any
}

const defaultProps: DialogBoxProps = {
  dialog: {
    open: false,
    cancel: true,
    title: '',
    message: '',
    successLabel: 'Ok'
  },
  close: () => (null)
}

const DialogBox = ({ dialog, close }: DialogBoxProps) => (
  <Dialog
    open={dialog.open}
    onClose={() => close(false)}
    aria-labelledby='alert-dialog-title'
    aria-describedby='alert-dialog-description'
  >
    <DialogTitle id='alert-dialog-title'>
      {dialog.title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id='alert-dialog-description'>
        {dialog.message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {dialog.cancel && (
        <Button onClick={() => close(false)} color='primary'>
          Cancelar
        </Button>
      )}
      <Button onClick={() => close(true)} color='primary' autoFocus>
        {dialog.successLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

DialogBox.defaultProps = defaultProps;

export default DialogBox;

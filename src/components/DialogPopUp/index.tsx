import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  DialogTitle,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

interface DialogPopUpProps {
  open: boolean,
  cancel?: boolean,
  name: string,
  title: string,
  successLabel?: string,
  cancelLabel?: string,
  children?: React.ReactNode,
  toggle?: (params: any) => any
  action?: (params: any) => any
}

const defaultProps: DialogPopUpProps = {
  open: false,
  cancel: true,
  name: '',
  title: '',
  successLabel: 'Ok',
  cancelLabel: 'Cancelar',
}

const DialogPopUp = ({
  open, cancel, name, title, successLabel, cancelLabel, children, toggle, action
}: DialogPopUpProps) => {
  return (
    <Dialog
      open={open}
      onClose={toggle}
      aria-labelledby={`pop-up-${name}-title`}
      className='dialog-pop-up'
    >
      <DialogTitle id={`pop-up-${name}-title`}>
        {title}
        <IconButton aria-label='close' className='dialog-pop-up-close' onClick={toggle}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className='body-main'>
        {children}
      </DialogContent>
      {(cancel || action) && (
        <DialogActions className='user-actions'>
          {cancel && (
            <Button onClick={toggle} color='primary'>
              {cancelLabel}
            </Button>
          )}
          {action && (
            <Button onClick={action} color='primary'>
              {successLabel}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog >
  );
}

DialogPopUp.defaultProps = defaultProps;

export default DialogPopUp;

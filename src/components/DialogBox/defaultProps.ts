import { DialogBoxProps } from '.';

export const defaultProps: DialogBoxProps = {
  dialog: {
    open: false,
    cancel: true,
    title: '',
    message: '',
    origin: '',
    successLabel: 'Ok',
    return: {},
  },
  cancelLabel: 'Cancel',
  close: () => null,
};

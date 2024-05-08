import { PopUpProps } from '.';

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

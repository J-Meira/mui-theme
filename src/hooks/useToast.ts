import { enqueueSnackbar } from 'notistack';

const error = (msg: string, callback?: () => void, toastId?: string) => {
  return enqueueSnackbar(msg, {
    onClose: () => callback?.(),
    variant: 'error',
    key: toastId,
  });
};

const warning = (msg: string, callback?: () => void, toastId?: string) => {
  return enqueueSnackbar(msg, {
    onClose: () => callback?.(),
    variant: 'warning',
    key: toastId,
  });
};

const success = (msg: string, callback?: () => void, toastId?: string) => {
  return enqueueSnackbar(msg, {
    onClose: () => callback?.(),
    variant: 'success',
    key: toastId,
  });
};

export const useToast = {
  error,
  warning,
  success,
};

import { toast } from 'react-toastify';

const error = (msg: string, callback?: () => void, toastId?: string) => {
  return toast.error(msg, {
    onClose: () => callback?.(),
    toastId,
  });
};

const warning = (msg: string, callback?: () => void, toastId?: string) => {
  return toast.warning(msg, {
    onClose: () => callback?.(),
    toastId,
  });
};

const success = (msg: string, callback?: () => void, toastId?: string) => {
  return toast.success(msg, {
    onClose: () => callback?.(),
    toastId,
  });
};

export const useToast = {
  error,
  warning,
  success,
};

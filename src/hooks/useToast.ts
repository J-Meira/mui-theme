import { enqueueSnackbar, VariantType } from 'notistack';

export interface UseToastOptionsProps {
  autoHideDuration?: number | null;
  persist?: boolean;
  onClose?: () => void;
  toastId?: string;
}

const toast =
  (variant: VariantType) => (msg: string, options?: UseToastOptionsProps) =>
    enqueueSnackbar(msg, {
      ...options,
      variant,
      key: options?.toastId,
    });

export const useToast = {
  basic: toast('default'),
  error: toast('error'),
  info: toast('info'),
  success: toast('success'),
  warning: toast('warning'),
};

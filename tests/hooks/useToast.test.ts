import { useToast, UseToastOptionsProps } from '../../src/hooks/useToast';
import { enqueueSnackbar } from 'notistack';

// Mock notistack
jest.mock('notistack', () => ({
  enqueueSnackbar: jest.fn(),
}));

const mockEnqueueSnackbar = enqueueSnackbar as jest.MockedFunction<
  typeof enqueueSnackbar
>;

describe('useToast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic', () => {
    it('should call enqueueSnackbar with default variant', () => {
      const message = 'Test message';
      const mockKey = 'test-key';
      mockEnqueueSnackbar.mockReturnValue(mockKey);

      const result = useToast.basic(message);

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith(message, {
        variant: 'default',
        key: undefined,
      });
      expect(result).toBe(mockKey);
    });

    it('should call enqueueSnackbar with custom options', () => {
      const message = 'Test message';
      const options: UseToastOptionsProps = {
        autoHideDuration: 3000,
        persist: true,
        toastId: 'custom-id',
      };
      const mockKey = 'test-key';
      mockEnqueueSnackbar.mockReturnValue(mockKey);

      const result = useToast.basic(message, options);

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith(message, {
        autoHideDuration: 3000,
        persist: true,
        toastId: 'custom-id',
        variant: 'default',
        key: 'custom-id',
      });
      expect(result).toBe(mockKey);
    });

    it('should handle onClose callback', () => {
      const message = 'Test message';
      const onClose = jest.fn();
      const options: UseToastOptionsProps = { onClose };

      useToast.basic(message, options);

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith(message, {
        onClose,
        variant: 'default',
        key: undefined,
      });
    });
  });

  describe('error', () => {
    it('should call enqueueSnackbar with error variant', () => {
      const message = 'Error message';
      const mockKey = 'error-key';
      mockEnqueueSnackbar.mockReturnValue(mockKey);

      const result = useToast.error(message);

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith(message, {
        variant: 'error',
        key: undefined,
      });
      expect(result).toBe(mockKey);
    });

    it('should handle custom options with error variant', () => {
      const message = 'Error message';
      const options: UseToastOptionsProps = {
        persist: true,
        toastId: 'error-id',
      };

      useToast.error(message, options);

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith(message, {
        persist: true,
        toastId: 'error-id',
        variant: 'error',
        key: 'error-id',
      });
    });
  });

  describe('info', () => {
    it('should call enqueueSnackbar with info variant', () => {
      const message = 'Info message';
      const mockKey = 'info-key';
      mockEnqueueSnackbar.mockReturnValue(mockKey);

      const result = useToast.info(message);

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith(message, {
        variant: 'info',
        key: undefined,
      });
      expect(result).toBe(mockKey);
    });
  });

  describe('success', () => {
    it('should call enqueueSnackbar with success variant', () => {
      const message = 'Success message';
      const mockKey = 'success-key';
      mockEnqueueSnackbar.mockReturnValue(mockKey);

      const result = useToast.success(message);

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith(message, {
        variant: 'success',
        key: undefined,
      });
      expect(result).toBe(mockKey);
    });
  });

  describe('warning', () => {
    it('should call enqueueSnackbar with warning variant', () => {
      const message = 'Warning message';
      const mockKey = 'warning-key';
      mockEnqueueSnackbar.mockReturnValue(mockKey);

      const result = useToast.warning(message);

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith(message, {
        variant: 'warning',
        key: undefined,
      });
      expect(result).toBe(mockKey);
    });
  });

  describe('edge cases', () => {
    it('should handle empty message', () => {
      useToast.basic('');

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith('', {
        variant: 'default',
        key: undefined,
      });
    });

    it('should handle null autoHideDuration', () => {
      const options: UseToastOptionsProps = { autoHideDuration: null };

      useToast.info('Test', options);

      expect(mockEnqueueSnackbar).toHaveBeenCalledWith('Test', {
        autoHideDuration: null,
        variant: 'info',
        key: undefined,
      });
    });

    it('should handle all toast variants with same message', () => {
      const message = 'Universal message';

      useToast.basic(message);
      useToast.error(message);
      useToast.info(message);
      useToast.success(message);
      useToast.warning(message);

      expect(mockEnqueueSnackbar).toHaveBeenCalledTimes(5);
      expect(mockEnqueueSnackbar).toHaveBeenNthCalledWith(1, message, {
        variant: 'default',
        key: undefined,
      });
      expect(mockEnqueueSnackbar).toHaveBeenNthCalledWith(2, message, {
        variant: 'error',
        key: undefined,
      });
      expect(mockEnqueueSnackbar).toHaveBeenNthCalledWith(3, message, {
        variant: 'info',
        key: undefined,
      });
      expect(mockEnqueueSnackbar).toHaveBeenNthCalledWith(4, message, {
        variant: 'success',
        key: undefined,
      });
      expect(mockEnqueueSnackbar).toHaveBeenNthCalledWith(5, message, {
        variant: 'warning',
        key: undefined,
      });
    });
  });
});

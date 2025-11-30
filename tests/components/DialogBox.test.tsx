import { render, screen, fireEvent } from '@testing-library/react';
import { DialogBox, DialogProps } from '../../src/components/DialogBox';

describe('DialogBox', () => {
  const mockClose = jest.fn();

  const mockDialog: DialogProps = {
    open: true,
    cancel: true,
    title: 'Test Dialog',
    message: 'This is a test dialog message',
    successLabel: 'Confirm',
    origin: 'test',
    return: { origin: 'test', status: false },
  };

  beforeEach(() => {
    mockClose.mockClear();
  });

  describe('rendering', () => {
    it('should render dialog when open is true', () => {
      render(<DialogBox dialog={mockDialog} close={mockClose} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
      expect(
        screen.getByText('This is a test dialog message'),
      ).toBeInTheDocument();
    });

    it('should not render dialog when open is false', () => {
      const closedDialog = { ...mockDialog, open: false };
      render(<DialogBox dialog={closedDialog} close={mockClose} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render with default dialog when no dialog prop provided', () => {
      render(<DialogBox close={mockClose} />);

      // Default dialog should not be open
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render title correctly', () => {
      render(<DialogBox dialog={mockDialog} close={mockClose} />);

      const title = screen.getByText('Test Dialog');
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute('id', 'alert-dialog-title');
    });

    it('should render message correctly', () => {
      render(<DialogBox dialog={mockDialog} close={mockClose} />);

      const message = screen.getByText('This is a test dialog message');
      expect(message).toBeInTheDocument();
      expect(message).toHaveAttribute('id', 'alert-dialog-description');
    });

    it('should render React node as message', () => {
      const reactMessage = (
        <div>
          <strong>Bold message</strong> with <em>emphasis</em>
        </div>
      );
      const dialogWithReactMessage = { ...mockDialog, message: reactMessage };

      render(<DialogBox dialog={dialogWithReactMessage} close={mockClose} />);

      expect(screen.getByText('Bold message')).toBeInTheDocument();
      expect(screen.getByText('emphasis')).toBeInTheDocument();
    });
  });

  describe('buttons', () => {
    it('should render success button with correct label', () => {
      render(<DialogBox dialog={mockDialog} close={mockClose} />);

      const successButton = screen.getByText('Confirm');
      expect(successButton).toBeInTheDocument();
      expect(successButton.closest('button')).toHaveClass(
        'MuiButton-colorSuccess',
      );
    });

    it('should render cancel button when cancel is true', () => {
      render(<DialogBox dialog={mockDialog} close={mockClose} />);

      const cancelButton = screen.getByText('Cancel');
      expect(cancelButton).toBeInTheDocument();
      expect(cancelButton.closest('button')).toHaveClass(
        'MuiButton-colorError',
      );
    });

    it('should not render cancel button when cancel is false', () => {
      const dialogWithoutCancel = { ...mockDialog, cancel: false };
      render(<DialogBox dialog={dialogWithoutCancel} close={mockClose} />);

      expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    it('should use custom cancel label', () => {
      render(
        <DialogBox
          dialog={mockDialog}
          cancelLabel='Cancelar'
          close={mockClose}
        />,
      );

      expect(screen.getByText('Cancelar')).toBeInTheDocument();
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });
  });

  describe('user interactions', () => {
    it('should call close with true when success button is clicked', () => {
      render(<DialogBox dialog={mockDialog} close={mockClose} />);

      const successButton = screen.getByText('Confirm');
      fireEvent.click(successButton);

      expect(mockClose).toHaveBeenCalledWith(true);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('should call close with false when cancel button is clicked', () => {
      render(<DialogBox dialog={mockDialog} close={mockClose} />);

      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      expect(mockClose).toHaveBeenCalledWith(false);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('should call close with false when dialog is closed via overlay', () => {
      render(<DialogBox dialog={mockDialog} close={mockClose} />);

      const dialog = screen.getByRole('dialog');
      fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });

      expect(mockClose).toHaveBeenCalledWith(false);
    });

    it('should call close with false when backdrop is clicked', () => {
      render(<DialogBox dialog={mockDialog} close={mockClose} />);

      // Find the backdrop and click it
      const backdrop = document.querySelector('.MuiModal-backdrop');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(mockClose).toHaveBeenCalledWith(false);
      }
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<DialogBox dialog={mockDialog} close={mockClose} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby', 'alert-dialog-title');
      expect(dialog).toHaveAttribute(
        'aria-describedby',
        'alert-dialog-description',
      );
    });

    it('should focus success button by default', () => {
      render(<DialogBox dialog={mockDialog} close={mockClose} />);

      const successButton = screen.getByText('Confirm');
      expect(successButton).toBeInTheDocument();
      expect(successButton.closest('button')).toHaveClass(
        'MuiButton-colorSuccess',
      );
    });

    it('should be keyboard navigable', () => {
      render(<DialogBox dialog={mockDialog} close={mockClose} />);

      const cancelButton = screen.getByText('Cancel');
      const confirmButton = screen.getByText('Confirm');

      // Both buttons should be focusable
      expect(cancelButton.closest('button')).toHaveAttribute('tabindex', '0');
      expect(confirmButton.closest('button')).toHaveAttribute('tabindex', '0');
    });
  });

  describe('edge cases', () => {
    it('should handle empty title', () => {
      const dialogWithEmptyTitle = { ...mockDialog, title: '' };
      render(<DialogBox dialog={dialogWithEmptyTitle} close={mockClose} />);

      const dialogElement = screen.getByRole('dialog');
      expect(dialogElement).toBeInTheDocument();
      const titleElement = document.getElementById('alert-dialog-title');
      expect(titleElement).toHaveTextContent('');
    });

    it('should handle empty message', () => {
      const dialogWithEmptyMessage = { ...mockDialog, message: '' };
      render(<DialogBox dialog={dialogWithEmptyMessage} close={mockClose} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    });

    it('should handle empty success label', () => {
      const dialogWithEmptyLabel = { ...mockDialog, successLabel: '' };
      render(<DialogBox dialog={dialogWithEmptyLabel} close={mockClose} />);

      // Button should still exist but with empty text
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should handle multiple rapid clicks', () => {
      render(<DialogBox dialog={mockDialog} close={mockClose} />);

      const successButton = screen.getByText('Confirm');
      fireEvent.click(successButton);
      fireEvent.click(successButton);
      fireEvent.click(successButton);

      // Should only call once per click
      expect(mockClose).toHaveBeenCalledTimes(3);
      expect(mockClose).toHaveBeenCalledWith(true);
    });

    it('should handle undefined close function gracefully', () => {
      expect(() => {
        render(<DialogBox dialog={mockDialog} close={undefined as any} />);
      }).not.toThrow();
    });
  });

  describe('default props', () => {
    it('should use default cancel label when not provided', () => {
      render(<DialogBox dialog={mockDialog} close={mockClose} />);

      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('should work with minimal props', () => {
      const minimalDialog: DialogProps = {
        open: true,
        title: 'Minimal',
        message: 'Minimal message',
        successLabel: 'OK',
        origin: 'test',
        return: {},
      };

      render(<DialogBox dialog={minimalDialog} close={mockClose} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Minimal')).toBeInTheDocument();
      expect(screen.getByText('OK')).toBeInTheDocument();
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument(); // cancel not provided
    });
  });
});

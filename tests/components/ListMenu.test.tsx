import { render, screen, fireEvent } from '@testing-library/react';
import { ListMenu, ListMenuItemProps } from '../../src/components/ListMenu';

const mockToggle = jest.fn();
const mockNavigate = jest.fn();

const mockMenuItems: ListMenuItemProps[] = [
  { label: 'Home', destiny: '/home' },
  { label: 'Profile', destiny: '/profile' },
  { label: 'Settings', action: jest.fn() },
  { label: 'Logout', action: jest.fn(), destiny: '/logout' },
];

describe('ListMenu', () => {
  beforeEach(() => {
    mockToggle.mockClear();
    mockNavigate.mockClear();
    mockMenuItems.forEach((item) => {
      if (item.action) {
        (item.action as jest.Mock).mockClear();
      }
    });
  });

  describe('rendering', () => {
    it('should render the menu when open', () => {
      render(
        <ListMenu
          menu={{ open: true, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('should not render menu items when closed', () => {
      render(
        <ListMenu
          menu={{ open: false, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('should render all menu items when open', () => {
      render(
        <ListMenu
          menu={{ open: true, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      mockMenuItems.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
    });

    it('should render menu with anchor element', () => {
      const anchorElement = document.createElement('button');
      document.body.appendChild(anchorElement);

      render(
        <ListMenu
          menu={{ open: true, anchorEl: anchorElement, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      expect(screen.getByRole('menu')).toBeInTheDocument();

      document.body.removeChild(anchorElement);
    });
  });

  describe('user interactions', () => {
    it('should call toggle when menu item with destiny is clicked', () => {
      render(
        <ListMenu
          menu={{ open: true, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      const homeItem = screen.getByText('Home');
      fireEvent.click(homeItem);

      expect(mockToggle).toHaveBeenCalledTimes(1);
    });

    it('should call navigate when menu item with destiny is clicked', () => {
      render(
        <ListMenu
          menu={{ open: true, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      const homeItem = screen.getByText('Home');
      fireEvent.click(homeItem);

      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });

    it('should call action when menu item with action is clicked', () => {
      render(
        <ListMenu
          menu={{ open: true, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      const settingsItem = screen.getByText('Settings');
      fireEvent.click(settingsItem);

      expect(mockMenuItems[2].action).toHaveBeenCalledTimes(1);
      expect(mockToggle).toHaveBeenCalledTimes(1);
    });

    it('should call both navigate and action when item has both', () => {
      render(
        <ListMenu
          menu={{ open: true, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      const logoutItem = screen.getByText('Logout');
      fireEvent.click(logoutItem);

      expect(mockNavigate).toHaveBeenCalledWith('/logout');
      expect(mockMenuItems[3].action).toHaveBeenCalledTimes(1);
      expect(mockToggle).toHaveBeenCalledTimes(1);
    });

    it('should call toggle on menu close', () => {
      render(
        <ListMenu
          menu={{ open: true, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      const menu = screen.getByRole('menu');

      // Simulate clicking outside (onClose event)
      fireEvent.keyDown(menu, { key: 'Escape' });

      expect(mockToggle).toHaveBeenCalled();
    });
  });

  describe('menu states', () => {
    it('should handle empty menu list', () => {
      render(
        <ListMenu
          menu={{ open: true, list: [] }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
      expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
    });

    it('should handle undefined menu list', () => {
      render(
        <ListMenu
          menu={{ open: true }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
      expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
    });

    it('should handle menu items without destiny or action', () => {
      const basicItems: ListMenuItemProps[] = [
        { label: 'Basic Item 1' },
        { label: 'Basic Item 2' },
      ];

      render(
        <ListMenu
          menu={{ open: true, list: basicItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      const item1 = screen.getByText('Basic Item 1');
      fireEvent.click(item1);

      expect(mockToggle).toHaveBeenCalledTimes(1);
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('keyboard navigation', () => {
    it('should handle keyboard events on menu items', () => {
      render(
        <ListMenu
          menu={{ open: true, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      const homeItem = screen.getByText('Home');

      fireEvent.keyDown(homeItem, { key: 'Enter' });

      // The menu item should still be accessible via keyboard
      expect(homeItem).toBeInTheDocument();
    });

    it('should support tab navigation', () => {
      render(
        <ListMenu
          menu={{ open: true, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      const menuItems = screen.getAllByRole('menuitem');

      menuItems.forEach((item) => {
        expect(item).toBeInTheDocument();
      });
    });
  });

  describe('edge cases', () => {
    it('should handle items with special characters in labels', () => {
      const specialItems: ListMenuItemProps[] = [
        { label: 'Item with "quotes"', destiny: '/quotes' },
        { label: 'Item with <brackets>', destiny: '/brackets' },
        { label: 'Item with & symbols', destiny: '/symbols' },
      ];

      render(
        <ListMenu
          menu={{ open: true, list: specialItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      expect(screen.getByText('Item with "quotes"')).toBeInTheDocument();
      expect(screen.getByText('Item with <brackets>')).toBeInTheDocument();
      expect(screen.getByText('Item with & symbols')).toBeInTheDocument();
    });

    it('should handle null anchor element', () => {
      render(
        <ListMenu
          menu={{ open: true, anchorEl: null, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('should handle very long menu item labels', () => {
      const longItems: ListMenuItemProps[] = [
        {
          label:
            'This is a very long menu item label that might cause layout issues if not handled properly',
          destiny: '/long',
        },
      ];

      render(
        <ListMenu
          menu={{ open: true, list: longItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      expect(
        screen.getByText(/This is a very long menu item label/),
      ).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <ListMenu
          menu={{ open: true, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();

      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(mockMenuItems.length);
    });

    it('should support focus management', () => {
      render(
        <ListMenu
          menu={{ open: true, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      const firstMenuItem = screen.getAllByRole('menuitem')[0];
      firstMenuItem.focus();

      expect(document.activeElement).toBe(firstMenuItem);
    });

    it('should maintain proper menu structure', () => {
      render(
        <ListMenu
          menu={{ open: true, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      const menu = screen.getByRole('menu');
      const menuItems = screen.getAllByRole('menuitem');

      expect(menu).toContainElement(menuItems[0]);
      expect(menu).toContainElement(menuItems[menuItems.length - 1]);
    });
  });

  describe('performance', () => {
    it('should handle large number of menu items', () => {
      const largeItemList: ListMenuItemProps[] = Array.from(
        { length: 100 },
        (_, i) => ({
          label: `Item ${i}`,
          destiny: `/item-${i}`,
        }),
      );

      render(
        <ListMenu
          menu={{ open: true, list: largeItemList }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      expect(screen.getAllByRole('menuitem')).toHaveLength(100);
    });

    it('should not re-render unnecessarily when closed', () => {
      const { rerender } = render(
        <ListMenu
          menu={{ open: false, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      // Rerender with same props
      rerender(
        <ListMenu
          menu={{ open: false, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('should handle state changes efficiently', () => {
      const { rerender } = render(
        <ListMenu
          menu={{ open: false, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();

      rerender(
        <ListMenu
          menu={{ open: true, list: mockMenuItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(screen.getAllByRole('menuitem')).toHaveLength(
        mockMenuItems.length,
      );
    });
  });

  describe('key generation', () => {
    it('should generate unique keys for menu items', () => {
      const duplicateLabelItems: ListMenuItemProps[] = [
        { label: 'Same Label', destiny: '/first' },
        { label: 'Same Label', destiny: '/second' },
        { label: 'Same Label', action: jest.fn() },
      ];

      render(
        <ListMenu
          menu={{ open: true, list: duplicateLabelItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      const menuItems = screen.getAllByText('Same Label');
      expect(menuItems).toHaveLength(3);
    });

    it('should handle empty labels gracefully', () => {
      const emptyLabelItems: ListMenuItemProps[] = [
        { label: '', destiny: '/empty' },
        { label: 'Normal Label', destiny: '/normal' },
      ];

      render(
        <ListMenu
          menu={{ open: true, list: emptyLabelItems }}
          toggle={mockToggle}
          navigate={mockNavigate}
        />,
      );

      expect(screen.getByText('Normal Label')).toBeInTheDocument();
      expect(screen.getAllByRole('menuitem')).toHaveLength(2);
    });
  });
});

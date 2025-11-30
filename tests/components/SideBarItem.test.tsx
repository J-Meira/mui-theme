import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  act,
  waitFor,
} from '@testing-library/react';
import { SideBarItem } from '../../src/components/SideBarItem';

// Mock react-icons/md
jest.mock('react-icons/md', () => ({
  MdExpandLess: () => <svg data-testid='ExpandLessIcon' />,
  MdExpandMore: () => <svg data-testid='ExpandMoreIcon' />,
}));

describe('SideBarItem', () => {
  describe('basic rendering', () => {
    it('should render label', () => {
      render(<SideBarItem label='Test Item' />);

      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    it('should render with icon when provided', () => {
      const TestIcon = () => <svg data-testid='test-icon' />;
      render(<SideBarItem label='Test Item' icon={<TestIcon />} />);

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    it('should render button with proper title attribute', () => {
      render(<SideBarItem label='Test Item' />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Test Item');
    });
  });

  describe('collapsed behavior', () => {
    it('should show label initials when expanded is false and no icon', () => {
      render(<SideBarItem label='Test Item' expanded={false} />);

      expect(screen.getByText('TI')).toBeInTheDocument();
      expect(screen.queryByText('Test Item')).not.toBeInTheDocument();
    });

    it('should show single word initial when label has one word', () => {
      render(<SideBarItem label='Dashboard' expanded={false} />);

      expect(screen.getByText('Da')).toBeInTheDocument();
    });

    it('should show icon when provided even when collapsed', () => {
      const TestIcon = () => <svg data-testid='test-icon' />;
      render(
        <SideBarItem label='Test Item' icon={<TestIcon />} expanded={false} />,
      );

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.queryByText('Test Item')).not.toBeInTheDocument();
    });
  });

  describe('expandable items with children', () => {
    it('should render expand icon when has children', () => {
      const { container } = render(
        <SideBarItem label='Parent Item'>
          <SideBarItem label='Child Item' secondary />
        </SideBarItem>,
      );

      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should expand children when clicked', () => {
      render(
        <SideBarItem label='Parent Item'>
          <SideBarItem label='Child Item' secondary />
        </SideBarItem>,
      );

      const parentButton = screen.getByRole('button', { name: /Parent Item/i });
      expect(screen.queryByText('Child Item')).not.toBeInTheDocument();

      fireEvent.click(parentButton);
      expect(screen.getByText('Child Item')).toBeInTheDocument();
    });

    it('should collapse children when clicked again', async () => {
      render(
        <SideBarItem label='Parent Item' initialState expanded>
          <SideBarItem label='Child Item' secondary />
        </SideBarItem>,
      );

      const parentButton = screen.getByRole('button', { name: /Parent Item/i });
      expect(screen.getByText('Child Item')).toBeInTheDocument();

      fireEvent.click(parentButton);

      await waitFor(() => {
        expect(screen.queryByText('Child Item')).not.toBeInTheDocument();
      });
    });

    it('should start expanded when initialState is true', () => {
      render(
        <SideBarItem label='Parent Item' initialState>
          <SideBarItem label='Child Item' secondary />
        </SideBarItem>,
      );

      expect(screen.getByText('Child Item')).toBeInTheDocument();
      const parentButton = document.querySelector('[title="Parent Item"]');
      const expandIcon = parentButton?.querySelector('svg');
      expect(expandIcon).toBeInTheDocument();
    });

    it('should call sideBarControl when opening collapsed sidebar', () => {
      const mockSideBarControl = jest.fn();
      render(
        <SideBarItem
          label='Parent Item'
          expanded={false}
          sideBarControl={mockSideBarControl}
        >
          <SideBarItem label='Child Item' secondary />
        </SideBarItem>,
      );

      const parentButton = document.querySelector('[title="Parent Item"]');
      fireEvent.click(parentButton!);

      expect(mockSideBarControl).toHaveBeenCalledTimes(1);
    });

    it('should not call sideBarControl when sidebar is already expanded', () => {
      const mockSideBarControl = jest.fn();
      render(
        <SideBarItem
          label='Parent Item'
          expanded
          sideBarControl={mockSideBarControl}
        >
          <SideBarItem label='Child Item' secondary />
        </SideBarItem>,
      );

      const parentButton = screen.getByRole('button', { name: /Parent Item/i });
      fireEvent.click(parentButton);

      expect(mockSideBarControl).not.toHaveBeenCalled();
    });

    it('should close when sidebar becomes collapsed', async () => {
      const { rerender } = render(
        <SideBarItem label='Parent Item' expanded initialState>
          <SideBarItem label='Child Item' secondary />
        </SideBarItem>,
      );

      expect(screen.getByText('Child Item')).toBeInTheDocument();

      rerender(
        <SideBarItem label='Parent Item' expanded={false} initialState>
          <SideBarItem label='Child Item' secondary />
        </SideBarItem>,
      );

      await waitForElementToBeRemoved(() => screen.queryByText('Child Item'));
    });
  });

  describe('leaf items without children', () => {
    it('should call onClick when clicked', () => {
      const mockOnClick = jest.fn();
      render(<SideBarItem label='Leaf Item' onClick={mockOnClick} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should not render expand/collapse icons when no children', () => {
      const { container } = render(<SideBarItem label='Leaf Item' />);

      const icon = container.querySelector('svg');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('selected state', () => {
    it('should apply selected state to primary items', () => {
      render(<SideBarItem label='Selected Item' selected />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('Mui-selected');
    });

    it('should apply selected state to secondary items', () => {
      render(<SideBarItem label='Selected Item' secondary selected />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('Mui-selected');
    });
  });

  describe('secondary items', () => {
    it('should apply secondary class when secondary prop is true', () => {
      const { container } = render(
        <SideBarItem label='Secondary Item' secondary />,
      );

      const listItem = container.querySelector('.MuiListItem-root');
      expect(listItem).toHaveClass('secondary');
    });

    it('should apply secondary-selected class when secondary and selected', () => {
      const { container } = render(
        <SideBarItem label='Secondary Item' secondary selected />,
      );

      const listItem = container.querySelector('.MuiListItem-root');
      expect(listItem).toHaveClass('secondary-selected');
    });
  });

  describe('color customization', () => {
    it('should apply custom icon color', () => {
      const TestIcon = () => <svg data-testid='test-icon' />;
      const mockIconColor = jest.fn(() => '#ff0000');

      render(
        <SideBarItem
          label='Test Item'
          icon={<TestIcon />}
          iconColor={mockIconColor}
        />,
      );

      expect(mockIconColor).toHaveBeenCalled();
    });

    it('should apply custom text color', () => {
      const mockTextColor = jest.fn(() => '#00ff00');

      render(<SideBarItem label='Test Item' textColor={mockTextColor} />);

      expect(mockTextColor).toHaveBeenCalled();
    });
  });

  describe('prop forwarding', () => {
    it('should forward additional props to ListItemButton', () => {
      render(<SideBarItem label='Test Item' data-testid='custom-item' />);

      const button = screen.getByTestId('custom-item');
      expect(button).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper button role', () => {
      render(<SideBarItem label='Test Item' />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should have proper title attribute for tooltip', () => {
      render(<SideBarItem label='Test Item' />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Test Item');
    });

    it('should have proper list structure for nested items', () => {
      render(
        <SideBarItem label='Parent Item' initialState>
          <SideBarItem label='Child Item' secondary />
        </SideBarItem>,
      );

      const lists = document.querySelectorAll('.MuiList-root');
      expect(lists.length).toBeGreaterThan(0);
    });
  });

  describe('edge cases', () => {
    it('should handle empty label gracefully', () => {
      render(<SideBarItem label='' />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should handle single character label for initials', () => {
      render(<SideBarItem label='A' expanded={false} />);

      expect(screen.getByText('Aundefined')).toBeInTheDocument();
    });

    it('should handle very long labels', () => {
      const longLabel =
        'This is a very long label that might cause layout issues';
      render(<SideBarItem label={longLabel} />);

      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it('should handle rapid expand/collapse clicks', () => {
      render(
        <SideBarItem label='Parent Item'>
          <SideBarItem label='Child Item' secondary />
        </SideBarItem>,
      );

      const button = screen.getByRole('button');

      act(() => {
        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);
      });

      expect(screen.getByText('Child Item')).toBeInTheDocument();
    });

    it('should work without any optional props', () => {
      render(<SideBarItem label='Minimal Item' />);

      expect(screen.getByText('Minimal Item')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});

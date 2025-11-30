import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SideBar } from '../../src/components/SideBar';
import { useWindowDimensions } from '../../src/hooks';

// Mock useWindowDimensions hook
jest.mock('../../src/hooks', () => ({
  useWindowDimensions: jest.fn(),
}));

const mockUseWindowDimensions = useWindowDimensions as jest.Mock;

describe('SideBar', () => {
  const defaultProps = {
    logo: '/logo.png',
    icon: '/icon.png',
    expanded: true,
    sideBarControl: jest.fn(),
    homeNavigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseWindowDimensions.mockReturnValue({ width: 1200, height: 800 });
  });

  describe('rendering', () => {
    it('should render drawer with correct props', () => {
      const { container } = render(<SideBar {...defaultProps} />);

      const drawer = container.querySelector('.side-bar');
      expect(drawer).toBeInTheDocument();
      expect(drawer).toHaveClass('side-bar');
    });

    it('should render logo when expanded', () => {
      render(<SideBar {...defaultProps} expanded />);

      const logoImg = screen.getByAltText('Logo');
      expect(logoImg).toBeInTheDocument();
      expect(logoImg).toHaveAttribute('src', '/logo.png');
    });

    it('should render icon when collapsed', () => {
      render(<SideBar {...defaultProps} expanded={false} />);

      const logoImg = screen.getByAltText('Logo');
      expect(logoImg).toBeInTheDocument();
      expect(logoImg).toHaveAttribute('src', '/icon.png');
    });

    it('should render children in list', () => {
      render(
        <SideBar {...defaultProps}>
          <div>Menu Item 1</div>
          <div>Menu Item 2</div>
        </SideBar>,
      );

      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getByText('Menu Item 1')).toBeInTheDocument();
      expect(screen.getByText('Menu Item 2')).toBeInTheDocument();
    });
  });

  describe('responsive behavior', () => {
    it('should use permanent variant for wide screens', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 1200, height: 800 });
      const { container } = render(<SideBar {...defaultProps} />);

      const drawer = container.querySelector('.MuiDrawer-docked');
      expect(drawer).toBeInTheDocument();
    });

    it('should use persistent variant for narrow screens', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 600, height: 800 });
      const { container } = render(<SideBar {...defaultProps} />);

      // Check for click listener overlay on mobile
      const clickListener = container.querySelector('.click-listener');
      expect(clickListener).toBeInTheDocument();
    });

    it('should add collapsed class when not expanded on wide screens', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 1200, height: 800 });
      const { container } = render(
        <SideBar {...defaultProps} expanded={false} />,
      );

      const drawer = container.querySelector('.side-bar');
      expect(drawer).toHaveClass('side-bar', 'side-bar-collapsed');
    });

    it('should render click listener overlay on mobile when expanded', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 600, height: 800 });
      const mockSideBarControl = jest.fn();
      const { container } = render(
        <SideBar
          {...defaultProps}
          expanded
          sideBarControl={mockSideBarControl}
        />,
      );

      const clickListener = container.querySelector('.click-listener');
      expect(clickListener).toBeInTheDocument();

      fireEvent.click(clickListener!);
      expect(mockSideBarControl).toHaveBeenCalledTimes(1);
    });

    it('should not render click listener overlay on mobile when collapsed', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 600, height: 800 });
      const { container } = render(
        <SideBar {...defaultProps} expanded={false} />,
      );

      const clickListener = container.querySelector('.click-listener');
      expect(clickListener).not.toBeInTheDocument();
    });
  });

  describe('version display', () => {
    it('should render version and version date when provided', () => {
      render(
        <SideBar {...defaultProps} version='1.0.0' versionDate='2024-01-15' />,
      );

      expect(screen.getByText('1.0.0')).toBeInTheDocument();
    });

    it('should not render version section when version is not provided', () => {
      const { container } = render(<SideBar {...defaultProps} />);

      const footer = container.querySelector('.side-bar-footer');
      expect(footer).not.toBeInTheDocument();
    });

    it('should not render version section when versionDate is not provided', () => {
      const { container } = render(
        <SideBar {...defaultProps} version='1.0.0' />,
      );

      const footer = container.querySelector('.side-bar-footer');
      expect(footer).not.toBeInTheDocument();
    });

    it('should show version date popover on hover', () => {
      render(
        <SideBar {...defaultProps} version='1.0.0' versionDate='2024-01-15' />,
      );

      const versionText = screen.getByText('1.0.0');
      fireEvent.mouseEnter(versionText);

      expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    });

    it('should hide version date popover on mouse leave', async () => {
      render(
        <SideBar {...defaultProps} version='1.0.0' versionDate='2024-01-15' />,
      );

      const versionText = screen.getByText('1.0.0');
      fireEvent.mouseEnter(versionText);
      expect(screen.getByText('2024-01-15')).toBeInTheDocument();

      fireEvent.mouseLeave(versionText);
      await waitFor(() => {
        expect(screen.queryByText('2024-01-15')).not.toBeInTheDocument();
      });
    });
  });

  describe('user interactions', () => {
    it('should call homeNavigate when logo is clicked', () => {
      const mockHomeNavigate = jest.fn();
      render(<SideBar {...defaultProps} homeNavigate={mockHomeNavigate} />);

      const logoImg = screen.getByAltText('Logo');
      fireEvent.click(logoImg);

      expect(mockHomeNavigate).toHaveBeenCalledTimes(1);
    });

    it('should call onMouseHover when drawer is hovered', () => {
      const mockOnMouseHover = jest.fn();
      const { container } = render(
        <SideBar {...defaultProps} onMouseHover={mockOnMouseHover} />,
      );

      const drawer = container.querySelector('.MuiDrawer-root');

      fireEvent.mouseEnter(drawer!);
      expect(mockOnMouseHover).toHaveBeenCalledWith(true);

      fireEvent.mouseLeave(drawer!);
      expect(mockOnMouseHover).toHaveBeenCalledWith(false);
    });

    it('should not call onMouseHover when not provided', () => {
      const { container } = render(<SideBar {...defaultProps} />);

      const drawer = container.querySelector('.MuiDrawer-root');

      // Should not throw error
      fireEvent.mouseEnter(drawer!);
      fireEvent.mouseLeave(drawer!);

      expect(container).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper roles', () => {
      const { container } = render(<SideBar {...defaultProps} />);

      expect(container.querySelector('.MuiDrawer-root')).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should have proper aria attributes for version popover', () => {
      render(
        <SideBar {...defaultProps} version='1.0.0' versionDate='2024-01-15' />,
      );

      const versionText = screen.getByText('1.0.0');
      expect(versionText).toHaveAttribute('aria-haspopup', 'true');

      fireEvent.mouseEnter(versionText);
      expect(versionText).toHaveAttribute('aria-owns', 'version-date-popover');
    });

    it('should have proper alt text for logo', () => {
      render(<SideBar {...defaultProps} />);

      const logoImg = screen.getByAltText('Logo');
      expect(logoImg).toBeInTheDocument();
    });
  });

  describe('CSS classes', () => {
    it('should apply correct classes based on screen size and expansion state', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 1200, height: 800 });
      const { rerender, container } = render(
        <SideBar {...defaultProps} expanded />,
      );

      let drawer = container.querySelector('.side-bar');
      expect(drawer).toHaveClass('side-bar');
      expect(drawer).not.toHaveClass('side-bar-collapsed');

      rerender(<SideBar {...defaultProps} expanded={false} />);
      drawer = container.querySelector('.side-bar');
      expect(drawer).toHaveClass('side-bar', 'side-bar-collapsed');

      mockUseWindowDimensions.mockReturnValue({ width: 600, height: 800 });
      rerender(<SideBar {...defaultProps} expanded />);
      drawer = container.querySelector('.side-bar');
      expect(drawer).toHaveClass('side-bar');
      expect(drawer).not.toHaveClass('side-bar-collapsed');
    });
  });

  describe('edge cases', () => {
    it('should handle missing children gracefully', () => {
      render(<SideBar {...defaultProps} />);

      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should handle window resize effects', () => {
      mockUseWindowDimensions.mockReturnValue({ width: 1200, height: 800 });
      const { rerender, container } = render(
        <SideBar {...defaultProps} expanded={false} />,
      );

      let drawer = container.querySelector('.side-bar');
      expect(drawer).toHaveClass('side-bar-collapsed');

      // Simulate window resize to mobile
      mockUseWindowDimensions.mockReturnValue({ width: 600, height: 800 });
      rerender(<SideBar {...defaultProps} expanded={false} />);

      drawer = container.querySelector('.side-bar');
      expect(drawer).not.toHaveClass('side-bar-collapsed');
    });

    it('should work with minimal props', () => {
      const { container } = render(
        <SideBar
          logo='/logo.png'
          icon='/icon.png'
          expanded
          sideBarControl={jest.fn()}
          homeNavigate={jest.fn()}
        />,
      );

      expect(container.querySelector('.MuiDrawer-root')).toBeInTheDocument();
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
    });
  });
});

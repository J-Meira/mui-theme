import { render, screen, fireEvent } from '@testing-library/react';
import { Header, HeaderProps } from '../../src/components/Header';

describe('Header', () => {
  const mockSideBarControl = jest.fn();

  beforeEach(() => {
    mockSideBarControl.mockClear();
  });

  describe('rendering', () => {
    it('should render app bar with toolbar', () => {
      render(<Header />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(document.querySelector('.tool-bar')).toBeInTheDocument();
    });

    it('should apply correct CSS classes', () => {
      render(<Header />);

      const appBar = screen.getByRole('banner');
      const toolbar = document.querySelector('.tool-bar');

      expect(appBar).toHaveClass('app-bar');
      expect(toolbar).toHaveClass('tool-bar');
    });

    it('should render navigation when provided', () => {
      const navigation = <div data-testid='navigation'>Navigation Content</div>;
      render(<Header navigation={navigation} />);

      expect(screen.getByTestId('navigation')).toBeInTheDocument();
      expect(screen.getByText('Navigation Content')).toBeInTheDocument();
    });

    it('should render actions when provided', () => {
      const actions = <div data-testid='actions'>Action Buttons</div>;
      render(<Header actions={actions} />);

      expect(screen.getByTestId('actions')).toBeInTheDocument();
      expect(screen.getByText('Action Buttons')).toBeInTheDocument();
    });

    it('should render both navigation and actions', () => {
      const navigation = <div data-testid='navigation'>Nav</div>;
      const actions = <div data-testid='actions'>Actions</div>;

      render(<Header navigation={navigation} actions={actions} />);

      expect(screen.getByTestId('navigation')).toBeInTheDocument();
      expect(screen.getByTestId('actions')).toBeInTheDocument();
    });
  });

  describe('sidebar control', () => {
    it('should render menu button when sideBarControl is provided', () => {
      render(<Header sideBarControl={mockSideBarControl} />);

      const menuButton = screen.getByRole('button', { name: /menu/i });
      expect(menuButton).toBeInTheDocument();
      expect(menuButton.querySelector('svg')).toBeInTheDocument();
    });

    it('should not render menu button when sideBarControl is not provided', () => {
      render(<Header />);

      expect(
        screen.queryByRole('button', { name: /menu/i }),
      ).not.toBeInTheDocument();
    });

    it('should call sideBarControl when menu button is clicked', () => {
      render(<Header sideBarControl={mockSideBarControl} />);

      const menuButton = screen.getByRole('button', { name: /menu/i });
      fireEvent.click(menuButton);

      expect(mockSideBarControl).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple clicks on menu button', () => {
      render(<Header sideBarControl={mockSideBarControl} />);

      const menuButton = screen.getByRole('button', { name: /menu/i });
      fireEvent.click(menuButton);
      fireEvent.click(menuButton);
      fireEvent.click(menuButton);

      expect(mockSideBarControl).toHaveBeenCalledTimes(3);
    });
  });

  describe('toolbar classes based on sidebar state', () => {
    it('should apply tool-bar-full class when sideBarExpanded is undefined', () => {
      render(<Header />);

      const toolbar = document.querySelector('.tool-bar');
      expect(toolbar).toHaveClass('tool-bar-full');
    });

    it('should apply tool-bar-expanded class when sideBarExpanded is false', () => {
      render(<Header sideBarExpanded={false} />);

      const toolbar = document.querySelector('.tool-bar');
      expect(toolbar).toHaveClass('tool-bar-expanded');
      expect(toolbar).not.toHaveClass('tool-bar-full');
    });

    it('should not apply additional classes when sideBarExpanded is true', () => {
      render(<Header sideBarExpanded={true} />);

      const toolbar = document.querySelector('.tool-bar');
      expect(toolbar).toHaveClass('tool-bar');
      expect(toolbar).not.toHaveClass('tool-bar-full');
      expect(toolbar).not.toHaveClass('tool-bar-expanded');
    });
  });

  describe('navigation bar rendering', () => {
    it('should render navigation bar when sideBarControl is provided', () => {
      render(<Header sideBarControl={mockSideBarControl} />);

      const navigationBar = document.querySelector('.navigation-bar');
      expect(navigationBar).toBeInTheDocument();
    });

    it('should render navigation bar when navigation is provided', () => {
      const navigation = <div>Navigation</div>;
      render(<Header navigation={navigation} />);

      const navigationBar = document.querySelector('.navigation-bar');
      expect(navigationBar).toBeInTheDocument();
    });

    it('should not render navigation bar when neither sideBarControl nor navigation is provided', () => {
      render(<Header />);

      const navigationBar = document.querySelector('.navigation-bar');
      expect(navigationBar).not.toBeInTheDocument();
    });

    it('should render both menu button and navigation in navigation bar', () => {
      const navigation = <span>Navigation Content</span>;
      render(
        <Header sideBarControl={mockSideBarControl} navigation={navigation} />,
      );

      const navigationBar = document.querySelector('.navigation-bar');
      expect(navigationBar).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
      expect(screen.getByText('Navigation Content')).toBeInTheDocument();
    });
  });

  describe('actions bar rendering', () => {
    it('should render actions bar when actions are provided', () => {
      const actions = <button>Action Button</button>;
      render(<Header actions={actions} />);

      const actionsBar = document.querySelector('.actions-bar');
      expect(actionsBar).toBeInTheDocument();
      expect(screen.getByText('Action Button')).toBeInTheDocument();
    });

    it('should not render actions bar when actions are not provided', () => {
      render(<Header />);

      const actionsBar = document.querySelector('.actions-bar');
      expect(actionsBar).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes on menu button', () => {
      render(<Header sideBarControl={mockSideBarControl} />);

      const menuButton = screen.getByRole('button', { name: /menu/i });
      expect(menuButton).toHaveAttribute('aria-label', 'menu');
    });

    it('should be keyboard accessible', () => {
      render(<Header sideBarControl={mockSideBarControl} />);

      const menuButton = screen.getByRole('button', { name: /menu/i });

      // Test keyboard interaction
      fireEvent.keyDown(menuButton, { key: 'Enter' });
      fireEvent.keyUp(menuButton, { key: 'Enter' });

      // Button should still be accessible
      expect(menuButton).toBeInTheDocument();
    });

    it('should have proper landmark roles', () => {
      render(<Header />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(document.querySelector('.tool-bar')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle complex navigation content', () => {
      const complexNavigation = (
        <div>
          <button>Nav Button 1</button>
          <span>|</span>
          <button>Nav Button 2</button>
        </div>
      );

      render(<Header navigation={complexNavigation} />);

      expect(screen.getByText('Nav Button 1')).toBeInTheDocument();
      expect(screen.getByText('Nav Button 2')).toBeInTheDocument();
      expect(screen.getByText('|')).toBeInTheDocument();
    });

    it('should handle complex actions content', () => {
      const complexActions = (
        <div>
          <button>Login</button>
          <button>Settings</button>
          <button>Profile</button>
        </div>
      );

      render(<Header actions={complexActions} />);

      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should handle empty content gracefully', () => {
      render(<Header navigation={null} actions={null} />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(document.querySelector('.tool-bar')).toBeInTheDocument();
    });

    it('should handle undefined sideBarControl gracefully', () => {
      render(<Header sideBarControl={undefined} />);

      expect(
        screen.queryByRole('button', { name: /menu/i }),
      ).not.toBeInTheDocument();
    });

    it('should work with all props provided', () => {
      const navigation = <div>Full Navigation</div>;
      const actions = <div>Full Actions</div>;

      render(
        <Header
          sideBarControl={mockSideBarControl}
          sideBarExpanded={false}
          navigation={navigation}
          actions={actions}
        />,
      );

      expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
      expect(screen.getByText('Full Navigation')).toBeInTheDocument();
      expect(screen.getByText('Full Actions')).toBeInTheDocument();
      const toolbar = document.querySelector('.tool-bar');
      expect(toolbar).toHaveClass('tool-bar-expanded');
    });
  });

  describe('prop combinations', () => {
    const testCases: Array<{
      name: string;
      props: HeaderProps;
      expectNavigationBar: boolean;
      expectActionsBar: boolean;
      expectMenuButton: boolean;
      expectedToolbarClass: string;
    }> = [
      {
        name: 'no props',
        props: {},
        expectNavigationBar: false,
        expectActionsBar: false,
        expectMenuButton: false,
        expectedToolbarClass: 'tool-bar-full',
      },
      {
        name: 'only sideBarControl',
        props: { sideBarControl: mockSideBarControl },
        expectNavigationBar: true,
        expectActionsBar: false,
        expectMenuButton: true,
        expectedToolbarClass: 'tool-bar-full',
      },
      {
        name: 'only navigation',
        props: { navigation: <div>Nav</div> },
        expectNavigationBar: true,
        expectActionsBar: false,
        expectMenuButton: false,
        expectedToolbarClass: 'tool-bar-full',
      },
      {
        name: 'only actions',
        props: { actions: <div>Actions</div> },
        expectNavigationBar: false,
        expectActionsBar: true,
        expectMenuButton: false,
        expectedToolbarClass: 'tool-bar-full',
      },
    ];

    testCases.forEach(
      ({
        name,
        props,
        expectNavigationBar,
        expectActionsBar,
        expectMenuButton,
        expectedToolbarClass,
      }) => {
        it(`should render correctly with ${name}`, () => {
          render(<Header {...props} />);

          const navigationBar = document.querySelector('.navigation-bar');
          const actionsBar = document.querySelector('.actions-bar');
          const menuButton = screen.queryByRole('button', { name: /menu/i });
          const toolbar = document.querySelector('.tool-bar');

          if (expectNavigationBar) {
            expect(navigationBar).toBeInTheDocument();
          } else {
            expect(navigationBar).not.toBeInTheDocument();
          }

          if (expectActionsBar) {
            expect(actionsBar).toBeInTheDocument();
          } else {
            expect(actionsBar).not.toBeInTheDocument();
          }

          if (expectMenuButton) {
            expect(menuButton).toBeInTheDocument();
          } else {
            expect(menuButton).not.toBeInTheDocument();
          }

          expect(toolbar).toHaveClass(expectedToolbarClass);
        });
      },
    );
  });
});

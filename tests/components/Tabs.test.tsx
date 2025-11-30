import { render, screen, fireEvent } from '@testing-library/react';
import { TabsContainer, TabPanel } from '../../src/components/Tabs';

// Mock react-icons/md
jest.mock('react-icons/md', () => ({
  MdError: ({ color }: { color: string }) => (
    <svg data-testid='ErrorIcon' data-color={color} />
  ),
}));

describe('TabsContainer', () => {
  const defaultTabs = [
    {
      label: 'Tab 1',
      value: 0,
      children: <div>Tab 1 Content</div>,
    },
    {
      label: 'Tab 2',
      value: 1,
      children: <div>Tab 2 Content</div>,
    },
    {
      label: 'Tab 3',
      value: 2,
      children: <div>Tab 3 Content</div>,
    },
  ];

  describe('rendering', () => {
    it('should render tabs with labels', () => {
      render(<TabsContainer title='Test Tabs' tabs={defaultTabs} />);

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
    });

    it('should render first tab content by default', () => {
      render(<TabsContainer title='Test Tabs' tabs={defaultTabs} />);

      expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
      expect(screen.queryByText('Tab 2 Content')).not.toBeVisible();
      expect(screen.queryByText('Tab 3 Content')).not.toBeVisible();
    });

    it('should apply correct aria attributes', () => {
      render(<TabsContainer title='Test Tabs' tabs={defaultTabs} />);

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-label', 'tab-Test Tabs');

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(firstTab).toHaveAttribute('id', 'tab-Test Tabs-0');
      expect(firstTab).toHaveAttribute('aria-controls', 'tabpanel-Test Tabs-0');
    });
  });

  describe('tab switching', () => {
    it('should switch tabs when clicked', () => {
      render(<TabsContainer title='Test Tabs' tabs={defaultTabs} />);

      expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));

      expect(screen.queryByText('Tab 1 Content')).not.toBeVisible();
      expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
    });

    it('should update active tab selection', () => {
      render(<TabsContainer title='Test Tabs' tabs={defaultTabs} />);

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      const secondTab = screen.getByRole('tab', { name: 'Tab 2' });

      expect(firstTab).toHaveAttribute('aria-selected', 'true');
      expect(secondTab).toHaveAttribute('aria-selected', 'false');

      fireEvent.click(secondTab);

      expect(firstTab).toHaveAttribute('aria-selected', 'false');
      expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });

    it('should switch to third tab', () => {
      render(<TabsContainer title='Test Tabs' tabs={defaultTabs} />);

      fireEvent.click(screen.getByRole('tab', { name: 'Tab 3' }));

      expect(screen.queryByText('Tab 1 Content')).not.toBeVisible();
      expect(screen.queryByText('Tab 2 Content')).not.toBeVisible();
      expect(screen.getByText('Tab 3 Content')).toBeInTheDocument();
    });
  });

  describe('error handling', () => {
    const tabsWithError = [
      {
        label: 'Tab 1',
        value: 0,
        children: <div>Tab 1 Content</div>,
      },
      {
        label: 'Tab 2',
        value: 1,
        children: <div>Tab 2 Content</div>,
        error: 'Something went wrong',
      },
    ];

    it('should show error icon for tabs with errors', () => {
      render(<TabsContainer title='Test Tabs' tabs={tabsWithError} />);

      expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument();
      expect(screen.getByTestId('ErrorIcon')).toHaveAttribute(
        'data-color',
        'error',
      );
    });

    it('should show error message on hover', () => {
      render(<TabsContainer title='Test Tabs' tabs={tabsWithError} />);

      const tabWithError = screen.getByRole('tab', { name: 'Tab 2' });

      fireEvent.mouseEnter(tabWithError);
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should hide error message on mouse leave', () => {
      render(<TabsContainer title='Test Tabs' tabs={tabsWithError} />);

      const tabWithError = screen.getByRole('tab', { name: 'Tab 2' });

      fireEvent.mouseEnter(tabWithError);
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();

      fireEvent.mouseLeave(tabWithError);
      expect(
        screen.queryByText('Something went wrong'),
      ).not.toBeInTheDocument();
    });

    it('should have proper aria attributes for error tabs', () => {
      render(<TabsContainer title='Test Tabs' tabs={tabsWithError} />);

      const tabWithError = screen.getByRole('tab', { name: 'Tab 2' });
      expect(tabWithError).toHaveAttribute('aria-haspopup', 'true');

      fireEvent.mouseEnter(tabWithError);
      expect(tabWithError).toHaveAttribute('aria-owns', 'error-popover');
    });
  });

  describe('accessibility', () => {
    it('should have proper tablist role', () => {
      render(<TabsContainer title='Test Tabs' tabs={defaultTabs} />);

      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('should have proper tab roles', () => {
      render(<TabsContainer title='Test Tabs' tabs={defaultTabs} />);

      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);
    });

    it('should have proper tabpanel roles', () => {
      render(<TabsContainer title='Test Tabs' tabs={defaultTabs} />);

      const tabpanels = screen.getAllByRole('tabpanel', { hidden: true });
      expect(tabpanels).toHaveLength(3);
    });

    it('should connect tabs with their panels', () => {
      render(<TabsContainer title='Test Tabs' tabs={defaultTabs} />);

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      const firstPanel = screen.getAllByRole('tabpanel', { hidden: true })[0];

      expect(firstTab).toHaveAttribute(
        'aria-controls',
        firstPanel.getAttribute('id'),
      );
      expect(firstPanel).toHaveAttribute(
        'aria-labelledby',
        firstTab.getAttribute('id'),
      );
    });
  });

  describe('edge cases', () => {
    it('should handle empty tabs array', () => {
      render(<TabsContainer title='Empty Tabs' tabs={[]} />);

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.queryByRole('tab')).not.toBeInTheDocument();
    });

    it('should handle single tab', () => {
      const singleTab = [defaultTabs[0]];
      render(<TabsContainer title='Single Tab' tabs={singleTab} />);

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
      expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
    });

    it('should handle tabs with special characters in title', () => {
      render(<TabsContainer title='Special@#$%Chars' tabs={defaultTabs} />);

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-label', 'tab-Special@#$%Chars');
    });

    it('should handle complex tab content', () => {
      const complexTabs = [
        {
          label: 'Complex Tab',
          value: 0,
          children: (
            <div>
              <h3>Title</h3>
              <p>Paragraph</p>
              <button>Button</button>
            </div>
          ),
        },
      ];

      render(<TabsContainer title='Complex' tabs={complexTabs} />);

      expect(
        screen.getByRole('heading', { name: 'Title' }),
      ).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Button' }),
      ).toBeInTheDocument();
    });
  });
});

describe('TabPanel', () => {
  const defaultProps = {
    activeValue: 0,
    children: <div>Panel Content</div>,
    title: 'Test',
    value: 0,
    label: 'Test Tab',
  };

  describe('rendering', () => {
    it('should render content when active', () => {
      render(<TabPanel {...defaultProps} />);

      expect(screen.getByText('Panel Content')).toBeInTheDocument();
      expect(screen.getByRole('tabpanel')).toBeVisible();
    });

    it('should hide content when not active', () => {
      render(<TabPanel {...defaultProps} activeValue={1} />);

      const panel = screen.getByRole('tabpanel', { hidden: true });
      expect(panel).toHaveStyle({ display: 'none' });
    });

    it('should have proper aria attributes', () => {
      render(<TabPanel {...defaultProps} />);

      const panel = screen.getByRole('tabpanel');
      expect(panel).toHaveAttribute('id', 'tabpanel-Test-0');
      expect(panel).toHaveAttribute('aria-labelledby', 'tab-Test-0');
    });
  });

  describe('display behavior', () => {
    it('should show panel when activeValue matches value', () => {
      render(<TabPanel {...defaultProps} activeValue={0} value={0} />);

      const panel = screen.getByRole('tabpanel');
      expect(panel).toHaveStyle({ display: 'flex' });
    });

    it('should hide panel when activeValue does not match value', () => {
      render(<TabPanel {...defaultProps} activeValue={1} value={0} />);

      const panel = screen.getByRole('tabpanel', { hidden: true });
      expect(panel).toHaveStyle({ display: 'none' });
    });
  });

  describe('content rendering', () => {
    it('should render simple text content', () => {
      render(<TabPanel {...defaultProps}>Simple text content</TabPanel>);

      expect(screen.getByText('Simple text content')).toBeInTheDocument();
    });

    it('should render complex JSX content', () => {
      render(
        <TabPanel {...defaultProps}>
          <div>
            <h2>Heading</h2>
            <p>Description</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </TabPanel>,
      );

      expect(
        screen.getByRole('heading', { name: 'Heading' }),
      ).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should handle multiple children', () => {
      render(
        <TabPanel {...defaultProps}>
          <div>First child</div>
          <div>Second child</div>
        </TabPanel>,
      );

      expect(screen.getByText('First child')).toBeInTheDocument();
      expect(screen.getByText('Second child')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle undefined children', () => {
      render(<TabPanel {...defaultProps}>{undefined}</TabPanel>);

      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('should handle empty string children', () => {
      render(<TabPanel {...defaultProps}>{'Empty string'}</TabPanel>);

      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('should handle numeric values correctly', () => {
      render(
        <TabPanel
          {...defaultProps}
          activeValue={5}
          value={5}
          title='Numeric'
        />,
      );

      const panel = screen.getByRole('tabpanel');
      expect(panel).toHaveAttribute('id', 'tabpanel-Numeric-5');
      expect(panel).toHaveAttribute('aria-labelledby', 'tab-Numeric-5');
      expect(panel).toHaveStyle({ display: 'flex' });
    });
  });
});

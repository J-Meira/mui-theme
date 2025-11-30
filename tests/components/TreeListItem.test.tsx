import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { TreeListItem } from '../../src/components/TreeListItem';

// Mock react-icons/md
jest.mock('react-icons/md', () => ({
  MdAdd: () => <svg data-testid='AddIcon' />,
  MdRemove: () => <svg data-testid='RemoveIcon' />,
}));

describe('TreeListItem', () => {
  const defaultProps = {
    hierarchy: 'primary' as const,
    label: 'Test Item',
    onSelect: jest.fn(),
    selected: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('leaf node (without children)', () => {
    it('should render label and checkbox', () => {
      render(<TreeListItem {...defaultProps} />);

      expect(screen.getByText('Test Item')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should apply correct hierarchy class', () => {
      const { container } = render(
        <TreeListItem {...defaultProps} hierarchy='secondary' />,
      );

      const listItem = container.querySelector('.tree-item.secondary');
      expect(listItem).toBeInTheDocument();
    });

    it('should call onSelect when button is clicked', () => {
      const mockOnSelect = jest.fn();
      render(<TreeListItem {...defaultProps} onSelect={mockOnSelect} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockOnSelect).toHaveBeenCalledTimes(1);
    });

    it('should call onSelect when checkbox is changed', () => {
      const mockOnSelect = jest.fn();
      render(<TreeListItem {...defaultProps} onSelect={mockOnSelect} />);

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      expect(mockOnSelect).toHaveBeenCalledTimes(1);
    });

    it('should show checked state when selected', () => {
      render(<TreeListItem {...defaultProps} selected />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('should show unchecked state when not selected', () => {
      render(<TreeListItem {...defaultProps} selected={false} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });

    it('should have proper aria attributes for checkbox', () => {
      render(<TreeListItem {...defaultProps} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-labelledby', 'Test Item');
      expect(checkbox).toHaveAttribute('tabindex', '-1');
    });

    it('should not show expand/collapse icons', () => {
      render(<TreeListItem {...defaultProps} />);

      expect(screen.queryByTestId('AddIcon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('RemoveIcon')).not.toBeInTheDocument();
    });
  });

  describe('parent node (with children)', () => {
    const childItems = (
      <>
        <TreeListItem {...defaultProps} label='Child 1' hierarchy='secondary' />
        <TreeListItem {...defaultProps} label='Child 2' hierarchy='secondary' />
      </>
    );

    it('should render expand icon when collapsed', () => {
      render(<TreeListItem {...defaultProps}>{childItems}</TreeListItem>);

      expect(screen.getByTestId('AddIcon')).toBeInTheDocument();
      expect(screen.queryByTestId('RemoveIcon')).not.toBeInTheDocument();
    });

    it('should expand children when expand icon is clicked', () => {
      render(<TreeListItem {...defaultProps}>{childItems}</TreeListItem>);

      expect(screen.queryByText('Child 1')).not.toBeInTheDocument();

      const expandIcon = screen.getByTestId('AddIcon');
      fireEvent.click(expandIcon);

      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('should show collapse icon when expanded', () => {
      render(<TreeListItem {...defaultProps}>{childItems}</TreeListItem>);

      const expandIcon = screen.getByTestId('AddIcon');
      fireEvent.click(expandIcon);

      expect(screen.getByTestId('RemoveIcon')).toBeInTheDocument();
      expect(screen.queryByTestId('AddIcon')).not.toBeInTheDocument();
    });

    it('should collapse children when collapse icon is clicked', async () => {
      render(<TreeListItem {...defaultProps}>{childItems}</TreeListItem>);

      const expandIcon = screen.getByTestId('AddIcon');
      fireEvent.click(expandIcon);
      expect(screen.getByText('Child 1')).toBeInTheDocument();

      const collapseIcon = screen.getByTestId('RemoveIcon');
      fireEvent.click(collapseIcon);
      await waitForElementToBeRemoved(() => screen.queryByText('Child 1'));
    });

    it('should call onSelect when parent checkbox is changed', () => {
      const mockOnSelect = jest.fn();
      render(
        <TreeListItem {...defaultProps} onSelect={mockOnSelect}>
          {childItems}
        </TreeListItem>,
      );

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      expect(mockOnSelect).toHaveBeenCalledTimes(1);
    });

    it('should show selected state for parent when selected', () => {
      render(
        <TreeListItem {...defaultProps} selected>
          {childItems}
        </TreeListItem>,
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });
  });

  describe('hierarchy levels', () => {
    const hierarchyLevels = [
      'primary',
      'secondary',
      'tertiary',
      'quaternary',
    ] as const;

    hierarchyLevels.forEach((hierarchy) => {
      it(`should apply correct class for ${hierarchy} hierarchy`, () => {
        const { container } = render(
          <TreeListItem {...defaultProps} hierarchy={hierarchy} />,
        );

        const listItem = container.querySelector(`.tree-item.${hierarchy}`);
        expect(listItem).toBeInTheDocument();
      });
    });
  });

  describe('collapse orientation', () => {
    const childItems = (
      <TreeListItem {...defaultProps} label='Child' hierarchy='secondary' />
    );

    it('should use vertical collapse by default', () => {
      const { container } = render(
        <TreeListItem {...defaultProps}>{childItems}</TreeListItem>,
      );

      const expandIcon = screen.getByTestId('AddIcon');
      fireEvent.click(expandIcon);

      const collapse = container.querySelector('.MuiCollapse-vertical');
      expect(collapse).toBeInTheDocument();
    });

    it('should use horizontal collapse when collapseHorizontal is true', () => {
      const { container } = render(
        <TreeListItem {...defaultProps} collapseHorizontal>
          {childItems}
        </TreeListItem>,
      );

      const expandIcon = screen.getByTestId('AddIcon');
      fireEvent.click(expandIcon);

      const collapse = container.querySelector('.MuiCollapse-horizontal');
      expect(collapse).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper button role for leaf nodes', () => {
      render(<TreeListItem {...defaultProps} />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should have proper button role for parent nodes', () => {
      render(
        <TreeListItem {...defaultProps}>
          <div>Child content</div>
        </TreeListItem>,
      );

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should have proper checkbox role and attributes', () => {
      render(<TreeListItem {...defaultProps} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-labelledby', 'Test Item');
      expect(checkbox).toHaveAttribute('tabindex', '-1');
    });

    it('should have proper list structure for nested items', () => {
      render(
        <TreeListItem {...defaultProps}>
          <TreeListItem {...defaultProps} label='Child' hierarchy='secondary' />
        </TreeListItem>,
      );

      const expandIcon = screen.getByTestId('AddIcon');
      fireEvent.click(expandIcon);

      const lists = document.querySelectorAll('.MuiList-root');
      expect(lists.length).toBeGreaterThan(0);
    });
  });

  describe('complex tree structure', () => {
    it('should handle nested tree items', () => {
      render(
        <TreeListItem {...defaultProps} label='Root'>
          <TreeListItem
            {...defaultProps}
            label='Parent 1'
            hierarchy='secondary'
          >
            <TreeListItem
              {...defaultProps}
              label='Child 1'
              hierarchy='tertiary'
            />
            <TreeListItem
              {...defaultProps}
              label='Child 2'
              hierarchy='tertiary'
            />
          </TreeListItem>
          <TreeListItem
            {...defaultProps}
            label='Parent 2'
            hierarchy='secondary'
          />
        </TreeListItem>,
      );

      // Expand root
      const rootExpandIcon = screen.getByTestId('AddIcon');
      fireEvent.click(rootExpandIcon);

      expect(screen.getByText('Parent 1')).toBeInTheDocument();
      expect(screen.getByText('Parent 2')).toBeInTheDocument();
      expect(screen.queryByText('Child 1')).not.toBeInTheDocument();

      // Expand Parent 1
      const parentButtons = screen.getAllByTestId('AddIcon');
      fireEvent.click(parentButtons[0]); // First AddIcon after root expansion

      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('should handle different selection states in tree', () => {
      const mockOnSelect1 = jest.fn();
      const mockOnSelect2 = jest.fn();

      render(
        <TreeListItem {...defaultProps} label='Root' onSelect={mockOnSelect1}>
          <TreeListItem
            {...defaultProps}
            label='Child'
            hierarchy='secondary'
            selected
            onSelect={mockOnSelect2}
          />
        </TreeListItem>,
      );

      // Expand to show child
      const expandIcon = screen.getByTestId('AddIcon');
      fireEvent.click(expandIcon);

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[0]).not.toBeChecked(); // Root
      expect(checkboxes[1]).toBeChecked(); // Child

      // Click root checkbox
      fireEvent.click(checkboxes[0]);
      expect(mockOnSelect1).toHaveBeenCalledTimes(1);

      // Click child checkbox
      fireEvent.click(checkboxes[1]);
      expect(mockOnSelect2).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should handle empty label', () => {
      render(<TreeListItem {...defaultProps} label='' />);

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should handle rapid expand/collapse clicks', () => {
      render(
        <TreeListItem {...defaultProps}>
          <div>Child content</div>
        </TreeListItem>,
      );

      const expandIcon = screen.getByTestId('AddIcon');

      // Rapid clicks
      fireEvent.click(expandIcon);
      const collapseIcon = screen.getByTestId('RemoveIcon');
      fireEvent.click(collapseIcon);
      const newExpandIcon = screen.getByTestId('AddIcon');
      fireEvent.click(newExpandIcon);

      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('should handle long labels gracefully', () => {
      const longLabel =
        'This is a very long label that might cause layout issues in the tree component';
      render(<TreeListItem {...defaultProps} label={longLabel} />);

      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it('should work with minimal required props', () => {
      render(
        <TreeListItem
          hierarchy='primary'
          label='Minimal'
          onSelect={jest.fn()}
          selected={false}
        />,
      );

      expect(screen.getByText('Minimal')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
  });
});

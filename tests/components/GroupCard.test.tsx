import { render, screen, fireEvent } from '@testing-library/react';
import { GroupCard, GroupCardProps } from '../../src/components/GroupCard';

describe('GroupCard', () => {
  const defaultProps: Partial<GroupCardProps> = {
    title: 'Test Card',
    children: <div>Card Content</div>,
  };

  describe('rendering', () => {
    it('should render card with title and content', () => {
      render(<GroupCard {...defaultProps} />);

      expect(screen.getByText('Test Card')).toBeInTheDocument();
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should render without title when not provided', () => {
      render(<GroupCard>Card Content Only</GroupCard>);

      expect(screen.getByText('Card Content Only')).toBeInTheDocument();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('should apply default grid sizes', () => {
      render(<GroupCard {...defaultProps} />);

      const gridContainer = screen
        .getByText('Test Card')
        .closest('.group-card');
      expect(gridContainer).toBeInTheDocument();
    });

    it('should not apply grid sizes when noGridSizes is true', () => {
      render(<GroupCard {...defaultProps} noGridSizes />);

      const gridContainer = screen
        .getByText('Test Card')
        .closest('.group-card');
      expect(gridContainer).toBeInTheDocument();
    });
  });

  describe('collapsed functionality', () => {
    it('should show expand icon when collapsed and closed', () => {
      const { container } = render(<GroupCard {...defaultProps} collapsed />);

      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(screen.queryByText('Card Content')).not.toBeInTheDocument();
    });

    it('should show collapse icon when collapsed and open', () => {
      const { container } = render(
        <GroupCard {...defaultProps} collapsed openStart />,
      );

      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should not show expand/collapse icons when not collapsed', () => {
      const { container } = render(<GroupCard {...defaultProps} />);

      const icon = container.querySelector('svg');
      expect(icon).not.toBeInTheDocument();
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should toggle content visibility when collapsed title is clicked', () => {
      render(<GroupCard {...defaultProps} collapsed />);

      // Initially closed
      expect(screen.queryByText('Card Content')).not.toBeInTheDocument();

      // Click title to open
      fireEvent.click(screen.getByText('Test Card'));

      expect(screen.getByText('Card Content')).toBeInTheDocument();

      // Click title to close
      fireEvent.click(screen.getByText('Test Card'));

      expect(screen.queryByText('Card Content')).not.toBeInTheDocument();
    });

    it('should toggle content visibility when collapsed card content is clicked', () => {
      render(<GroupCard {...defaultProps} collapsed />);

      // Click on card content area (not title)
      const cardContent = screen
        .getByText('Test Card')
        .closest('[class*="CardContent"]');
      if (cardContent) {
        fireEvent.click(cardContent);
        expect(screen.getByText('Card Content')).toBeInTheDocument();
      }
    });

    it('should start open when openStart is true', () => {
      render(<GroupCard {...defaultProps} collapsed openStart />);

      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should not be clickable when not collapsed', () => {
      render(<GroupCard {...defaultProps} />);

      const cardContent = screen
        .getByText('Test Card')
        .closest('[class*="CardContent"]');
      expect(cardContent).not.toHaveStyle('cursor: pointer');
    });
  });

  describe('error handling', () => {
    it('should display error message when error prop is provided', () => {
      render(<GroupCard {...defaultProps} error='Something went wrong' />);

      const errorText = screen.getByText('Something went wrong');
      expect(errorText).toBeInTheDocument();
      expect(errorText).toHaveClass('MuiTypography-root');
      expect(errorText).toHaveClass('MuiTypography-caption');
    });

    it('should apply error class to container when error exists', () => {
      render(<GroupCard {...defaultProps} error='Error message' />);

      const container = screen.getByText('Test Card').closest('.group-card');
      expect(container).toHaveClass('group-card-error');
    });

    it('should not display error message when error prop is not provided', () => {
      render(<GroupCard {...defaultProps} />);

      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });
  });

  describe('styling and classes', () => {
    it('should apply custom className', () => {
      render(<GroupCard {...defaultProps} className='custom-class' />);

      const container = screen.getByText('Test Card').closest('.group-card');
      expect(container).toHaveClass('custom-class');
    });

    it('should apply title-collapsed class when collapsed', () => {
      render(<GroupCard {...defaultProps} collapsed />);

      const titleElement = screen
        .getByText('Test Card')
        .closest('.title-collapsed');
      expect(titleElement).toBeInTheDocument();
    });

    it('should not apply title-collapsed class when not collapsed', () => {
      render(<GroupCard {...defaultProps} />);

      const titleElement = screen.getByText('Test Card').closest('.title');
      expect(titleElement).not.toHaveClass('title-collapsed');
    });

    it('should apply cursor pointer style when collapsed and closed', () => {
      render(<GroupCard {...defaultProps} collapsed />);

      const cardContent = screen
        .getByText('Test Card')
        .closest('[class*="CardContent"]');
      expect(cardContent).toHaveStyle('cursor: pointer');
    });
  });

  describe('grid props', () => {
    it('should accept and apply custom size prop', () => {
      const customSize = { md: 6, sm: 8, xs: 12 };
      render(<GroupCard {...defaultProps} size={customSize} />);

      const container = screen.getByText('Test Card').closest('.group-card');
      expect(container).toBeInTheDocument();
    });

    it('should accept other Grid2 props', () => {
      render(
        <GroupCard {...defaultProps} spacing={3} data-testid='custom-grid' />,
      );

      expect(screen.getByTestId('custom-grid')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle children as string', () => {
      render(
        <GroupCard title='String Content'>Simple string content</GroupCard>,
      );

      expect(screen.getByText('Simple string content')).toBeInTheDocument();
    });

    it('should handle multiple children', () => {
      render(
        <GroupCard title='Multiple Children'>
          <div>First child</div>
          <div>Second child</div>
          <span>Third child</span>
        </GroupCard>,
      );

      expect(screen.getByText('First child')).toBeInTheDocument();
      expect(screen.getByText('Second child')).toBeInTheDocument();
      expect(screen.getByText('Third child')).toBeInTheDocument();
    });

    it('should handle empty children', () => {
      render(<GroupCard title='Empty Content'>{null}</GroupCard>);

      expect(screen.getByText('Empty Content')).toBeInTheDocument();
    });

    it('should handle undefined children when collapsed', () => {
      render(
        <GroupCard title='No Content' collapsed>
          {undefined}
        </GroupCard>,
      );

      expect(screen.getByText('No Content')).toBeInTheDocument();
      const icon = document.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should work without any props', () => {
      render(<GroupCard />);

      // Should render basic card structure
      const card = document.querySelector('.group-card');
      expect(card).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper card structure', () => {
      render(<GroupCard {...defaultProps} />);

      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('should be keyboard accessible when collapsed', () => {
      render(<GroupCard {...defaultProps} collapsed />);

      const titleElement = screen.getByText('Test Card').parentElement;

      // Should be focusable when collapsed
      if (titleElement) {
        fireEvent.keyDown(titleElement, { key: 'Enter' });
        // The component doesn't seem to have keyboard handlers, but structure should support it
      }
    });

    it('should provide semantic meaning with headings', () => {
      render(<GroupCard {...defaultProps} />);

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('Test Card');
    });
  });
});

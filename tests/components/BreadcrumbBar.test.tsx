import { render, screen } from '@testing-library/react';
import {
  BreadcrumbBar,
  BreadcrumbsListProps,
} from '../../src/components/BreadcrumbBar';

describe('BreadcrumbBar', () => {
  const mockBreadcrumbs: BreadcrumbsListProps[] = [
    { label: 'Home', link: '/' },
    { label: 'Category', link: '/category' },
    { label: 'Current Page' }, // No link for last item
  ];

  describe('rendering', () => {
    it('should render breadcrumb navigation', () => {
      render(<BreadcrumbBar list={mockBreadcrumbs} />);

      expect(screen.getByLabelText('breadcrumb')).toBeInTheDocument();
    });

    it('should render all breadcrumb items', () => {
      render(<BreadcrumbBar list={mockBreadcrumbs} />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
      expect(screen.getByText('Current Page')).toBeInTheDocument();
    });

    it('should render links for items with link property except last item', () => {
      render(<BreadcrumbBar list={mockBreadcrumbs} />);

      const homeLink = screen.getByText('Home').closest('a');
      const categoryLink = screen.getByText('Category').closest('a');
      const currentPageLink = screen.getByText('Current Page').closest('a');

      expect(homeLink).toHaveAttribute('href', '/');
      expect(categoryLink).toHaveAttribute('href', '/category');
      expect(currentPageLink).toBeNull(); // Last item should not be a link
    });

    it('should render Typography for items without link property', () => {
      const breadcrumbsWithoutLinks: BreadcrumbsListProps[] = [
        { label: 'Home' }, // No link
        { label: 'Category' }, // No link
        { label: 'Current Page' },
      ];

      render(<BreadcrumbBar list={breadcrumbsWithoutLinks} />);

      // All items should be Typography, not links
      expect(screen.getByText('Home').closest('a')).toBeNull();
      expect(screen.getByText('Category').closest('a')).toBeNull();
      expect(screen.getByText('Current Page').closest('a')).toBeNull();
    });

    it('should apply textPrimary color to last item', () => {
      render(<BreadcrumbBar list={mockBreadcrumbs} />);

      const lastItem = screen.getByText('Current Page');
      expect(lastItem).toHaveStyle({ color: 'rgba(0, 0, 0, 0.87)' });
    });
  });

  describe('edge cases', () => {
    it('should handle empty list', () => {
      render(<BreadcrumbBar list={[]} />);

      const breadcrumb = screen.getByLabelText('breadcrumb');
      expect(breadcrumb).toBeInTheDocument();
      const ol = breadcrumb.querySelector('ol');
      expect(ol).toBeInTheDocument();
      expect(ol).toBeEmptyDOMElement();
    });

    it('should handle single item', () => {
      const singleItem: BreadcrumbsListProps[] = [
        { label: 'Only Item', link: '/single' },
      ];

      render(<BreadcrumbBar list={singleItem} />);

      expect(screen.getByText('Only Item')).toBeInTheDocument();
      // Single item should not be a link (as it's the last item)
      expect(screen.getByText('Only Item').closest('a')).toBeNull();
    });

    it('should handle items with special characters', () => {
      const specialCharsBreadcrumbs: BreadcrumbsListProps[] = [
        { label: 'Home & Garden', link: '/home' },
        { label: 'Category > Sub', link: '/category' },
        { label: 'Product "Special"' },
      ];

      render(<BreadcrumbBar list={specialCharsBreadcrumbs} />);

      expect(screen.getByText('Home & Garden')).toBeInTheDocument();
      expect(screen.getByText('Category > Sub')).toBeInTheDocument();
      expect(screen.getByText('Product "Special"')).toBeInTheDocument();
    });

    it('should handle very long breadcrumb chains', () => {
      const longBreadcrumbs: BreadcrumbsListProps[] = Array.from(
        { length: 10 },
        (_, i) => ({
          label: `Level ${i + 1}`,
          link: i < 9 ? `/level-${i + 1}` : undefined,
        }),
      );

      render(<BreadcrumbBar list={longBreadcrumbs} />);

      // Check first and last items
      expect(screen.getByText('Level 1')).toBeInTheDocument();
      expect(screen.getByText('Level 10')).toBeInTheDocument();

      // First item should be a link, last should not
      expect(screen.getByText('Level 1').closest('a')).toHaveAttribute(
        'href',
        '/level-1',
      );
      expect(screen.getByText('Level 10').closest('a')).toBeNull();
    });

    it('should handle undefined list gracefully', () => {
      // TypeScript would normally prevent this, but test runtime behavior
      render(<BreadcrumbBar list={undefined as any} />);

      const breadcrumb = screen.getByLabelText('breadcrumb');
      expect(breadcrumb).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper aria-label', () => {
      render(<BreadcrumbBar list={mockBreadcrumbs} />);

      expect(screen.getByLabelText('breadcrumb')).toBeInTheDocument();
    });

    it('should maintain proper link semantics', () => {
      render(<BreadcrumbBar list={mockBreadcrumbs} />);

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2); // Only first two items should be links

      links.forEach((link) => {
        expect(link).toHaveAttribute('href');
      });
    });

    it('should use proper typography semantics for non-linked items', () => {
      const breadcrumbsWithoutLinks: BreadcrumbsListProps[] = [
        { label: 'Home' },
        { label: 'Current Page' },
      ];

      render(<BreadcrumbBar list={breadcrumbsWithoutLinks} />);

      // Items without links should not be interactive
      expect(screen.queryByRole('link')).toBeNull();
    });
  });
});

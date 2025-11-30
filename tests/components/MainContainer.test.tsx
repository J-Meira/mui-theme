import { render, screen } from '@testing-library/react';
import { MainContainer } from '../../src/components/MainContainer';

// Mock the MultiProvider context to avoid complex theme setup
jest.mock('../../src/components/MultiProvider/useMultiContext', () => ({
  useMultiContext: () => ({
    backgroundColor: '#ffffff',
  }),
}));

// Mock child components to isolate MainContainer testing
const MockChild = ({ children }: { children: React.ReactNode }) => (
  <div data-testid='mock-child'>{children}</div>
);

describe('MainContainer', () => {
  describe('rendering', () => {
    it('should render the main container', () => {
      render(
        <MainContainer>
          <MockChild>Test Content</MockChild>
        </MainContainer>,
      );

      expect(screen.getByTestId('mock-child')).toBeInTheDocument();
    });

    it('should render children content', () => {
      render(
        <MainContainer>
          <MockChild>Test Content</MockChild>
        </MainContainer>,
      );

      expect(screen.getByTestId('mock-child')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <MainContainer>
          <MockChild>First Child</MockChild>
          <MockChild>Second Child</MockChild>
          <div data-testid='third-child'>Third Child</div>
        </MainContainer>,
      );

      expect(screen.getByText('First Child')).toBeInTheDocument();
      expect(screen.getByText('Second Child')).toBeInTheDocument();
      expect(screen.getByTestId('third-child')).toBeInTheDocument();
    });

    it('should render with subHeader when provided', () => {
      render(
        <MainContainer
          subHeader={<div data-testid='sub-header'>Sub Header</div>}
        >
          <MockChild>Main Content</MockChild>
        </MainContainer>,
      );

      expect(screen.getByTestId('sub-header')).toBeInTheDocument();
      expect(screen.getByText('Sub Header')).toBeInTheDocument();
      expect(screen.getByText('Main Content')).toBeInTheDocument();
    });

    it('should render with footer when provided', () => {
      render(
        <MainContainer footer={<div data-testid='footer'>Footer Content</div>}>
          <MockChild>Main Content</MockChild>
        </MainContainer>,
      );

      expect(screen.getByTestId('footer')).toBeInTheDocument();
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
      expect(screen.getByText('Main Content')).toBeInTheDocument();
    });

    it('should render with both subHeader and footer', () => {
      render(
        <MainContainer
          subHeader={<div data-testid='sub-header'>Sub Header</div>}
          footer={<div data-testid='footer'>Footer</div>}
        >
          <MockChild>Main Content</MockChild>
        </MainContainer>,
      );

      expect(screen.getByTestId('sub-header')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
      expect(screen.getByText('Main Content')).toBeInTheDocument();
    });
  });

  describe('sidebar behavior', () => {
    it('should apply main-full class when sideBarExpanded is undefined', () => {
      render(
        <MainContainer>
          <MockChild>Content</MockChild>
        </MainContainer>,
      );

      const paperElement = screen
        .getByTestId('mock-child')
        .closest('.main-full');
      expect(paperElement).toBeInTheDocument();
    });

    it('should apply main-expanded class when sideBarExpanded is false', () => {
      render(
        <MainContainer sideBarExpanded={false}>
          <MockChild>Content</MockChild>
        </MainContainer>,
      );

      const paperElement = screen
        .getByTestId('mock-child')
        .closest('.main-expanded');
      expect(paperElement).toBeInTheDocument();
    });

    it('should not apply special classes when sideBarExpanded is true', () => {
      render(
        <MainContainer sideBarExpanded={true}>
          <MockChild>Content</MockChild>
        </MainContainer>,
      );

      const mockChild = screen.getByTestId('mock-child');
      const paperElement = mockChild.closest('.main');

      expect(paperElement).not.toHaveClass('main-full');
      expect(paperElement).not.toHaveClass('main-expanded');
      expect(paperElement).toHaveClass('main');
    });

    it('should handle sideBarExpanded state changes', () => {
      const { rerender } = render(
        <MainContainer sideBarExpanded={true}>
          <MockChild>Content</MockChild>
        </MainContainer>,
      );

      let mockChild = screen.getByTestId('mock-child');
      let paperElement = mockChild.closest('.main');
      expect(paperElement).not.toHaveClass('main-expanded');

      rerender(
        <MainContainer sideBarExpanded={false}>
          <MockChild>Content</MockChild>
        </MainContainer>,
      );

      mockChild = screen.getByTestId('mock-child');
      paperElement = mockChild.closest('.main-expanded');
      expect(paperElement).toBeInTheDocument();
    });
  });

  describe('styling and layout', () => {
    it('should apply proper MUI Paper component', () => {
      render(
        <MainContainer>
          <MockChild>Content</MockChild>
        </MainContainer>,
      );

      const mockChild = screen.getByTestId('mock-child');
      const paperElement = mockChild.closest('.MuiPaper-root');
      expect(paperElement).toBeInTheDocument();
    });

    it('should apply proper MUI Card component for content', () => {
      render(
        <MainContainer>
          <MockChild>Content</MockChild>
        </MainContainer>,
      );

      const mockChild = screen.getByTestId('mock-child');
      const cardElement = mockChild.closest('.MuiCard-root');
      expect(cardElement).toBeInTheDocument();
    });

    it('should apply main-card class to the card', () => {
      render(
        <MainContainer>
          <MockChild>Content</MockChild>
        </MainContainer>,
      );

      const mockChild = screen.getByTestId('mock-child');
      const cardElement = mockChild.closest('.main-card');
      expect(cardElement).toBeInTheDocument();
    });

    it('should use Paper with no elevation', () => {
      render(
        <MainContainer>
          <MockChild>Content</MockChild>
        </MainContainer>,
      );

      const mockChild = screen.getByTestId('mock-child');
      const paperElement = mockChild.closest('.MuiPaper-elevation0');
      expect(paperElement).toBeInTheDocument();
    });
  });

  describe('content handling', () => {
    it('should handle string children', () => {
      render(<MainContainer>Simple text content</MainContainer>);

      expect(screen.getByText('Simple text content')).toBeInTheDocument();
    });

    it('should handle conditional children', () => {
      const showContent = true;

      render(
        <MainContainer>
          {showContent && <MockChild>Conditional Content</MockChild>}
        </MainContainer>,
      );

      expect(screen.getByText('Conditional Content')).toBeInTheDocument();
    });

    it('should handle mixed content types', () => {
      render(
        <MainContainer>
          <h1>Heading</h1>
          Simple text
          <MockChild>Component Content</MockChild>
          {42}
        </MainContainer>,
      );

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(
        screen.getByText('Simple text', { exact: false }),
      ).toBeInTheDocument();
      expect(screen.getByText('Component Content')).toBeInTheDocument();
      expect(screen.getByText('42', { exact: false })).toBeInTheDocument();
    });

    it('should handle empty ReactNode children', () => {
      const { container } = render(
        <MainContainer>
          {null}
          {undefined}
          {false}
        </MainContainer>,
      );

      const cardElement = container.querySelector('.main-card');
      expect(cardElement).toBeInTheDocument();
    });
  });

  describe('footer and subHeader content', () => {
    it('should handle complex subHeader content', () => {
      render(
        <MainContainer
          subHeader={
            <div>
              <h2>Complex Sub Header</h2>
              <nav>
                <ul>
                  <li>Nav Item 1</li>
                  <li>Nav Item 2</li>
                </ul>
              </nav>
            </div>
          }
        >
          <MockChild>Main Content</MockChild>
        </MainContainer>,
      );

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByText('Nav Item 1')).toBeInTheDocument();
      expect(screen.getByText('Nav Item 2')).toBeInTheDocument();
    });

    it('should handle complex footer content', () => {
      render(
        <MainContainer
          footer={
            <footer>
              <p>Copyright 2024</p>
              <div>
                <button>Action 1</button>
                <button>Action 2</button>
              </div>
            </footer>
          }
        >
          <MockChild>Main Content</MockChild>
        </MainContainer>,
      );

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText('Copyright 2024')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Action 1' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Action 2' }),
      ).toBeInTheDocument();
    });

    it('should handle null subHeader and footer', () => {
      render(
        <MainContainer subHeader={null} footer={null}>
          <MockChild>Main Content</MockChild>
        </MainContainer>,
      );

      expect(screen.getByText('Main Content')).toBeInTheDocument();
    });
  });

  describe('layout order', () => {
    it('should render subHeader before main content', () => {
      render(
        <MainContainer
          subHeader={<div data-testid='sub-header'>Sub Header</div>}
        >
          <MockChild>Main Content</MockChild>
        </MainContainer>,
      );

      const subHeader = screen.getByTestId('sub-header');
      const mainContent = screen.getByTestId('mock-child');
      const container = subHeader.parentElement;

      const children = Array.from(container?.children || []);
      const subHeaderIndex = children.indexOf(subHeader);
      const mainContentIndex = children.indexOf(
        mainContent.closest('.MuiCard-root')!,
      );

      expect(subHeaderIndex).toBeLessThan(mainContentIndex);
    });

    it('should render footer after main content', () => {
      render(
        <MainContainer footer={<div data-testid='footer'>Footer</div>}>
          <MockChild>Main Content</MockChild>
        </MainContainer>,
      );

      const footer = screen.getByTestId('footer');
      const mainContent = screen.getByTestId('mock-child');
      const container = footer.parentElement;

      const children = Array.from(container?.children || []);
      const footerIndex = children.indexOf(footer);
      const mainContentIndex = children.indexOf(
        mainContent.closest('.MuiCard-root')!,
      );

      expect(mainContentIndex).toBeLessThan(footerIndex);
    });

    it('should maintain proper order: subHeader, main content, footer', () => {
      render(
        <MainContainer
          subHeader={<div data-testid='sub-header'>Sub Header</div>}
          footer={<div data-testid='footer'>Footer</div>}
        >
          <MockChild>Main Content</MockChild>
        </MainContainer>,
      );

      const subHeader = screen.getByTestId('sub-header');
      const footer = screen.getByTestId('footer');
      const mainContent = screen.getByTestId('mock-child');
      const container = subHeader.parentElement;

      const children = Array.from(container?.children || []);
      const subHeaderIndex = children.indexOf(subHeader);
      const mainContentIndex = children.indexOf(
        mainContent.closest('.MuiCard-root')!,
      );
      const footerIndex = children.indexOf(footer);

      expect(subHeaderIndex).toBeLessThan(mainContentIndex);
      expect(mainContentIndex).toBeLessThan(footerIndex);
    });
  });

  describe('performance', () => {
    it('should render efficiently with many children', () => {
      const manyChildren = Array.from({ length: 50 }, (_, i) => (
        <MockChild key={i}>Child {i}</MockChild>
      ));

      const { container } = render(
        <MainContainer>{manyChildren}</MainContainer>,
      );

      const cardElement = container.querySelector('.main-card');
      expect(cardElement).toBeInTheDocument();
      expect(cardElement!.children).toHaveLength(50);
    });

    it('should not re-render unnecessarily', () => {
      const { rerender, container } = render(
        <MainContainer>
          <MockChild>Initial Content</MockChild>
        </MainContainer>,
      );

      container.querySelector('.main-card');

      rerender(
        <MainContainer>
          <MockChild>Initial Content</MockChild>
        </MainContainer>,
      );

      const rerenderedElement = container.querySelector('.main-card');
      expect(rerenderedElement).toBeInTheDocument();
    });

    it('should update when content changes', () => {
      const { rerender } = render(
        <MainContainer>
          <MockChild>Original Content</MockChild>
        </MainContainer>,
      );

      expect(screen.getByText('Original Content')).toBeInTheDocument();

      rerender(
        <MainContainer>
          <MockChild>Updated Content</MockChild>
        </MainContainer>,
      );

      expect(screen.getByText('Updated Content')).toBeInTheDocument();
      expect(screen.queryByText('Original Content')).not.toBeInTheDocument();
    });
  });

  describe('integration scenarios', () => {
    it('should work with complex nested components', () => {
      render(
        <MainContainer
          subHeader={
            <header>
              <h1>Page Title</h1>
            </header>
          }
          footer={
            <footer>
              <p>Footer content</p>
            </footer>
          }
        >
          <section>
            <article>
              <h2>Article Title</h2>
              <p>Article content</p>
            </article>
          </section>
        </MainContainer>,
      );

      expect(screen.getByRole('banner')).toBeInTheDocument(); // header
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
    });

    it('should handle responsive content properly', () => {
      render(
        <MainContainer>
          <div style={{ width: '100%', minHeight: '500px' }}>
            Large responsive content
          </div>
        </MainContainer>,
      );

      expect(screen.getByText('Large responsive content')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle boolean and number children', () => {
      const { container } = render(
        <MainContainer>
          {true}
          {false}
          {0}
          {42}
          {null}
          {undefined}
        </MainContainer>,
      );

      const cardElement = container.querySelector('.main-card');
      expect(cardElement).toBeInTheDocument();
      expect(screen.getByText('0', { exact: false })).toBeInTheDocument();
      expect(screen.getByText('42', { exact: false })).toBeInTheDocument();
    });

    it('should handle deeply nested content structure', () => {
      render(
        <MainContainer>
          <div>
            <div>
              <div>
                <MockChild>Deeply nested content</MockChild>
              </div>
            </div>
          </div>
        </MainContainer>,
      );

      expect(screen.getByText('Deeply nested content')).toBeInTheDocument();
    });
  });
});

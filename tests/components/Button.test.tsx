import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../src/components/Button';

// Mock the subcomponents to test main Button logic
jest.mock('../../src/components/Button/Basic', () => ({
  Basic: ({ children, onClick, ...props }: any) => (
    <button
      data-testid='basic-button'
      data-props={JSON.stringify(props)}
      onClick={onClick}
    >
      {children}
    </button>
  ),
}));

jest.mock('../../src/components/Button/Icon', () => ({
  Icon: ({ children, onClick, ...props }: any) => (
    <button
      data-testid='icon-button'
      data-props={JSON.stringify(props)}
      onClick={onClick}
    >
      {children}
    </button>
  ),
}));

jest.mock('../../src/components/Button/Responsive', () => ({
  Responsive: ({ children, icon, onClick, ...props }: any) => (
    <button
      data-testid='responsive-button'
      data-props={JSON.stringify(props)}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  ),
}));

describe('Button', () => {
  describe('rendering', () => {
    it('should render Basic button by default', () => {
      render(<Button>Test Button</Button>);

      expect(screen.getByTestId('basic-button')).toBeInTheDocument();
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('should render Icon button when model is "icon"', () => {
      render(<Button model='icon'>Test Button</Button>);

      expect(screen.getByTestId('icon-button')).toBeInTheDocument();
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('should render Responsive button when model is "responsive"', () => {
      render(<Button model='responsive'>Test Button</Button>);

      expect(screen.getByTestId('responsive-button')).toBeInTheDocument();
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('should render Basic button when model is "custom"', () => {
      render(<Button model='custom'>Test Button</Button>);

      expect(screen.getByTestId('basic-button')).toBeInTheDocument();
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });
  });

  describe('props handling', () => {
    it('should pass variant prop to Basic button', () => {
      render(<Button variant='outlined'>Test Button</Button>);

      const button = screen.getByTestId('basic-button');
      const props = JSON.parse(button.getAttribute('data-props') || '{}');
      expect(props.variant).toBe('outlined');
    });

    it('should use default variant "contained"', () => {
      render(<Button>Test Button</Button>);

      const button = screen.getByTestId('basic-button');
      const props = JSON.parse(button.getAttribute('data-props') || '{}');
      expect(props.variant).toBe('contained');
    });

    it('should set fullWidth to true when contained is false (default)', () => {
      render(<Button>Test Button</Button>);

      const button = screen.getByTestId('basic-button');
      const props = JSON.parse(button.getAttribute('data-props') || '{}');
      expect(props.fullWidth).toBe(true);
    });

    it('should set fullWidth to false when contained is true', () => {
      render(<Button contained>Test Button</Button>);

      const button = screen.getByTestId('basic-button');
      const props = JSON.parse(button.getAttribute('data-props') || '{}');
      expect(props.fullWidth).toBe(false);
    });

    it('should pass icon prop to Responsive button', () => {
      const icon = <span data-testid='test-icon'>Icon</span>;
      render(
        <Button model='responsive' icon={icon}>
          Test Button
        </Button>,
      );

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should pass additional props to underlying components', () => {
      render(
        <Button data-testid='custom-test-id' className='custom-class' disabled>
          Test Button
        </Button>,
      );

      const button = screen.getByTestId('basic-button');
      const props = JSON.parse(button.getAttribute('data-props') || '{}');
      expect(props['data-testid']).toBe('custom-test-id');
      expect(props.className).toBe('custom-class');
      expect(props.disabled).toBe(true);
    });
  });

  describe('responsive button specific props', () => {
    it('should set fullWidth to false when contained is true for responsive model', () => {
      render(
        <Button model='responsive' contained>
          Test Button
        </Button>,
      );

      const button = screen.getByTestId('responsive-button');
      const props = JSON.parse(button.getAttribute('data-props') || '{}');
      expect(props.fullWidth).toBe(false);
    });

    it('should set fullWidth to true when contained is false for responsive model', () => {
      render(
        <Button model='responsive' contained={false}>
          Test Button
        </Button>,
      );

      const button = screen.getByTestId('responsive-button');
      const props = JSON.parse(button.getAttribute('data-props') || '{}');
      expect(props.fullWidth).toBe(true);
    });

    it('should pass variant prop to responsive button', () => {
      render(
        <Button model='responsive' variant='outlined'>
          Test Button
        </Button>,
      );

      const button = screen.getByTestId('responsive-button');
      const props = JSON.parse(button.getAttribute('data-props') || '{}');
      expect(props.variant).toBe('outlined');
    });
  });

  describe('user interactions', () => {
    it('should handle click events', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Test Button</Button>);

      const button = screen.getByTestId('basic-button');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should handle click events for icon model', () => {
      const handleClick = jest.fn();
      render(
        <Button model='icon' onClick={handleClick}>
          Test Button
        </Button>,
      );

      const button = screen.getByTestId('icon-button');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should handle click events for responsive model', () => {
      const handleClick = jest.fn();
      render(
        <Button model='responsive' onClick={handleClick}>
          Test Button
        </Button>,
      );

      const button = screen.getByTestId('responsive-button');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('should be accessible with proper button role', () => {
      render(<Button>Test Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Test Button');
    });

    it('should support aria-label', () => {
      render(<Button aria-label='Custom Label'>Test Button</Button>);

      const button = screen.getByTestId('basic-button');
      const props = JSON.parse(button.getAttribute('data-props') || '{}');
      expect(props['aria-label']).toBe('Custom Label');
    });

    it('should support disabled state', () => {
      render(<Button disabled>Test Button</Button>);

      const button = screen.getByTestId('basic-button');
      const props = JSON.parse(button.getAttribute('data-props') || '{}');
      expect(props.disabled).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should render without children', () => {
      render(<Button />);

      expect(screen.getByTestId('basic-button')).toBeInTheDocument();
    });

    it('should handle empty string as children', () => {
      render(<Button>{''}</Button>);

      const button = screen.getByTestId('basic-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('');
    });

    it('should handle multiple children', () => {
      render(
        <Button>
          <span>First</span>
          <span>Second</span>
        </Button>,
      );

      const button = screen.getByTestId('basic-button');
      expect(button).toBeInTheDocument();
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('should handle undefined model prop', () => {
      render(<Button model={undefined}>Test Button</Button>);

      expect(screen.getByTestId('basic-button')).toBeInTheDocument();
    });
  });
});

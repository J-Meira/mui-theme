import { render, screen, fireEvent } from '@testing-library/react';
import {
  MultiProvider,
  PaletteProps,
} from '../../src/components/MultiProvider/MultiProvider';
import { useMultiContext } from '../../src/components/MultiProvider/useMultiContext';
import { Button } from '@mui/material';

const mockPalette: PaletteProps = {
  primary: {
    light: '#90caf9',
    main: '#2196f3',
    dark: '#1976d2',
    contrastText: '#fff',
  },
  secondary: {
    light: '#f73378',
    main: '#f50057',
    dark: '#ab003c',
    contrastText: '#fff',
  },
};

const mockPaletteDark: PaletteProps = {
  primary: {
    light: '#64b5f6',
    main: '#1976d2',
    dark: '#0d47a1',
    contrastText: '#fff',
  },
  secondary: {
    light: '#ff4081',
    main: '#f50057',
    dark: '#c51162',
    contrastText: '#fff',
  },
};

const TestConsumer = () => {
  const { backgroundColor, dark, isAdapterLocalePtBR, onChangeMode } =
    useMultiContext();

  return (
    <div>
      <div data-testid='background-color'>{backgroundColor}</div>
      <div data-testid='dark-mode'>{dark ? 'dark' : 'light'}</div>
      <div data-testid='locale'>{isAdapterLocalePtBR ? 'pt-BR' : 'en'}</div>
      <button onClick={onChangeMode}>Toggle Theme</button>
    </div>
  );
};

describe('MultiProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render children', () => {
    render(
      <MultiProvider
        palette={mockPalette}
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <div>Test Content</div>
      </MultiProvider>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should provide context values', () => {
    render(
      <MultiProvider
        palette={mockPalette}
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <TestConsumer />
      </MultiProvider>,
    );

    expect(screen.getByTestId('background-color')).toHaveTextContent('#f0f0f7');
    expect(screen.getByTestId('dark-mode')).toHaveTextContent('light');
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
  });

  it('should use pt-BR locale when adapterLocalePtBR is true', () => {
    render(
      <MultiProvider
        palette={mockPalette}
        adapterLocalePtBR
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <TestConsumer />
      </MultiProvider>,
    );

    expect(screen.getByTestId('locale')).toHaveTextContent('pt-BR');
  });

  it('should toggle dark mode', () => {
    render(
      <MultiProvider
        palette={mockPalette}
        paletteDark={mockPaletteDark}
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <TestConsumer />
      </MultiProvider>,
    );

    expect(screen.getByTestId('dark-mode')).toHaveTextContent('light');
    expect(screen.getByTestId('background-color')).toHaveTextContent('#f0f0f7');

    const toggleButton = screen.getByText('Toggle Theme');
    fireEvent.click(toggleButton);

    expect(screen.getByTestId('dark-mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('background-color')).toHaveTextContent('#191919');
  });

  it('should persist dark mode preference to localStorage', () => {
    render(
      <MultiProvider
        palette={mockPalette}
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <TestConsumer />
      </MultiProvider>,
    );

    const toggleButton = screen.getByText('Toggle Theme');
    fireEvent.click(toggleButton);

    expect(localStorage.getItem('MUI_THEME_DARk')).toBe('true');
  });

  it('should load dark mode from localStorage on mount', () => {
    localStorage.setItem('MUI_THEME_DARk', 'true');

    render(
      <MultiProvider
        palette={mockPalette}
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <TestConsumer />
      </MultiProvider>,
    );

    expect(screen.getByTestId('dark-mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('background-color')).toHaveTextContent('#191919');
  });

  it('should detect system dark mode preference when no localStorage value exists', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <MultiProvider
        palette={mockPalette}
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <TestConsumer />
      </MultiProvider>,
    );

    expect(screen.getByTestId('dark-mode')).toHaveTextContent('dark');
  });

  it('should handle snackbar configuration', () => {
    render(
      <MultiProvider
        palette={mockPalette}
        snackAnchorHorizontal='left'
        snackAnchorVertical='bottom'
        snackAutoHideDuration={3000}
        snackMax={5}
      >
        <div>Snackbar Config Test</div>
      </MultiProvider>,
    );

    expect(screen.getByText('Snackbar Config Test')).toBeInTheDocument();
  });

  it('should provide SnackbarProvider', () => {
    render(
      <MultiProvider
        palette={mockPalette}
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <div>Snackbar Provider Test</div>
      </MultiProvider>,
    );

    expect(screen.getByText('Snackbar Provider Test')).toBeInTheDocument();
  });

  it('should use default palette when paletteDark is not provided', () => {
    render(
      <MultiProvider
        palette={mockPalette}
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <TestConsumer />
      </MultiProvider>,
    );

    const toggleButton = screen.getByText('Toggle Theme');
    fireEvent.click(toggleButton);

    expect(screen.getByTestId('dark-mode')).toHaveTextContent('dark');
  });

  it('should toggle back to light mode', () => {
    render(
      <MultiProvider
        palette={mockPalette}
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <TestConsumer />
      </MultiProvider>,
    );

    const toggleButton = screen.getByText('Toggle Theme');

    fireEvent.click(toggleButton);
    expect(screen.getByTestId('dark-mode')).toHaveTextContent('dark');

    fireEvent.click(toggleButton);
    expect(screen.getByTestId('dark-mode')).toHaveTextContent('light');
    expect(localStorage.getItem('MUI_THEME_DARk')).toBe('false');
  });

  it('should handle localStorage with false value', () => {
    localStorage.setItem('MUI_THEME_DARk', 'false');

    render(
      <MultiProvider
        palette={mockPalette}
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <TestConsumer />
      </MultiProvider>,
    );

    expect(screen.getByTestId('dark-mode')).toHaveTextContent('light');
  });

  it('should provide ThemeProvider', () => {
    render(
      <MultiProvider
        palette={mockPalette}
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <Button variant='contained'>MUI Button</Button>
      </MultiProvider>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should provide LocalizationProvider', () => {
    render(
      <MultiProvider
        palette={mockPalette}
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <div>Localization Test</div>
      </MultiProvider>,
    );

    expect(screen.getByText('Localization Test')).toBeInTheDocument();
  });

  it('should handle all snack anchor positions', () => {
    const { rerender } = render(
      <MultiProvider
        palette={mockPalette}
        snackAnchorHorizontal='center'
        snackAnchorVertical='top'
      >
        <div>Test</div>
      </MultiProvider>,
    );

    expect(screen.getByText('Test')).toBeInTheDocument();

    rerender(
      <MultiProvider
        palette={mockPalette}
        snackAnchorHorizontal='left'
        snackAnchorVertical='bottom'
      >
        <div>Test</div>
      </MultiProvider>,
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

describe('useMultiContext', () => {
  it('should provide context values through hook', () => {
    const TestComponent = () => {
      const context = useMultiContext();
      return <div data-testid='has-context'>{context ? 'true' : 'false'}</div>;
    };

    render(
      <MultiProvider
        palette={mockPalette}
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <TestComponent />
      </MultiProvider>,
    );

    expect(screen.getByTestId('has-context')).toHaveTextContent('true');
  });

  it('should access all context properties', () => {
    const TestComponent = () => {
      const { backgroundColor, dark, isAdapterLocalePtBR, onChangeMode } =
        useMultiContext();
      return (
        <div>
          <div data-testid='bg'>{backgroundColor}</div>
          <div data-testid='dark'>{String(dark)}</div>
          <div data-testid='locale'>{String(isAdapterLocalePtBR)}</div>
          <div data-testid='fn'>{typeof onChangeMode}</div>
        </div>
      );
    };

    render(
      <MultiProvider
        palette={mockPalette}
        adapterLocalePtBR
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <TestComponent />
      </MultiProvider>,
    );

    expect(screen.getByTestId('bg')).toBeInTheDocument();
    expect(screen.getByTestId('dark')).toHaveTextContent('false');
    expect(screen.getByTestId('locale')).toHaveTextContent('true');
    expect(screen.getByTestId('fn')).toHaveTextContent('function');
  });
});

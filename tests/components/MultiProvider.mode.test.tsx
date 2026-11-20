import { act, fireEvent, render, screen } from '@testing-library/react';
import {
  MultiProvider,
  MultiProviderMode,
  PaletteProps,
} from '../../src/components/MultiProvider/MultiProvider';
import { useMultiContext } from '../../src/components/MultiProvider/useMultiContext';
import { DarkSwitch } from '../../src/components/Input/DarkSwitch';

const palette: PaletteProps = {
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

const KEY = 'MUI_THEME_DARK';

const mockSystemScheme = (initialDark: boolean) => {
  const state = { dark: initialDark };
  const listeners = new Set<() => void>();
  const queryList = {
    get matches() {
      return state.dark;
    },
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addEventListener: (_: string, listener: () => void) =>
      listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) =>
      listeners.delete(listener),
    addListener: (listener: () => void) => listeners.add(listener),
    removeListener: (listener: () => void) => listeners.delete(listener),
    dispatchEvent: () => true,
  };
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: () => queryList,
  });
  return {
    setDark: (dark: boolean) => {
      state.dark = dark;
      listeners.forEach((listener) => listener());
    },
  };
};

const Consumer = () => {
  const { dark, modeLocked, onChangeMode } = useMultiContext();
  return (
    <div>
      <div data-testid='mode'>{dark ? 'dark' : 'light'}</div>
      <div data-testid='locked'>{String(modeLocked)}</div>
      <button onClick={onChangeMode}>Toggle</button>
      <DarkSwitch />
    </div>
  );
};

const renderProvider = (mode?: MultiProviderMode) =>
  render(
    <MultiProvider
      mode={mode}
      palette={palette}
      snackAnchorHorizontal='right'
      snackAnchorVertical='top'
    >
      <Consumer />
    </MultiProvider>,
  );

describe('MultiProvider mode prop', () => {
  beforeEach(() => {
    localStorage.clear();
    mockSystemScheme(false);
  });

  it('should force dark regardless of storage and system', () => {
    localStorage.setItem(KEY, 'false');
    renderProvider('dark');

    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('locked')).toHaveTextContent('true');
  });

  it('should force light regardless of storage and system', () => {
    localStorage.setItem(KEY, 'true');
    mockSystemScheme(true);
    renderProvider('light');

    expect(screen.getByTestId('mode')).toHaveTextContent('light');
  });

  it('should ignore the toggle and leave storage untouched when locked', () => {
    renderProvider('dark');

    fireEvent.click(screen.getByText('Toggle'));

    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it('should follow the system scheme live in system mode', () => {
    const system = mockSystemScheme(false);
    localStorage.setItem(KEY, 'true');
    renderProvider('system');

    expect(screen.getByTestId('mode')).toHaveTextContent('light');

    act(() => system.setDark(true));
    expect(screen.getByTestId('mode')).toHaveTextContent('dark');

    act(() => system.setDark(false));
    expect(screen.getByTestId('mode')).toHaveTextContent('light');
    expect(localStorage.getItem(KEY)).toBe('true');
  });

  it('should hide DarkSwitch when the mode is locked', () => {
    const { container } = renderProvider('dark');

    expect(container.querySelector('.dark-switch')).not.toBeInTheDocument();
  });

  it('should keep the toggle, the switch and persistence when mode is omitted', () => {
    const { container } = renderProvider();

    expect(screen.getByTestId('locked')).toHaveTextContent('false');
    expect(screen.getByTestId('mode')).toHaveTextContent('light');

    fireEvent.click(container.querySelector('.dark-switch') as Element);

    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(localStorage.getItem(KEY)).toBe('true');
  });

  it('should fall back to the stored preference when the mode prop is removed', () => {
    localStorage.setItem(KEY, 'true');
    const { rerender } = renderProvider('light');
    expect(screen.getByTestId('mode')).toHaveTextContent('light');

    rerender(
      <MultiProvider
        palette={palette}
        snackAnchorHorizontal='right'
        snackAnchorVertical='top'
      >
        <Consumer />
      </MultiProvider>,
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('locked')).toHaveTextContent('false');
  });
});

describe('MultiProvider storage key', () => {
  beforeEach(() => {
    localStorage.clear();
    mockSystemScheme(false);
  });

  it('should read the stored preference from MUI_THEME_DARK', () => {
    localStorage.setItem(KEY, 'true');
    renderProvider();

    expect(screen.getByTestId('mode')).toHaveTextContent('dark');
  });

  it('should write toggles to MUI_THEME_DARK', () => {
    renderProvider();

    fireEvent.click(screen.getByText('Toggle'));

    expect(localStorage.getItem(KEY)).toBe('true');
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { useTheme } from '@mui/material/styles';
import {
  MultiProvider,
  MultiProviderProps,
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

const Probe = () => {
  const { backgroundColor, isAdapterLocalePtBR, locale } = useMultiContext();
  const theme = useTheme();
  return (
    <div>
      <div data-testid='context-bg'>{backgroundColor}</div>
      <div data-testid='theme-bg'>{theme.palette.background.default}</div>
      <div data-testid='theme-paper'>{theme.palette.background.paper}</div>
      <div data-testid='theme-text'>{theme.palette.text.primary}</div>
      <div data-testid='theme-primary'>{theme.palette.primary.main}</div>
      <div data-testid='theme-error'>{theme.palette.error.main}</div>
      <div data-testid='locale'>{locale}</div>
      <div data-testid='is-pt-br'>{String(isAdapterLocalePtBR)}</div>
      <div data-testid='core-string'>
        {theme.components?.MuiBreadcrumbs?.defaultProps?.expandText ?? 'none'}
      </div>
    </div>
  );
};

const renderProvider = (
  props: Partial<MultiProviderProps> = {},
  children: React.ReactNode = <Probe />,
) =>
  render(
    <MultiProvider
      palette={palette}
      snackAnchorHorizontal='right'
      snackAnchorVertical='top'
      {...props}
    >
      {children}
    </MultiProvider>,
  );

describe('MultiProvider background', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should keep the default backgrounds when none is configured', () => {
    renderProvider({ mode: 'light' });
    expect(screen.getByTestId('context-bg')).toHaveTextContent('#f0f0f7');
    expect(screen.getByTestId('theme-bg')).toHaveTextContent('#fff');
  });

  it('should keep the default dark background when none is configured', () => {
    renderProvider({ mode: 'dark' });
    expect(screen.getByTestId('context-bg')).toHaveTextContent('#191919');
    expect(screen.getByTestId('theme-bg')).toHaveTextContent('#121212');
  });

  it('should read the light background from palette.background', () => {
    renderProvider({
      mode: 'light',
      palette: {
        ...palette,
        background: { default: '#fafafa', paper: '#eeeeee' },
      },
    });
    expect(screen.getByTestId('context-bg')).toHaveTextContent('#fafafa');
    expect(screen.getByTestId('theme-bg')).toHaveTextContent('#fafafa');
    expect(screen.getByTestId('theme-paper')).toHaveTextContent('#eeeeee');
  });

  it('should read the dark background from paletteDark.background', () => {
    renderProvider({
      mode: 'dark',
      palette: { ...palette, background: { default: '#fafafa' } },
      paletteDark: { background: { default: '#000010', paper: '#101020' } },
    });
    expect(screen.getByTestId('context-bg')).toHaveTextContent('#000010');
    expect(screen.getByTestId('theme-bg')).toHaveTextContent('#000010');
    expect(screen.getByTestId('theme-paper')).toHaveTextContent('#101020');
  });

  it('should not use the light background in dark mode', () => {
    renderProvider({
      mode: 'dark',
      palette: { ...palette, background: { default: '#fafafa' } },
    });
    expect(screen.getByTestId('context-bg')).toHaveTextContent('#191919');
    expect(screen.getByTestId('theme-bg')).toHaveTextContent('#121212');
  });
});

describe('MultiProvider dark palette', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should apply extra paletteDark keys in dark mode', () => {
    renderProvider({
      mode: 'dark',
      paletteDark: {
        text: { primary: '#e0e0ff' },
        error: { main: '#ff5566' },
      },
    });
    expect(screen.getByTestId('theme-text')).toHaveTextContent('#e0e0ff');
    expect(screen.getByTestId('theme-error')).toHaveTextContent('#ff5566');
  });

  it('should fall back to the light primary and secondary when paletteDark omits them', () => {
    renderProvider({
      mode: 'dark',
      paletteDark: { text: { primary: '#e0e0ff' } },
    });
    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#2196f3');
  });

  it('should use the dark primary when paletteDark provides it', () => {
    renderProvider({
      mode: 'dark',
      paletteDark: {
        primary: { ...palette.primary, main: '#123456' },
      },
    });
    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#123456');
  });

  it('should not leak light text colours into dark mode', () => {
    renderProvider({
      mode: 'dark',
      palette: { ...palette, text: { primary: '#111111' } },
    });
    expect(screen.getByTestId('theme-text')).toHaveTextContent('#fff');
  });

  it('should apply extra palette keys in light mode and ignore paletteDark', () => {
    renderProvider({
      mode: 'light',
      palette: { ...palette, text: { primary: '#111111' } },
      paletteDark: { text: { primary: '#e0e0ff' } },
    });
    expect(screen.getByTestId('theme-text')).toHaveTextContent('#111111');
  });
});

describe('MultiProvider locale', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should default to en', () => {
    renderProvider();
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
    expect(screen.getByTestId('is-pt-br')).toHaveTextContent('false');
    expect(screen.getByTestId('core-string')).toHaveTextContent('none');
  });

  it('should localize core strings with locale pt-BR', () => {
    renderProvider({ locale: 'pt-BR' });
    expect(screen.getByTestId('locale')).toHaveTextContent('pt-BR');
    expect(screen.getByTestId('is-pt-br')).toHaveTextContent('true');
    expect(screen.getByTestId('core-string')).toHaveTextContent(
      'Mostrar caminho',
    );
  });

  it('should keep adapterLocalePtBR working as an alias', () => {
    renderProvider({ adapterLocalePtBR: true });
    expect(screen.getByTestId('locale')).toHaveTextContent('pt-BR');
    expect(screen.getByTestId('core-string')).toHaveTextContent(
      'Mostrar caminho',
    );
  });

  it('should let locale win over adapterLocalePtBR', () => {
    renderProvider({ adapterLocalePtBR: true, locale: 'en' });
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
    expect(screen.getByTestId('is-pt-br')).toHaveTextContent('false');
  });
});

describe('DarkSwitch accessibility', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('MUI_THEME_DARK', 'false');
  });

  it('should expose a named toggle button with its pressed state', () => {
    renderProvider({}, <DarkSwitch />);

    const button = screen.getByRole('button', { name: 'Dark mode' });
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveAttribute('title', 'Dark mode');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(localStorage.getItem('MUI_THEME_DARK')).toBe('true');
  });

  it('should be focusable from the keyboard', () => {
    renderProvider({}, <DarkSwitch />);

    const button = screen.getByRole('button', { name: 'Dark mode' });
    button.focus();
    expect(button).toHaveFocus();
    expect(button.tagName).toBe('BUTTON');
  });

  it('should use the pt-BR label with locale pt-BR', () => {
    renderProvider({ locale: 'pt-BR' }, <DarkSwitch />);

    expect(
      screen.getByRole('button', { name: 'Modo escuro' }),
    ).toBeInTheDocument();
  });

  it('should accept a custom label and title', () => {
    renderProvider({}, <DarkSwitch label='Tema oscuro' title='Cambiar tema' />);

    const button = screen.getByRole('button', { name: 'Tema oscuro' });
    expect(button).toHaveAttribute('title', 'Cambiar tema');
  });

  it('should keep the existing markup and classes', () => {
    const { container } = renderProvider({}, <DarkSwitch />);

    const root = container.querySelector('.dark-switch') as HTMLElement;
    expect(root.tagName).toBe('DIV');
    expect(root.children).toHaveLength(2);
    expect(root.children[0]).toHaveClass('board', 'MuiCard-root');
    expect(root.children[1]).toHaveClass(
      'MuiIconButton-root',
      'MuiIconButton-sizeSmall',
    );

    fireEvent.click(root);
    expect(root).toHaveClass('dark-switch-on');
  });
});

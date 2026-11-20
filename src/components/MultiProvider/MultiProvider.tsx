import 'dayjs/locale/pt-br';
import { FC, useCallback, useMemo, useState } from 'react';

import {
  closeSnackbar,
  SnackbarOrigin,
  SnackbarProvider,
  SnackbarProviderProps,
} from 'notistack';

import {
  PaletteOptions,
  ThemeProvider,
  createTheme as muiCreateTheme,
} from '@mui/material/styles';

import useMediaQuery from '@mui/material/useMediaQuery';

import { MdClose as CloseIcon } from 'react-icons/md';
import { ptBR as corePtBR, enUS as coreEnUS } from '@mui/material/locale';
import {
  ptBR as datePtBR,
  enUS as dateEnUS,
} from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Button } from '../Button';
import { MultiContext, MultiProviderLocale } from './MultiContext';

export interface PaletteColorProps {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

export interface PaletteProps extends Omit<
  PaletteOptions,
  'mode' | 'primary' | 'secondary'
> {
  primary: PaletteColorProps;
  secondary: PaletteColorProps;
}

export type PaletteDarkProps = Partial<PaletteProps>;

export type MultiProviderMode = 'dark' | 'light' | 'system';

export interface MultiProviderProps {
  adapterLocalePtBR?: boolean;
  children: React.ReactNode;
  locale?: MultiProviderLocale;
  mode?: MultiProviderMode;
  palette: PaletteProps;
  paletteDark?: PaletteDarkProps;
  snackAnchorHorizontal: SnackbarOrigin['horizontal'];
  snackAnchorVertical: SnackbarOrigin['vertical'];
  snackAutoHideDuration?: SnackbarProviderProps['autoHideDuration'];
  snackMax?: SnackbarProviderProps['maxSnack'];
}

export interface CreateThemeProps {
  dateLocale: any;
  coreLocale: any;
}

const STORAGE_KEY = 'MUI_THEME_DARK';
const DARK_QUERY = '(prefers-color-scheme: dark)';
const DEFAULT_BACKGROUND = { dark: '#191919', light: '#f0f0f7' };

const LOCALES = {
  en: { adapter: 'en', core: coreEnUS, date: dateEnUS },
  'pt-BR': { adapter: 'pt-BR', core: corePtBR, date: datePtBR },
} satisfies Record<MultiProviderLocale, object>;

const readStoredDark = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) === true;
    const prefersDark = window.matchMedia(DARK_QUERY).matches;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefersDark));
    return prefersDark;
  } catch {
    return false;
  }
};

const writeStoredDark = (value: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    return;
  }
};

const resolveDark = (
  mode: MultiProviderMode | undefined,
  systemDark: boolean,
  storedDark: boolean | null,
): boolean => {
  if (mode === 'dark') return true;
  if (mode === 'light') return false;
  if (mode === 'system') return systemDark;
  return storedDark ?? systemDark;
};

const buildPalette = (
  dark: boolean,
  palette: PaletteProps,
  paletteDark?: PaletteDarkProps,
): PaletteOptions => {
  if (!dark) return { ...palette, mode: 'light' };

  return {
    ...paletteDark,
    mode: 'dark',
    primary: paletteDark?.primary ?? palette.primary,
    secondary: paletteDark?.secondary ?? palette.secondary,
  };
};

export const MultiProvider: FC<MultiProviderProps> = ({
  adapterLocalePtBR,
  children,
  locale: localeProp,
  mode,
  palette,
  paletteDark,
  snackAnchorHorizontal,
  snackAnchorVertical,
  snackAutoHideDuration,
  snackMax,
}) => {
  const modeLocked = mode !== undefined;
  const systemDark = useMediaQuery(DARK_QUERY, { noSsr: true });
  const [storedDark, setStoredDark] = useState<boolean | null>(() =>
    modeLocked ? null : readStoredDark(),
  );

  if (!modeLocked && storedDark === null) setStoredDark(readStoredDark());

  const dark = resolveDark(mode, systemDark, storedDark);
  const locale: MultiProviderLocale =
    localeProp ?? (adapterLocalePtBR ? 'pt-BR' : 'en');
  const isAdapterLocalePtBR = locale === 'pt-BR';
  const { adapter, core, date } = LOCALES[locale];

  const backgroundColor = dark
    ? (paletteDark?.background?.default ?? DEFAULT_BACKGROUND.dark)
    : (palette.background?.default ?? DEFAULT_BACKGROUND.light);

  const handleChangeMode = useCallback(() => {
    if (modeLocked) return;
    writeStoredDark(!dark);
    setStoredDark(!dark);
  }, [modeLocked, dark]);

  const theme = useMemo(
    () =>
      muiCreateTheme(
        {
          palette: buildPalette(dark, palette, paletteDark),
          components: {
            MuiAppBar: {
              defaultProps: {
                enableColorOnDark: true,
              },
            },
          },
        },
        date,
        core,
      ),
    [dark, palette, paletteDark, date, core],
  );

  const contextValue = useMemo(
    () => ({
      backgroundColor,
      dark,
      isAdapterLocalePtBR,
      locale,
      modeLocked,
      onChangeMode: handleChangeMode,
    }),
    [
      backgroundColor,
      dark,
      isAdapterLocalePtBR,
      locale,
      modeLocked,
      handleChangeMode,
    ],
  );

  return (
    <MultiContext value={contextValue}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{
            horizontal: snackAnchorHorizontal,
            vertical: snackAnchorVertical,
          }}
          autoHideDuration={snackAutoHideDuration}
          maxSnack={snackMax}
          action={(snackbarId) => (
            <Button model='icon' onClick={() => closeSnackbar(snackbarId)}>
              <CloseIcon />
            </Button>
          )}
        >
          <LocalizationProvider
            adapterLocale={adapter}
            dateAdapter={AdapterDayjs}
            localeText={
              date.components.MuiLocalizationProvider.defaultProps.localeText
            }
          >
            {children}
          </LocalizationProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </MultiContext>
  );
};

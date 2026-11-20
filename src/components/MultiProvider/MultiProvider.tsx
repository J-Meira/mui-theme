import 'dayjs/locale/pt-br';
import { FC, useCallback, useMemo, useState } from 'react';

import {
  closeSnackbar,
  SnackbarOrigin,
  SnackbarProvider,
  SnackbarProviderProps,
} from 'notistack';

import {
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
import { MultiContext } from './MultiContext';

export interface PaletteProps {
  primary: {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
  };
}

export type MultiProviderMode = 'dark' | 'light' | 'system';

export interface MultiProviderProps {
  adapterLocalePtBR?: boolean;
  children: React.ReactNode;
  mode?: MultiProviderMode;
  palette: PaletteProps;
  paletteDark?: PaletteProps;
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

export const MultiProvider: FC<MultiProviderProps> = ({
  adapterLocalePtBR,
  children,
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
  const backgroundColor = dark ? '#191919' : '#f0f0f7';
  const isAdapterLocalePtBR = !!adapterLocalePtBR;

  const handleChangeMode = useCallback(() => {
    if (modeLocked) return;
    writeStoredDark(!dark);
    setStoredDark(!dark);
  }, [modeLocked, dark]);

  const theme = useMemo(
    () =>
      muiCreateTheme(
        {
          palette: {
            mode: dark ? 'dark' : 'light',
            primary:
              dark && paletteDark ? paletteDark.primary : palette.primary,
            secondary:
              dark && paletteDark ? paletteDark.secondary : palette.secondary,
          },
          components: {
            MuiAppBar: {
              defaultProps: {
                enableColorOnDark: true,
              },
            },
          },
        },
        isAdapterLocalePtBR ? datePtBR : dateEnUS,
        isAdapterLocalePtBR ? corePtBR : coreEnUS,
      ),
    [dark, palette, paletteDark, isAdapterLocalePtBR],
  );

  const contextValue = useMemo(
    () => ({
      backgroundColor,
      dark,
      isAdapterLocalePtBR,
      modeLocked,
      onChangeMode: handleChangeMode,
    }),
    [backgroundColor, dark, isAdapterLocalePtBR, modeLocked, handleChangeMode],
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
            adapterLocale={adapterLocalePtBR ? 'pt-BR' : 'en'}
            dateAdapter={AdapterDayjs}
            localeText={
              adapterLocalePtBR
                ? datePtBR.components.MuiLocalizationProvider.defaultProps
                    .localeText
                : dateEnUS.components.MuiLocalizationProvider.defaultProps
                    .localeText
            }
          >
            {children}
          </LocalizationProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </MultiContext>
  );
};

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

export interface MultiProviderProps {
  adapterLocalePtBR?: boolean;
  children: React.ReactNode;
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

const STORAGE_KEY = 'MUI_THEME_DARk';

const readStoredDark = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) === true;
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefersDark));
    return prefersDark;
  } catch {
    return false;
  }
};

export const MultiProvider: FC<MultiProviderProps> = ({
  adapterLocalePtBR,
  children,
  palette,
  paletteDark,
  snackAnchorHorizontal,
  snackAnchorVertical,
  snackAutoHideDuration,
  snackMax,
}) => {
  const [dark, setDark] = useState(readStoredDark);

  const backgroundColor = dark ? '#191919' : '#f0f0f7';
  const isAdapterLocalePtBR = !!adapterLocalePtBR;

  const handleChangeMode = useCallback(() => {
    setDark((prev) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(!prev));
      return !prev;
    });
  }, []);

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
      onChangeMode: handleChangeMode,
    }),
    [backgroundColor, dark, isAdapterLocalePtBR, handleChangeMode],
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

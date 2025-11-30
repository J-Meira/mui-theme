import 'dayjs/locale/pt-br';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

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
  const [dark, setDark] = useState(false);

  const backgroundColor = useMemo(() => (dark ? '#191919' : '#f0f0f7'), [dark]);

  const isAdapterLocalePtBR = useMemo(
    () => (adapterLocalePtBR ? true : false),
    [adapterLocalePtBR],
  );

  const handleChangeMode = useCallback(() => {
    localStorage.setItem('MUI_THEME_DARk', JSON.stringify(!dark));
    setDark(!dark);
  }, [dark]);

  const createTheme = useCallback(
    ({ dateLocale, coreLocale }: CreateThemeProps) =>
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
        dateLocale,
        coreLocale,
      ),
    [dark, palette, paletteDark],
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem('MUI_THEME_DARk');

    if (!storedTheme) {
      const userTheme = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      localStorage.setItem('MUI_THEME_DARk', JSON.stringify(userTheme));
      setDark(userTheme);
      return;
    }

    const localDark = JSON.parse(storedTheme);
    if (localDark) setDark(true);
  }, []);

  return (
    <MultiContext.Provider
      value={{
        backgroundColor,
        dark,
        isAdapterLocalePtBR,
        onChangeMode: handleChangeMode,
      }}
    >
      <ThemeProvider
        theme={createTheme({
          dateLocale: adapterLocalePtBR ? datePtBR : dateEnUS,
          coreLocale: adapterLocalePtBR ? corePtBR : coreEnUS,
        })}
      >
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
    </MultiContext.Provider>
  );
};

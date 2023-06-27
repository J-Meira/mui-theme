import 'moment/locale/pt-br';
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ThemeProvider,
  createTheme as muiCreateTheme,
} from '@mui/material/styles';
import { ptBR as corePtBR, enUS as coreEnUS } from '@mui/material/locale';
import { ptBR as datePtBR, enUS as dateEnUS } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SnackbarProvider, SnackbarProviderProps } from 'notistack';

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
  snackAnchorOrigin: SnackbarProviderProps['anchorOrigin'];
  snackAutoHideDuration: SnackbarProviderProps['autoHideDuration'];
  snackMax: SnackbarProviderProps['maxSnack'];
}

export interface CreateThemeProps {
  dateLocale: any;
  coreLocale: any;
}

export interface MultiContextData {
  backgroundColor: string;
  dark: boolean;
  onChangeMode: () => void;
}

const MultiContext = createContext({} as MultiContextData);

export const MultiProvider: FC<MultiProviderProps> = ({
  adapterLocalePtBR,
  children,
  palette,
  paletteDark,
  snackAnchorOrigin,
  snackAutoHideDuration,
  snackMax,
}) => {
  const [dark, setDark] = useState(false);

  const backgroundColor = useMemo(() => (dark ? '#191919' : '#f0f0f7'), [dark]);

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
    if (!localStorage.getItem('MUI_THEME_DARk')) {
      const userTheme = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      localStorage.setItem('MUI_THEME_DARk', JSON.stringify(userTheme));
      setDark(userTheme);
    } else {
      const localDark = JSON.parse(
        localStorage.getItem('MUI_THEME_DARk') || 'false',
      );
      if (localDark) setDark(true);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <MultiContext.Provider
      value={{
        backgroundColor,
        dark,
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
          anchorOrigin={snackAnchorOrigin}
          autoHideDuration={snackAutoHideDuration}
          maxSnack={snackMax}
        >
          <LocalizationProvider
            adapterLocale={adapterLocalePtBR ? 'pt-BR' : 'en'}
            dateAdapter={AdapterMoment}
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

export const useMultiContext = () => useContext(MultiContext);

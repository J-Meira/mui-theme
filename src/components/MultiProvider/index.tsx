import { ThemeProvider, createTheme as muiCreateTheme } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface PaletteProps {
  mode: string,
  primary: {
    light: string,
    main: string,
    dark: string,
    contrastText: string,
  },
  secondary: {
    light: string,
    main: string,
    dark: string,
    contrastText: string,
  },
}

interface MultiProviderProps {
  palette: PaletteProps,
  children: React.ReactNode,
};

const createTheme = (palette: any) => muiCreateTheme({
  palette: palette,
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
    },
  },
});

export const MultiProvider = ({
  children,
  palette,
}: MultiProviderProps) => (
  <ThemeProvider theme={createTheme(palette)}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
      {children}
    </LocalizationProvider>
  </ThemeProvider>
);

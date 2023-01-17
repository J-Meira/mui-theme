import 'dayjs/locale/pt-br'
import 'dayjs/locale/en'
import { ThemeProvider, createTheme as muiCreateTheme } from '@mui/material/styles'
import { ptBR as datePtBR, enUS as dateEnUS } from '@mui/x-date-pickers'
import { ptBR as corePtBR, enUS as coreEnUS } from '@mui/material/locale'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

interface PaletteProps {
  mode: string
  primary: {
    light: string
    main: string
    dark: string
    contrastText: string
  }
  secondary: {
    light: string
    main: string
    dark: string
    contrastText: string
  }
}

interface MultiProviderProps {
  adapterLocalePtBR?: boolean
  children: React.ReactNode
  palette: PaletteProps
}

interface CreateThemeProps {
  palette: any
  dateLocale: any
  coreLocale: any
}

const createTheme = ({ palette, dateLocale, coreLocale }: CreateThemeProps) =>
  muiCreateTheme(
    {
      palette: palette,
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
  )

export const MultiProvider = ({ adapterLocalePtBR, children, palette }: MultiProviderProps) => (
  <ThemeProvider
    theme={createTheme({
      palette,
      dateLocale: adapterLocalePtBR ? datePtBR : dateEnUS,
      coreLocale: adapterLocalePtBR ? corePtBR : coreEnUS,
    })}
  >
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={adapterLocalePtBR ? 'pt-BR' : 'en'}
      localeText={
        adapterLocalePtBR
          ? datePtBR.components.MuiLocalizationProvider.defaultProps.localeText
          : dateEnUS.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      {children}
    </LocalizationProvider>
  </ThemeProvider>
)
